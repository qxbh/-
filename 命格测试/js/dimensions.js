/**
 * 玄学人格测试 - 维度定义
 * 3维度组，16个子维度
 */

const DIMENSION_META = {
  // ═══════════════════════════════════════
  // 命格模型 (D1 - D6)
  // ═══════════════════════════════════════
  D1: { name: '气场主导', group: '命格', desc: '领导感、存在感、控场欲' },
  D2: { name: '行动力', group: '命格', desc: '冲劲、说干就干、决定速度' },
  D3: { name: '事业目标', group: '命格', desc: '事业心、打工状态、目标感' },
  D4: { name: '财帛敏感', group: '命格', desc: '钱感、性价比、商业直觉' },
  D5: { name: '文昌思考', group: '命格', desc: '学习欲、思考深度、钻研精神' },
  D6: { name: '表达欲', group: '命格', desc: '分享欲、表现欲、社交输出' },

  // ═══════════════════════════════════════
  // 运势模型 (D7 - D10)
  // ═══════════════════════════════════════
  D7: { name: '红鸾投入', group: '运势', desc: '恋爱投入、容易心动、容易上头' },
  D8: { name: '信任安全', group: '运势', desc: '安全感、少猜疑、关系信任度' },
  D9: { name: '驿马变动', group: '运势', desc: '自由感、环境变化欲、出行欲' },
  D10: { name: '华盖精神', group: '运势', desc: '神秘感、孤独审美、精神世界' },

  // ═══════════════════════════════════════
  // 性格模型 (D11 - D16)
  // ═══════════════════════════════════════
  D11: { name: '孤辰自卑', group: '性格', desc: '自我否定、敏感、被刺痛度' },
  D12: { name: '情绪内耗', group: '性格', desc: '情绪波动、自我纠结、破防恢复' },
  D13: { name: '福德咸鱼', group: '性格', desc: '躺平倾向、节能模式、自我满足' },
  D14: { name: '破军反骨', group: '性格', desc: '叛逆反骨、抗拒安排、破局冲动' },
  D15: { name: '边界警惕', group: '性格', desc: '防备心、风险意识、边界清晰' },
  D16: { name: '交付完美', group: '性格', desc: '完美主义、临门一脚、交付意识' }
};

const DIMENSION_ORDER = [
  'D1', 'D2', 'D3', 'D4', 'D5', 'D6',   // 命格
  'D7', 'D8', 'D9', 'D10',               // 运势
  'D11', 'D12', 'D13', 'D14', 'D15', 'D16' // 性格
];

const DIMENSION_GROUPS = ['命格', '运势', '性格'];

/**
 * 将原始分数百分比转换为等级
 */
function sumToLevel(scorePercent) {
  if (scorePercent <= 0.4) return 'L';
  if (scorePercent <= 0.75) return 'M';
  return 'H';
}

/**
 * 等级转数值（用于距离计算）
 */
function levelNum(level) {
  const map = { L: 0, M: 1, H: 2 };
  return map[level] ?? 1;
}

/**
 * 等级中文名
 */
function levelName(level) {
  const map = {
    L: '弱',
    M: '中',
    H: '强'
  };
  return map[level] || level;
}

/**
 * 特殊参数等级别名
 */
function getSpecialLevelName(dim, level) {
  const names = {
    D1: { L: '从众', M: '随和', H: '控场' }, // 气场主导
    D2: { L: '柔', M: '稳', H: '刚' },      // 行动力 (金)
    D3: { L: '收', M: '生', H: '发' },      // 事业目标 (木)
    D4: { L: '散', M: '聚', H: '执' },      // 财帛敏感
    D5: { L: '浅', M: '清', H: '深' },      // 文昌思考 (水)
    D6: { L: '冷', M: '暖', H: '烈' },      // 表达欲 (火)
    D7: { L: '克制', M: '温吞', H: '上头' }, // 红鸾投入
    D8: { L: '疑心', M: '观望', H: '信任' }, // 信任安全
    D9: { L: '静', M: '稳', H: '动' },      // 驿马变动
    D10: { L: '俗', M: '雅', H: '玄' },     // 华盖精神
    D11: { L: '笃定', M: '微酸', H: '碎掉' }, // 孤辰自卑
    D12: { L: '佛系', M: '纠结', H: '内耗' }, // 情绪内耗
    D13: { L: '浮', M: '实', H: '厚' },     // 福德咸鱼 (土)
    D14: { L: '顺服', M: '防御', H: '反骨' }, // 破军反骨
    D15: { L: '松弛', M: '防御', H: '警惕' }, // 边界警惕
    D16: { L: '死磕', M: '平稳', H: '交付' }  // 交付完美
  };
  return (names[dim] && names[dim][level]) || levelName(level);
}

/**
 * 获取维度等级的显示名
 */
function getDimLevelName(dim, level) {
  return getSpecialLevelName(dim, level);
}
