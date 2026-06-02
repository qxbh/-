/**
 * 玄学人格测试 - 自适应评分引擎
 * 支持分阶段计算 + 动态选题
 */

const XuanxueEngine = (() => {

  /**
   * 根据当前答案，判断用户属于哪个方向集群
   * 返回一个方向 key，对应 TARGETED_QUESTIONS 的分组
   */
  function detectCluster(answers) {
    // 收集已答维度的分数
    const scores = {};
    let count = 0;
    for (const [qId, val] of Object.entries(answers)) {
      const q = BASE_QUESTIONS.find(q => q.id === qId);
      if (q) {
        scores[q.dim] = (scores[q.dim] || 0) + val;
        count++;
      }
    }

    // 如果基础题还没答几道，返回均衡
    if (count < 5) return 'balanced';

    // D1 高 → 领导方向
    if ((scores.D1 || 0) >= 5) return 'leader';
    // D2 高 → 财富方向
    if ((scores.D2 || 0) >= 5) return 'wealth';
    // D3 或 D6 高 → 思考方向
    if ((scores.D3 || 0) >= 5 || (scores.D6 || 0) >= 5) return 'thinker';
    // D4 高 → 魅力方向
    if ((scores.D4 || 0) >= 5) return 'charm';
    // D5 高 → 流浪方向
    if ((scores.D5 || 0) >= 5) return 'wanderer';

    return 'balanced';
  }

  /**
   * 根据当前答案和阶段，选择下一轮的题目
   * 针对性轮：从所有方向的30题中选15题，方向匹配的优先
   * @param {'base'|'targeted'|'tiebreaker'} phase
   * @param {Object} answers - 当前已答题目
   * @returns {Array} 本轮要展示的题目 (15题)
   */
  function selectQuestions(phase, answers) {
    const answeredIds = new Set(Object.keys(answers));

    if (phase === 'base') {
      return BASE_QUESTIONS;
    }

    if (phase === 'targeted') {
      const cluster = detectCluster(answers);
      // 收集所有方向的题目
      const allTargeted = Object.values(TARGETED_QUESTIONS).flat();
      // 排除已答过的
      const fresh = allTargeted.filter(q => !answeredIds.has(q.id));
      // 按方向优先级排序：命中的方向排前面
      const clusterQuestions = TARGETED_QUESTIONS[cluster] || [];
      const clusterIds = new Set(clusterQuestions.map(q => q.id));
      const prioritized = [
        ...fresh.filter(q => clusterIds.has(q.id)),
        ...fresh.filter(q => !clusterIds.has(q.id))
      ];
      return prioritized.slice(0, 15);
    }

    if (phase === 'tiebreaker') {
      const fresh = TIEBREAKER_QUESTIONS.filter(q => !answeredIds.has(q.id));
      return fresh.slice(0, 15);
    }

    return [];
  }

  /**
   * 部分计算（用于中间阶段，返回初步结果）
   * 和 computeResult 逻辑一样，但可以处理不完整答案
   */
  function computePartial(answers) {
    const allQuestions = [...BASE_QUESTIONS, ...Object.values(TARGETED_QUESTIONS).flat(), ...TIEBREAKER_QUESTIONS];
    return computeResultFrom(allQuestions, answers);
  }

  /**
   * 最终计算
   */
  function computeResult(answers) {
    const allQuestions = [...BASE_QUESTIONS, ...Object.values(TARGETED_QUESTIONS).flat(), ...TIEBREAKER_QUESTIONS];
    return computeResultFrom(allQuestions, answers);
  }

  /**
   * 核心计算逻辑
   */
  function computeResultFrom(allQuestions, answers) {
    // 1. 计算每维度原始分
    const rawScores = {};
    const questionCounts = {};

    DIMENSION_ORDER.forEach(dim => {
      rawScores[dim] = 0;
      questionCounts[dim] = 0;
    });

    allQuestions.forEach(q => {
      const val = Number(answers[q.id] || 0);
      if (val > 0) {
        rawScores[q.dim] += val;
        questionCounts[q.dim] = (questionCounts[q.dim] || 0) + 1;
      }
    });

    // 2. 转换为等级（基于实际回答的题目数，动态调整阈值）
    const levels = {};
    DIMENSION_ORDER.forEach(dim => {
      const cnt = questionCounts[dim] || 3;
      const maxScore = cnt * 3;
      const normalized = rawScores[dim] / maxScore;
      if (normalized <= 0.4) levels[dim] = 'L';
      else if (normalized <= 0.7) levels[dim] = 'M';
      else levels[dim] = 'H';
    });

    // 3. 生成用户向量
    const userVector = DIMENSION_ORDER.map(dim => levels[dim]);

    // 4. 与每个命格类型计算加权距离
    const ranked = NORMAL_TYPES.map(type => {
      const vector = parsePattern(type.pattern);
      const weights = type.weights || Array(15).fill(1); // 默认权重为1
      let weightedDist = 0;
      let maxPossibleDist = 0;
      let exact = 0;

      for (let i = 0; i < vector.length; i++) {
        const diff = Math.abs(levelNum(userVector[i]) - levelNum(vector[i]));
        weightedDist += diff * weights[i];
        maxPossibleDist += 2 * weights[i]; // 最大差值2 × 权重
        if (diff === 0) exact += 1;
      }

      // 相似度 = (1 - 加权距离 / 最大可能距离) × 100%
      const similarity = Math.max(0, Math.round((1 - weightedDist / maxPossibleDist) * 100));

      return {
        ...TYPE_LIBRARY[type.code],
        distance: weightedDist,
        exact,
        similarity
      };
    }).sort((a, b) => {
      // 先按相似度降序，再按精确命中数降序
      if (b.similarity !== a.similarity) return b.similarity - a.similarity;
      if (b.exact !== a.exact) return b.exact - a.exact;
      return a.distance - b.distance;
    });

    // 5. 取前3个作为候选结果
    const candidates = ranked.slice(0, 3);
    const bestNormal = ranked[0];
    const finalType = bestNormal;

    // 6. 生成五行分析
    const wuxing = {
      金: { level: levels.D10, name: wuxingLevelName('D10', levels.D10) },
      木: { level: levels.D11, name: wuxingLevelName('D11', levels.D11) },
      水: { level: levels.D12, name: wuxingLevelName('D12', levels.D12) },
      火: { level: levels.D13, name: wuxingLevelName('D13', levels.D13) },
      土: { level: levels.D14, name: wuxingLevelName('D14', levels.D14) }
    };

    // 7. 生成神煞感应
    const shensha = [];
    if (levels.D4 === 'H') shensha.push({ name: '桃花', level: '烂桃花' });
    else if (levels.D4 === 'M') shensha.push({ name: '桃花', level: '旺' });
    if (levels.D5 === 'H') shensha.push({ name: '驿马', level: '动' });
    else if (levels.D5 === 'M') shensha.push({ name: '驿马', level: '稳' });
    if (levels.D6 === 'H') shensha.push({ name: '华盖', level: '玄' });
    else if (levels.D6 === 'M') shensha.push({ name: '华盖', level: '雅' });
    if (levels.D3 === 'H') shensha.push({ name: '贵人', level: '多' });
    if (levels.D2 === 'H') shensha.push({ name: '财星', level: '旺' });

    // 8. 生成维度详情
    const dimDetails = DIMENSION_ORDER.map(dim => {
      const meta = DIMENSION_META[dim];
      const level = levels[dim];
      return {
        dim,
        name: meta.name,
        group: meta.group,
        level,
        levelName: getDimLevelName(dim, level),
        rawScore: rawScores[dim]
      };
    });

    return {
      rawScores,
      levels,
      ranked,
      candidates,
      bestNormal,
      finalType,
      wuxing,
      shensha,
      dimDetails,
      similarity: finalType.similarity,
      exactHits: finalType.exact
    };
  }

  function parsePattern(pattern) {
    return pattern.split('-').join('').split('');
  }

  return {
    computeResult,
    computePartial,
    selectQuestions,
    detectCluster
  };
})();
