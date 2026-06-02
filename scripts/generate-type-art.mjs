import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = new URL('../命格测试/image/types/', import.meta.url);
await mkdir(outDir, { recursive: true });

const types = [
  ['EMPR', '#f1d36b', '#7b5a28', 'crown'],
  ['GENERAL', '#e16b5a', '#436953', 'sword'],
  ['CAREER', '#5f6f86', '#c59a55', 'briefcase'],
  ['SCHOLAR', '#75a58c', '#496b82', 'book'],
  ['FAME', '#e788a8', '#e8bd4f', 'star'],
  ['WANDERER', '#78bdd1', '#8ba86f', 'map'],
  ['REBEL', '#d9525d', '#3f3f52', 'spark'],
  ['CHARM', '#ee92bd', '#bb5f86', 'flower'],
  ['MERCHANT', '#d7b75b', '#5f936d', 'coin'],
  ['FORTUNE', '#e4be60', '#a55c78', 'ingot'],
  ['LUCKY', '#78bd7c', '#ddb958', 'clover'],
  ['SAGE', '#8b7ad0', '#5f8da0', 'crystal'],
  ['MYSTIC', '#6c639d', '#a98ac5', 'moon'],
  ['HERMIT', '#879b9d', '#c7b36f', 'mountain'],
  ['SPIRIT', '#9bbbd5', '#d9c179', 'halo'],
  ['PROTECTOR', '#7fa986', '#6380b3', 'shield'],
  ['LONER', '#5b6070', '#9a9fb3', 'planet'],
  ['HARD', '#a47b62', '#667077', 'hammer'],
  ['CLOWN', '#e37474', '#e9bd5f', 'mask'],
  ['FOODIE', '#df915d', '#9aaf68', 'bowl'],
  ['LAZY', '#9fc7b4', '#c2add7', 'cloud'],
  ['GAMER', '#6f8cda', '#79c792', 'gamepad'],
  ['ROMANTIC', '#e47d9e', '#be667b', 'heart'],
  ['NERD', '#6aa4ba', '#8b7db7', 'glasses'],
  ['BOSS', '#5e7088', '#c59a55', 'tower'],
  ['ORDINARY', '#9aa187', '#d0bf8c', 'stone']
];

function prop(kind) {
  const stroke = 'stroke="#2c352f" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  const fill = 'fill="url(#prop)" stroke="#2c352f" stroke-width="7" stroke-linejoin="round"';
  const items = {
    crown: `<path ${fill} d="M364 210l28-64 45 52 51-72 51 72 45-52 28 64z"/><path ${stroke} d="M378 232h224"/>`,
    sword: `<path ${stroke} d="M492 142v232"/><path ${fill} d="M492 104l38 74-38 52-38-52z"/><path ${stroke} d="M430 276h124"/>`,
    briefcase: `<rect ${fill} x="384" y="168" width="190" height="138" rx="24"/><path ${stroke} d="M438 168v-30h70v30M384 220h190"/>`,
    book: `<path ${fill} d="M365 152c52-20 92-8 126 22 34-30 74-42 126-22v210c-52-20-92-8-126 22-34-30-74-42-126-22z"/><path ${stroke} d="M491 174v210M406 232h58M522 232h58"/>`,
    star: `<path ${fill} d="M492 112l26 76 80 1-65 48 24 77-65-45-65 45 24-77-65-48 80-1z"/>`,
    map: `<path ${fill} d="M364 150l70-28 74 28 70-28v205l-70 28-74-28-70 28z"/><path ${stroke} d="M434 124v204M508 150v204"/>`,
    spark: `<path ${fill} d="M492 102l30 90 92 30-92 30-30 90-30-90-92-30 92-30z"/>`,
    flower: `<circle ${fill} cx="492" cy="232" r="26"/><g fill="url(#prop)" stroke="#2c352f" stroke-width="6"><ellipse cx="492" cy="164" rx="30" ry="52"/><ellipse cx="492" cy="300" rx="30" ry="52"/><ellipse cx="424" cy="232" rx="52" ry="30"/><ellipse cx="560" cy="232" rx="52" ry="30"/></g>`,
    coin: `<circle ${fill} cx="492" cy="224" r="86"/><path ${stroke} d="M492 156v136M438 206h108M438 248h108"/>`,
    ingot: `<path ${fill} d="M374 250c28-62 42-94 84-94h84c42 0 56 32 84 94-26 58-200 58-252 0z"/>`,
    clover: `<path ${fill} d="M492 210c-26-62-96-50-96 0 0 48 60 58 96 14 36 44 96 34 96-14 0-50-70-62-96 0z"/><path ${stroke} d="M492 238c-5 64-24 96-64 124"/>`,
    crystal: `<path ${fill} d="M492 106l86 128-86 178-86-178z"/><path ${stroke} d="M406 234h172M492 106v306"/>`,
    moon: `<path ${fill} d="M546 116c-48 22-82 70-82 126s34 104 82 126c-18 8-38 12-60 12-78 0-142-64-142-142s64-142 142-142c22 0 42 4 60 12z"/>`,
    mountain: `<path ${fill} d="M354 336l88-154 50 74 44-62 96 142z"/><path ${stroke} d="M442 182l28 72 22-32M354 336h278"/>`,
    halo: `<circle ${stroke} cx="492" cy="150" r="44"/><path ${fill} d="M414 350c14-76 46-118 78-118s64 42 78 118z"/>`,
    shield: `<path ${fill} d="M492 112l108 44v82c0 76-44 126-108 158-64-32-108-82-108-158v-82z"/><path ${stroke} d="M492 148v236M430 238h124"/>`,
    planet: `<circle ${fill} cx="492" cy="232" r="74"/><path ${stroke} d="M368 268c92-72 184-102 248-74M400 308c82-28 150-28 204 0"/>`,
    hammer: `<path ${fill} d="M390 130h140l36 36-62 62-36-36H390z"/><path ${stroke} d="M474 228l-118 118M530 162l48-48"/>`,
    mask: `<path ${fill} d="M376 174c70-38 134-38 244 0-10 116-54 170-122 170s-112-54-122-170z"/><path ${stroke} d="M430 232c24-18 48-18 72 0M524 232c24-18 48-18 72 0M462 296c28 20 64 20 92 0"/>`,
    bowl: `<path ${fill} d="M384 242h210c-12 78-50 116-105 116s-93-38-105-116z"/><path ${stroke} d="M400 242h178M430 178c22 18-18 32 0 52M492 166c22 20-18 40 0 58"/>`,
    cloud: `<path ${fill} d="M384 278c-40 0-64-22-64-52 0-28 24-52 58-52 12-52 54-82 104-66 30 9 50 32 60 60 52-6 88 26 88 66 0 38-32 64-74 64z"/>`,
    gamepad: `<path ${fill} d="M372 218c12-60 42-84 84-66h70c42-18 72 6 84 66l14 78c8 38-32 62-58 32l-42-44h-86l-42 44c-26 30-66 6-58-32z"/><path ${stroke} d="M414 232h58M443 204v58M542 224h0M582 270h0"/>`,
    heart: `<path ${fill} d="M492 356S370 282 370 196c0-48 38-84 82-84 28 0 50 14 62 38 12-24 34-38 62-38 44 0 82 36 82 84 0 86-122 160-122 160z"/>`,
    glasses: `<path ${stroke} d="M390 222h42M554 222h42M432 222c0 30-24 54-54 54s-54-24-54-54 24-54 54-54 54 24 54 54zM554 222c0 30-24 54-54 54s-54-24-54-54 24-54 54-54 54 24 54 54z"/>`,
    tower: `<path ${fill} d="M412 350V170l80-58 80 58v180z"/><path ${stroke} d="M390 350h204M452 210h80M452 262h80M492 112V74"/>`,
    stone: `<path ${fill} d="M382 288l38-112 98-54 92 64 30 108-70 72H452z"/><path ${stroke} d="M420 176l72 48 118-38M492 224l-40 142"/>`
  };
  return items[kind];
}

function svg(code, a, b, kind) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700" role="img" aria-label="${code} archetype artwork">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fbfff9"/><stop offset=".55" stop-color="${a}" stop-opacity=".28"/><stop offset="1" stop-color="${b}" stop-opacity=".32"/>
    </linearGradient>
    <linearGradient id="shirt" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <linearGradient id="prop" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff7dc"/><stop offset=".45" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#26352b" flood-opacity=".18"/></filter>
  </defs>
  <rect width="700" height="700" rx="48" fill="url(#bg)"/>
  <g opacity=".22" stroke="#4d6a53" stroke-width="2" fill="none">
    <circle cx="350" cy="350" r="260"/><circle cx="350" cy="350" r="188"/><circle cx="350" cy="350" r="116"/>
    <path d="M350 72v556M72 350h556M154 154l392 392M546 154L154 546"/>
  </g>
  <g opacity=".52" fill="#fff"><circle cx="106" cy="132" r="7"/><circle cx="610" cy="126" r="9"/><circle cx="594" cy="564" r="7"/><circle cx="134" cy="552" r="10"/></g>
  <g filter="url(#shadow)">
    <ellipse cx="308" cy="615" rx="168" ry="28" fill="#26352b" opacity=".13"/>
    <path d="M230 366c-64 34-112 94-132 178" stroke="#2c352f" stroke-width="18" stroke-linecap="round" fill="none"/>
    <path d="M382 366c64 34 112 94 132 178" stroke="#2c352f" stroke-width="18" stroke-linecap="round" fill="none"/>
    <path d="M196 622c14-120 62-216 110-216s96 96 110 216z" fill="url(#shirt)" stroke="#2c352f" stroke-width="9" stroke-linejoin="round"/>
    <circle cx="306" cy="258" r="112" fill="#ffd8b5" stroke="#2c352f" stroke-width="9"/>
    <path d="M202 246c20-112 88-158 166-134 52 16 82 58 104 118-66-38-132-36-210-8-28 10-48 16-60 24z" fill="#2f2d35" stroke="#2c352f" stroke-width="8" stroke-linejoin="round"/>
    <circle cx="268" cy="270" r="10" fill="#2c352f"/><circle cx="354" cy="270" r="10" fill="#2c352f"/>
    <path d="M276 326c30 24 66 24 96 0" stroke="#2c352f" stroke-width="9" stroke-linecap="round" fill="none"/>
    <path d="M196 404c42 46 102 70 180 0" stroke="#fff" stroke-width="13" stroke-linecap="round" opacity=".38"/>
    ${prop(kind)}
  </g>
  <path d="M76 612c112-42 224-42 336 0 72 26 136 24 212-8" stroke="#fff" stroke-width="18" stroke-linecap="round" opacity=".26" fill="none"/>
</svg>`;
}

for (const [code, a, b, kind] of types) {
  await writeFile(join(fileURLToPath(outDir), `${code.toLowerCase()}.svg`), svg(code, a, b, kind));
}

console.log(`Generated ${types.length} type art files in ${fileURLToPath(outDir)}`);
