/**
 * 玄学人格测试 - 评分引擎 (16维主副计分版)
 */

const XuanxueEngine = (() => {

  /**
   * 选择题目 (直接返回所有题目)
   */
  function selectQuestions(phase, answers) {
    if (phase === 'base') {
      return QUESTIONS;
    }
    return [];
  }

  /**
   * 最终计算
   */
  function computeResult(answers) {
    return computeResultFrom(QUESTIONS, answers);
  }

  /**
   * 核心计算逻辑
   * 每题主测1个维度，副测1-2个维度
   * 选项 value 1-3 对应不同分数
   */
  function computeResultFrom(allQuestions, answers) {
    // 1. 初始化得分
    const rawScores = {};
    const questionCounts = {};

    DIMENSION_ORDER.forEach(dim => {
      rawScores[dim] = 0;
      questionCounts[dim] = 0;
    });

    // 2. 遍历题目，计算主副维度得分
    allQuestions.forEach(q => {
      const chosenVal = answers[q.id];
      if (chosenVal === undefined) return;

      const value = Number(chosenVal);

      // 主测维度：得分为选项值（1/2/3）
      if (q.mainDim && rawScores[q.mainDim] !== undefined) {
        rawScores[q.mainDim] += value;
        questionCounts[q.mainDim] = (questionCounts[q.mainDim] || 0) + 1;
      }

      // 副测维度：得分减半
      if (q.subDims) {
        q.subDims.forEach(dim => {
          if (rawScores[dim] !== undefined) {
            rawScores[dim] += value * 0.5;
            questionCounts[dim] = (questionCounts[dim] || 0) + 0.5;
          }
        });
      }
    });

    // 3. 计算最大可能得分并转换为百分比
    const maxPossible = {};
    DIMENSION_ORDER.forEach(dim => {
      // 每个维度最多被多少题测到
      let mainCount = 0;
      let subCount = 0;
      allQuestions.forEach(q => {
        if (q.mainDim === dim) mainCount++;
        if (q.subDims && q.subDims.includes(dim)) subCount++;
      });
      // 主测题满分 = 主测数 × 3，副测题满分 = 副测数 × 3 × 0.5
      maxPossible[dim] = mainCount * 3 + subCount * 1.5;
    });

    // 4. 转换为等级
    const levels = {};
    DIMENSION_ORDER.forEach(dim => {
      if (maxPossible[dim] === 0) {
        levels[dim] = 'M'; // 没有题目测到，默认中等
      } else {
        const percent = rawScores[dim] / maxPossible[dim];
        if (percent <= 0.4) levels[dim] = 'L';
        else if (percent <= 0.75) levels[dim] = 'M';
        else levels[dim] = 'H';
      }
    });

    // 5. 生成用户向量
    const userVector = DIMENSION_ORDER.map(dim => levels[dim]);

    // 6. 与每个命格类型计算加权距离
    const ranked = NORMAL_TYPES.map(type => {
      const vector = parsePattern(type.pattern);
      const weights = type.weights || Array(16).fill(1);
      let weightedDist = 0;
      let maxPossibleDist = 0;
      let exact = 0;

      for (let i = 0; i < vector.length; i++) {
        const diff = Math.abs(levelNum(userVector[i]) - levelNum(vector[i]));
        weightedDist += diff * weights[i];
        maxPossibleDist += 2 * weights[i];
        if (diff === 0) exact += 1;
      }

      const similarity = Math.max(0, Math.round((1 - weightedDist / maxPossibleDist) * 100));

      return {
        ...TYPE_LIBRARY[type.code],
        distance: weightedDist,
        exact,
        similarity
      };
    }).sort((a, b) => {
      if (b.similarity !== a.similarity) return b.similarity - a.similarity;
      if (b.exact !== a.exact) return b.exact - a.exact;
      return a.distance - b.distance;
    });

    // 7. 取前3个作为候选结果
    const candidates = ranked.slice(0, 3);
    const bestNormal = ranked[0];
    const finalType = bestNormal;

    // 8. 生成五行分析
    const wuxing = {
      金: { level: levels.D2, name: getSpecialLevelName('D2', levels.D2) },
      木: { level: levels.D3, name: getSpecialLevelName('D3', levels.D3) },
      水: { level: levels.D5, name: getSpecialLevelName('D5', levels.D5) },
      火: { level: levels.D6, name: getSpecialLevelName('D6', levels.D6) },
      土: { level: levels.D13, name: getSpecialLevelName('D13', levels.D13) }
    };

    // 9. 生成神煞感应
    const shensha = [];
    if (levels.D7 === 'H') shensha.push({ name: '红鸾', level: '动' });
    else if (levels.D7 === 'M') shensha.push({ name: '红鸾', level: '稳' });
    if (levels.D9 === 'H') shensha.push({ name: '驿马', level: '动' });
    else if (levels.D9 === 'M') shensha.push({ name: '驿马', level: '稳' });
    if (levels.D10 === 'H') shensha.push({ name: '华盖', level: '玄' });
    else if (levels.D10 === 'M') shensha.push({ name: '华盖', level: '雅' });
    if (levels.D11 === 'H') shensha.push({ name: '孤辰', level: '重' });
    if (levels.D4 === 'H') shensha.push({ name: '禄存', level: '旺' });
    if (levels.D14 === 'H') shensha.push({ name: '破军', level: '烈' });

    // 10. 生成维度详情
    const dimDetails = DIMENSION_ORDER.map(dim => {
      const meta = DIMENSION_META[dim];
      const level = levels[dim];
      return {
        dim,
        name: meta.name,
        group: meta.group,
        level,
        levelName: getDimLevelName(dim, level),
        rawScore: Math.round(rawScores[dim] * 10) / 10
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
    selectQuestions
  };
})();
