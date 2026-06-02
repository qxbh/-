/**
 * 玄学人格测试 - 维度定义
 * 6维度组，15个子维度
 */

const DIMENSION_META = {
  // ═══════════════════════════════════════
  // 命格模型
  // ═══════════════════════════════════════
  D1: { name: '官星感应', group: '命格', desc: '权力欲、掌控力' },
  D2: { name: '财星感应', group: '命格', desc: '物质欲、商业嗅觉' },
  D3: { name: '印星感应', group: '命格', desc: '学习力、贵人缘' },

  // ═══════════════════════════════════════
  // 运势模型
  // ═══════════════════════════════════════
  D4: { name: '桃花感应', group: '运势', desc: '人缘、异性缘、魅力' },
  D5: { name: '驿马感应', group: '运势', desc: '动荡感、迁徙欲、变动频率' },
  D6: { name: '华盖感应', group: '运势', desc: '孤独感、艺术感、玄学缘' },

  // ═══════════════════════════════════════
  // 性格模型
  // ═══════════════════════════════════════
  D7: { name: '食神能量', group: '性格', desc: '表达欲、享乐感、创造力' },
  D8: { name: '伤官能量', group: '性格', desc: '叛逆感、打破规则、锋芒' },
  D9: { name: '比肩能量', group: '性格', desc: '独立性、自我意识、竞争心' },

  // ═══════════════════════════════════════
  // 五行模型
  // ═══════════════════════════════════════
  D10: { name: '金气', group: '五行', desc: '决断力、执行力、果断' },
  D11: { name: '木气', group: '五行', desc: '生发力、成长欲、仁慈' },
  D12: { name: '水气', group: '五行', desc: '智慧感、变通力、深沉' },
  D13: { name: '火气', group: '五行', desc: '热情度、表达力、感染力' },
  D14: { name: '土气', group: '五行', desc: '稳定感、包容力、固执' },

  // ═══════════════════════════════════════
  // 宿命模型
  // ═══════════════════════════════════════
  D15: { name: '宿命感', group: '宿命', desc: '对命运的认同程度' }
};

const DIMENSION_ORDER = [
  'D1', 'D2', 'D3',   // 命格
  'D4', 'D5', 'D6',   // 运势
  'D7', 'D8', 'D9',   // 性格
  'D10', 'D11', 'D12', 'D13', 'D14',  // 五行
  'D15'               // 宿命
];

const DIMENSION_GROUPS = ['命格', '运势', '性格', '五行', '宿命'];

/**
 * 将原始分数转换为等级
 * 每维度3题，每题1-3分，总分3-9分
 */
function sumToLevel(score) {
  if (score <= 4) return 'L';
  if (score <= 6) return 'M';
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
 * 五行等级中文名
 */
function wuxingLevelName(dim, level) {
  const names = {
    D10: { L: '柔', M: '稳', H: '刚' },
    D11: { L: '收', M: '生', H: '发' },
    D12: { L: '浅', M: '清', H: '深' },
    D13: { L: '冷', M: '暖', H: '烈' },
    D14: { L: '浮', M: '实', H: '厚' }
  };
  return (names[dim] && names[dim][level]) || levelName(level);
}

/**
 * 运势等级中文名
 */
function yunshiLevelName(dim, level) {
  const names = {
    D4: { L: '淡', M: '旺', H: '烂' },
    D5: { L: '静', M: '稳', H: '动' },
    D6: { L: '俗', M: '雅', H: '玄' }
  };
  return (names[dim] && names[dim][level]) || levelName(level);
}

/**
 * 获取维度等级的显示名
 */
function getDimLevelName(dim, level) {
  const meta = DIMENSION_META[dim];
  if (!meta) return levelName(level);

  if (meta.group === '五行') return wuxingLevelName(dim, level);
  if (meta.group === '运势') return yunshiLevelName(dim, level);
  return levelName(level);
}
