/**
 * 玄学人格测试 - 主逻辑 (自适应版)
 */
(function () {
  'use strict';

  // ═══════════════════════════════════════
  // DOM 元素
  // ═══════════════════════════════════════
  const startScreen = document.getElementById('start-screen');
  const testScreen = document.getElementById('test-screen');
  const resultScreen = document.getElementById('result-screen');

  const btnStart = document.getElementById('btn-start');
  const btnRetry = document.getElementById('btn-retry');
  const btnDownload = document.getElementById('btn-download');

  const questionList = document.getElementById('questionList');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const btnPrev = document.getElementById('btn-prev');
  const btnSubmit = document.getElementById('btn-submit');
  const testHint = document.getElementById('testHint');

  const completionModal = document.getElementById('completionModal');
  const closeCompletionModalBtn = document.getElementById('closeCompletionModalBtn');
  const editAnswersBtn = document.getElementById('editAnswersBtn');
  const submitFromModalBtn = document.getElementById('submitFromModalBtn');

  const btnCopy = document.getElementById('btn-copy');
  const shareText = document.getElementById('shareText');
  const copyToast = document.getElementById('copyToast');

  // ═══════════════════════════════════════
  // 状态
  // ═══════════════════════════════════════
  let answers = {};
  let currentIndex = 0;
  let currentPhase = 'base'; // 'base' | 'targeted' | 'tiebreaker'
  let currentQuestions = [];
  let lastResult = null;
  let wasComplete = false;
  let totalAnswered = 0;

  const TOTAL_ALL = 35;

  // ═══════════════════════════════════════
  // 工具函数
  // ═══════════════════════════════════════
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function showToast(msg) {
    copyToast.textContent = msg || '已复制到剪贴板';
    copyToast.classList.add('show');
    setTimeout(() => copyToast.classList.remove('show'), 1800);
  }

  // ═══════════════════════════════════════
  // 初始化
  // ═══════════════════════════════════════
  function init() {
    btnStart.addEventListener('click', startTest);
    btnRetry.addEventListener('click', retryTest);
    btnDownload.addEventListener('click', downloadPoster);
    btnPrev.addEventListener('click', prevQuestion);
    btnSubmit.addEventListener('click', submitTest);
    btnCopy.addEventListener('click', copyShareText);

    closeCompletionModalBtn.addEventListener('click', closeCompletionModal);
    editAnswersBtn.addEventListener('click', closeCompletionModal);
    submitFromModalBtn.addEventListener('click', () => {
      closeCompletionModal();
      submitTest();
    });
    completionModal.querySelector('.completion-modal__backdrop')
      .addEventListener('click', closeCompletionModal);
  }

  // ═══════════════════════════════════════
  // 弹窗
  // ═══════════════════════════════════════
  function openCompletionModal() {
    completionModal.classList.add('is-open');
    completionModal.setAttribute('aria-hidden', 'false');
    submitFromModalBtn.focus();
  }

  function closeCompletionModal() {
    completionModal.classList.remove('is-open');
    completionModal.setAttribute('aria-hidden', 'true');
  }

  // ═══════════════════════════════════════
  // 页面切换
  // ═══════════════════════════════════════
  function showScreen(screen) {
    [startScreen, testScreen, resultScreen].forEach(s => {
      s.classList.remove('active');
    });
    requestAnimationFrame(() => {
      screen.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ═══════════════════════════════════════
  // 测试流程
  // ═══════════════════════════════════════
  function startTest() {
    answers = {};
    currentIndex = 0;
    currentPhase = 'base';
    wasComplete = false;
    totalAnswered = 0;
    closeCompletionModal();

    // 直接加载所有题目
    currentQuestions = shuffle([...BASE_QUESTIONS]);
    showScreen(testScreen);
    renderQuestion();
    updateProgress();
    updateNavButtons();
  }

  function retryTest() {
    startTest();
  }

  // ═══════════════════════════════════════
  // 题目渲染
  // ═══════════════════════════════════════
  function renderQuestion() {
    const q = currentQuestions[currentIndex];
    if (!q) {
      checkAllComplete();
      return;
    }

    const answeredCount = Object.keys(answers).length;
    const labels = ['A', 'B', 'C'];

    questionList.innerHTML = `
      <div class="question">
        <div class="question-meta">
          <span class="badge">第 ${currentIndex + 1} / ${currentQuestions.length} 题</span>
          <span class="question-stage-copy">已完成 ${answeredCount} 题，选完自动下一题。</span>
        </div>
        <div class="question-title">${q.text}</div>
        <div class="question-options">
          ${q.options.map((opt, i) => `
            <label class="question-option ${answers[q.id] === opt.value ? 'selected' : ''}">
              <input type="radio" name="q${q.id}" value="${opt.value}" ${answers[q.id] === opt.value ? 'checked' : ''}>
              <span class="option-code">${labels[i]}</span>
              <span class="option-label">${opt.label}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `;

    questionList.querySelectorAll('input[type="radio"]').forEach(input => {
      input.addEventListener('change', (e) => {
        answers[q.id] = Number(e.target.value);
        totalAnswered = Object.keys(answers).length;
        updateProgress();
        updateNavButtons();

        questionList.querySelectorAll('.question-option').forEach(opt => {
          opt.classList.remove('selected');
        });
        e.target.closest('.question-option').classList.add('selected');

        setTimeout(() => {
          if (currentIndex < currentQuestions.length - 1) {
            nextQuestion();
          } else {
            checkAllComplete();
          }
        }, 350);
      });
    });
  }

  function checkAllComplete() {
    const allAnswered = currentQuestions.every(q => answers[q.id] !== undefined);

    if (allAnswered) {
      updateProgress();
      openCompletionModal();
    }
  }

  // ═══════════════════════════════════════
  // 进度
  // ═══════════════════════════════════════
  function updateProgress() {
    totalAnswered = Object.keys(answers).length;
    const percent = Math.round((totalAnswered / TOTAL_ALL) * 100);

    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${totalAnswered} / ${TOTAL_ALL}`;

    const allDone = totalAnswered >= TOTAL_ALL;
    btnSubmit.disabled = !allDone;

    if (testHint) {
      if (allDone) {
        testHint.textContent = '全部答完了！直接提交看结果。';
      } else {
        testHint.textContent = '选完自动下一题，马上出结果！';
      }
    }

    if (allDone && !wasComplete && testScreen.classList.contains('active')) {
      openCompletionModal();
    } else if (!allDone) {
      closeCompletionModal();
    }

    wasComplete = allDone;
  }

  // ═══════════════════════════════════════
  // 导航
  // ═══════════════════════════════════════
  function updateNavButtons() {
    // 上一题按钮：基础轮第一题不能回退
    if (currentPhase === 'base' && currentIndex === 0) {
      btnPrev.disabled = true;
    } else {
      btnPrev.disabled = false;
    }
  }

  function prevQuestion() {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion();
      updateNavButtons();
    }
  }

  function nextQuestion() {
    if (currentIndex < currentQuestions.length - 1) {
      currentIndex++;
      renderQuestion();
      updateNavButtons();
    }
  }

  // ═══════════════════════════════════════
  // 提交
  // ═══════════════════════════════════════
  function submitTest() {
    totalAnswered = Object.keys(answers).length;
    if (totalAnswered < TOTAL_ALL) {
      alert(`需要答完全部${TOTAL_ALL}题`);
      return;
    }

    lastResult = XuanxueEngine.computeResult(answers);
    renderResult();
    showScreen(resultScreen);
  }

  // ═══════════════════════════════════════
  // 分享文案
  // ═══════════════════════════════════════
  function buildShareText(result) {
    const type = result.finalType;
    const wuxing = result.wuxing;
    const wuxingStr = ['金', '木', '水', '火', '土']
      .map(wx => `${wx}${wuxing[wx].name}`)
      .join(' ');
    const shenshaStr = result.shensha.length > 0
      ? result.shensha.map(s => `${s.name}(${s.level})`).join('、')
      : '命盘平稳';

    // 五行偏向分析
    const wuxingAnalysis = buildWuxingAnalysis(result);

    return `我在「玄学人格测试」测出的命格是：${type.code}（${type.cn}）
「${type.intro}」
匹配度 ${result.similarity}% · ${result.exactHits}/15 维精准命中
主属性：${wuxingAnalysis.dominant.name}（${wuxingAnalysis.level}）
五行：${wuxingStr}
神煞：${shenshaStr}
适合职业：${type.career}
——你也来测测？`;
  }

  function copyShareText() {
    if (!lastResult) return;
    const text = buildShareText(lastResult);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('已复制到剪贴板，去分享吧 ✨');
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('已复制到剪贴板，去分享吧 ✨');
    } catch (e) {
      showToast('复制失败，请手动复制');
    }
    document.body.removeChild(ta);
  }

  // ═══════════════════════════════════════
  // 内容生成器
  // ═══════════════════════════════════════

  function buildPortrait(result) {
    const type = result.finalType;
    const portraits = {
      EMPR: '你走路带风不是因为外面在刮风，是因为你本身就是风口。聚餐你坐C位不是因为你想坐，是因为椅子自己会把你吸过去。你做决定的速度比别人打开外卖APP还快。你不是霸道，你是天生就站在食物链顶端。',
      GENERAL: '你这个人吧，脑子还没想完腿就已经动了。别人还在纠结中午吃什么，你已经吃完了。你打游戏永远冲第一个——虽然有时候是送第一个。你的人生信条是"先开枪后瞄准"，虽然有时候会打偏，但气势绝对到位。',
      CAREER: '你的手机闹钟比你的社交圈还多。你不是工作狂，你是觉得休息的时候会错过什么。你的座右铭是"等我忙完这阵就休息"，但你永远在忙下一阵。你周末不工作就浑身难受，你的手机里有三十个工作群，每个都在@你。',
      SCHOLAR: '你的收藏夹里有八百篇没看的文章，但你觉得自己已经学过了。你能在任何话题上聊五分钟——虽然五分钟之后就开始编了。你的知识面比你以为的窄，但比别人以为的宽。你不是书呆子，你是知识的收藏家。',
      FAME: '你发朋友圈不是为了记录生活，是为了让别人知道你过得好。你做每件事都在想"这个能不能发"。你的社交媒体运营能力比你的专业技能还强。你不是虚荣，你是天生需要舞台——虽然你的观众可能只有你妈。',
      WANDERER: '你的行李箱永远是半满的。你在一个城市待三年就想换，一份工作做两年就想跳。你不是不安分，你是灵魂需要氧气。你的微信步数永远是朋友圈最高的，因为你一直在路上——或者在去路上的路上。',
      REBEL: '你的口头禅是"凭什么"。你不是叛逆，你是觉得大部分规则都不合理。你从小到大被说"这孩子很有想法"，翻译一下就是：这孩子很不听话。你不是不听话，你是觉得听不听话应该由你来决定。',
      CHARM: '你不用主动就有桃花。你发朋友圈什么都不写光发一张自拍就能收五十个赞。你不是海王，你是鱼塘自己建好的那种。你微信里永远有人在跟你暧昧，虽然你也不知道为什么。',
      MERCHANT: '你买东西第一反应不是"好不好看"而是"值不值"。你能在一堆垃圾里翻出宝贝，也能在一堆宝贝里找出性价比最高的那个。你砍价的能力已经超越了商业范畴，达到了艺术的高度。',
      FORTUNE: '你的运气好到让人怀疑你是不是充了VIP。抽奖必中、下雨必带伞、堵车必有近路。你不是不努力，你是努力的方向刚好踩在了风口上。你的人生就像开了挂——虽然你可能不知道挂在哪里。',
      LUCKY: '你的人生就像开了挂。别人费尽心思才能得到的东西，你睡一觉就有人送上门。但你知道吗？好运也是需要维护的。建议你少在朋友圈炫运气，容易招人嫉妒。',
      SAGE: '你对神秘事物有天然的感应力。你的直觉准到离谱——虽然你经常用来猜外卖还有几分钟到。你能在深夜三点突然想通一个人生道理，虽然第二天早上就忘了。你不是神棍，你是真的能感受到一些别人感受不到的东西。',
      MYSTIC: '你自己都不太了解自己。你有时候觉得自己不属于这个世界，有时候觉得自己来自M78星云。你的想法很奇怪，你的行为很反常，但这就是你最迷人的地方。你的手机壁纸可能是一个你也不知道什么意思的符号。',
      HERMIT: '你一个人待着比跟十个人在一起还舒服。你的社交电量只有20%，用完就需要独处充电。你不是社恐，你是社交节能模式。你最开心的时刻是取消一个本来就不想去的聚会。',
      SPIRIT: '你已经开始思考"我是谁""我从哪来""我要到哪去"这种终极问题了——虽然最后一个问题的答案通常是"去上班"。你的灵魂比你的身体先觉醒了。你可能已经开始冥想了，虽然经常冥着冥着就睡着了。',
      PROTECTOR: '你是那种朋友哭你比他还急的人。你愿意为别人赴汤蹈火——虽然你可能连厨房都没进过。你朋友圈里永远有人在发"感谢XX"，那个XX就是你。你的守护欲是天生的，虽然有时候守护着守护着就把自己搭进去了。',
      LONER: '你一个人吃饭、一个人看电影、一个人搬家。你不是没有朋友，你是不需要太多朋友。孤独对你来说不是惩罚，是奖励。你最怕的不是一个人，是一群不熟的人假装很熟。',
      HARD: '你的人生就是一部励志片——前90%都是虐心的那种。但你知道吗？这些苦难都是在给你攒经验值。你的故事适合拍成电影，片名就叫《虽然但是》。大器晚成说的就是你——前提是"器"别碎了。',
      CLOWN: '你就是朋友圈的气氛担当。哪里有你哪里就有笑声——虽然有时候那个笑声是你自己笑的。你擅长自嘲、擅长搞笑、擅长在尴尬的场合说出更尴尬的话。你用搞笑保护自己，但你也有认真的一面——虽然很少有人见过。',
      FOODIE: '你人生中最重要的决策都跟吃有关。你的胃是你的人生导航，你的收藏夹里一半是菜谱一半是外卖。你对美食的热爱已经超越了普通人的范畴，达到了信仰的高度。你唯一会早起的原因是赶早餐。',
      LAZY: '你的人生信条是"能不动就不动"。你的床是你最亲密的伙伴，你的沙发是你最忠诚的战友。你不是懒，你是节能模式开到了极致。你最大的运动量是从床上翻到床下——如果外卖小哥愿意送上楼的话。',
      GAMER: '你的人生就是一场游戏。你的段位比你的工资高，你的战绩比你的简历好看。你不是沉迷游戏，你是天生就适合在虚拟世界里封神。你妈说你不务正业，但你妈不知道你的战队有多强。',
      ROMANTIC: '你可以在暗恋对象的微博翻到三年前。你对爱情有着极致的浪漫想象——虽然现实经常打脸。你的手机备忘录里存着八百条没发出去的情话。你深情、专一、容易受伤，但你从不后悔。',
      NERD: '你的脑子里装着别人手机里都存不下的知识。你觉得最快乐的事就是搞懂一个难题。你不是书呆子，你是知识的收藏家。你的手机里有八百篇论文，你妈以为你在学习，其实你在看游戏攻略——但那个攻略你也学得很认真。',
      BOSS: '你打工打到一半就想辞职创业。你不是不能打工，你是觉得打工配不上你的才华。你的脑子里每天都有十个创业点子，其中九个半是不靠谱的。但万一呢？万一那个靠谱的成了呢？',
      ORDINARY: '你是一只真正的、原汁原味的人。你不需要人设，不需要标签，你就是你。也许系统不理解你，但那不重要——人从来就不需要被定义。你的独特之处就在于你没有刻意的独特，这才是真正的独特。'
    };
    return portraits[type.code] || type.desc;
  }

  function buildScores(result) {
    const d = result.levels;
    const scoreMap = {
      H: ['爆表 🔥', 'MAX', 'SSS'],
      M: ['不错 ↑↑', '良好 ↑', '在线 ✅'],
      L: ['待充值 💳', '拉胯 ↓', '负数 📉']
    };
    const getScore = (level) => {
      const arr = scoreMap[level] || scoreMap.M;
      return arr[Math.floor(Math.random() * arr.length)];
    };
    return [
      { label: '气场值', value: getScore(d.D1), icon: '👑' },
      { label: '财运', value: getScore(d.D2), icon: '💰' },
      { label: '智商', value: getScore(d.D3), icon: '🧠' },
      { label: '魅力值', value: getScore(d.D4), icon: '✨' },
      { label: '行动力', value: getScore(d.D5), icon: '⚡' },
      { label: '悟性', value: getScore(d.D6), icon: '🔮' }
    ];
  }

  function buildPowers(result) {
    const d = result.levels;
    const powers = [];
    if (d.D1 === 'H') powers.push({ name: '王者气场', desc: '你一进门全场自动安静，你不开口大家不敢散会' });
    if (d.D2 === 'H') powers.push({ name: '吸金体质', desc: '钱会自己找上门，你买菜都能找到最便宜那家' });
    if (d.D3 === 'H') powers.push({ name: '学霸光环', desc: '学什么都比别人快，虽然学完可能就忘了' });
    if (d.D4 === 'H') powers.push({ name: '万人迷', desc: '不用主动就有桃花，你妈比你还急着帮你选' });
    if (d.D5 === 'H') powers.push({ name: '浪人直觉', desc: '到哪里都能混得开，你的适应能力堪比小强' });
    if (d.D6 === 'H') powers.push({ name: '第六感', desc: '直觉准到离谱，虽然你经常用来猜外卖还有几分钟到' });
    if (d.D7 === 'H') powers.push({ name: '社交达人', desc: '到哪都是焦点，你不在的群都在问你去哪了' });
    if (d.D8 === 'H') powers.push({ name: '叛逆之力', desc: '规则是用来打破的，规定是用来质疑的' });
    if (d.D9 === 'H') powers.push({ name: '独立之魂', desc: '一个人就是一支队伍，虽然这支队伍经常迟到' });
    if (d.D10 === 'H') powers.push({ name: '金刚不坏', desc: '决断力拉满，你做决定的速度比别人点外卖还快' });
    if (d.D11 === 'H') powers.push({ name: '生生不息', desc: '成长速度惊人，你每周都能学会一个新技能——虽然上周的已经忘了' });
    if (d.D12 === 'H') powers.push({ name: '深不可测', desc: '城府深到没人看得透，连你自己都看不透' });
    if (d.D13 === 'H') powers.push({ name: '烈火燎原', desc: '热情能点燃任何人，你的朋友圈永远是99+' });
    if (d.D14 === 'H') powers.push({ name: '磐石之固', desc: '稳如泰山不动摇，你的作息比闹钟还准' });
    if (d.D15 === 'H') powers.push({ name: '天命感应', desc: '冥冥之中自有安排，你刚想到某人他就联系你了' });

    if (powers.length === 0) {
      powers.push({ name: '均衡之力', desc: '五行调和，不偏不倚，你就是传说中的六边形战士——虽然每个边都不太长' });
    }
    return powers.slice(0, 4);
  }

  function buildWeakness(result) {
    const d = result.levels;
    const weaknesses = [];
    if (d.D1 === 'L') weaknesses.push('气场偏弱，在KTV里你是永远抢不到麦的那个');
    if (d.D2 === 'L') weaknesses.push('对钱不太敏感，你的支付宝年度账单是你不敢看的东西');
    if (d.D3 === 'L') weaknesses.push('学习动力不足，你的收藏夹就是你的学习计划——永远不会执行的那种');
    if (d.D4 === 'L') weaknesses.push('社交圈偏小，你的好友列表里一半是外卖小哥和快递员');
    if (d.D5 === 'L') weaknesses.push('太宅了，你的运动量最大的一天是双十一抢购');
    if (d.D6 === 'L') weaknesses.push('太接地气了，你的浪漫就是"今晚吃什么"');
    if (d.D7 === 'L') weaknesses.push('表达欲偏低，你的朋友圈上一条动态还是去年的');
    if (d.D8 === 'L') weaknesses.push('太守规矩了，老师说往东你绝不往西——虽然老师可能说错了');
    if (d.D9 === 'L') weaknesses.push('太依赖团队了，你连点外卖都要问室友吃什么');
    if (d.D10 === 'L') weaknesses.push('决断力偏弱，你点外卖能纠结半小时——然后点了跟上次一样的');
    if (d.D11 === 'L') weaknesses.push('好奇心偏低，你的手机首页三年没换过');
    if (d.D12 === 'L') weaknesses.push('太直白了，你的心事全写在脸上，连你家猫都知道你在生气');
    if (d.D13 === 'L') weaknesses.push('热情偏低，你收到礼物的第一反应是"哦"');
    if (d.D14 === 'L') weaknesses.push('稳定性不足，你的计划表换得比手机壳还勤');
    if (d.D15 === 'L') weaknesses.push('对命运不太敏感，你的人生信条是"走一步看一步"');

    if (weaknesses.length === 0) {
      return '你几乎没有弱点，但建议偶尔示弱，让别人也有保护你的机会——毕竟你太强了，别人会自卑的。';
    }
    return weaknesses.slice(0, 3).join('；') + '。不过弱点也是特点，接纳它就好——毕竟没有弱点的人生多无聊啊。';
  }

  // ═══════════════════════════════════════
  // 五行偏向分析
  // ═══════════════════════════════════════
  function buildWuxingAnalysis(result) {
    const d = result.levels;
    const wuxingMap = {
      'D10': { element: '金', name: '金', icon: '⚔️', trait: '决断', desc: '刚毅果断，说一不二' },
      'D11': { element: '木', name: '木', icon: '🌳', trait: '生长', desc: '生机勃勃，向上生长' },
      'D12': { element: '水', name: '水', icon: '💧', trait: '智慧', desc: '灵动变通，深不可测' },
      'D13': { element: '火', name: '火', icon: '🔥', trait: '热情', desc: '热情似火，感染力强' },
      'D14': { element: '土', name: '土', icon: '⛰️', trait: '稳定', desc: '稳重踏实，包容万物' }
    };

    // 计算五行得分
    const scores = {};
    for (const [dim, info] of Object.entries(wuxingMap)) {
      const level = d[dim];
      scores[dim] = level === 'H' ? 3 : level === 'M' ? 2 : 1;
    }

    // 找出最强的五行
    let maxDim = 'D10';
    let maxScore = 0;
    for (const [dim, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        maxDim = dim;
      }
    }

    const dominant = wuxingMap[maxDim];
    const level = d[maxDim];
    const levelText = level === 'H' ? '极强' : level === 'M' ? '中等' : '偏弱';

    // 生成五行平衡描述
    const allElements = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([dim, score]) => wuxingMap[dim].name);

    let balanceDesc = '';
    if (allElements[0] === allElements[1]) {
      balanceDesc = `你主修${allElements[0]}，兼修${allElements[1]}，双属性加持`;
    } else {
      balanceDesc = `你主修${allElements[0]}，${allElements[1]}为辅`;
    }

    return {
      dominant: dominant,
      level: levelText,
      balanceDesc: balanceDesc,
      scores: scores,
      levelMap: d
    };
  }

  // ═══════════════════════════════════════
  // 综合总结
  // ═══════════════════════════════════════
  function buildSummary(result) {
    const type = result.finalType;
    const d = result.levels;
    const wuxingAnalysis = buildWuxingAnalysis(result);

    // 性格特点总结
    const personalityTraits = [];
    if (d.D1 === 'H') personalityTraits.push('天生的领导者');
    if (d.D1 === 'L') personalityTraits.push('低调的幕后英雄');
    if (d.D2 === 'H') personalityTraits.push('商业嗅觉敏锐');
    if (d.D3 === 'H') personalityTraits.push('求知欲旺盛');
    if (d.D4 === 'H') personalityTraits.push('魅力四射');
    if (d.D5 === 'H') personalityTraits.push('自由的灵魂');
    if (d.D6 === 'H') personalityTraits.push('神秘的思想家');
    if (d.D7 === 'H') personalityTraits.push('社交达人');
    if (d.D8 === 'H') personalityTraits.push('叛逆的创新者');
    if (d.D9 === 'H') personalityTraits.push('独立的个体');
    if (d.D10 === 'H') personalityTraits.push('果断的执行者');
    if (d.D11 === 'H') personalityTraits.push('成长型选手');
    if (d.D12 === 'H') personalityTraits.push('深沉的智者');
    if (d.D13 === 'H') personalityTraits.push('热情的感染力');
    if (d.D14 === 'H') personalityTraits.push('稳重的磐石');
    if (d.D15 === 'H') personalityTraits.push('天命感应者');

    const traitText = personalityTraits.length > 0
      ? personalityTraits.slice(0, 3).join('、')
      : '均衡发展';

    // 运势分析
    let fortuneText = '';
    if (d.D4 === 'H') fortuneText += '桃花旺盛，异性缘爆棚。';
    if (d.D5 === 'H') fortuneText += '驿马星动，适合变动和发展。';
    if (d.D6 === 'H') fortuneText += '华盖照命，艺术感和直觉力强。';
    if (!fortuneText) fortuneText = '命盘平稳，运势平稳上升。';

    // 建议
    const adviceList = [];
    if (d.D10 === 'L') adviceList.push('增强决断力，相信自己的判断');
    if (d.D11 === 'L') adviceList.push('保持好奇心，多尝试新事物');
    if (d.D12 === 'L') adviceList.push('学会深思熟虑，不要急于表态');
    if (d.D13 === 'L') adviceList.push('多表达自己的情感和想法');
    if (d.D14 === 'L') adviceList.push('培养耐心，做事更稳重');
    if (d.D1 === 'H' && d.D8 === 'H') adviceList.push('学会倾听他人意见，避免过于强势');
    if (d.D4 === 'H') adviceList.push('桃花虽旺，但要擦亮眼睛');
    if (d.D5 === 'H') adviceList.push('变动虽多，但要把握机会');
    if (adviceList.length === 0) adviceList.push('保持现在的状态，继续发光发热');

    return {
      traitText,
      fortuneText,
      adviceList: adviceList.slice(0, 3)
    };
  }

  function buildPartners(result) {
    const type = result.finalType;
    const partnerMap = {
      EMPR: ['PROTECTOR', 'SCHOLAR', 'CHARM'],
      GENERAL: ['CHARM', 'FOODIE', 'PROTECTOR'],
      CAREER: ['SCHOLAR', 'NERD', 'PROTECTOR'],
      SCHOLAR: ['EMPR', 'SPIRIT', 'NERD'],
      FAME: ['CHARM', 'GENERAL', 'EMPR'],
      WANDERER: ['ROMANTIC', 'FOODIE', 'LAZY'],
      REBEL: ['ROMANTIC', 'SAGE', 'MYSTIC'],
      CHARM: ['EMPR', 'GENERAL', 'FORTUNE'],
      MERCHANT: ['GENERAL', 'BOSS', 'LUCKY'],
      FORTUNE: ['CHARM', 'EMPR', 'FOODIE'],
      LUCKY: ['EMPR', 'FORTUNE', 'CHARM'],
      SAGE: ['HERMIT', 'SPIRIT', 'MYSTIC'],
      MYSTIC: ['SAGE', 'REBEL', 'HERMIT'],
      HERMIT: ['SAGE', 'NERD', 'MYSTIC'],
      SPIRIT: ['HERMIT', 'SAGE', 'LONER'],
      PROTECTOR: ['EMPR', 'GENERAL', 'CHARM'],
      LONER: ['NERD', 'HERMIT', 'SPIRIT'],
      HARD: ['PROTECTOR', 'GENERAL', 'EMPR'],
      CLOWN: ['CHARM', 'FOODIE', 'GAMER'],
      FOODIE: ['CLOWN', 'LAZY', 'CHARM'],
      LAZY: ['FOODIE', 'HERMIT', 'ROMANTIC'],
      GAMER: ['CLOWN', 'REBEL', 'NERD'],
      ROMANTIC: ['CHARM', 'REBEL', 'MYSTIC'],
      NERD: ['SCHOLAR', 'HERMIT', 'GAMER'],
      BOSS: ['GENERAL', 'MERCHANT', 'CAREER'],
      ORDINARY: ['LUCKY', 'PROTECTOR', 'CHARM']
    };

    return (partnerMap[type.code] || ['LUCKY', 'PROTECTOR', 'CHARM'])
      .map(code => TYPE_LIBRARY[code])
      .filter(Boolean);
  }

  // ═══════════════════════════════════════
  // 结果渲染
  // ═══════════════════════════════════════

  // 为候选结果生成三句话摘要
  function generateCandidateSummary(type, levels) {
    const summaries = {
      EMPR: [
        '天生的掌控者，走到哪都是C位',
        '适合当领导，但容易把朋友当员工',
        '你的字典里没有"随便"两个字'
      ],
      GENERAL: [
        '行动派中的战斗机，说干就干',
        '执行力满分，但偶尔会冲动上头',
        '你是那种说"我来"然后真的上的狠人'
      ],
      CAREER: [
        '工作就是你的快乐源泉（认真的）',
        '别人摸鱼你加班，还觉得挺充实',
        '建议：适当休息，公司不是你家开的'
      ],
      SCHOLAR: [
        '才华横溢但穷得叮当响',
        '精神世界极度富裕，物质世界极度贫穷',
        '你的收藏夹就是你的学习计划——永远不会执行'
      ],
      FAME: [
        '活着就要被人记住，死后也要上热搜',
        '你发朋友圈不是为了分享，是为了被点赞',
        '你做每件事都在想"这个能不能发"'
      ],
      WANDERER: [
        '灵魂在远方，身体在出租屋',
        '你在一个城市待三年就想换',
        '行李箱永远是半满的，因为随时准备出发'
      ],
      REBEL: [
        '规矩是用来打破的，权威是用来质疑的',
        '你从小就被说"这孩子很有想法"',
        '翻译一下就是：这孩子很不听话'
      ],
      CHARM: [
        '走到哪都有人追，手机里永远有未读消息',
        '你不用主动就有桃花',
        '你最大的问题是太有魅力了——不知道谁是真心的'
      ],
      MERCHANT: [
        '看什么都是生意，买菜都要砍价',
        '你买东西第一反应不是"好不好看"而是"值不值"',
        '砍完价还要送根葱那种'
      ],
      FORTUNE: [
        '含着金汤匙出生，或者含着金汤匙的梦',
        '你的运气好到让人嫉妒',
        '抽奖必中、外卖必免单、下雨必带伞'
      ],
      LUCKY: [
        '转发这条锦鲤，不如转发你自己',
        '你是那种自带好运光环的人',
        '别人费尽心思才能得到的，你睡一觉就有人送上门'
      ],
      SAGE: [
        '能算别人的命，算不准自己的外卖什么时候到',
        '你对神秘事物有天然的感应力',
        '你的直觉准到离谱，虽然经常用来猜外卖'
      ],
      MYSTIC: [
        '别人看不透你，你也看不透你自己',
        '你的想法很奇怪，你的行为很反常',
        '但这就是你最迷人的地方'
      ],
      HERMIT: [
        '社恐天花板，能不出门就不出门',
        '外卖小哥是你唯一的人际关系',
        '你一个人待着比跟十个人在一起还舒服'
      ],
      SPIRIT: [
        '已经看破红尘，但还没看破外卖红包',
        '你的灵魂比你的身体先觉醒了',
        '你开始思考"我是谁"这种终极问题'
      ],
      PROTECTOR: [
        '你不是没有脾气，你只是把脾气留给了欺负你家人的人',
        '朋友哭你比他还急',
        '你是那种可以为了别人赴汤蹈火的人'
      ],
      LONER: [
        '天生一个人，死的时候也想一个人',
        '你不是没有朋友，你是不需要太多朋友',
        '孤独对你来说不是惩罚，是奖励'
      ],
      HARD: [
        '人生如逆水行舟，不进则退，进了也退',
        '你的人生就是一部励志片——前90%都是虐心的',
        '但你知道吗？这些苦难都是在给你攒经验值'
      ],
      CLOWN: [
        '我不是真的快乐，我的笑只是我的保护色',
        '你就是朋友圈的气氛担当',
        '哪里有你哪里就有笑声——虽然有时候是你自己笑的'
      ],
      FOODIE: [
        '人生苦短，先吃再说',
        '你的胃就是你的人生导航',
        '你人生中最重要的决策都跟吃有关'
      ],
      LAZY: [
        '能躺着绝不坐着，能坐着绝不站着',
        '你的床是你最亲密的伙伴',
        '你不是懒，你是节能模式开到了极致'
      ],
      GAMER: [
        '手指比脑子快，键盘比嘴巴利索',
        '段位比工资高',
        '你的人生就是一场游戏，虽然经常Game Over但从不放弃'
      ],
      ROMANTIC: [
        '为爱痴狂，为爱流泪，为爱写出八百字小作文',
        '你对爱情有着极致的浪漫想象',
        '虽然现实经常打脸'
      ],
      NERD: [
        '脑子是用来装知识的，不是用来社交的',
        '你觉得最快乐的事就是搞懂一个难题',
        '你不是书呆子，你是知识的收藏家'
      ],
      BOSS: [
        '不当老板浑身难受，给别人打工觉得屈才',
        '你打工打到一半就想辞职创业',
        '你的脑子里每天都有十个创业点子，其中九个半是不靠谱的'
      ],
      ORDINARY: [
        '平平淡淡才是真，没有惊喜也没有意外',
        '你是一只真正的、原汁原味的人',
        '你不需要人设，不需要标签，你就是你'
      ]
    };
    return summaries[type.code] || summaries.ORDINARY;
  }

  // 渲染候选选择界面
  function renderCandidateSelection() {
    if (!lastResult || !lastResult.candidates) return;

    const candidateList = document.getElementById('candidateList');
    candidateList.innerHTML = lastResult.candidates.map((candidate, index) => {
      const summary = generateCandidateSummary(candidate, lastResult.levels);
      return `
        <div class="candidate-card" data-index="${index}">
          <div class="candidate-header">
            <span class="candidate-rank">${index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'}</span>
            <span class="candidate-name">${candidate.cn}</span>
            <span class="candidate-similarity">${candidate.similarity}%</span>
          </div>
          <div class="candidate-summary">
            ${summary.map(s => `<p>${s}</p>`).join('')}
          </div>
          <button class="btn-primary candidate-select" data-index="${index}">这最像我</button>
        </div>
      `;
    }).join('');

    // 绑定选择事件
    document.querySelectorAll('.candidate-select').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        selectCandidate(index);
      });
    });
  }

  // 选择候选后显示完整结果
  function selectCandidate(index) {
    if (!lastResult || !lastResult.candidates) return;

    // 更新 finalType 为用户选择的候选
    lastResult.finalType = lastResult.candidates[index];
    lastResult.similarity = lastResult.candidates[index].similarity;
    lastResult.exactHits = lastResult.candidates[index].exact;

    // 隐藏候选选择，显示完整结果
    document.getElementById('candidateSelection').style.display = 'none';
    document.getElementById('fullResult').style.display = 'block';

    // 渲染完整结果
    renderFullResult();
  }

  function renderResult() {
    if (!lastResult) return;

    // 显示候选选择界面
    renderCandidateSelection();

    // 隐藏完整结果
    document.getElementById('candidateSelection').style.display = 'block';
    document.getElementById('fullResult').style.display = 'none';
  }

  function renderFullResult() {
    if (!lastResult) return;

    const type = lastResult.finalType;

    document.getElementById('resultModeKicker').textContent = '你的命格是';
    document.getElementById('resultTypeName').textContent = `${type.code}（${type.cn}）`;
    document.getElementById('matchBadge').textContent = `匹配度 ${lastResult.similarity}% · 精准命中 ${lastResult.exactHits}/15 维`;
    document.getElementById('resultTypeSub').textContent = type.intro;
    document.getElementById('resultDesc').textContent = type.desc;

    document.getElementById('portraitText').textContent = buildPortrait(lastResult);

    // 综合总结
    const summary = buildSummary(lastResult);
    const summaryContent = document.getElementById('summaryContent');
    summaryContent.innerHTML = `
      <div class="summary-section">
        <div class="summary-label">🏷️ 性格关键词</div>
        <div class="summary-value">${summary.traitText}</div>
      </div>
      <div class="summary-section">
        <div class="summary-label">📈 运势提示</div>
        <div class="summary-value">${summary.fortuneText}</div>
      </div>
      <div class="summary-section">
        <div class="summary-label">💡 给你的建议</div>
        <div class="summary-value">${summary.adviceList.join('；')}</div>
      </div>
    `;

    const scoreGrid = document.getElementById('scoreGrid');
    scoreGrid.innerHTML = buildScores(lastResult).map(s => `
      <div class="score-item">
        <div class="score-icon">${s.icon}</div>
        <div class="score-label">${s.label}</div>
        <div class="score-value">${s.value}</div>
      </div>
    `).join('');

    const powerList = document.getElementById('powerList');
    powerList.innerHTML = buildPowers(lastResult).map(p => `
      <div class="power-item">
        <div class="power-name">${p.name}</div>
        <div class="power-desc">${p.desc}</div>
      </div>
    `).join('');

    document.getElementById('weaknessText').textContent = buildWeakness(lastResult);

    // 灵魂标签
    document.getElementById('mottoText').textContent = `「${type.motto}」`;

    // 感情画像
    document.getElementById('typeLikes').textContent = type.likes;
    document.getElementById('typeLikedBy').textContent = type.likedBy;

    // 他们怎么看你
    document.getElementById('quoteEx').textContent = type.exWouldSay;
    document.getElementById('quoteMom').textContent = type.momWouldSay;

    // 灵魂搭档
    const partnerList = document.getElementById('partnerList');
    partnerList.innerHTML = buildPartners(lastResult).map(p => `
      <div class="partner-item">
        <span class="partner-code">${p.code}</span>
        <span class="partner-name">${p.cn}</span>
        <span class="partner-intro">${p.intro}</span>
      </div>
    `).join('');

    // 五行偏向分析
    const wuxingAnalysis = buildWuxingAnalysis(lastResult);
    const wuxingAnalysisEl = document.getElementById('wuxingAnalysis');
    wuxingAnalysisEl.innerHTML = `
      <div class="wuxing-dominant">
        <div class="wuxing-dominant-icon">${wuxingAnalysis.dominant.icon}</div>
        <div class="wuxing-dominant-info">
          <div class="wuxing-dominant-title">你的主属性：${wuxingAnalysis.dominant.name}</div>
          <div class="wuxing-dominant-desc">${wuxingAnalysis.dominant.desc}</div>
          <div class="wuxing-dominant-level">强度：${wuxingAnalysis.level}</div>
        </div>
      </div>
      <div class="wuxing-balance">${wuxingAnalysis.balanceDesc}</div>
    `;

    const wuxingList = document.getElementById('wuxingList');
    wuxingList.innerHTML = ['金', '木', '水', '火', '土'].map(wx => {
      const w = lastResult.wuxing[wx];
      return `
        <div class="wuxing-item">
          <div class="wuxing-name">${wx}</div>
          <div class="wuxing-level">${w.level}</div>
          <div class="wuxing-label">${w.name}</div>
        </div>
      `;
    }).join('');

    const shenshaList = document.getElementById('shenshaList');
    if (lastResult.shensha.length > 0) {
      shenshaList.innerHTML = lastResult.shensha.map(s => `
        <span class="shensha-tag">${s.name}：${s.level}</span>
      `).join('');
    } else {
      shenshaList.innerHTML = '<span class="shensha-tag">命盘平稳，无明显神煞</span>';
    }

    const dimList = document.getElementById('dimList');
    dimList.innerHTML = lastResult.dimDetails.map(d => {
      const pct = d.level === 'H' ? 90 : d.level === 'M' ? 60 : 30;
      return `
        <div class="dim-item">
          <div class="dim-item-top">
            <div class="dim-item-name">${d.name}</div>
            <div class="dim-item-score">${d.levelName} / ${d.rawScore}分</div>
          </div>
          <div class="dim-bar"><div class="dim-bar-fill" style="width:${pct}%"></div></div>
        </div>
      `;
    }).join('');

    document.getElementById('adviceCareer').textContent = type.career;
    document.getElementById('adviceColor').textContent = type.color;
    document.getElementById('adviceAvoid').textContent = type.avoid;

    const posterCanvas = XuanxuePoster.generate(lastResult);
    const previewContainer = document.getElementById('posterPreview');
    previewContainer.innerHTML = '';
    posterCanvas.style.maxWidth = '100%';
    posterCanvas.style.borderRadius = '14px';
    previewContainer.appendChild(posterCanvas);

    shareText.textContent = buildShareText(lastResult);
  }

  function downloadPoster() {
    if (!lastResult) return;
    XuanxuePoster.download(lastResult);
  }

  init();
})();
