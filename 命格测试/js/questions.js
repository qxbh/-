/**
 * 玄学人格测试 - 题库 (55题生活场景版)
 * 每题主测1个参数，副测1-2个参数
 * 选项口语化，像人话
 */

const QUESTIONS = [
  // ═══════════════════════════════════════
  // D1 气场主导 (4题)
  // ═══════════════════════════════════════
  {
    id: 'q1', mainDim: 'D1', subDims: ['D2', 'D6'],
    text: '朋友聚餐选餐厅，大家都说"随便"，你通常会：',
    options: [
      { label: '已经打开收藏夹开始排雷，顺便安排路线', value: 3 },
      { label: '让别人先选，我负责最后点头', value: 2 },
      { label: '真的随便，能吃就行', value: 1 }
    ]
  },
  {
    id: 'q2', mainDim: 'D1', subDims: ['D3', 'D14'],
    text: '小组讨论没人先开口，沉默了30秒，你会：',
    options: [
      { label: '直接开麦：我先说吧，我有个想法', value: 3 },
      { label: '等一等，看看有没有人先说', value: 2 },
      { label: '低头玩手机，别叫我', value: 1 }
    ]
  },
  {
    id: 'q3', mainDim: 'D1', subDims: ['D8', 'D15'],
    text: '两个朋友吵架让你评理，你会：',
    options: [
      { label: '直接站队：我觉得A说得对', value: 3 },
      { label: '两边都安抚：你们都有道理', value: 2 },
      { label: '假装没看见，这锅我不背', value: 1 }
    ]
  },
  {
    id: 'q4', mainDim: 'D1', subDims: ['D14', 'D15'],
    text: '排队被人插队了，你会：',
    options: [
      { label: '直接说：同学，排队', value: 3 },
      { label: '小声嘀咕，但不太敢说', value: 2 },
      { label: '算了，多一事不如少一事', value: 1 }
    ]
  },

  // ═══════════════════════════════════════
  // D2 行动力 (4题)
  // ═══════════════════════════════════════
  {
    id: 'q5', mainDim: 'D2', subDims: ['D9', 'D16'],
    text: '刷到一个特价机票，明天就能飞，你会：',
    options: [
      { label: '马上打开日历看有没有假', value: 3 },
      { label: '先收藏，回头再看看', value: 2 },
      { label: '看看就好，太突然了', value: 1 }
    ]
  },
  {
    id: 'q6', mainDim: 'D2', subDims: ['D13', 'D3'],
    text: '突然想健身，你会：',
    options: [
      { label: '今晚就去夜跑', value: 3 },
      { label: '先研究一下哪个健身房好', value: 2 },
      { label: '办卡再说，反正也不一定会去', value: 1 }
    ]
  },
  {
    id: 'q7', mainDim: 'D2', subDims: ['D13', 'D4'],
    text: '深夜突然特别想吃烧烤，你会：',
    options: [
      { label: '穿上衣服就出门', value: 3 },
      { label: '看看外卖，能送就点', value: 2 },
      { label: '忍忍，睡着就不饿了', value: 1 }
    ]
  },
  {
    id: 'q8', mainDim: 'D2', subDims: ['D9', 'D6'],
    text: '朋友临时约你出去玩，但你已经在床上了，你会：',
    options: [
      { label: '走起，今晚爽了再说', value: 3 },
      { label: '问清楚去哪，再决定', value: 2 },
      { label: '不去了，明天再约', value: 1 }
    ]
  },

  // ═══════════════════════════════════════
  // D3 事业目标 (4题)
  // ═══════════════════════════════════════
  {
    id: 'q9', mainDim: 'D3', subDims: ['D16', 'D14'],
    text: '领导临下班突然丢来一个"很简单"的活，你第一反应是：',
    options: [
      { label: '先在心里骂三分钟，然后开始燃烧自己', value: 3 },
      { label: '问清楚优先级，能做就做，不能做就明天', value: 2 },
      { label: '直接判断边界：这个今天不该我背', value: 1 }
    ]
  },
  {
    id: 'q10', mainDim: 'D3', subDims: ['D4', 'D2'],
    text: '拿到两个offer，一个钱多但累，一个轻松但钱少，你会：',
    options: [
      { label: '钱多的那个，趁年轻先搞钱', value: 3 },
      { label: '纠结三天三夜，还没想好', value: 2 },
      { label: '轻松的那个，命比钱重要', value: 1 }
    ]
  },
  {
    id: 'q11', mainDim: 'D3', subDims: ['D9', 'D14'],
    text: '周一早上醒来，想到要上班，你会：',
    options: [
      { label: '打开招聘APP看看机会', value: 3 },
      { label: '叹口气，还是爬起来了', value: 2 },
      { label: '习惯了，没什么感觉', value: 1 }
    ]
  },
  {
    id: 'q12', mainDim: 'D3', subDims: ['D16', 'D5'],
    text: '你半夜还在和AI来回拉扯一份方案，已经改到第三版了，但明早还要交。此时你更像：',
    options: [
      { label: '先拖着，再磨一会儿，说不定灵感自己来', value: 1 },
      { label: '边崩溃边改，嘴上骂骂咧咧手上继续补', value: 2 },
      { label: '迅速定方案，能交付比完美更重要', value: 3 }
    ]
  },

  // ═══════════════════════════════════════
  // D4 财帛敏感 (3题)
  // ═══════════════════════════════════════
  {
    id: 'q13', mainDim: 'D4', subDims: ['D2', 'D13'],
    text: '你买一个贵东西前，最容易被什么说服？',
    options: [
      { label: '喜欢就买，人生苦短', value: 3 },
      { label: '先纠结，再找优惠券，再说服自己', value: 2 },
      { label: '保值吗？用得上吗？买完会后悔吗？', value: 1 }
    ]
  },
  {
    id: 'q14', mainDim: 'D4', subDims: ['D8', 'D15'],
    text: '好朋友找你借2000块钱，你会：',
    options: [
      { label: '直接转，朋友嘛', value: 3 },
      { label: '问清楚干嘛用，再决定', value: 2 },
      { label: '最近手头也紧，不好意思', value: 1 }
    ]
  },
  {
    id: 'q15', mainDim: 'D4', subDims: ['D11', 'D12'],
    text: '刷到同龄人晒offer、晒旅行、晒对象时，你内心更接近哪句？',
    options: [
      { label: '我这号算是练废了', value: 3 },
      { label: '酸一下，但也就那样', value: 2 },
      { label: '挺好，各有各的剧本', value: 1 }
    ]
  },

  // ═══════════════════════════════════════
  // D5 文昌思考 (3题)
  // ═══════════════════════════════════════
  {
    id: 'q16', mainDim: 'D5', subDims: ['D10', 'D3'],
    text: '刷到一个讲量子力学的视频，完全看不懂，你会：',
    options: [
      { label: '暂停，查资料，非搞懂不可', value: 3 },
      { label: '划走，太烧脑了', value: 2 },
      { label: '看个热闹，反正也不影响我生活', value: 1 }
    ]
  },
  {
    id: 'q17', mainDim: 'D5', subDims: ['D13', 'D16'],
    text: '你的收藏夹里有多少内容？',
    options: [
      { label: '几百条，够我看一辈子', value: 3 },
      { label: '几十条，偶尔翻翻', value: 2 },
      { label: '几乎没有，看完就忘', value: 1 }
    ]
  },
  {
    id: 'q18', mainDim: 'D5', subDims: ['D10', 'D13'],
    text: '看悬疑剧的时候，你会：',
    options: [
      { label: '疯狂推理，一定要猜到结局', value: 3 },
      { label: '跟着剧情走，享受过程', value: 2 },
      { label: '直接看结局，不想费脑子', value: 1 }
    ]
  },

  // ═══════════════════════════════════════
  // D6 表达欲 (3题)
  // ═══════════════════════════════════════
  {
    id: 'q19', mainDim: 'D6', subDims: ['D11', 'D7'],
    text: '你发了一条朋友圈，过了十分钟没人点赞，你会：',
    options: [
      { label: '开始怀疑人生：是不是发得不够高级？', value: 3 },
      { label: '有点在意，但假装自己完全不在意', value: 2 },
      { label: '没事，发出来就算完成表达了', value: 1 }
    ]
  },
  {
    id: 'q20', mainDim: 'D6', subDims: ['D1', 'D12'],
    text: '群聊里大家聊得热火朝天，你会：',
    options: [
      { label: '疯狂输出，我有好多想说的', value: 3 },
      { label: '偶尔插一句，刷个存在感', value: 2 },
      { label: '默默潜水，看你们聊', value: 1 }
    ]
  },
  {
    id: 'q21', mainDim: 'D6', subDims: ['D14', 'D15'],
    text: '网上看到一个你特别不认同的观点，你会：',
    options: [
      { label: '必须下场battle', value: 3 },
      { label: '划走，不想吵架', value: 2 },
      { label: '心里想想，但懒得说', value: 1 }
    ]
  },

  // ═══════════════════════════════════════
  // D7 红鸾投入 (4题)
  // ═══════════════════════════════════════
  {
    id: 'q22', mainDim: 'D7', subDims: ['D8', 'D12'],
    text: '有人连续三天找你聊天，但又没明说喜欢你，你会：',
    options: [
      { label: '已经脑补到第三集了，但表面装淡定', value: 3 },
      { label: '先观察，对方不说我也不说', value: 2 },
      { label: '不猜，真有事请直接说明', value: 1 }
    ]
  },
  {
    id: 'q23', mainDim: 'D7', subDims: ['D8', 'D12'],
    text: '对象超过5小时没回消息，说自己窜稀了，你会怎么想？',
    options: [
      { label: '拉稀不可能5小时，也许ta隐瞒了我', value: 3 },
      { label: '在信任和怀疑之间摇摆', value: 2 },
      { label: '也许今天ta真的不太舒服', value: 1 }
    ]
  },
  {
    id: 'q24', mainDim: 'D7', subDims: ['D15', 'D8'],
    text: '你的恋爱对象是一个尊老爱幼、温柔敦厚、洁身自好、光明磊落、能言善辩、博学多才的人，此时你会？',
    options: [
      { label: '就算ta再优秀我也不会陷入太深', value: 1 },
      { label: '会介于A和C之间', value: 2 },
      { label: '会非常珍惜ta，也许会变成恋爱脑', value: 3 }
    ]
  },
  {
    id: 'q25', mainDim: 'D7', subDims: ['D2', 'D15'],
    text: '你喜欢一个人很久了，你会：',
    options: [
      { label: '找机会表白，不说憋得慌', value: 3 },
      { label: '先试探一下对方态度', value: 2 },
      { label: '暗恋就好了，说出来连朋友都没得做', value: 1 }
    ]
  },

  // ═══════════════════════════════════════
  // D8 信任安全 (3题)
  // ═══════════════════════════════════════
  {
    id: 'q26', mainDim: 'D8', subDims: ['D12', 'D15'],
    text: '朋友临时爽约，说家里有事，你会：',
    options: [
      { label: '是不是不想来？编借口吧', value: 3 },
      { label: '有点失望，但选择相信', value: 2 },
      { label: '没事，谁都有临时情况', value: 1 }
    ]
  },
  {
    id: 'q27', mainDim: 'D8', subDims: ['D15', 'D10'],
    text: '你走在街上，一个萌萌的小女孩蹦蹦跳跳地朝你走来，她递给你一根棒棒糖，此时你作何感想？',
    options: [
      { label: '呜呜她真好真可爱！居然给我棒棒糖！', value: 1 },
      { label: '一脸懵逼，作挠头状', value: 2 },
      { label: '这也许是一种新型诈骗？还是走开为好', value: 3 }
    ]
  },
  {
    id: 'q28', mainDim: 'D8', subDims: ['D15', 'D4'],
    text: '有人主动给你推荐一个"稳赚不赔"的投资，你会：',
    options: [
      { label: '心动了，先投点试试', value: 3 },
      { label: '听听看，但不太敢信', value: 2 },
      { label: '直接拒绝，天上不会掉馅饼', value: 1 }
    ]
  },

  // ═══════════════════════════════════════
  // D9 驿马变动 (3题)
  // ═══════════════════════════════════════
  {
    id: 'q29', mainDim: 'D9', subDims: ['D2', 'D13'],
    text: '你突然特别想换城市、换工作、换人生，一般是因为：',
    options: [
      { label: '现在这个局太闷了，我需要呼吸', value: 3 },
      { label: '可能只是最近累了，先缓两天看看', value: 2 },
      { label: '先算成本，能换再换，不能换别作', value: 1 }
    ]
  },
  {
    id: 'q30', mainDim: 'D9', subDims: ['D2', 'D13'],
    text: '说到旅行，你更喜欢：',
    options: [
      { label: '随心所欲，走到哪算哪', value: 3 },
      { label: '做攻略但不完全按计划走', value: 2 },
      { label: '跟团，省心', value: 1 }
    ]
  },
  {
    id: 'q31', mainDim: 'D9', subDims: ['D2', 'D4'],
    text: '朋友说"走，现在就去机场，飞哪算哪"，你会：',
    options: [
      { label: '走！身份证带上就出发', value: 3 },
      { label: '太突然了，让我想想', value: 2 },
      { label: '你们去吧，我晕机', value: 1 }
    ]
  },

  // ═══════════════════════════════════════
  // D10 华盖精神 (3题)
  // ═══════════════════════════════════════
  {
    id: 'q32', mainDim: 'D10', subDims: ['D12', 'D11'],
    text: '半夜突然睡不着，你脑子最容易飘到哪里？',
    options: [
      { label: '人生、宇宙、前世今生，我到底是谁', value: 3 },
      { label: '今天那句话是不是说错了', value: 2 },
      { label: '明天几点起，别整这些没用的', value: 1 }
    ]
  },
  {
    id: 'q33', mainDim: 'D10', subDims: ['D8', 'D3'],
    text: '有人给你算塔罗牌，说你最近有"小人"，你会：',
    options: [
      { label: '认真听，然后对照最近发生的事', value: 3 },
      { label: '听听就好，当娱乐', value: 2 },
      { label: '不信，我命由我不由天', value: 1 }
    ]
  },
  {
    id: 'q34', mainDim: 'D10', subDims: ['D5', 'D12'],
    text: '你相信"平行世界"吗？',
    options: [
      { label: '坚信，另一个我可能过得更好', value: 3 },
      { label: '觉得有可能', value: 2 },
      { label: '不信，没科学依据', value: 1 }
    ]
  },

  // ═══════════════════════════════════════
  // D11 孤辰自卑 (4题)
  // ═══════════════════════════════════════
  {
    id: 'q35', mainDim: 'D11', subDims: ['D12', 'D10'],
    text: '你刷到一段极其破防的自白："我不仅是屌丝，我还是joker..."你第一反应更接近哪句？',
    options: [
      { label: '我哭了。。', value: 3 },
      { label: '这是什么。。', value: 2 },
      { label: '这不是我！', value: 1 }
    ]
  },
  {
    id: 'q36', mainDim: 'D11', subDims: ['D12', 'D3'],
    text: '父母说"你看看别人家的孩子"，你会：',
    options: [
      { label: '心里很不舒服，但不知道怎么反驳', value: 3 },
      { label: '有点不爽，但能理解', value: 2 },
      { label: '每个人都有自己的节奏', value: 1 }
    ]
  },
  {
    id: 'q37', mainDim: 'D11', subDims: ['D12', 'D6'],
    text: '聚会时大家聊得很开心，但没人注意到你，你会：',
    options: [
      { label: '觉得自己像个透明人', value: 3 },
      { label: '有点失落，但不太在意', value: 2 },
      { label: '乐得清闲，不用社交', value: 1 }
    ]
  },
  {
    id: 'q38', mainDim: 'D11', subDims: ['D8', 'D6'],
    text: '被人夸"你好厉害"，你的第一反应是：',
    options: [
      { label: '不可能，你在讽刺我吧', value: 3 },
      { label: '谢谢，但心里不太信', value: 2 },
      { label: '谢谢，我也觉得自己不错', value: 1 }
    ]
  },

  // ═══════════════════════════════════════
  // D12 情绪内耗 (4题)
  // ═══════════════════════════════════════
  {
    id: 'q39', mainDim: 'D12', subDims: ['D11', 'D10'],
    text: '白天和晚上，你的情绪状态通常是：',
    options: [
      { label: '白天装没事，晚上一个人碎掉', value: 3 },
      { label: '差不多，没什么变化', value: 2 },
      { label: '晚上更放松，白天更焦虑', value: 1 }
    ]
  },
  {
    id: 'q40', mainDim: 'D12', subDims: ['D11', 'D8'],
    text: '别人无心的一句话，你会想很久吗？',
    options: [
      { label: '会，反复回味，越想越难受', value: 3 },
      { label: '偶尔会，但能控制', value: 2 },
      { label: '说完就忘，不在意', value: 1 }
    ]
  },
  {
    id: 'q41', mainDim: 'D12', subDims: ['D11', 'D3'],
    text: '做错了一件事，你会：',
    options: [
      { label: '反复想，如果当时不那样就好了', value: 3 },
      { label: '有点后悔，但能翻篇', value: 2 },
      { label: '错了就错了，下次注意', value: 1 }
    ]
  },
  {
    id: 'q42', mainDim: 'D12', subDims: ['D10', 'D11'],
    text: '深夜突然emo了，你会：',
    options: [
      { label: '听歌、发呆、任由情绪蔓延', value: 3 },
      { label: '找人聊天，转移注意力', value: 2 },
      { label: '洗个热水澡，早点睡', value: 1 }
    ]
  },

  // ═══════════════════════════════════════
  // D13 福德咸鱼 (3题)
  // ═══════════════════════════════════════
  {
    id: 'q43', mainDim: 'D13', subDims: ['D9', 'D2'],
    text: '周末你最想干嘛？',
    options: [
      { label: '在家躺平刷剧，谁也别来找我', value: 3 },
      { label: '约朋友出去浪', value: 2 },
      { label: '看情况，有局就出门', value: 1 }
    ]
  },
  {
    id: 'q44', mainDim: 'D13', subDims: ['D3', 'D2'],
    text: '明早有正事，但今晚朋友约你一起打王者荣耀排位，你怎么办？',
    options: [
      { label: '走起，今晚爽了再说', value: 3 },
      { label: '看情况，玩一会儿也不是不行', value: 2 },
      { label: '不去了，明天的事优先', value: 1 }
    ]
  },
  {
    id: 'q45', mainDim: 'D13', subDims: ['D3', 'D9'],
    text: '有人催你上进，你会：',
    options: [
      { label: '我躺我快乐，关你什么事', value: 3 },
      { label: '知道该努力，但动力不足', value: 2 },
      { label: '不需要催，我自己会卷', value: 1 }
    ]
  },

  // ═══════════════════════════════════════
  // D14 破军反骨 (3题)
  // ═══════════════════════════════════════
  {
    id: 'q46', mainDim: 'D14', subDims: ['D1', 'D3'],
    text: '别人替你做了决定，你会：',
    options: [
      { label: '凭什么？我自己来', value: 3 },
      { label: '有点不爽，但能接受', value: 2 },
      { label: '行吧，省得我想', value: 1 }
    ]
  },
  {
    id: 'q47', mainDim: 'D14', subDims: ['D1', 'D8'],
    text: '你觉得"规矩"这种东西是：',
    options: [
      { label: '规矩是用来打破的', value: 3 },
      { label: '大部分时候要遵守', value: 2 },
      { label: '必须遵守的，没规矩不成方圆', value: 1 }
    ]
  },
  {
    id: 'q48', mainDim: 'D14', subDims: ['D8', 'D15'],
    text: '你做过最"叛逆"的事是：',
    options: [
      { label: '大事上自己做主，不听父母的', value: 3 },
      { label: '顶过几句嘴', value: 2 },
      { label: '没什么叛逆的', value: 1 }
    ]
  },

  // ═══════════════════════════════════════
  // D15 边界警惕 (3题)
  // ═══════════════════════════════════════
  {
    id: 'q49', mainDim: 'D15', subDims: ['D8', 'D6'],
    text: '陌生人突然热情地跟你搭话，你会：',
    options: [
      { label: '警惕，先判断有没有坑', value: 3 },
      { label: '礼貌回应，但保持距离', value: 2 },
      { label: '开心聊天，多个朋友多条路', value: 1 }
    ]
  },
  {
    id: 'q50', mainDim: 'D15', subDims: ['D4', 'D8'],
    text: '看到"免费试用7天"的广告，你会：',
    options: [
      { label: '肯定是套路，不点', value: 3 },
      { label: '看看条款再说', value: 2 },
      { label: '先薅了再说', value: 1 }
    ]
  },
  {
    id: 'q51', mainDim: 'D15', subDims: ['D8', 'D12'],
    text: '很久没联系的朋友突然对你特别热情，你会：',
    options: [
      { label: '是不是有事求我？', value: 3 },
      { label: '有点意外，但开心', value: 2 },
      { label: '单纯叙旧，没想太多', value: 1 }
    ]
  },

  // ═══════════════════════════════════════
  // D16 交付完美 (4题)
  // ═══════════════════════════════════════
  {
    id: 'q52', mainDim: 'D16', subDims: ['D3', 'D12'],
    text: '明天就要交了，但你觉得还不够完美，你会：',
    options: [
      { label: '通宵也要改到满意', value: 3 },
      { label: '能交就行，差不多得了', value: 2 },
      { label: '先交了，有问题再说', value: 1 }
    ]
  },
  {
    id: 'q53', mainDim: 'D16', subDims: ['D5', 'D6'],
    text: '做一个作品的时候，你会：',
    options: [
      { label: '反复修改，精益求精', value: 3 },
      { label: '做到80%就差不多了', value: 2 },
      { label: '完成比完美重要', value: 1 }
    ]
  },
  {
    id: 'q54', mainDim: 'D16', subDims: ['D6', 'D12'],
    text: '发一条重要的消息前，你会：',
    options: [
      { label: '反复看三遍，确保没错误', value: 3 },
      { label: '看一遍就发', value: 2 },
      { label: '想到什么发什么', value: 1 }
    ]
  },
  {
    id: 'q55', mainDim: 'D16', subDims: ['D3', 'D2'],
    text: '交作业/报告的时候，你会：',
    options: [
      { label: '最后一刻才交，因为一直在改', value: 3 },
      { label: '提前一天交，留点余地', value: 2 },
      { label: '早就交了，不拖到最后', value: 1 }
    ]
  }
];

// 兼容旧接口
const BASE_QUESTIONS = QUESTIONS;
const TARGETED_QUESTIONS = {};
const TIEBREAKER_QUESTIONS = [];
