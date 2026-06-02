/**
 * 玄学人格测试 - 分阶段题库 (180题)
 * 基础轮(45) → 针对性轮(90) → 决胜轮(45) = 180题
 * 每阶段随机抽15题，总共45题
 * 题库越大，重测越不会腻
 */

// ═══════════════════════════════════════
// 第一阶段：基础轮 (75题，每维度至少3题)
// ═══════════════════════════════════════
const BASE_QUESTIONS = [
  // D1 官星感应
  { id: 'q1', dim: 'D1', text: '聚餐结账的时候你会？', options: [
    { label: '低头玩手机，假装没看见账单', value: 1 },
    { label: 'AA吧，大家都不容易', value: 2 },
    { label: '都别动，今天我请', value: 3 }
  ]},
  { id: 'q2', dim: 'D1', text: '打王者荣耀你最喜欢打什么位置？', options: [
    { label: '辅助，默默保人就行', value: 1 },
    { label: '射手/法师，输出拉满', value: 2 },
    { label: '打野/对抗，节奏我来带', value: 3 }
  ]},

  // D2 财星感应
  { id: 'q3', dim: 'D2', text: '你的花呗/信用卡账单，你是什么态度？', options: [
    { label: '从来没用过，穷但自由', value: 1 },
    { label: '每月按时还，稳得一批', value: 2 },
    { label: '先享受再说，下个月的事下个月操心', value: 3 }
  ]},
  { id: 'q4', dim: 'D2', text: '看到喜欢的东西但很贵，你会？', options: [
    { label: '算了不买了，不实用', value: 1 },
    { label: '犹豫一下，看看有没有平替', value: 2 },
    { label: '想办法搞到手，钱可以再赚', value: 3 }
  ]},

  // D3 印星感应
  { id: 'q5', dim: 'D3', text: '你手机里有多少个没打开过的学习APP？', options: [
    { label: '0个，我下载了就会用', value: 1 },
    { label: '两三个，偶尔心血来潮', value: 2 },
    { label: '七八个，每个都下载了但都在吃灰', value: 3 }
  ]},
  { id: 'q6', dim: 'D3', text: '你对"量子力学"的态度是？', options: [
    { label: '听不懂，也不想懂', value: 1 },
    { label: '大概知道是什么，但说不清楚', value: 2 },
    { label: '我能给你讲三个小时', value: 3 }
  ]},

  // D4 桃花感应
  { id: 'q7', dim: 'D4', text: '你最近一次被搭讪是什么时候？', options: [
    { label: '没有过，我脸上写了"别来"吗', value: 1 },
    { label: '上个月？记不清了', value: 2 },
    { label: '昨天，我假装没听见', value: 3 }
  ]},
  { id: 'q8', dim: 'D4', text: '你觉得你是什么类型的？', options: [
    { label: '搞笑型，靠才华吃饭', value: 1 },
    { label: '普通人，没什么特别的', value: 2 },
    { label: '氛围感拉满，走到哪都是焦点', value: 3 }
  ]},

  // D5 驿马感应
  { id: 'q9', dim: 'D5', text: '你在一个城市待了三年，你会？', options: [
    { label: '挺好的，不想动', value: 1 },
    { label: '偶尔想去别的地方看看', value: 2 },
    { label: '开始搜其他城市的房租了', value: 3 }
  ]},
  { id: 'q10', dim: 'D5', text: '你的行李箱现在是？', options: [
    { label: '收在柜子里，落灰了', value: 1 },
    { label: '随时能收拾出发', value: 2 },
    { label: '里面还有上次出差没拆的', value: 3 }
  ]},

  // D6 华盖感应
  { id: 'q11', dim: 'D6', text: '你有没有过"我好像不属于这个世界"的感觉？', options: [
    { label: '没有，我活得好好的', value: 1 },
    { label: '偶尔会有这种念头', value: 2 },
    { label: '经常，我觉得我来自另一个星球', value: 3 }
  ]},
  { id: 'q12', dim: 'D6', text: '你会对宗教/哲学/玄学感兴趣吗？', options: [
    { label: '完全不感兴趣', value: 1 },
    { label: '偶尔看看，当知识了解', value: 2 },
    { label: '非常感兴趣，一直在研究', value: 3 }
  ]},

  // D7 食神能量
  { id: 'q13', dim: 'D7', text: '你最近一次发朋友圈是什么内容？', options: [
    { label: '不发朋友圈这种东西', value: 1 },
    { label: '转发了一个链接/新闻', value: 2 },
    { label: '精心拍了九张图配了一段文案', value: 3 }
  ]},
  { id: 'q14', dim: 'D7', text: '你有什么特别的爱好吗？', options: [
    { label: '没有特别的', value: 1 },
    { label: '有几个，但不算精通', value: 2 },
    { label: '有，而且我很投入', value: 3 }
  ]},

  // D8 伤官能量
  { id: 'q15', dim: 'D8', text: '领导在群里发了一条你觉得很蠢的消息，你会？', options: [
    { label: '已读不回', value: 1 },
    { label: '回个表情包敷衍一下', value: 2 },
    { label: '直接在群里指出来', value: 3 }
  ]},
  { id: 'q16', dim: 'D8', text: '你妈催你结婚，你会？', options: [
    { label: '好的好的，我知道了', value: 1 },
    { label: '转移话题，聊点别的', value: 2 },
    { label: '直接说我不想结，别催了', value: 3 }
  ]},

  // D9 比肩能量
  { id: 'q17', dim: 'D9', text: '你打游戏输了会？', options: [
    { label: '算了，娱乐而已', value: 1 },
    { label: '有点不爽，但能接受', value: 2 },
    { label: '再来一把，我就不信了', value: 3 }
  ]},
  { id: 'q18', dim: 'D9', text: '别人说你"太自我"你会？', options: [
    { label: '反思一下，可能真的是', value: 1 },
    { label: '有点不爽，但懒得解释', value: 2 },
    { label: '我就是我，不需要迎合别人', value: 3 }
  ]},

  // D10 金气
  { id: 'q19', dim: 'D10', text: '你做决定的速度是？', options: [
    { label: '想三天三夜，还没想好', value: 1 },
    { label: '想一想，然后做决定', value: 2 },
    { label: '三秒之内，干就完了', value: 3 }
  ]},

  // D11 木气
  { id: 'q20', dim: 'D11', text: '你看到一棵树，你会？', options: [
    { label: '路过，不看', value: 1 },
    { label: '嗯，挺绿的', value: 2 },
    { label: '停下来，感受一下它的生命力', value: 3 }
  ]},

  // ═══════════════════════════════════════
  // 扩充题目 - 社会现象类
  // ═══════════════════════════════════════

  // D1 官星感应 - 社会现象
  { id: 'q21', dim: 'D1', text: '公司团建你一般是什么角色？', options: [
    { label: '默默吃饭，别叫我', value: 1 },
    { label: '参与但不组织', value: 2 },
    { label: '我来安排大家！', value: 3 }
  ]},

  // D2 财星感应 - 社会现象
  { id: 'q22', dim: 'D2', text: '双十一你通常？', options: [
    { label: '不参与，平时也不缺什么', value: 1 },
    { label: '买点刚需的', value: 2 },
    { label: '提前一个月做攻略，零点准时抢', value: 3 }
  ]},

  // D3 印星感应 - 社会现象
  { id: 'q23', dim: 'D3', text: '你对"知识付费"的态度是？', options: [
    { label: '免费的不香吗', value: 1 },
    { label: '有价值的会买', value: 2 },
    { label: '买了就是学了', value: 3 }
  ]},

  // D4 桃花感应 - 社会现象
  { id: 'q24', dim: 'D4', text: '你在地铁上被要过微信吗？', options: [
    { label: '没有，我长得这么安全吗', value: 1 },
    { label: '有过一两次', value: 2 },
    { label: '经常，我都装没听见', value: 3 }
  ]},

  // D5 驿马感应 - 社会现象
  { id: 'q25', dim: 'D5', text: '你对"数字游民"的生活方式？', options: [
    { label: '不现实，还是得有固定住处', value: 1 },
    { label: '羡慕，但做不到', value: 2 },
    { label: '这就是我想要的生活', value: 3 }
  ]},

  // D6 华盖感应 - 社会现象
  { id: 'q26', dim: 'D6', text: '你觉得"躺平"和"内卷"哪个更可怕？', options: [
    { label: '躺平，浪费生命', value: 1 },
    { label: '内卷，消耗自己', value: 2 },
    { label: '都不可怕，可怕的是既躺不平又卷不赢', value: 3 }
  ]},

  // D7 食神能量 - 社会现象
  { id: 'q27', dim: 'D7', text: '你对"网红餐厅"的态度是？', options: [
    { label: '不去，都是智商税', value: 1 },
    { label: '偶尔去打卡', value: 2 },
    { label: '每家新开的都要去', value: 3 }
  ]},

  // D8 伤官能量 - 社会现象
  { id: 'q28', dim: 'D8', text: '看到网上有人带节奏，你会？', options: [
    { label: '不关我的事', value: 1 },
    { label: '看看就好，不评论', value: 2 },
    { label: '必须下场battle', value: 3 }
  ]},

  // D9 比肩能量 - 社会现象
  { id: 'q29', dim: 'D9', text: '你对"996"的态度是？', options: [
    { label: '没办法，为了生活', value: 1 },
    { label: '能接受，但要有回报', value: 2 },
    { label: '拒绝，我有自己的生活', value: 3 }
  ]},

  // D10 金气 - 社会现象
  { id: 'q30', dim: 'D10', text: '你点外卖会花多长时间？', options: [
    { label: '半小时起步，纠结到店家打烊', value: 1 },
    { label: '十分钟左右', value: 2 },
    { label: '三分钟内下单，从不纠结', value: 3 }
  ]},

  // D11 木气 - 社会现象
  { id: 'q31', dim: 'D11', text: '你对"元宇宙"的概念？', options: [
    { label: '听不懂，也不想懂', value: 1 },
    { label: '有点意思，但跟我没关系', value: 2 },
    { label: '已经在研究怎么入场了', value: 3 }
  ]},

  // D12 水气 - 社会现象
  { id: 'q32', dim: 'D12', text: '你对"断舍离"的态度是？', options: [
    { label: '扔东西？不可能', value: 1 },
    { label: '偶尔会清理一下', value: 2 },
    { label: '定期清理，保持极简', value: 3 }
  ]},

  // D13 火气 - 社会现象
  { id: 'q33', dim: 'D13', text: '你对"热榜"的态度是？', options: [
    { label: '从不看，跟我没关系', value: 1 },
    { label: '偶尔看看，了解一下', value: 2 },
    { label: '每天必看，不能脱节', value: 3 }
  ]},

  // D14 土气 - 社会现象
  { id: 'q34', dim: 'D14', text: '你对"长期主义"的态度是？', options: [
    { label: '太慢了，我要快速见效', value: 1 },
    { label: '认同，但很难坚持', value: 2 },
    { label: '这就是我的人生信条', value: 3 }
  ]},

  // D15 宿命感 - 社会现象
  { id: 'q35', dim: 'D15', text: '你相信"缘分"吗？', options: [
    { label: '不信，都是人为的', value: 1 },
    { label: '半信半疑', value: 2 },
    { label: '信，该来的总会来', value: 3 }
  ]},

  // ═══════════════════════════════════════
  // 扩充题目 - 幽默类型类
  // ═══════════════════════════════════════

  // D6 华盖感应 - 幽默类型
  { id: 'q36', dim: 'D6', text: '你觉得哪种幽默最高级？', options: [
    { label: '谐音梗（虽然土但好笑）', value: 1 },
    { label: '黑色幽默（笑着笑着就哭了）', value: 2 },
    { label: '冷幽默（需要三秒反应那种）', value: 3 }
  ]},

  // D7 食神能量 - 幽默类型
  { id: 'q37', dim: 'D7', text: '你笑点高还是低？', options: [
    { label: '很高，很少有东西能逗笑我', value: 1 },
    { label: '正常水平', value: 2 },
    { label: '很低，看个表情包都能笑半天', value: 3 }
  ]},

  // D8 伤官能量 - 幽默类型
  { id: 'q38', dim: 'D8', text: '你自嘲的频率是？', options: [
    { label: '从不自嘲，我很好', value: 1 },
    { label: '偶尔', value: 2 },
    { label: '经常，自嘲是最高级的幽默', value: 3 }
  ]},

  // D9 比肩能量 - 幽默类型
  { id: 'q39', dim: 'D9', text: '你讲冷笑话的频率是？', options: [
    { label: '从不，太尬了', value: 1 },
    { label: '偶尔讲一个', value: 2 },
    { label: '经常，我就爱看别人无语的样子', value: 3 }
  ]},

  // D10 金气 - 幽默类型
  { id: 'q40', dim: 'D10', text: '你能接受的玩笑底线是？', options: [
    { label: '开什么都不行', value: 1 },
    { label: '熟人可以，生人不行', value: 2 },
    { label: '随便开，我心态好', value: 3 }
  ]},

  // D11 木气 - 幽默类型
  { id: 'q41', dim: 'D11', text: '你对"梗文化"的态度是？', options: [
    { label: '看不懂，也不想懂', value: 1 },
    { label: '知道一些，但不追', value: 2 },
    { label: '每天都刷新梗，跟不上就焦虑', value: 3 }
  ]},

  // D12 水气 - 幽默类型
  { id: 'q42', dim: 'D12', text: '你对"地狱笑话"的态度是？', options: [
    { label: '接受不了，太过分了', value: 1 },
    { label: '看情况，有些还好', value: 2 },
    { label: '很喜欢，越黑暗越好笑', value: 3 }
  ]},

  // D13 火气 - 幽默类型
  { id: 'q43', dim: 'D13', text: '你能在严肃场合忍住不笑吗？', options: [
    { label: '能，我很有定力', value: 1 },
    { label: '看情况', value: 2 },
    { label: '不能，越严肃我越想笑', value: 3 }
  ]},

  // D14 土气 - 幽默类型
  { id: 'q44', dim: 'D14', text: '你对"土味情话"的态度是？', options: [
    { label: '尬到脚趾抠地', value: 1 },
    { label: '偶尔觉得还行', value: 2 },
    { label: '我觉得很甜啊', value: 3 }
  ]},

  // D15 宿命感 - 幽默类型
  { id: 'q45', dim: 'D15', text: '你对"玄学段子"的态度是？', options: [
    { label: '不信，纯娱乐', value: 1 },
    { label: '看着玩', value: 2 },
    { label: '转发！万一灵呢', value: 3 }
  ]},

  // ═══════════════════════════════════════
  // 扩充题目 - 价值观类
  // ═══════════════════════════════════════

  // D1 官星感应 - 价值观
  { id: 'q46', dim: 'D1', text: '你觉得人生最重要的事是？', options: [
    { label: '自由', value: 1 },
    { label: '成功', value: 2 },
    { label: '掌控感', value: 3 }
  ]},

  // D2 财星感应 - 价值观
  { id: 'q47', dim: 'D2', text: '钱和自由只能选一个，你选？', options: [
    { label: '自由，钱够用就行', value: 1 },
    { label: '看情况', value: 2 },
    { label: '钱，有了钱才有自由', value: 3 }
  ]},

  // D3 印星感应 - 价值观
  { id: 'q48', dim: 'D3', text: '你觉得读书的意义是？', options: [
    { label: '找个好工作', value: 1 },
    { label: '开阔眼界', value: 2 },
    { label: '成为更好的自己', value: 3 }
  ]},

  // D4 桃花感应 - 价值观
  { id: 'q49', dim: 'D4', text: '你觉得爱情和面包哪个重要？', options: [
    { label: '面包，没有物质基础不行', value: 1 },
    { label: '都重要', value: 2 },
    { label: '爱情，有情饮水饱', value: 3 }
  ]},

  // D5 驿马感应 - 价值观
  { id: 'q50', dim: 'D5', text: '你觉得"稳定"和"精彩"哪个更重要？', options: [
    { label: '稳定，安稳最重要', value: 1 },
    { label: '看情况', value: 2 },
    { label: '精彩，人生苦短', value: 3 }
  ]},

  // D6 华盖感应 - 价值观
  { id: 'q51', dim: 'D6', text: '你觉得人生的意义是？', options: [
    { label: '享受当下', value: 1 },
    { label: '留下点什么', value: 2 },
    { label: '找到自己', value: 3 }
  ]},

  // D7 食神能量 - 价值观
  { id: 'q52', dim: 'D7', text: '你觉得"仪式感"重要吗？', options: [
    { label: '不重要，太形式主义', value: 1 },
    { label: '偶尔需要', value: 2 },
    { label: '很重要，生活需要仪式感', value: 3 }
  ]},

  // D8 伤官能量 - 价值观
  { id: 'q53', dim: 'D8', text: '你觉得"听话"是褒义还是贬义？', options: [
    { label: '褒义，顺从是美德', value: 1 },
    { label: '中性', value: 2 },
    { label: '贬义，没有主见', value: 3 }
  ]},

  // D9 比肩能量 - 价值观
  { id: 'q54', dim: 'D9', text: '你觉得"合群"重要吗？', options: [
    { label: '重要，人是社会性动物', value: 1 },
    { label: '看情况', value: 2 },
    { label: '不重要，做自己就好', value: 3 }
  ]},

  // D10 金气 - 价值观
  { id: 'q55', dim: 'D10', text: '你觉得"果断"和"冲动"的区别是？', options: [
    { label: '结果好就是果断，结果差就是冲动', value: 1 },
    { label: '想清楚了再做是果断', value: 2 },
    { label: '我不管，干就完了', value: 3 }
  ]},

  // D11 木气 - 价值观
  { id: 'q56', dim: 'D11', text: '你觉得"成长"最重要的是？', options: [
    { label: '赚钱', value: 1 },
    { label: '学技能', value: 2 },
    { label: '认识自己', value: 3 }
  ]},

  // D12 水气 - 价值观
  { id: 'q57', dim: 'D12', text: '你觉得"情商"重要还是"智商"重要？', options: [
    { label: '智商，能力说话', value: 1 },
    { label: '都重要', value: 2 },
    { label: '情商，会做人比会做事重要', value: 3 }
  ]},

  // D13 火气 - 价值观
  { id: 'q58', dim: 'D13', text: '你觉得"热情"能持续多久？', options: [
    { label: '三分钟', value: 1 },
    { label: '看事情', value: 2 },
    { label: '只要我想，可以一直保持', value: 3 }
  ]},

  // D14 土气 - 价值观
  { id: 'q59', dim: 'D14', text: '你觉得"坚持"和"放弃"哪个更需要勇气？', options: [
    { label: '放弃，及时止损', value: 1 },
    { label: '看情况', value: 2 },
    { label: '坚持，持之以恒', value: 3 }
  ]},

  // D15 宿命感 - 价值观
  { id: 'q60', dim: 'D15', text: '你相信"命中注定"吗？', options: [
    { label: '不信，我命由我不由天', value: 1 },
    { label: '半信半疑，玄学参考一下', value: 2 },
    { label: '信！遇到的都是命里该有的', value: 3 }
  ]},

  // ═══════════════════════════════════════
  // 扩充题目 - 选择困境类
  // ═══════════════════════════════════════

  // D1 官星感应 - 选择困境
  { id: 'q61', dim: 'D1', text: '月薪翻倍但996 vs 现状躺平，你选？', options: [
    { label: '躺平，生活质量更重要', value: 1 },
    { label: '看情况，看能翻多少', value: 2 },
    { label: '996，搞钱要紧', value: 3 }
  ]},

  // D2 财星感应 - 选择困境
  { id: 'q62', dim: 'D2', text: '免费但难吃 vs 贵但好吃，你选？', options: [
    { label: '免费的，能吃饱就行', value: 1 },
    { label: '看饿不饿', value: 2 },
    { label: '贵但好吃，亏待什么不能亏待胃', value: 3 }
  ]},

  // D3 印星感应 - 选择困境
  { id: 'q63', dim: 'D3', text: '读一本厚书 vs 刷一天短视频，你选？', options: [
    { label: '刷视频，轻松快乐', value: 1 },
    { label: '看情况', value: 2 },
    { label: '读书，知识更持久', value: 3 }
  ]},

  // D4 桃花感应 - 选择困境
  { id: 'q64', dim: 'D4', text: '被很多人喜欢 vs 被一个人深深爱着，你选？', options: [
    { label: '被一个人深深爱着', value: 1 },
    { label: '都想要', value: 2 },
    { label: '被很多人喜欢', value: 3 }
  ]},

  // D5 驿马感应 - 选择困境
  { id: 'q65', dim: 'D5', text: '在家躺平 vs 出去浪，你选？', options: [
    { label: '在家躺平，舒服', value: 1 },
    { label: '看心情', value: 2 },
    { label: '出去浪，世界那么大', value: 3 }
  ]},

  // D6 华盖感应 - 选择困境
  { id: 'q66', dim: 'D6', text: '孤独但自由 vs 热闹但束缚，你选？', options: [
    { label: '热闹但束缚，人需要社交', value: 1 },
    { label: '看情况', value: 2 },
    { label: '孤独但自由，独处是我的充电方式', value: 3 }
  ]},

  // D7 食神能量 - 选择困境
  { id: 'q67', dim: 'D7', text: '好看但不好吃 vs 好吃但不好看，你选？', options: [
    { label: '好看但不好吃，颜值即正义', value: 1 },
    { label: '都想要', value: 2 },
    { label: '好吃但不好吃，味道最重要', value: 3 }
  ]},

  // D8 伤官能量 - 选择困境
  { id: 'q68', dim: 'D8', text: '说真话得罪人 vs 说假话讨好人，你选？', options: [
    { label: '说假话，和气生财', value: 1 },
    { label: '看情况', value: 2 },
    { label: '说真话，爱听不听', value: 3 }
  ]},

  // D9 比肩能量 - 选择困境
  { id: 'q69', dim: 'D9', text: '当鸡头 vs 当凤尾，你选？', options: [
    { label: '当凤尾，跟着厉害的人学习', value: 1 },
    { label: '看情况', value: 2 },
    { label: '当鸡头，宁做鸡头不做凤尾', value: 3 }
  ]},

  // D10 金气 - 选择困境
  { id: 'q70', dim: 'D10', text: '完美但拖延 vs 完成但粗糙，你选？', options: [
    { label: '完美但拖延，宁缺毋滥', value: 1 },
    { label: '看情况', value: 2 },
    { label: '完成但粗糙，先完成再完美', value: 3 }
  ]},

  // D11 木气 - 选择困境
  { id: 'q71', dim: 'D11', text: '稳定但无聊 vs 刺激但冒险，你选？', options: [
    { label: '稳定但无聊，安稳最重要', value: 1 },
    { label: '看情况', value: 2 },
    { label: '刺激但冒险，人生需要冒险', value: 3 }
  ]},

  // D12 水气 - 选择困境
  { id: 'q72', dim: 'D12', text: '被所有人喜欢 vs 被一个人真正理解，你选？', options: [
    { label: '被所有人喜欢', value: 1 },
    { label: '都想要', value: 2 },
    { label: '被一个人真正理解', value: 3 }
  ]},

  // D13 火气 - 选择困境
  { id: 'q73', dim: 'D13', text: '热情但短暂 vs 冷淡但持久，你选？', options: [
    { label: '冷淡但持久，细水长流', value: 1 },
    { label: '看情况', value: 2 },
    { label: '热情但短暂，燃烧总比冰冷好', value: 3 }
  ]},

  // D14 土气 - 选择困境
  { id: 'q74', dim: 'D14', text: '一步到位 vs 慢慢来，你选？', options: [
    { label: '一步到位，效率优先', value: 1 },
    { label: '看情况', value: 2 },
    { label: '慢慢来，稳扎稳打', value: 3 }
  ]},

  // D15 宿命感 - 选择困境
  { id: 'q75', dim: 'D15', text: '知道未来但不能改变 vs 不知道未来但可以创造，你选？', options: [
    { label: '知道未来但不能改变，至少心里有数', value: 1 },
    { label: '都想要', value: 2 },
    { label: '不知道未来但可以创造，人生才有惊喜', value: 3 }
  ]},

  // ═══════════════════════════════════════
  // 扩充题目 - 五行直接相关
  // ═══════════════════════════════════════

  // D10 金 - 决断、刚毅
  { id: 'q76', dim: 'D10', text: '你更喜欢哪种金属质感？', options: [
    { label: '银色，低调内敛', value: 1 },
    { label: '金色，经典大气', value: 2 },
    { label: '钢铁色，硬核刚毅', value: 3 }
  ]},

  { id: 'q77', dim: 'D10', text: '你做决定时更相信？', options: [
    { label: '直觉，感觉对就对', value: 1 },
    { label: '分析，数据说话', value: 2 },
    { label: '果断，想了就做', value: 3 }
  ]},

  // D11 木 - 成长、生机
  { id: 'q78', dim: 'D11', text: '你更喜欢哪种植物？', options: [
    { label: '仙人掌，好养活', value: 1 },
    { label: '绿萝，生机勃勃', value: 2 },
    { label: '多肉，慢慢长大很有成就感', value: 3 }
  ]},

  { id: 'q79', dim: 'D11', text: '你对"成长"的态度是？', options: [
    { label: '顺其自然，该长就长', value: 1 },
    { label: '需要阳光雨露，慢慢来', value: 2 },
    { label: '拼命向上，冲破天花板', value: 3 }
  ]},

  // D12 水 - 智慧、灵动
  { id: 'q80', dim: 'D12', text: '你更喜欢哪种水？', options: [
    { label: '山间小溪，清澈见底', value: 1 },
    { label: '大海，深不可测', value: 2 },
    { label: '雨滴，灵动自由', value: 3 }
  ]},

  { id: 'q81', dim: 'D12', text: '你处理问题的方式更像？', options: [
    { label: '滴水穿石，慢慢磨', value: 1 },
    { label: '随波逐流，见机行事', value: 2 },
    { label: '洪水猛兽，直接冲', value: 3 }
  ]},

  // D13 火 - 热情、表达
  { id: 'q82', dim: 'D13', text: '你更喜欢哪种火？', options: [
    { label: '烛光，温暖浪漫', value: 1 },
    { label: '篝火，热闹欢聚', value: 2 },
    { label: '烈火，激情燃烧', value: 3 }
  ]},

  { id: 'q83', dim: 'D13', text: '你的热情更像？', options: [
    { label: '壁炉，持续稳定', value: 1 },
    { label: '烟花，绚烂短暂', value: 2 },
    { label: '野火，燎原之势', value: 3 }
  ]},

  // D14 土 - 稳定、包容
  { id: 'q84', dim: 'D14', text: '你更喜欢哪种土？', options: [
    { label: '黑土，肥沃滋养', value: 1 },
    { label: '黄土，厚重踏实', value: 2 },
    { label: '沙土，自由流动', value: 3 }
  ]},

  { id: 'q85', dim: 'D14', text: '你的性格更像？', options: [
    { label: '大树，扎根深处', value: 1 },
    { label: '磐石，岿然不动', value: 2 },
    { label: '流水，随遇而安', value: 3 }
  ]},

  // D15 宿命感 - 玄学
  { id: 'q86', dim: 'D15', text: '你对"前世今生"的态度是？', options: [
    { label: '不信，人死如灯灭', value: 1 },
    { label: '觉得有可能', value: 2 },
    { label: '信，我梦到过前世', value: 3 }
  ]},

  { id: 'q87', dim: 'D15', text: '你相信"第六感"吗？', options: [
    { label: '不信，那是错觉', value: 1 },
    { label: '偶尔会有', value: 2 },
    { label: '经常，准到离谱', value: 3 }
  ]}
];

// ═══════════════════════════════════════
// 第二阶段：针对性轮 (60题，按方向分组)
// 每个方向 10 题，引擎按方向优先选15题
// ═══════════════════════════════════════
const TARGETED_QUESTIONS = {
  // ── 帝王/将军/事业方向 ──
  leader: [
    { id: 't1', dim: 'D1', text: '团队项目搞砸了，你的第一反应是？', options: [
      { label: '不是我的问题，我早说过了', value: 1 },
      { label: '先复盘，看看哪里出了问题', value: 2 },
      { label: '站出来扛，然后重新分配任务', value: 3 }
    ]},
    { id: 't2', dim: 'D1', text: '你出门旅游，行程安排谁做？', options: [
      { label: '跟我有什么关系，你们定就好', value: 1 },
      { label: '大家一起商量呗', value: 2 },
      { label: '我来，你们跟着就行，别乱跑', value: 3 }
    ]},
    { id: 't3', dim: 'D1', text: '遇到不公平的事，你会？', options: [
      { label: '忍忍算了，别惹事', value: 1 },
      { label: '会吐槽，但不一定行动', value: 2 },
      { label: '必须站出来理论清楚', value: 3 }
    ]},
    { id: 't4', dim: 'D9', text: '你和朋友意见不同的时候你会？', options: [
      { label: '听他的，别伤和气', value: 1 },
      { label: '各退一步，找折中方案', value: 2 },
      { label: '不行，我才是对的', value: 3 }
    ]},
    { id: 't5', dim: 'D8', text: '你觉得"规矩"这种东西是？', options: [
      { label: '必须遵守的，没规矩不成方圆', value: 1 },
      { label: '大部分时候要遵守', value: 2 },
      { label: '规矩是用来打破的', value: 3 }
    ]},
    { id: 't6', dim: 'D1', text: '别人请你帮忙做决定时，你会？', options: [
      { label: '你们自己定吧，我选不好', value: 1 },
      { label: '给建议，但让他们自己决定', value: 2 },
      { label: '直接拍板，听我的', value: 3 }
    ]},
    { id: 't7', dim: 'D9', text: '你会主动和别人竞争吗？', options: [
      { label: '不会，不想争', value: 1 },
      { label: '看情况，值得就争', value: 2 },
      { label: '会，竞争让我兴奋', value: 3 }
    ]},
    { id: 't8', dim: 'D10', text: '你和别人吵架的时候会？', options: [
      { label: '哭了，吵不过', value: 1 },
      { label: '冷静讲道理', value: 2 },
      { label: '气势上先压住对方', value: 3 }
    ]},
    { id: 't9', dim: 'D1', text: '开会的时候你通常会？', options: [
      { label: '坐在角落，希望别叫我', value: 1 },
      { label: '有想法就说，没想法就听', value: 2 },
      { label: '主导讨论，把控节奏', value: 3 }
    ]}
  ],

  // ── 文人/学霸/术士方向 ──
  thinker: [
    { id: 't10', dim: 'D3', text: '你刷到一个"震惊！XXX竟然是真的"的视频，你会？', options: [
      { label: '划走，又是标题党', value: 1 },
      { label: '点进去看看，但保持怀疑', value: 2 },
      { label: '反复观看，截图转发给三个人', value: 3 }
    ]},
    { id: 't11', dim: 'D6', text: '你更喜欢独处还是社交？', options: [
      { label: '社交，一个人太无聊', value: 1 },
      { label: '都可以，看心情', value: 2 },
      { label: '独处，一个人很舒服', value: 3 }
    ]},
    { id: 't12', dim: 'D3', text: '你觉得学历重要吗？', options: [
      { label: '不重要，能力说话', value: 1 },
      { label: '有点用，但不是全部', value: 2 },
      { label: '重要，知识改变命运', value: 3 }
    ]},
    { id: 't13', dim: 'D6', text: '别人觉得你"想太多"吗？', options: [
      { label: '不会，我很简单', value: 1 },
      { label: '偶尔会', value: 2 },
      { label: '经常，我确实想很多', value: 3 }
    ]},
    { id: 't14', dim: 'D3', text: '有人给你推荐一本书，你会？', options: [
      { label: '恩恩，回头再说', value: 1 },
      { label: '可能会看，放在书架上', value: 2 },
      { label: '马上翻开看', value: 3 }
    ]},
    { id: 't15', dim: 'D6', text: '你一个人在家的时候会干嘛？', options: [
      { label: '打电话叫朋友来', value: 1 },
      { label: '看看剧，刷刷手机', value: 2 },
      { label: '发呆，想事情，一个人也很充实', value: 3 }
    ]},
    { id: 't16', dim: 'D3', text: '你最近一次学新东西是什么时候？', options: [
      { label: '记不清了，不需要学', value: 1 },
      { label: '上个月吧', value: 2 },
      { label: '上周，我还做了笔记', value: 3 }
    ]},
    { id: 't17', dim: 'D6', text: '你对塔罗牌/星盘/八字的态度是？', options: [
      { label: '纯娱乐，别当真', value: 1 },
      { label: '有点意思，偶尔玩玩', value: 2 },
      { label: '我已经研究三年了', value: 3 }
    ]},
    { id: 't18', dim: 'D3', text: '遇到不懂的事，你会？', options: [
      { label: '算了，不感兴趣', value: 1 },
      { label: '百度一下，大概了解', value: 2 },
      { label: '追根究底，必须搞懂', value: 3 }
    ]}
  ],

  // ── 商贾/富贵/老板方向 ──
  wealth: [
    { id: 't19', dim: 'D2', text: '你路上捡到100块钱，你会？', options: [
      { label: '交给警察叔叔（如果有的话）', value: 1 },
      { label: '犹豫三秒然后揣兜里', value: 2 },
      { label: '这钱本来就是我的，谢谢老天爷', value: 3 }
    ]},
    { id: 't20', dim: 'D2', text: '有人给你两个offer，你会选？', options: [
      { label: '稳定的那个，五险一金交齐', value: 1 },
      { label: '差不多就去，看哪个离家近', value: 2 },
      { label: '钱多的那个，其他的再说', value: 3 }
    ]},
    { id: 't21', dim: 'D2', text: '朋友找你借钱，你会？', options: [
      { label: '不借，亲兄弟明算账', value: 1 },
      { label: '看金额和关系，小额可以', value: 2 },
      { label: '能帮就帮，钱是身外之物', value: 3 }
    ]},
    { id: 't22', dim: 'D9', text: '你觉得赚钱最重要的是？', options: [
      { label: '稳定就好，够用就行', value: 1 },
      { label: '有机会就抓住', value: 2 },
      { label: '不惜一切代价搞钱', value: 3 }
    ]},
    { id: 't23', dim: 'D2', text: '你的消费习惯是？', options: [
      { label: '记账，每笔都记得', value: 1 },
      { label: '大方向控制，小钱随意', value: 2 },
      { label: '看心情，开心就买', value: 3 }
    ]},
    { id: 't24', dim: 'D2', text: '你对"财务自由"的态度是？', options: [
      { label: '跟我没关系，过好当下', value: 1 },
      { label: '在努力，但不焦虑', value: 2 },
      { label: '这是我的人生目标', value: 3 }
    ]},
    { id: 't25', dim: 'D2', text: '朋友聚会你通常是？', options: [
      { label: '能不去就不去，省钱', value: 1 },
      { label: '偶尔参加，AA就行', value: 2 },
      { label: '经常组织，我请客', value: 3 }
    ]},
    { id: 't26', dim: 'D10', text: '你做投资吗？', options: [
      { label: '不碰，风险太大', value: 1 },
      { label: '小试牛刀，亏了不心疼', value: 2 },
      { label: '认真研究，理性投资', value: 3 }
    ]}
  ],

  // ── 桃花/魅力方向 ──
  charm: [
    { id: 't27', dim: 'D4', text: '你走在路上会被人多看几眼吗？', options: [
      { label: '从来没注意过', value: 1 },
      { label: '偶尔吧，可能看我穿搭', value: 2 },
      { label: '经常，我已经习惯了', value: 3 }
    ]},
    { id: 't28', dim: 'D4', text: '你的朋友圈点赞评论多吗？', options: [
      { label: '很少，发了也没人看', value: 1 },
      { label: '还行，有几个固定互动的', value: 2 },
      { label: '每条都很多，我是社交达人', value: 3 }
    ]},
    { id: 't29', dim: 'D4', text: '初次见面的人通常怎么形容你？', options: [
      { label: '安静、不太说话', value: 1 },
      { label: '还行，挺好相处的', value: 2 },
      { label: '有魅力、想继续认识', value: 3 }
    ]},
    { id: 't30', dim: 'D7', text: '你做饭的时候会？', options: [
      { label: '外卖就是我的厨房', value: 1 },
      { label: '简单炒个菜还行', value: 2 },
      { label: '摆盘拍照修图发朋友圈，一气呵成', value: 3 }
    ]},
    { id: 't31', dim: 'D13', text: '你朋友觉得你是什么样的人？', options: [
      { label: '高冷，不太容易接近', value: 1 },
      { label: '还行，挺好相处', value: 2 },
      { label: '社牛，到哪都是焦点', value: 3 }
    ]},
    { id: 't32', dim: 'D4', text: '你微信签名多久换一次？', options: [
      { label: '没签名，空着', value: 1 },
      { label: '几个月换一次，看心情', value: 2 },
      { label: '隔三差五就换，情绪都写脸上', value: 3 }
    ]},
    { id: 't33', dim: 'D4', text: '你收到过多少次"你好好看"的夸奖？', options: [
      { label: '从没有过', value: 1 },
      { label: '偶尔有', value: 2 },
      { label: '经常，我已经免疫了', value: 3 }
    ]},
    { id: 't34', dim: 'D7', text: '你有什么特别的爱好吗？', options: [
      { label: '没有特别的', value: 1 },
      { label: '有几个，但不算精通', value: 2 },
      { label: '有，而且我很投入', value: 3 }
    ]}
  ],

  // ── 流浪/驿马方向 ──
  wanderer: [
    { id: 't35', dim: 'D5', text: '你多久换一次工作/环境？', options: [
      { label: '很少换，稳定最重要', value: 1 },
      { label: '一两年会考虑动一下', value: 2 },
      { label: '经常换，喜欢新鲜感', value: 3 }
    ]},
    { id: 't36', dim: 'D5', text: '你会经常想去外地/出国吗？', options: [
      { label: '不会，家在哪里我就在哪', value: 1 },
      { label: '偶尔想去，但懒得折腾', value: 2 },
      { label: '天生就想浪，待不住', value: 3 }
    ]},
    { id: 't37', dim: 'D5', text: '你搬家的频率大概是？', options: [
      { label: '几年才搬一次', value: 1 },
      { label: '一两年换一次', value: 2 },
      { label: '经常搬，租约到了就想换', value: 3 }
    ]},
    { id: 't38', dim: 'D5', text: '你梦到过自己在别的城市/国家吗？', options: [
      { label: '没有，做梦都在家躺着', value: 1 },
      { label: '偶尔梦到', value: 2 },
      { label: '经常，醒来还想再睡回去', value: 3 }
    ]},
    { id: 't39', dim: 'D5', text: '你周末最想干嘛？', options: [
      { label: '约朋友出去浪', value: 1 },
      { label: '在家躺平刷剧', value: 2 },
      { label: '一个人待着，谁也别来找我', value: 3 }
    ]},
    { id: 't40', dim: 'D5', text: '你对"诗和远方"的态度是？', options: [
      { label: '先把眼前的苟且过好', value: 1 },
      { label: '偶尔想想，但不会真的去', value: 2 },
      { label: '这就是我的人生信条', value: 3 }
    ]},
    { id: 't41', dim: 'D5', text: '你的微信运动步数通常是？', options: [
      { label: '几百步，出门全靠车', value: 1 },
      { label: '几千步，正常活动量', value: 2 },
      { label: '一两万步起步，走路是我的爱好', value: 3 }
    ]},
    { id: 't42', dim: 'D5', text: '你有"说走就走"的经历吗？', options: [
      { label: '没有，我连外卖都要纠结半小时', value: 1 },
      { label: '有过一两次', value: 2 },
      { label: '经常，想到就去做', value: 3 }
    ]}
  ],

  // ── 普通/均衡方向 ──
  balanced: [
    { id: 't43', dim: 'D11', text: '你对新事物的态度是？', options: [
      { label: '抗拒，旧的挺好', value: 1 },
      { label: '会尝试，但需要理由', value: 2 },
      { label: '好奇，什么都想试试', value: 3 }
    ]},
    { id: 't44', dim: 'D13', text: '你生气时会？', options: [
      { label: '冷处理，不理人', value: 1 },
      { label: '会说，但不会太激烈', value: 2 },
      { label: '爆发出来，谁也拦不住', value: 3 }
    ]},
    { id: 't45', dim: 'D14', text: '你做事的风格是？', options: [
      { label: '随缘，想到什么做什么', value: 1 },
      { label: '有计划，但也会灵活调整', value: 2 },
      { label: '稳扎稳打，一步一个脚印', value: 3 }
    ]},
    { id: 't46', dim: 'D12', text: '你生气的时候会？', options: [
      { label: '发火，谁都拦不住', value: 1 },
      { label: '说出来，但不会太激烈', value: 2 },
      { label: '不说话，冷处理', value: 3 }
    ]},
    { id: 't47', dim: 'D10', text: '你手机壳是？', options: [
      { label: '没壳，裸奔', value: 1 },
      { label: '透明壳，简单就好', value: 2 },
      { label: '很硬的那种，摔了手机没事', value: 3 }
    ]},
    { id: 't48', dim: 'D14', text: '你的房间现在是？', options: [
      { label: '有点乱，但我知道东西在哪', value: 1 },
      { label: '还算整洁，偶尔收拾', value: 2 },
      { label: '一尘不染，物品归位强迫症', value: 3 }
    ]},
    { id: 't49', dim: 'D14', text: '你吃饭的口味是？', options: [
      { label: '什么都吃，不挑', value: 1 },
      { label: '有偏好，但不极端', value: 2 },
      { label: '固定那几样，换了就难受', value: 3 }
    ]},
    { id: 't50', dim: 'D13', text: '你收到惊喜的时候会？', options: [
      { label: '面无表情，内心毫无波动', value: 1 },
      { label: '谢谢，挺开心的', value: 2 },
      { label: '尖叫！然后发九宫格朋友圈', value: 3 }
    ]}
  ]
};

// ═══════════════════════════════════════
// 第三阶段：决胜轮 (45题，针对模糊维度)
// ═══════════════════════════════════════
const TIEBREAKER_QUESTIONS = [
  { id: 'u1', dim: 'D1', text: '你出门旅游通常会？', options: [
    { label: '跟团，省心', value: 1 },
    { label: '做攻略但不完全按计划走', value: 2 },
    { label: '随心所欲，走到哪算哪', value: 3 }
  ]},
  { id: 'u2', dim: 'D2', text: '你的支付宝年度账单你敢看吗？', options: [
    { label: '不敢，怕受打击', value: 1 },
    { label: '看了看，还行', value: 2 },
    { label: '看完了还截图发朋友圈', value: 3 }
  ]},
  { id: 'u3', dim: 'D3', text: '你的收藏夹里有多少内容？', options: [
    { label: '几乎没有', value: 1 },
    { label: '几十条', value: 2 },
    { label: '几百条，够我看一辈子', value: 3 }
  ]},
  { id: 'u4', dim: 'D4', text: '你最害怕的社交场景是？', options: [
    { label: '一群人不认识的聚会', value: 1 },
    { label: '上台演讲/表演', value: 2 },
    { label: '没有，我社牛', value: 3 }
  ]},
  { id: 'u5', dim: 'D5', text: '你的地图APP收藏了多少地点？', options: [
    { label: '0个，我从不收藏', value: 1 },
    { label: '几个常去的', value: 2 },
    { label: '几十个，全国各地都有', value: 3 }
  ]},
  { id: 'u6', dim: 'D6', text: '你有没有过"这个世界是假的"的想法？', options: [
    { label: '没有，现实就是现实', value: 1 },
    { label: '偶尔闪过这个念头', value: 2 },
    { label: '我认真怀疑过，还查了资料', value: 3 }
  ]},
  { id: 'u7', dim: 'D7', text: '你的手机壁纸多久换一次？', options: [
    { label: '从不换，出厂设置', value: 1 },
    { label: '偶尔换', value: 2 },
    { label: '每周都换，审美不能掉线', value: 3 }
  ]},
  { id: 'u8', dim: 'D8', text: '你做过最"叛逆"的事是？', options: [
    { label: '没什么叛逆的', value: 1 },
    { label: '顶过几句嘴', value: 2 },
    { label: '大事上自己做主，不听父母的', value: 3 }
  ]},
  { id: 'u9', dim: 'D9', text: '你的朋友圈背景图是什么？', options: [
    { label: '默认的/没有', value: 1 },
    { label: '风景/宠物', value: 2 },
    { label: '自己精心拍的照片', value: 3 }
  ]},
  { id: 'u10', dim: 'D10', text: '你出门前会花多长时间准备？', options: [
    { label: '十分钟内搞定', value: 1 },
    { label: '半小时左右', value: 2 },
    { label: '一小时以上，要确保完美', value: 3 }
  ]},
  { id: 'u11', dim: 'D11', text: '你最近在追什么剧/综艺？', options: [
    { label: '不追剧', value: 1 },
    { label: '有一部在看', value: 2 },
    { label: '同时追好几部', value: 3 }
  ]},
  { id: 'u12', dim: 'D12', text: '别人第一次见你觉得你是什么性格？', options: [
    { label: '外向，很能聊', value: 1 },
    { label: '还好，正常人', value: 2 },
    { label: '高冷，不太好接近', value: 3 }
  ]},
  { id: 'u13', dim: 'D13', text: '你最常发的表情包是？', options: [
    { label: '不发表情包', value: 1 },
    { label: '就那几个常用的', value: 2 },
    { label: '每天都在发明新的', value: 3 }
  ]},
  { id: 'u14', dim: 'D14', text: '你的闹钟设了几个？', options: [
    { label: '0个，自然醒', value: 1 },
    { label: '1个就够', value: 2 },
    { label: '五六个，每隔五分钟一个', value: 3 }
  ]},
  { id: 'u15', dim: 'D15', text: '你经历过"巧合"吗？比如刚想到某人就联系你了？', options: [
    { label: '没有过，我生活很无聊', value: 1 },
    { label: '偶尔有', value: 2 },
    { label: '经常有，我觉得我在被监控', value: 3 }
  ]},
  { id: 'u16', dim: 'D1', text: '朋友聚会你通常是？', options: [
    { label: '能不去就不去', value: 1 },
    { label: '看心情，想去就去', value: 2 },
    { label: '每次都到，气氛担当', value: 3 }
  ]},
  { id: 'u17', dim: 'D2', text: '你对"薅羊毛"的态度是？', options: [
    { label: '不屑于，浪费时间', value: 1 },
    { label: '遇到了就顺便', value: 2 },
    { label: '精通各种优惠，从不原价买', value: 3 }
  ]},
  { id: 'u18', dim: 'D3', text: '你看书/看视频会做笔记吗？', options: [
    { label: '不会，看完就忘', value: 1 },
    { label: '偶尔会', value: 2 },
    { label: '每次都会，笔记比内容还长', value: 3 }
  ]},
  { id: 'u19', dim: 'D4', text: '你的社交圈大概有多少人？', options: [
    { label: '十个以内，精简', value: 1 },
    { label: '几十个', value: 2 },
    { label: '上百个，认识的人遍布各行各业', value: 3 }
  ]},
  { id: 'u20', dim: 'D5', text: '你对"稳定"这个词的态度是？', options: [
    { label: '这是我追求的', value: 1 },
    { label: '挺好的，但不是唯一追求', value: 2 },
    { label: '稳定等于无聊', value: 3 }
  ]},
  { id: 'u21', dim: 'D6', text: '你相信"平行世界"吗？', options: [
    { label: '不信，没科学依据', value: 1 },
    { label: '觉得有可能', value: 2 },
    { label: '坚信，另一个我可能过得更好', value: 3 }
  ]},
  { id: 'u22', dim: 'D7', text: '你最擅长什么？', options: [
    { label: '没什么特别擅长的', value: 1 },
    { label: '有一两个还算拿手', value: 2 },
    { label: '我能列出一个很长的清单', value: 3 }
  ]},
  { id: 'u23', dim: 'D8', text: '你对"内卷"的态度是？', options: [
    { label: '卷就卷呗，没办法', value: 1 },
    { label: '偶尔卷一下', value: 2 },
    { label: '拒绝内卷，我有我自己的节奏', value: 3 }
  ]},
  { id: 'u24', dim: 'D9', text: '你打游戏会充钱吗？', options: [
    { label: '绝不，白嫖党', value: 1 },
    { label: '偶尔买个月卡', value: 2 },
    { label: '为了皮肤/装备不眨眼', value: 3 }
  ]},
  { id: 'u25', dim: 'D10', text: '你的手机电量低于多少会焦虑？', options: [
    { label: '低于50%就开始找充电器', value: 1 },
    { label: '低于20%', value: 2 },
    { label: '关机了才想起来', value: 3 }
  ]},
  { id: 'u26', dim: 'D11', text: '你最近在学什么新技能？', options: [
    { label: '没有，不想学', value: 1 },
    { label: '有一个想学但还没开始', value: 2 },
    { label: '同时在学两三个', value: 3 }
  ]},
  { id: 'u27', dim: 'D12', text: '你和前任还有联系吗？', options: [
    { label: '早删了，断得干干净净', value: 1 },
    { label: '偶尔朋友圈点赞', value: 2 },
    { label: '还是朋友，偶尔聊天', value: 3 }
  ]},
  { id: 'u28', dim: 'D13', text: '你最常用的APP是什么？', options: [
    { label: '微信', value: 1 },
    { label: '抖音/小红书', value: 2 },
    { label: 'B站/游戏', value: 3 }
  ]},
  { id: 'u29', dim: 'D14', text: '你对未来五年的规划是？', options: [
    { label: '没有规划，走一步看一步', value: 1 },
    { label: '有大方向，但不具体', value: 2 },
    { label: '详细规划到每一年', value: 3 }
  ]},
  { id: 'u30', dim: 'D15', text: '你相信"吸引力法则"吗？', options: [
    { label: '不信，那是鸡汤', value: 1 },
    { label: '半信半疑', value: 2 },
    { label: '信，我经常用', value: 3 }
  ]},

  // ═══════════════════════════════════════
  // 扩充决胜轮 - 社会现象
  // ═══════════════════════════════════════

  { id: 'u31', dim: 'D1', text: '你在团队中通常是什么角色？', options: [
    { label: '执行者，做好自己的事', value: 1 },
    { label: '协调者，帮助大家沟通', value: 2 },
    { label: '领导者，把控全局', value: 3 }
  ]},

  { id: 'u32', dim: 'D2', text: '你对"搞钱"的态度是？', options: [
    { label: '够用就行，不想太累', value: 1 },
    { label: '有机会就抓住', value: 2 },
    { label: '不惜一切代价搞钱', value: 3 }
  ]},

  { id: 'u33', dim: 'D3', text: '你对"信息茧房"的态度是？', options: [
    { label: '不知道是什么', value: 1 },
    { label: '听说过，可能有点', value: 2 },
    { label: '很警惕，会主动打破', value: 3 }
  ]},

  { id: 'u34', dim: 'D4', text: '你觉得"社恐"是真的还是装的？', options: [
    { label: '大部分是装的', value: 1 },
    { label: '有些是真的', value: 2 },
    { label: '真的，我就是', value: 3 }
  ]},

  { id: 'u35', dim: 'D5', text: '你对"gap year"的态度是？', options: [
    { label: '浪费时间，简历不好看', value: 1 },
    { label: '有条件的话可以', value: 2 },
    { label: '人生必须有一次', value: 3 }
  ]},

  { id: 'u36', dim: 'D6', text: '你对"冥想"的态度是？', options: [
    { label: '没试过，感觉很玄', value: 1 },
    { label: '试过，但坐不住', value: 2 },
    { label: '每天都在做', value: 3 }
  ]},

  { id: 'u37', dim: 'D7', text: '你对"美食探店"的态度是？', options: [
    { label: '不去，都是营销', value: 1 },
    { label: '偶尔去', value: 2 },
    { label: '每家新开的都要去', value: 3 }
  ]},

  { id: 'u38', dim: 'D8', text: '你对"杠精"的态度是？', options: [
    { label: '烦死了，别来烦我', value: 1 },
    { label: '看情况', value: 2 },
    { label: '我就是杠精本精', value: 3 }
  ]},

  { id: 'u39', dim: 'D9', text: '你对"独处"的态度是？', options: [
    { label: '受不了，太无聊了', value: 1 },
    { label: '偶尔可以', value: 2 },
    { label: '享受，一个人很舒服', value: 3 }
  ]},

  { id: 'u40', dim: 'D10', text: '你对"执行力"的态度是？', options: [
    { label: '想太多，做太少', value: 1 },
    { label: '还可以', value: 2 },
    { label: '想到就做，绝不拖延', value: 3 }
  ]},

  { id: 'u41', dim: 'D11', text: '你对"终身学习"的态度是？', options: [
    { label: '太累了，不想学', value: 1 },
    { label: '认同，但很难坚持', value: 2 },
    { label: '一直在学，停不下来', value: 3 }
  ]},

  { id: 'u42', dim: 'D12', text: '你对"情绪价值"的态度是？', options: [
    { label: '不重要，实力说话', value: 1 },
    { label: '有点重要', value: 2 },
    { label: '非常重要，情绪稳定最重要', value: 3 }
  ]},

  { id: 'u43', dim: 'D13', text: '你对"社交货币"的态度是？', options: [
    { label: '不知道是什么', value: 1 },
    { label: '听说过', value: 2 },
    { label: '很懂，会经营', value: 3 }
  ]},

  { id: 'u44', dim: 'D14', text: '你对"延迟满足"的态度是？', options: [
    { label: '及时行乐，活在当下', value: 1 },
    { label: '看情况', value: 2 },
    { label: '能忍，为了更大的回报', value: 3 }
  ]},

  { id: 'u45', dim: 'D15', text: '你对"命运"的态度是？', options: [
    { label: '不信，我命由我不由天', value: 1 },
    { label: '半信半疑', value: 2 },
    { label: '信，该来的总会来', value: 3 }
  ]}
];
