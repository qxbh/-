/**
 * 玄学人格测试 - 结果海报生成
 * 1080×1920 竖屏分享图，纯 Canvas 绘制，不依赖图片
 */

const XuanxuePoster = (() => {
  const W = 1080;
  const H = 1920;

  // 每种命格对应的 emoji icon
  const TYPE_ICONS = {
    EMPR: '🐉', GENERAL: '⚔️', CAREER: '💼', SCHOLAR: '📚',
    FAME: '🏆', WANDERER: '🗺️', REBEL: '🔥', CHARM: '🌸',
    MERCHANT: '💰', FORTUNE: '👑', LUCKY: '🍀', SAGE: '🔮',
    MYSTIC: '🌑', HERMIT: '🏔️', SPIRIT: '✨', PROTECTOR: '🛡️',
    LONER: '🖤', HARD: '🔨', CLOWN: '🃏', FOODIE: '🍜',
    LAZY: '😴', GAMER: '🎮', ROMANTIC: '💗', NERD: '🧠',
    BOSS: '👔', ORDINARY: '🪨'
  };

  function generate(result) {
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    const type = result.finalType;

    // ── 背景 ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#f6faf6');
    bg.addColorStop(0.4, '#f0f6f1');
    bg.addColorStop(1, '#e8f0e9');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // 网格
    ctx.strokeStyle = 'rgba(108, 141, 113, 0.035)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // 装饰光斑
    const g1 = ctx.createRadialGradient(W - 100, 100, 0, W - 100, 100, 220);
    g1.addColorStop(0, 'rgba(108, 141, 113, 0.12)');
    g1.addColorStop(1, 'rgba(108, 141, 113, 0)');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, W, H);

    const g2 = ctx.createRadialGradient(120, H - 200, 0, 120, H - 200, 260);
    g2.addColorStop(0, 'rgba(108, 141, 113, 0.08)');
    g2.addColorStop(1, 'rgba(108, 141, 113, 0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);

    // ── 边框 ──
    ctx.strokeStyle = '#dbe8dd';
    ctx.lineWidth = 3;
    roundRect(ctx, 36, 36, W - 72, H - 72, 32);
    ctx.stroke();

    // ── 顶部标题 ──
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#4d6a53';
    ctx.font = '700 40px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('玄 学 人 格 测 试', W / 2, 100);

    ctx.fillStyle = '#6a786f';
    ctx.font = '500 20px monospace';
    ctx.fillText('XUANXUE PERSONALITY TEST', W / 2, 140);

    // 分割线
    ctx.strokeStyle = 'rgba(108, 141, 113, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(80, 175); ctx.lineTo(W - 80, 175); ctx.stroke();

    // ── Emoji 大图标 ──
    const icon = TYPE_ICONS[type.code] || '🔮';
    ctx.font = '120px serif';
    ctx.fillText(icon, W / 2, 280);

    // ── 命格类型 ──
    ctx.fillStyle = '#4d6a53';
    ctx.font = '500 28px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('你的命格是', W / 2, 380);

    ctx.fillStyle = '#1e2a22';
    ctx.font = '900 68px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${type.code}`, W / 2, 460);

    ctx.fillStyle = '#1e2a22';
    ctx.font = '800 52px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(`（${type.cn}）`, W / 2, 530);

    // 匹配度
    ctx.fillStyle = '#4d6a53';
    ctx.font = '700 24px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(`匹配度 ${result.similarity}% · 精准命中 ${result.exactHits}/15 维`, W / 2, 590);

    // intro
    ctx.fillStyle = '#6a786f';
    ctx.font = 'italic 26px "PingFang SC", "Microsoft YaHei", sans-serif';
    const introLines = wrapText(ctx, `「${type.intro}」`, W - 200);
    let y = 640;
    introLines.forEach(line => {
      ctx.fillText(line, W / 2, y);
      y += 36;
    });

    // ── 分割线 ──
    y += 20;
    ctx.strokeStyle = 'rgba(108, 141, 113, 0.15)';
    ctx.beginPath(); ctx.moveTo(80, y); ctx.lineTo(W - 80, y); ctx.stroke();
    y += 40;

    // ── 命格解读 ──
    ctx.textAlign = 'left';
    ctx.fillStyle = '#4d6a53';
    ctx.font = '700 28px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('【命格解读】', 80, y);
    y += 44;

    ctx.fillStyle = '#304034';
    ctx.font = '400 24px "PingFang SC", "Microsoft YaHei", sans-serif';
    const descLines = wrapText(ctx, type.desc, W - 160);
    descLines.slice(0, 10).forEach(line => {
      ctx.fillText(line, 80, y);
      y += 36;
    });
    y += 30;

    // ── 五行分析 ──
    ctx.fillStyle = '#4d6a53';
    ctx.font = '700 28px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('【五行分析】', 80, y);
    y += 44;

    const wuxingItems = ['金', '木', '水', '火', '土'];
    const wuxingColors = {
      '金': '#b8860b', '木': '#228b22', '水': '#1e90ff',
      '火': '#dc3545', '土': '#8b6914'
    };

    wuxingItems.forEach((wx, i) => {
      const w = result.wuxing[wx];
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = 80 + col * 320;
      const yy = y + row * 50;

      // 背景小卡片
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      roundRect(ctx, x - 8, yy - 28, 290, 44, 10);
      ctx.fill();

      ctx.fillStyle = wuxingColors[wx];
      ctx.font = '700 24px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillText(`${wx}`, x, yy);

      ctx.fillStyle = '#1e2a22';
      ctx.font = '800 24px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillText(`${w.level}`, x + 40, yy);

      ctx.fillStyle = '#6a786f';
      ctx.font = '400 20px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillText(`(${w.name})`, x + 80, yy);
    });
    y += 120;

    // ── 神煞感应 ──
    ctx.fillStyle = '#4d6a53';
    ctx.font = '700 28px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('【神煞感应】', 80, y);
    y += 44;

    ctx.fillStyle = '#304034';
    ctx.font = '400 24px "PingFang SC", "Microsoft YaHei", sans-serif';
    if (result.shensha.length > 0) {
      const shText = result.shensha.map(s => `${s.name}：${s.level}`).join('   ');
      const shLines = wrapText(ctx, shText, W - 160);
      shLines.slice(0, 3).forEach(line => {
        ctx.fillText(line, 80, y);
        y += 36;
      });
    } else {
      ctx.fillText('命盘平稳，无明显神煞感应', 80, y);
      y += 36;
    }
    y += 30;

    // ── 开运建议 ──
    ctx.fillStyle = '#4d6a53';
    ctx.font = '700 28px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('【开运建议】', 80, y);
    y += 44;

    ctx.fillStyle = '#304034';
    ctx.font = '400 24px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(`适合职业：${type.career}`, 80, y); y += 38;
    ctx.fillText(`幸运颜色：${type.color}`, 80, y); y += 38;
    ctx.fillText(`宜忌：${type.avoid}`, 80, y); y += 50;

    // ── 底部 ──
    ctx.strokeStyle = 'rgba(108, 141, 113, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(80, H - 140); ctx.lineTo(W - 80, H - 140); ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#6a786f';
    ctx.font = '400 22px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('— 天机既泄，顺天应命 —', W / 2, H - 100);
    ctx.font = '400 16px monospace';
    ctx.fillText('XUANXUE PERSONALITY TEST', W / 2, H - 65);

    return canvas;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function wrapText(ctx, text, maxWidth) {
    const lines = [];
    let line = '';
    for (let i = 0; i < text.length; i++) {
      const test = line + text[i];
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = text[i];
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  function download(result) {
    const canvas = generate(result);
    const link = document.createElement('a');
    link.download = `xuanxue-${result.finalType.code}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  return { generate, download };
})();
