import React, { useState, useRef } from "react";
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Video,
  Search,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Shirt,
  Footprints,
  ShoppingBag,
  Square,
  Sparkles,
  Package,
} from "lucide-react";

/* ------------------------------------------------------------------
   IDENTIDADE VISUAL
   Paleta: creme (fundo), blush (superfícies), rosa (ação), rosa-profundo
   (texto/ênfase), marrom-linha (texto principal).
   Tipografia: Fraunces (display, serifado e artesanal) + Quicksand
   (corpo, arredondada, macia).
   Assinatura: o "novelo" — ícone de bola de lã desenhado à mão — e uma
   "carreirinha" pontilhada (efeito corrente de crochê) como divisor.
------------------------------------------------------------------- */

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Quicksand:wght@400;500;600;700&display=swap');`;

// Credenciais da administradora — troque este e-mail/senha pelos que
// você realmente quiser usar. Como este é um protótipo em React (sem
// servidor por trás), qualquer valor escrito aqui pode ser visto por
// quem olhar o código-fonte da página, então isso não é seguro para
// um site público de verdade — veja a explicação sobre isso.
const ADMIN_EMAIL = "carolinefl1994@gmail.com";
const ADMIN_PASSWORD = "Crochetadas";

const GlobalStyles = () => (
  <style>{`
    ${FONT_IMPORT}

    .crochet-app, .crochet-app * { box-sizing: border-box; }
    .crochet-app {
      font-family: 'Quicksand', sans-serif;
      color: #5B3A45;
      background: #FFF8F5;
      min-height: 100vh;
      width: 100%;
    }
    .crochet-app h1, .crochet-app h2, .crochet-app h3, .crochet-app .display {
      font-family: 'Fraunces', serif;
      color: #5B3A45;
      letter-spacing: -0.01em;
    }
    .crochet-app .stitch-divider {
      border: none;
      height: 2px;
      background-image: radial-gradient(circle, #E8A0B4 1.6px, transparent 1.8px);
      background-size: 12px 2px;
      background-repeat: repeat-x;
      opacity: 0.9;
    }
    .crochet-app button { font-family: 'Quicksand', sans-serif; cursor: pointer; }
    .crochet-app button:disabled { opacity: 0.45; cursor: not-allowed; }
    .crochet-app button:focus-visible,
    .crochet-app input:focus-visible,
    .crochet-app textarea:focus-visible,
    .crochet-app select:focus-visible,
    .crochet-app [tabindex]:focus-visible {
      outline: 2px solid #C4607F;
      outline-offset: 2px;
    }
    .crochet-app input, .crochet-app textarea, .crochet-app select {
      font-family: 'Quicksand', sans-serif;
      background: #FFFDFC;
      border: 1.5px solid #F0C7D4;
      border-radius: 12px;
      padding: 10px 14px;
      font-size: 14px;
      color: #5B3A45;
      width: 100%;
      transition: border-color .15s ease;
    }
    .crochet-app input::placeholder, .crochet-app textarea::placeholder { color: #C99AA8; }
    .crochet-app input:focus, .crochet-app textarea:focus, .crochet-app select:focus {
      border-color: #C4607F;
    }
    .crochet-app .btn-primary {
      background: #C4607F;
      color: #FFF8F5;
      border: none;
      border-radius: 999px;
      padding: 11px 22px;
      font-weight: 600;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: transform .12s ease, background .15s ease;
    }
    .crochet-app .btn-primary:hover { background: #AD4E6B; transform: translateY(-1px); }
    .crochet-app .btn-secondary {
      background: #FBE4EC;
      color: #C4607F;
      border: none;
      border-radius: 999px;
      padding: 11px 22px;
      font-weight: 600;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: background .15s ease;
    }
    .crochet-app .btn-secondary:hover { background: #F5CFDD; }
    .crochet-app .btn-ghost {
      background: transparent;
      border: none;
      color: #8B5A67;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
      font-size: 14px;
      padding: 8px 10px;
      border-radius: 10px;
    }
    .crochet-app .btn-ghost:hover { background: #FBE4EC; }
    .crochet-app .icon-btn {
      background: #FFF8F5;
      border: 1.5px solid #F0C7D4;
      border-radius: 10px;
      padding: 7px;
      display: inline-flex;
      color: #C4607F;
    }
    .crochet-app .icon-btn:hover { background: #FBE4EC; }
    .crochet-app .card {
      background: #FFFDFC;
      border: 1.5px solid #F5D9E2;
      border-radius: 20px;
      box-shadow: 0 2px 14px rgba(196, 96, 127, 0.06);
    }
    .crochet-app .label {
      font-size: 12.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #B67486;
      margin-bottom: 6px;
      display: block;
    }
    .crochet-app .tag {
      background: #FBE4EC;
      color: #AD4E6B;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 999px;
      display: inline-block;
    }
    .crochet-app .cat-card {
      background: #FFFDFC;
      border: 1.5px solid #F5D9E2;
      border-radius: 18px;
      padding: 18px 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      text-align: center;
      transition: border-color .15s ease, background .15s ease;
    }
    .crochet-app .cat-card:hover { background: #FBE4EC; border-color: #E8A0B4; }
    .crochet-app .size-chip {
      background: #FFFDFC;
      border: 1.5px solid #F0C7D4;
      border-radius: 12px;
      padding: 10px 6px;
      font-weight: 700;
      font-size: 13px;
      color: #8B5A67;
      transition: all .12s ease;
    }
    .crochet-app .size-chip.has-recipe {
      border-color: #C4607F;
      background: #FBE4EC;
      color: #AD4E6B;
    }
    .crochet-app .size-chip:hover { border-color: #C4607F; transform: translateY(-1px); }
    .crochet-app .scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
    .crochet-app .scrollbar-thin::-webkit-scrollbar-thumb { background: #F0C7D4; border-radius: 999px; }
    @media (prefers-reduced-motion: reduce) {
      .crochet-app * { transition: none !important; animation: none !important; }
    }
  `}</style>
);

/* ---------------------- Ícone assinatura: novelo ---------------------- */
function YarnIcon({ size = 24, color = "#C4607F", strokeWidth = 1.6, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style}>
      <circle cx="24" cy="24" r="19" stroke={color} strokeWidth={strokeWidth} />
      <path d="M8 20c8 4 12 -8 20 -4s10 14 18 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M6 28c9 -3 14 9 21 5s9 -13 17 -9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M12 11c5 6 -2 13 3 20s13 3 18 9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M30 40c6 -14 -2 -12 4 -26" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

function HookIcon({ size = 18, color = "#C4607F" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M15 3c2 0 3.5 1.5 3.5 3.4 0 1.6-1 2.6-2.2 3.5L9 15.4c-1 .8-1.6 1.7-1.6 2.8A2.8 2.8 0 0 0 10.2 21c1.2 0 2-.5 2.7-1.2"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="16.2" cy="5.6" r="1.1" fill={color} />
    </svg>
  );
}

/* ---------------------- Ícones ilustrados por categoria ---------------------- */
function PantsIcon({ size = 20, color = "#C4607F" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 3h12l.6 6-1.4 12h-3l-.9-11-.9 11h-3L8 9l-.6 6-1.4-12z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M6.4 8.5h11.2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ShortsIcon({ size = 20, color = "#C4607F" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M5 4h14l.7 5-1.2 8h-3.3l-.7-5.5-.9 5.5h-3.2l-.9-5.5-.7 5.5H5.5L4.3 9z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M5 8.5h14" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CoatIcon({ size = 20, color = "#C4607F" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M9 3.2 12 5l3-1.8 4 2.7-1.7 3-1.3-.7V21H8V8.2l-1.3.7-1.7-3z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M12 5v16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BikiniIcon({ size = 20, color = "#C4607F" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3.5 5.5 8 3l2.4 5-3.6 1.8z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M20.5 5.5 16 3l-2.4 5 3.6 1.8z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M8.5 6.5h7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 14.5l3 2 3-2 .6 3.3-3.6 4.2-3.6-4.2z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function ScarfIcon({ size = 20, color = "#C4607F" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M2.5 9c2.8-4 5.4 4 8.2 0s5.4-4 8.2 0s2.8 -4 2.6 0" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M2.7 9v3.4M21.3 9v3.4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11.4 12.5c.4 2.4 1 4.4-.6 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RugIcon({ size = 20, color = "#C4607F" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5" width="17" height="10" rx="2" stroke={color} strokeWidth="1.6" />
      <path d="M7 8.5h10M7 11.5h10" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M5.5 15v3M8.5 15v3M11.5 15v3M14.5 15v3M17.5 15v3" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function AmigurumiIcon({ size = 20, color = "#C4607F" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="7.5" cy="6" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="16.5" cy="6" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="13" r="7" stroke={color} strokeWidth="1.6" />
      <circle cx="9.3" cy="12" r="0.9" fill={color} />
      <circle cx="14.7" cy="12" r="0.9" fill={color} />
      <path d="M9.5 15.5c1.6 1.3 3.4 1.3 5 0" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------- Categorias ------------------------------- */
const CATEGORY_META = [
  { name: "Blusas", group: "roupa", icon: Shirt },
  { name: "Calças", group: "roupa", icon: PantsIcon },
  { name: "Shorts", group: "roupa", icon: ShortsIcon },
  { name: "Casaco", group: "roupa", icon: CoatIcon },
  { name: "Biquínis", group: "roupa", icon: BikiniIcon },
  { name: "Pantufas", group: "pantufa", icon: Footprints },
  { name: "Bolsas", group: "medida", icon: ShoppingBag },
  { name: "Cachecóis", group: "medida", icon: ScarfIcon },
  { name: "Quadrados", group: "medida", icon: Square },
  { name: "Retângulos", group: "medida", icon: RugIcon },
  { name: "Amigurumi", group: "livre", icon: AmigurumiIcon },
  { name: "Tapetes", group: "livre", icon: RugIcon },
  { name: "Decoração", group: "livre", icon: Sparkles },
  { name: "Outro", group: "livre", icon: Package },
];
const CATEGORY_NAMES = CATEGORY_META.map((c) => c.name);
function groupOf(categoryName) {
  return CATEGORY_META.find((c) => c.name === categoryName)?.group || "livre";
}
function iconOf(categoryName) {
  return CATEGORY_META.find((c) => c.name === categoryName)?.icon || Package;
}

const CLOTHING_SIZES = ["RN", "1", "2", "3", "4", "6", "8", "10", "12", "14", "16", "PP", "P", "M", "G", "GG"];
const PANTUFA_SIZES = ["RN", ...Array.from({ length: 30 }, (_, i) => String(16 + i))]; // RN, 16..45

// Categorias que possuem campo de estilo. Os estilos em si NÃO são fixos:
// eles são digitados livremente ao cadastrar cada receita, e passam a
// aparecer na pasta suspensa de filtro assim que existir ao menos uma
// receita cadastrada com aquele estilo.
const STYLE_CATEGORIES = ["Blusas", "Casaco", "Calças", "Shorts", "Biquínis", "Bolsas", "Pantufas", "Cachecóis"];
function hasStyleField(categoryName) {
  return STYLE_CATEGORIES.includes(categoryName);
}
function uniqueStyles(recipes, categoryName) {
  const set = new Set(
    recipes
      .filter((r) => r.category === categoryName && r.style && r.style.trim())
      .map((r) => r.style.trim())
  );
  return Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

// Tamanhos/medidas dentro de uma mesma receita: se a receita tiver
// "variants" (várias fichas de tamanho), usa isso; senão, cai para os
// campos simples (size/width/height/steps) como uma única variante —
// assim receitas cadastradas manualmente pelo formulário continuam
// funcionando normalmente.
function getVariants(recipe) {
  if (recipe.variants && recipe.variants.length) return recipe.variants;
  return [
    {
      key: recipe.size || (recipe.width && recipe.height ? "unico" : "padrao"),
      label: recipe.size ? recipe.size : recipe.width && recipe.height ? `${recipe.width}×${recipe.height} cm` : "Padrão",
      size: recipe.size || "",
      width: recipe.width || "",
      height: recipe.height || "",
      stitchCount: 0,
      measureLabel: recipe.size ? `Tamanho ${recipe.size}` : recipe.width && recipe.height ? `${recipe.width}cm x ${recipe.height}cm` : "",
      steps: recipe.steps || [],
    },
  ];
}
function updateVariantSteps(recipe, variantKey, newSteps) {
  if (recipe.variants && recipe.variants.length) {
    return { ...recipe, variants: recipe.variants.map((v) => (v.key === variantKey ? { ...v, steps: newSteps } : v)) };
  }
  return { ...recipe, steps: newSteps };
}

/* ------------------------------------ Ilustrações e gráficos de ponto (originais) ------------------------------------
   Tudo aqui é desenhado do zero em SVG: as "fotos" das peças são
   ilustrações de linha no estilo do site (não fotografias), e os
   gráficos de ponto usam a simbologia padrão e genérica do crochê
   (correntinha = oval, ponto baixo = "+", ponto alto = linha com uma
   travessa, ponto alto duplo = linha com duas travessas), a mesma
   notação usada universalmente em qualquer receita de crochê. */
function svgDataUri(inner, viewBox = "0 0 200 160") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><rect width="100%" height="100%" fill="rgb(255,253,252)"/>${inner}</svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// Cor das linhas do gráfico e das ilustrações de ponto (rosa pink).
const CHART_LINE = "rgb(219,39,119)";
const CHART_TEXT = "rgb(94,26,58)";

function stitchSymbol(kind, x, y, color = CHART_LINE, scale = 1) {
  switch (kind) {
    case "ring":
      return `<circle cx="${x}" cy="${y}" r="${8 * scale}" stroke="${color}" stroke-width="${2.6 * scale}" fill="white"/>`;
    case "chain":
      return `<ellipse cx="${x}" cy="${y}" rx="${6 * scale}" ry="${8.5 * scale}" stroke="${color}" stroke-width="${2.2 * scale}" fill="none"/>`;
    case "slip":
      return `<circle cx="${x}" cy="${y}" r="${4 * scale}" fill="${color}"/>`;
    case "sc":
      return `<path d="M${x - 7 * scale} ${y} h${14 * scale} M${x} ${y - 7 * scale} v${14 * scale}" stroke="${color}" stroke-width="${2.6 * scale}" stroke-linecap="round"/>`;
    case "dc":
      return `<path d="M${x} ${y - 10 * scale} v${20 * scale} M${x - 5.5 * scale} ${y - 1.5 * scale} h${11 * scale}" stroke="${color}" stroke-width="${2.6 * scale}" stroke-linecap="round"/>`;
    case "tr":
      return `<path d="M${x} ${y - 12 * scale} v${24 * scale} M${x - 5.5 * scale} ${y - 4 * scale} h${11 * scale} M${x - 5.5 * scale} ${y + 1.5 * scale} h${11 * scale}" stroke="${color}" stroke-width="${2.3 * scale}" stroke-linecap="round"/>`;
    default:
      return "";
  }
}

// Legenda com símbolo + nome do ponto, dentro de uma caixinha própria
// (fundo suave + borda), grande e fácil de ler — igual a qualquer
// gráfico de crochê: símbolo padrão explicado ao lado do nome.
function legendBlock(items, width, startY = 0) {
  const cols = 2;
  const rowH = 34;
  const colW = width / cols;
  const boxH = 22 + Math.ceil(items.length / cols) * rowH;
  let out = `<rect x="8" y="${startY}" width="${width - 16}" height="${boxH}" rx="14" fill="rgb(253,240,246)" stroke="${CHART_LINE}" stroke-width="1.3"/>`;
  items.forEach((item, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 22 + col * colW;
    const y = startY + 30 + row * rowH;
    out += stitchSymbol(item.kind, x + 9, y, CHART_TEXT, 0.85);
    out += `<text x="${x + 26}" y="${y + 5}" font-size="14" fill="${CHART_TEXT}" font-family="Verdana, Arial, sans-serif">${item.label}</text>`;
  });
  return { svg: out, height: boxH + 10 };
}

// Gráfico radial (anel mágico ao centro, "raios" com o ponto usado em
// cada carreira) — usado para peças redondas trabalhadas de dentro
// para fora (amigurumi, sola de pantufa, base de bolsa). A quantidade
// de raios muda conforme o tamanho/número escolhido.
function radialChart(spokeCount, spokeKind, legendExtra = []) {
  const width = 320;
  const centerX = width / 2;
  const centerY = 140;
  const ringR = 24;
  const spokeLen = 92;
  let chart = stitchSymbol("ring", centerX, centerY, CHART_LINE, 1.5);
  for (let i = 0; i < spokeCount; i++) {
    const angle = (i / spokeCount) * 2 * Math.PI - Math.PI / 2;
    const x1 = centerX + (ringR + 3) * Math.cos(angle);
    const y1 = centerY + (ringR + 3) * Math.sin(angle);
    const x2 = centerX + spokeLen * Math.cos(angle);
    const y2 = centerY + spokeLen * Math.sin(angle);
    chart += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${CHART_LINE}" stroke-width="1.8" opacity="0.6"/>`;
    chart += stitchSymbol(spokeKind, x2, y2, CHART_LINE, 1.15);
  }
  const legend = legendBlock([{ kind: "ring", label: "Anel mágico" }, ...legendExtra], width, 270);
  const svg = chart + legend.svg;
  return svgDataUri(svg, `0 0 ${width} ${270 + legend.height}`);
}

// Carreiras retas — usado para peças em painel reto (blusas, casacos).
// O número de colunas muda conforme o tamanho escolhido.
function dcRowsChart(cols = 9) {
  const rows = 4;
  const width = Math.max(300, 26 + cols * 28);
  const chartHeight = 26 + rows * 34;
  let out = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      out += stitchSymbol("dc", 26 + c * 28, 26 + r * 34, CHART_LINE, 1.1);
    }
  }
  const legend = legendBlock([{ kind: "chain", label: "Correntinha" }, { kind: "dc", label: "Ponto alto" }], width, chartHeight + 10);
  return svgDataUri(out + legend.svg, `0 0 ${width} ${chartHeight + 20 + legend.height}`);
}

// Pontos em leque — usado para "ponto concha"
function shellStitchChart(count = 6) {
  const width = Math.max(300, 26 + count * 40);
  let out = "";
  for (let i = 0; i < count; i++) {
    const cx = 26 + i * 40;
    out += `<path d="M${cx - 17} 58 Q${cx} 10 ${cx + 17} 58" stroke="${CHART_LINE}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    out += stitchSymbol("dc", cx, 64, CHART_LINE, 1.1);
  }
  const legend = legendBlock([{ kind: "dc", label: "Ponto alto (leque)" }], width, 90);
  return svgDataUri(out + legend.svg, `0 0 ${width} ${90 + legend.height}`);
}

// Onda contínua — usado para "ponto ventania / ponto ondas"
function waveStitchChart() {
  const width = 320;
  const out =
    `<path d="M14 50 Q50 14 86 50 T158 50 T230 50 T302 50" stroke="${CHART_LINE}" stroke-width="3.2" fill="none" stroke-linecap="round"/>` +
    `<path d="M14 88 Q50 52 86 88 T158 88 T230 88 T302 88" stroke="${CHART_LINE}" stroke-width="3.2" fill="none" stroke-linecap="round" opacity="0.55"/>`;
  const legend = legendBlock([{ kind: "dc", label: "Ponto alto (onda)" }], width, 108);
  return svgDataUri(out + legend.svg, `0 0 ${width} ${108 + legend.height}`);
}

// Fios cruzados — usado para "trança / trancinha"
function cableStitchChart(rows = 3) {
  const width = 300;
  const chartHeight = 26 + rows * 46;
  let out = "";
  for (let i = 0; i < rows; i++) {
    const y = 26 + i * 46;
    out += `<path d="M26 ${y} C70 ${y}, 70 ${y + 34}, 114 ${y + 34} C158 ${y + 34}, 158 ${y}, 202 ${y}" stroke="${CHART_LINE}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    out += `<path d="M26 ${y + 34} C70 ${y + 34}, 70 ${y}, 114 ${y} C158 ${y}, 158 ${y + 34}, 202 ${y + 34}" stroke="${CHART_LINE}" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.55"/>`;
  }
  const legend = legendBlock([{ kind: "dc", label: "Ponto alto cruzado" }], width, chartHeight + 10);
  return svgDataUri(out + legend.svg, `0 0 ${width} ${chartHeight + 20 + legend.height}`);
}

// Monta o gráfico certo para cada receita, escalando conforme o
// tamanho/medida selecionado — por isso o gráfico muda ao trocar o
// tamanho dentro da própria receita.
function computeDiagram(kind, variant) {
  const n = Number(variant?.stitchCount) || 0;
  switch (kind) {
    case "radial-sc":
      return radialChart(Math.min(16, Math.max(6, Math.round(n / 4) || 8)), "sc", [{ kind: "sc", label: "Ponto baixo" }]);
    case "rows-dc":
      return dcRowsChart(Math.min(12, Math.max(5, Math.round(n / 6) || 8)));
    case "shell":
      return shellStitchChart(Math.min(9, Math.max(4, Math.round(n / 10) || 6)));
    case "wave":
      return waveStitchChart();
    case "cable":
      return cableStitchChart(Math.min(5, Math.max(2, Math.round(n / 20) || 3)));
    default:
      return "";
  }
}

function illustrationBlusa() {
  const inner = `
    <path d="M70 20 L100 5 L130 20 L150 42 L134 56 L120 46 L120 152 L80 152 L80 46 L66 56 L50 42 Z"
      fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M84 20 Q100 36 116 20" stroke="rgb(219,39,119)" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  return svgDataUri(inner, "0 0 200 170");
}
function illustrationCasaco() {
  const inner = `
    <path d="M62 14 L100 2 L138 14 L165 44 L146 60 L126 48 L126 152 L100 152 L100 48 M100 152 L74 152 L74 48 L54 60 L35 44 Z"
      fill="rgb(253,239,224)" stroke="rgb(219,39,119)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  return svgDataUri(inner, "0 0 200 170");
}
function illustrationPantufa() {
  const inner = `
    <ellipse cx="100" cy="112" rx="55" ry="30" fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.5"/>
    <path d="M52 100 Q100 58 148 100" fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.5"/>
    <circle cx="100" cy="80" r="7" fill="rgb(244,201,93)" stroke="rgb(219,39,119)" stroke-width="1.6"/>
    <circle cx="90" cy="87" r="7" fill="rgb(244,201,93)" stroke="rgb(219,39,119)" stroke-width="1.6"/>
    <circle cx="110" cy="87" r="7" fill="rgb(244,201,93)" stroke="rgb(219,39,119)" stroke-width="1.6"/>`;
  return svgDataUri(inner, "0 0 200 150");
}
function illustrationBolsa() {
  const inner = `
    <path d="M55 55 Q100 12 145 55" fill="none" stroke="rgb(219,39,119)" stroke-width="3" stroke-linecap="round"/>
    <path d="M45 55 L155 55 L145 148 L55 148 Z" fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.5" stroke-linejoin="round"/>`;
  return svgDataUri(inner, "0 0 200 160");
}
function illustrationCachecol() {
  const inner = `
    <path d="M20 70 Q60 50 100 70 T180 70 L180 96 Q140 76 100 96 T20 96 Z" fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M22 70v26M28 68v28M34 67v29" stroke="rgb(219,39,119)" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M178 70v26M172 68v28M166 67v29" stroke="rgb(219,39,119)" stroke-width="1.6" stroke-linecap="round"/>`;
  return svgDataUri(inner, "0 0 200 140");
}
function illustrationAmigurumi() {
  const inner = `
    <ellipse cx="70" cy="45" rx="14" ry="20" fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.2"/>
    <ellipse cx="130" cy="45" rx="14" ry="20" fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.2"/>
    <circle cx="100" cy="112" r="60" fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.5"/>
    <circle cx="85" cy="102" r="5" fill="rgb(219,39,119)"/>
    <circle cx="115" cy="102" r="5" fill="rgb(219,39,119)"/>
    <path d="M88 124q12 10 24 0" stroke="rgb(219,39,119)" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  return svgDataUri(inner, "0 0 200 190");
}
function illustrationCalca() {
  const inner = `
    <path d="M55 15 L145 15 L152 55 L138 155 L108 155 L100 65 L92 155 L62 155 L48 55 Z"
      fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M52 40h96" stroke="rgb(219,39,119)" stroke-width="1.8"/>`;
  return svgDataUri(inner, "0 0 200 170");
}
function illustrationShorts() {
  const inner = `
    <path d="M45 25 L155 25 L162 65 L142 130 L112 130 L104 75 L96 130 L66 130 L58 65 Z"
      fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M50 55h100" stroke="rgb(219,39,119)" stroke-width="1.8"/>`;
  return svgDataUri(inner, "0 0 200 150");
}
function illustrationBiquini() {
  const inner = `
    <path d="M35 45 L70 20 L88 60 L58 78 Z" fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M165 45 L130 20 L112 60 L142 78 Z" fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M75 48h50" stroke="rgb(219,39,119)" stroke-width="2"/>
    <path d="M78 108l22 16 22-16 4 26-26 32-26-32z" fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.5" stroke-linejoin="round"/>`;
  return svgDataUri(inner, "0 0 200 190");
}
function illustrationQuadrado() {
  const inner = `<rect x="40" y="30" width="120" height="120" fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.5"/>${fabricTexture(40, 30, 120, 120, "dc", "rgb(219,39,119)", "rgb(163,90,110)")}`;
  return svgDataUri(inner, "0 0 200 180");
}
function illustrationRetangulo() {
  const inner = `<rect x="25" y="45" width="150" height="90" fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.5"/>${fabricTexture(25, 45, 150, 90, "dc", "rgb(219,39,119)", "rgb(163,90,110)")}<path d="M28 135v10M40 135v10M52 135v10M64 135v10M76 135v10M88 135v10M100 135v10M112 135v10M124 135v10M136 135v10M148 135v10M160 135v10M172 135v10" stroke="rgb(219,39,119)" stroke-width="1.4" stroke-linecap="round"/>`;
  return svgDataUri(inner, "0 0 200 160");
}
function illustrationTapete() {
  const inner = `<circle cx="100" cy="85" r="70" fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.5"/>${fabricTextureRing(100, 85, 12, 62, "sc", 4, "rgb(219,39,119)", "rgb(163,90,110)")}`;
  return svgDataUri(inner, "0 0 200 180");
}
function illustrationDecoracao() {
  const inner = `
    <circle cx="100" cy="90" r="9" fill="rgb(244,201,93)" stroke="rgb(219,39,119)" stroke-width="1.6"/>
    <path d="M100 90 C90 78 74 82 74 96 C74 110 92 118 100 128 C108 118 126 110 126 96 C126 82 110 78 100 90 Z" fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="60" cy="60" r="6" fill="rgb(244,201,93)" stroke="rgb(219,39,119)" stroke-width="1.4"/>
    <circle cx="140" cy="60" r="6" fill="rgb(244,201,93)" stroke="rgb(219,39,119)" stroke-width="1.4"/>
    <path d="M100 128 Q100 145 100 155" stroke="rgb(219,39,119)" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  return svgDataUri(inner, "0 0 200 170");
}
function illustrationOutro() {
  const inner = `
    <circle cx="100" cy="95" r="55" fill="rgb(251,228,236)" stroke="rgb(219,39,119)" stroke-width="2.5"/>
    <path d="M55 78c25 12 38-24 62-12s28 22 46 8" stroke="rgb(219,39,119)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M52 100c28-9 40 20 62 8s30-18 44 2" stroke="rgb(219,39,119)" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
  return svgDataUri(inner, "0 0 200 190");
}

/* ------------------------------------ Ilustração da peça já montada (campo "fotos da montagem") ------------------------------------
   Preenche o contorno real da peça (não um retângulo genérico) com a
   textura de ponto, usando clipPath para o fio "vestir" exatamente o
   formato da peça — como se fosse a peça finalizada de verdade. Cor
   escolhida à parte (um azul-petróleo) para destacar bem os pontos e
   diferenciar do amarelo usado nos passos individuais. */
const ASSEMBLED_COLOR = "rgb(35,120,128)";
const ASSEMBLED_ALT = "rgb(24,92,99)";
function assembledPiece(clipId, clipShapes, bbox, stitch, extras = "") {
  const inner = `
    <defs><clipPath id="${clipId}">${clipShapes}</clipPath></defs>
    <g clip-path="url(#${clipId})">
      <rect x="${bbox.x}" y="${bbox.y}" width="${bbox.w}" height="${bbox.h}" fill="rgb(255,253,250)"/>
      ${fabricTexture(bbox.x, bbox.y, bbox.w, bbox.h, stitch, ASSEMBLED_COLOR, ASSEMBLED_ALT)}
    </g>
    ${extras}`;
  return inner;
}
function assembledBlusa() {
  const shape = `M70 20 L100 5 L130 20 L150 42 L134 56 L120 46 L120 152 L80 152 L80 46 L66 56 L50 42 Z`;
  const inner = assembledPiece(
    "clipBlusa",
    `<path d="${shape}"/>`,
    { x: 50, y: 5, w: 100, h: 148 },
    "dc",
    `<path d="${shape}" fill="none" stroke="${ASSEMBLED_COLOR}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M84 20 Q100 36 116 20" stroke="${ASSEMBLED_COLOR}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`
  );
  return svgDataUri(inner, "0 0 200 170");
}
function assembledCasaco() {
  const shape = `M62 14 L100 2 L138 14 L165 44 L146 60 L126 48 L126 152 L100 152 L100 48 M100 152 L74 152 L74 48 L54 60 L35 44 Z`;
  const inner = assembledPiece(
    "clipCasaco",
    `<path d="${shape}"/>`,
    { x: 35, y: 2, w: 130, h: 150 },
    "dc",
    `<path d="${shape}" fill="none" stroke="${ASSEMBLED_COLOR}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>`
  );
  return svgDataUri(inner, "0 0 200 170");
}
function assembledPantufa() {
  const inner = assembledPiece(
    "clipPantufa",
    `<ellipse cx="100" cy="112" rx="55" ry="30"/><path d="M52 100 Q100 58 148 100"/>`,
    { x: 45, y: 58, w: 110, h: 84 },
    "sc",
    `<ellipse cx="100" cy="112" rx="55" ry="30" fill="none" stroke="${ASSEMBLED_COLOR}" stroke-width="2.6"/><path d="M52 100 Q100 58 148 100" fill="none" stroke="${ASSEMBLED_COLOR}" stroke-width="2.6"/><circle cx="100" cy="80" r="7" fill="rgb(244,201,93)" stroke="${ASSEMBLED_COLOR}" stroke-width="1.6"/><circle cx="90" cy="87" r="7" fill="rgb(244,201,93)" stroke="${ASSEMBLED_COLOR}" stroke-width="1.6"/><circle cx="110" cy="87" r="7" fill="rgb(244,201,93)" stroke="${ASSEMBLED_COLOR}" stroke-width="1.6"/>`
  );
  return svgDataUri(inner, "0 0 200 150");
}
function assembledBolsa() {
  const shape = `M45 55 L155 55 L145 148 L55 148 Z`;
  const inner = assembledPiece(
    "clipBolsa",
    `<path d="${shape}"/>`,
    { x: 45, y: 55, w: 110, h: 93 },
    "sc",
    `<path d="${shape}" fill="none" stroke="${ASSEMBLED_COLOR}" stroke-width="2.6" stroke-linejoin="round"/><path d="M55 55 Q100 12 145 55" fill="none" stroke="${ASSEMBLED_COLOR}" stroke-width="3.2" stroke-linecap="round"/>`
  );
  return svgDataUri(inner, "0 0 200 160");
}
function assembledCachecol() {
  const shape = `M20 70 Q60 50 100 70 T180 70 L180 96 Q140 76 100 96 T20 96 Z`;
  const inner = assembledPiece(
    "clipCachecol",
    `<path d="${shape}"/>`,
    { x: 20, y: 50, w: 160, h: 46 },
    "dc",
    `<path d="${shape}" fill="none" stroke="${ASSEMBLED_COLOR}" stroke-width="2.6" stroke-linejoin="round"/><path d="M22 70v26M28 68v28M34 67v29" stroke="${ASSEMBLED_COLOR}" stroke-width="1.6" stroke-linecap="round"/><path d="M178 70v26M172 68v28M166 67v29" stroke="${ASSEMBLED_COLOR}" stroke-width="1.6" stroke-linecap="round"/>`
  );
  return svgDataUri(inner, "0 0 200 140");
}

/* ------------------------------------ Ilustrações do passo a passo (uma imagem por descrição, tamanho padrão) ------------------------------------
   Cada passo do "modo de fazer" ganha sua própria ilustração — sempre
   desenhada à mão em SVG (não fotografia). A textura preenche a peça
   de fio a fio, em fileiras compactas e alternadas (efeito "tijolinho"),
   trocando o símbolo do ponto conforme o que está descrito naquele
   passo (correntinha, ponto baixo ou ponto alto) para parecer o
   tecido de crochê de verdade, e não só uma forma lisa. Um pequeno
   desenho de agulha no fio marca os passos "em execução". O desenho é
   o mesmo para todos os tamanhos de uma receita (só o texto do passo
   muda o número de pontos). */
// Textura de tecido com efeito de relevo: cada ponto tem uma sombra
// atrás (mais escura, deslocada) e um brilho fino por cima (mais
// claro), para dar volume e um ar mais "de verdade" — em vez de um
// traço fino e chapado.
function stitchRelief(kind, cx, cy, color, altColor, highlight) {
  if (kind === "chain") {
    return (
      `<ellipse cx="${(cx + 1).toFixed(1)}" cy="${(cy + 1).toFixed(1)}" rx="6.5" ry="9" stroke="${altColor}" stroke-width="4.5" fill="none" opacity="0.55"/>` +
      `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="6.5" ry="9" stroke="${color}" stroke-width="4.5" fill="none"/>` +
      `<ellipse cx="${(cx - 1.2).toFixed(1)}" cy="${(cy - 1.2).toFixed(1)}" rx="3" ry="4.5" stroke="${highlight}" stroke-width="1.6" fill="none" opacity="0.85"/>`
    );
  }
  if (kind === "dc") {
    return (
      `<path d="M${(cx + 2).toFixed(1)} ${(cy - 10).toFixed(1)} v20 M${(cx - 4).toFixed(1)} ${(cy - 1).toFixed(1)} h11" stroke="${altColor}" stroke-width="6" stroke-linecap="round" opacity="0.55"/>` +
      `<path d="M${cx.toFixed(1)} ${(cy - 10).toFixed(1)} v20 M${(cx - 5.5).toFixed(1)} ${(cy - 1).toFixed(1)} h11" stroke="${color}" stroke-width="6" stroke-linecap="round"/>` +
      `<path d="M${(cx - 1.2).toFixed(1)} ${(cy - 9).toFixed(1)} v8" stroke="${highlight}" stroke-width="2" stroke-linecap="round" opacity="0.85"/>`
    );
  }
  // sc — formato de "V", também com sombra e brilho
  return (
    `<path d="M${(cx - 2.5).toFixed(1)} ${(cy - 2).toFixed(1)} L${(cx + 2).toFixed(1)} ${(cy + 5).toFixed(1)} L${(cx + 6.5).toFixed(1)} ${(cy - 2).toFixed(1)}" stroke="${altColor}" stroke-width="5.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.55"/>` +
    `<path d="M${(cx - 4.5).toFixed(1)} ${(cy - 2.5).toFixed(1)} L${cx.toFixed(1)} ${(cy + 5).toFixed(1)} L${(cx + 4.5).toFixed(1)} ${(cy - 2.5).toFixed(1)}" stroke="${color}" stroke-width="5.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M${(cx - 3).toFixed(1)} ${(cy - 1.8).toFixed(1)} L${(cx - 0.8).toFixed(1)} ${(cy + 2.5).toFixed(1)}" stroke="${highlight}" stroke-width="1.6" stroke-linecap="round" opacity="0.85"/>`
  );
}
function fabricTexture(x, y, w, h, stitch = "sc", color = "rgb(35,120,128)", altColor = "rgb(24,92,99)", highlight = "rgb(240,120,175)") {
  const rowGap = stitch === "dc" ? 20 : stitch === "chain" ? 18 : 16;
  const colGap = stitch === "dc" ? 18 : stitch === "chain" ? 17 : 15;
  const rows = Math.max(2, Math.floor(h / rowGap));
  const cols = Math.max(2, Math.floor(w / colGap));
  let out = "";
  for (let r = 0; r < rows; r++) {
    const cy = y + rowGap * (r + 0.75);
    const offset = (r % 2) * (colGap / 2);
    for (let c = 0; c < cols; c++) {
      const cx = x + colGap * (c + 0.65) + offset;
      if (cx > x + w - 5 || cx < x + 5) continue;
      out += stitchRelief(stitch, cx, cy, color, altColor, highlight);
    }
  }
  return out;
}
function fabricTextureRing(cx, cy, rMin, rMax, stitch = "sc", rings = 3, color = "rgb(35,120,128)", altColor = "rgb(24,92,99)", highlight = "rgb(240,120,175)") {
  let out = "";
  for (let ring = 0; ring < rings; ring++) {
    const r = rMin + ((rMax - rMin) / rings) * (ring + 0.6);
    const count = Math.max(6, Math.round((r * 2 * Math.PI) / 16));
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      out += stitchRelief(stitch, x, y, color, altColor, highlight);
    }
  }
  return out;
}
// Pequena agulha de crochê com o fio, marcando um passo "em execução".
function hookGlyph(x, y, angle = -20) {
  return `<g transform="translate(${x},${y}) rotate(${angle})">
    <path d="M-46 0 h34" stroke="rgb(150,110,70)" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M-12 0 q7 -7 0 -12 q-6 -5 -11 0" stroke="rgb(150,110,70)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="4" cy="2" r="3.4" fill="none" stroke="rgb(35,120,128)" stroke-width="1.8"/>
    <path d="M4 5 q3 8 -2 14" stroke="rgb(35,120,128)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  </g>`;
}
function finishingStep(shapeInner, label) {
  const inner = `${shapeInner}<text x="100" y="192" text-anchor="middle" font-size="12" font-weight="700" fill="rgb(91,58,69)" font-family="sans-serif">${label}</text>`;
  return svgDataUri(inner, "0 0 200 200");
}
function finishingBlusa() {
  return [
    finishingStep(
      `${fabricTexture(20, 44, 160, 14, "chain")}${hookGlyph(170, 50, -15)}`,
      "1. Montar as correntinhas"
    ),
    finishingStep(
      `<rect x="35" y="15" width="130" height="100" rx="4" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(35, 15, 130, 100, "dc")}${hookGlyph(158, 22, -15)}`,
      "2. Trabalhar as carreiras"
    ),
    finishingStep(
      `<rect x="35" y="30" width="55" height="80" rx="4" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(35, 30, 55, 80, "dc")}<rect x="110" y="30" width="55" height="80" rx="4" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(110, 30, 55, 80, "dc")}<path d="M90 34h20" stroke="rgb(35,120,128)" stroke-width="2" stroke-dasharray="4 3"/><path d="M100 20l6 10-12 0z" fill="rgb(35,120,128)"/>`,
      "3. Costurar os ombros"
    ),
    finishingStep(
      `<rect x="55" y="20" width="90" height="110" rx="4" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(55, 20, 90, 110, "dc")}<path d="M55 60v50" stroke="rgb(35,120,128)" stroke-width="2" stroke-dasharray="4 3"/><path d="M145 60v50" stroke="rgb(35,120,128)" stroke-width="2" stroke-dasharray="4 3"/><path d="M40 85l12 0-6 10z" fill="rgb(35,120,128)"/><path d="M160 85l-12 0 6 10z" fill="rgb(35,120,128)"/>`,
      "4. Costurar as laterais"
    ),
    finishingStep(
      `<path d="M70 20 L100 8 L130 20 L145 40 L100 130 L55 40 Z" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(60, 45, 80, 75, "dc")}<path d="M85 20 Q100 34 115 20" stroke="rgb(35,120,128)" stroke-width="2.4" fill="none"/>`,
      "5. Acabamento (arremate na gola e nas cavas)"
    ),
  ];
}
function finishingCasaco() {
  return [
    finishingStep(
      `<rect x="30" y="25" width="140" height="55" rx="4" fill="rgb(220,240,240)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(30, 25, 140, 55, "dc")}${hookGlyph(163, 32, -15)}`,
      "1. Montar o retângulo do corpo"
    ),
    finishingStep(
      `<rect x="30" y="25" width="140" height="55" rx="4" fill="rgb(220,240,240)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(30, 25, 140, 55, "dc")}<path d="M100 25v55" stroke="rgb(35,120,128)" stroke-width="2" stroke-dasharray="4 3"/>`,
      "2. Costurar os ombros"
    ),
    finishingStep(
      `<rect x="55" y="20" width="40" height="70" rx="4" fill="rgb(220,240,240)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(55, 20, 40, 70, "dc")}<rect x="105" y="20" width="40" height="70" rx="4" fill="rgb(220,240,240)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(105, 20, 40, 70, "dc")}`,
      "3. Montar as mangas"
    ),
    finishingStep(
      `<rect x="55" y="20" width="40" height="70" rx="4" fill="rgb(220,240,240)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(55, 20, 40, 70, "dc")}<rect x="105" y="20" width="40" height="70" rx="4" fill="rgb(220,240,240)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(105, 20, 40, 70, "dc")}<path d="M40 55h15" stroke="rgb(35,120,128)" stroke-width="2" stroke-dasharray="4 3"/><path d="M145 55h15" stroke="rgb(35,120,128)" stroke-width="2" stroke-dasharray="4 3"/>`,
      "4. Unir as mangas ao corpo"
    ),
    finishingStep(
      `<path d="M50 20 L150 20 L140 150 L60 150 Z" fill="rgb(220,240,240)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(60, 30, 80, 110, "dc")}<path d="M50 20 L60 150" stroke="rgb(35,120,128)" stroke-width="2.6"/><path d="M150 20 L140 150" stroke="rgb(35,120,128)" stroke-width="2.6"/>`,
      "5. Acabamento (contorno em ponto caranguejo)"
    ),
  ];
}
function finishingPantufa() {
  return [
    finishingStep(
      `<circle cx="100" cy="100" r="14" stroke="rgb(35,120,128)" stroke-width="2" fill="none"/>${fabricTextureRing(100, 100, 16, 26, "sc", 1)}${hookGlyph(140, 88, -10)}`,
      "1. Anel mágico (ponta da sola)"
    ),
    finishingStep(
      `<ellipse cx="100" cy="110" rx="60" ry="32" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTextureRing(100, 110, 12, 50, "sc", 3)}`,
      "2. Aumentar até formar a sola"
    ),
    finishingStep(
      `<ellipse cx="100" cy="112" rx="55" ry="30" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTextureRing(100, 112, 12, 46, "dc", 2)}<path d="M50 100 Q100 60 150 100" fill="none" stroke="rgb(35,120,128)" stroke-width="2" stroke-dasharray="4 3"/>`,
      "3. Levantar a lateral"
    ),
    finishingStep(
      `<ellipse cx="100" cy="112" rx="55" ry="30" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTextureRing(100, 112, 12, 46, "dc", 2)}<path d="M55 100 Q100 62 145 100" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2" stroke-dasharray="4 3"/>`,
      "4. Fechar a parte de cima"
    ),
    finishingStep(
      `<ellipse cx="100" cy="112" rx="55" ry="30" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTextureRing(100, 112, 12, 46, "dc", 2)}<path d="M55 100 Q100 62 145 100" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/><circle cx="100" cy="80" r="7" fill="rgb(244,201,93)" stroke="rgb(35,120,128)" stroke-width="1.6"/>`,
      "5. Acabamento (costurar a rosinha)"
    ),
  ];
}
function finishingBolsa() {
  return [
    finishingStep(
      `<ellipse cx="100" cy="120" rx="45" ry="18" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTextureRing(100, 120, 8, 40, "sc", 2)}${hookGlyph(150, 108, -10)}`,
      "1. Base oval em ponto baixo"
    ),
    finishingStep(
      `<path d="M55 55 L145 55 L138 140 L62 140 Z" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(58, 58, 82, 80, "sc")}`,
      "2. Subir o corpo"
    ),
    finishingStep(
      `<path d="M55 55 L145 55 L138 140 L62 140 Z" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(58, 58, 82, 80, "sc")}<path d="M55 60h90" stroke="rgb(35,120,128)" stroke-width="2.4"/>`,
      "3. Arrematar a borda superior"
    ),
    finishingStep(
      `<rect x="40" y="70" width="120" height="14" rx="6" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(40, 70, 120, 14, "sc")}<rect x="40" y="92" width="120" height="14" rx="6" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(40, 92, 120, 14, "sc")}`,
      "4. Fazer as tiras da alça"
    ),
    finishingStep(
      `<path d="M55 55 Q100 12 145 55" fill="none" stroke="rgb(35,120,128)" stroke-width="3"/><path d="M45 55 L155 55 L145 148 L55 148 Z" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(58, 58, 82, 80, "sc")}<path d="M60 55l-8-8M140 55l8-8" stroke="rgb(35,120,128)" stroke-width="2" stroke-dasharray="3 3"/>`,
      "5. Acabamento (costurar a alça trançada)"
    ),
  ];
}
function finishingCachecol() {
  return [
    finishingStep(
      `<rect x="20" y="80" width="160" height="24" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(20, 80, 160, 24, "dc")}${hookGlyph(163, 84, -15)}`,
      "1. Base reta (2 carreiras lisas)"
    ),
    finishingStep(
      `<rect x="20" y="70" width="160" height="45" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(20, 70, 160, 20, "dc")}<path d="M40 95 C55 110,65 110,80 95 C95 110,105 110,120 95 C135 110,145 110,160 95" stroke="rgb(35,120,128)" stroke-width="2" fill="none"/>`,
      "2. Começar o cruzamento da trança"
    ),
    finishingStep(
      `<rect x="20" y="60" width="160" height="70" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/><path d="M40 70 C55 85,65 85,80 70 C95 85,105 85,120 70 C135 85,145 85,160 70" stroke="rgb(35,120,128)" stroke-width="2" fill="none"/><path d="M40 105 C55 120,65 120,80 105 C95 120,105 120,120 105 C135 120,145 120,160 105" stroke="rgb(35,120,128)" stroke-width="2" fill="none" opacity="0.6"/>`,
      "3. Repetir o cruzamento até o comprimento"
    ),
    finishingStep(
      `<rect x="20" y="80" width="160" height="24" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(20, 80, 160, 24, "sc")}<rect x="18" y="78" width="164" height="28" fill="none" stroke="rgb(35,120,128)" stroke-width="1.4" stroke-dasharray="3 2"/>`,
      "4. Finalizar com carreira de ponto baixo no contorno"
    ),
    finishingStep(
      `<rect x="20" y="80" width="160" height="24" fill="rgb(214,238,238)" stroke="rgb(35,120,128)" stroke-width="2"/>${fabricTexture(20, 80, 160, 24, "sc")}<path d="M20 104v14M26 103v15M32 102v16M168 104v14M174 103v15M180 102v16" stroke="rgb(35,120,128)" stroke-width="1.6" stroke-linecap="round"/>`,
      "5. Acabamento (franjas nas pontas)"
    ),
  ];
}

/* ------------------------------------ Conjuntos genéricos de ilustração por passo ------------------------------------
   Para as receitas mais simples (3 passos), reaproveitamos um conjunto
   de 3 ilustrações — início, meio (carreiras/rodadas) e acabamento —
   já com a textura de ponto e a cor rosa pink. Um conjunto para peças
   trabalhadas em painel reto (RECT) e outro para peças redondas
   trabalhadas a partir do anel mágico (ROUND). */
const RECT_STEP_1 = finishingStep(
  `${fabricTexture(20, 55, 160, 14, "chain", CHART_LINE, "rgb(150,20,85)")}${hookGlyph(170, 60, -15)}`,
  "1. Monte as correntinhas"
);
const RECT_STEP_2 = finishingStep(
  `<rect x="30" y="20" width="140" height="110" rx="4" fill="rgb(253,235,244)" stroke="${CHART_LINE}" stroke-width="2"/>${fabricTexture(30, 20, 140, 110, "dc", CHART_LINE, "rgb(150,20,85)")}${hookGlyph(158, 28, -15)}`,
  "2. Trabalhe as carreiras"
);
const RECT_STEP_3 = finishingStep(
  `<rect x="30" y="20" width="140" height="110" rx="4" fill="rgb(253,235,244)" stroke="${CHART_LINE}" stroke-width="2.6"/>${fabricTexture(30, 20, 140, 110, "dc", CHART_LINE, "rgb(150,20,85)")}<path d="M30 20h140M30 130h140" stroke="${CHART_LINE}" stroke-width="2.8"/>`,
  "3. Acabamento: finalize as bordas"
);
const RECT_STEPS = [RECT_STEP_1, RECT_STEP_2, RECT_STEP_3];

const ROUND_STEP_1 = finishingStep(
  `<circle cx="100" cy="100" r="16" stroke="${CHART_LINE}" stroke-width="2.6" fill="white"/>${fabricTextureRing(100, 100, 18, 30, "sc", 1, CHART_LINE, "rgb(150,20,85)")}${hookGlyph(148, 82, -10)}`,
  "1. Anel mágico"
);
const ROUND_STEP_2 = finishingStep(
  `<circle cx="100" cy="100" r="70" fill="rgb(253,235,244)" stroke="${CHART_LINE}" stroke-width="2"/>${fabricTextureRing(100, 100, 14, 64, "sc", 4, CHART_LINE, "rgb(150,20,85)")}`,
  "2. Aumente as carreiras"
);
const ROUND_STEP_3 = finishingStep(
  `<circle cx="100" cy="100" r="70" fill="rgb(253,235,244)" stroke="${CHART_LINE}" stroke-width="2.6"/>${fabricTextureRing(100, 100, 14, 64, "sc", 4, CHART_LINE, "rgb(150,20,85)")}`,
  "3. Acabamento: arremate a borda"
);
const ROUND_STEPS = [ROUND_STEP_1, ROUND_STEP_2, ROUND_STEP_3];

/* ------------------------------------ Tabelas de medidas por tamanho ------------------------------------
   Medidas aproximadas (o crochê sempre varia um pouco conforme o fio e
   a tensão de cada pessoa — use como ponto de partida e ajuste se
   precisar). Gauge de referência: ~1.7 pontos altos por cm e ~2 pontos
   baixos por cm, com fio médio (nº 4) e agulha 4mm. */
const GAUGE_DC = 1.7;

// Tamanhos RN a 16 seguem a numeração infantil; PP a GG são tamanhos
// adulto feminino (medidas de busto/comprimento padrão brasileiro).
const BLUSA_WIDTH_CM = { RN: 20, "1": 21, "2": 22, "3": 23, "4": 24, "6": 26, "8": 28, "10": 30, "12": 32, "14": 34, "16": 36, PP: 43, P: 45, M: 48, G: 51, GG: 54 };
const BLUSA_HEIGHT_CM = { RN: 24, "1": 27, "2": 29, "3": 31, "4": 33, "6": 36, "8": 39, "10": 42, "12": 45, "14": 47, "16": 49, PP: 56, P: 58, M: 60, G: 62, GG: 65 };
const CASACO_WIDTH_CM = { RN: 26, "1": 27, "2": 29, "3": 31, "4": 33, "6": 36, "8": 39, "10": 42, "12": 45, "14": 48, "16": 51, PP: 62, P: 65, M: 68, G: 72, GG: 76 };
const CASACO_HEIGHT_CM = { RN: 28, "1": 31, "2": 34, "3": 37, "4": 40, "6": 44, "8": 48, "10": 52, "12": 56, "14": 59, "16": 62, PP: 70, P: 72, M: 75, G: 78, GG: 82 };

function footLengthCm(size) {
  if (size === "RN") return 9;
  return Math.round(Number(size) * 0.63 * 10) / 10;
}

/* ------------------------------------ Geradores de receita — uma postagem por peça, com tamanhos selecionáveis ------------------------------------
   Cada peça é UMA única receita. Dentro dela, "variants" guarda a
   descrição de pontos específica de cada tamanho/número/medida — é
   isso que muda quando a pessoa escolhe outro tamanho dentro da
   própria receita, sem precisar criar uma nova postagem. */
function blusaOmbroRecipe() {
  const stepImages = finishingBlusa();
  const variants = CLOTHING_SIZES.map((size) => {
    const width = BLUSA_WIDTH_CM[size];
    const height = BLUSA_HEIGHT_CM[size];
    const chain = Math.round(width * GAUGE_DC);
    return {
      key: size,
      label: size,
      size,
      width: "",
      height: "",
      stitchCount: chain,
      measureLabel: `${width}cm x ${height}cm`,
      steps: [
        { id: "s1", order: 1, description: `Monte ${chain} correntinhas e feche a 1ª carreira com 1 ponto alto em cada correntinha (${chain - 1} pontos altos).`, photo: stepImages[0] },
        { id: "s2", order: 2, description: `Trabalhe em ponto alto, sempre voltando com correntinha de subida, até formar um retângulo de aproximadamente ${height}cm de altura. Repita para a segunda peça (costas).`, photo: stepImages[1] },
        { id: "s3", order: 3, description: `Sobreponha as duas peças e costure os ombros: cerca de ${Math.round(width * 0.4)}cm de cada lado, deixando o restante livre no centro para a gola.`, photo: stepImages[2] },
        { id: "s4", order: 4, description: "Costure as laterais de baixo para cima, deixando as cavas dos braços abertas na parte superior.", photo: stepImages[3] },
        { id: "s5", order: 5, description: "Acabamento: faça uma carreira de ponto baixo ao redor de toda a gola e de cada cava, para arrematar e dar firmeza à peça.", photo: stepImages[4] },
      ],
    };
  });
  return {
    id: "blusa-ombro",
    title: "Blusa Ombro a Ombro Verão",
    description: "Blusinha reta e fresquinha, trabalhada em duas peças retangulares (frente e costas) unidas nos ombros e nas laterais, inteiramente em ponto alto. Escolha o tamanho abaixo para ver a contagem de pontos e as medidas certas.",
    category: "Blusas",
    image: illustrationBlusa(),
    style: "Ombro a ombro",
    diagramKind: "rows-dc",
    variants,
    assemblyPhotos: [assembledBlusa()],
    videos: [],
  };
}

function casacoKimonoRecipe() {
  const stepImages = finishingCasaco();
  const variants = CLOTHING_SIZES.map((size) => {
    const width = CASACO_WIDTH_CM[size];
    const height = CASACO_HEIGHT_CM[size];
    const chain = Math.round(width * GAUGE_DC);
    const mangaWidth = Math.round(width * 0.7);
    const mangaHeight = Math.round(height * 0.55);
    return {
      key: size,
      label: size,
      size,
      width: "",
      height: "",
      stitchCount: chain,
      measureLabel: `${width}cm x ${height}cm`,
      steps: [
        { id: "s1", order: 1, description: `Monte ${chain} correntinhas e trabalhe em ponto alto até formar um retângulo de aproximadamente ${width}cm x ${height}cm (o corpo do casaco, aberto na frente).`, photo: stepImages[0] },
        { id: "s2", order: 2, description: `Dobre a peça ao meio no sentido da largura e costure os ombros, deixando cerca de ${Math.round(width * 0.36)}cm livres de cada lado para as mangas.`, photo: stepImages[1] },
        { id: "s3", order: 3, description: `Monte as mangas separadamente: retângulos de ${mangaWidth}cm x ${mangaHeight}cm.`, photo: stepImages[2] },
        { id: "s4", order: 4, description: "Costure as mangas nas aberturas laterais do corpo e feche a parte de baixo das mangas e das laterais, deixando aberta toda a frente do casaco.", photo: stepImages[3] },
        { id: "s5", order: 5, description: "Acabamento: finalize toda a borda (frente, gola, barra e punhos) com uma carreira de ponto caranguejo (ponto baixo trabalhado da esquerda para a direita) para um acabamento firme e decorativo.", photo: stepImages[4] },
      ],
    };
  });
  return {
    id: "casaco-kimono",
    title: "Casaco Kimono",
    description: "Casaco aberto estilo kimono, sem botões — é só vestir por cima. Corpo em duas peças retangulares costuradas nos ombros, com mangas soltas. Escolha o tamanho abaixo para ver a contagem de pontos e as medidas certas.",
    category: "Casaco",
    image: illustrationCasaco(),
    style: "Kimono",
    diagramKind: "rows-dc",
    variants,
    assemblyPhotos: [assembledCasaco()],
    videos: [],
  };
}

function pantufaBotaoRosaRecipe() {
  const stepImages = finishingPantufa();
  const variants = PANTUFA_SIZES.map((size) => {
    const length = footLengthCm(size);
    const baseChain = Math.max(8, Math.round(length * 1.1));
    return {
      key: size,
      label: size,
      size,
      width: "",
      height: "",
      stitchCount: baseChain,
      measureLabel: `${length}cm de comprimento`,
      steps: [
        { id: "s1", order: 1, description: `Faça um anel mágico com 6 pontos baixos para iniciar a ponta da sola (chegando a ${baseChain} pontos na volta seguinte).`, photo: stepImages[0] },
        { id: "s2", order: 2, description: `Continue em ponto baixo, aumentando apenas nas laterais (não na frente e no centro), até a sola atingir cerca de ${length}cm de comprimento, em formato de pé achatado.`, photo: stepImages[1] },
        { id: "s3", order: 3, description: "A partir da borda da sola, trabalhe em ponto alto ao redor, sem aumentar, por 4 a 5 carreiras para formar a lateral da pantufa.", photo: stepImages[2] },
        { id: "s4", order: 4, description: "Feche a parte de cima com pontos baixos unindo as bordas da frente, deixando aberta a entrada para o pé.", photo: stepImages[3] },
        { id: "s5", order: 5, description: "Acabamento: faça uma rosinha simples (tira comprida alternando pontos baixos e correntinhas, enrolada em pétalas) e costure na frente da pantufa.", photo: stepImages[4] },
      ],
    };
  });
  return {
    id: "pantufa-botao-rosa",
    title: "Pantufa Botão de Rosa",
    description: "Pantufa confortável com sola em formato de pé e uma rosinha de crochê decorando a parte de cima. Escolha o número abaixo para ver o comprimento da sola e a contagem de pontos daquele tamanho.",
    category: "Pantufas",
    image: illustrationPantufa(),
    style: "Com laço",
    diagramKind: "radial-sc",
    variants,
    assemblyPhotos: [assembledPantufa()],
    videos: [],
  };
}

const BOLSA_SIZES = [
  { label: "Pequena", width: 22, height: 18 },
  { label: "Média", width: 30, height: 25 },
  { label: "Grande", width: 38, height: 32 },
];
function bolsaTrancadaRecipe() {
  const stepImages = finishingBolsa();
  const variants = BOLSA_SIZES.map((s) => {
    const baseChain = Math.round(s.width * 0.8);
    const alcaLen = Math.round(s.height * 2.4);
    return {
      key: s.label.toLowerCase(),
      label: `${s.label} (${s.width}×${s.height}cm)`,
      size: "",
      width: String(s.width),
      height: String(s.height),
      stitchCount: baseChain,
      measureLabel: `${s.width}cm x ${s.height}cm`,
      steps: [
        { id: "s1", order: 1, description: `Monte uma corrente de ${baseChain} pontos e trabalhe ao redor dela em ponto baixo para formar uma base oval de cerca de ${s.width}cm no maior comprimento.`, photo: stepImages[0] },
        { id: "s2", order: 2, description: `A partir da base, continue em ponto baixo sem aumentar, subindo as carreiras retas até atingir ${s.height}cm de altura para o corpo da bolsa.`, photo: stepImages[1] },
        { id: "s3", order: 3, description: "Finalize o corpo com uma carreira de ponto baixíssimo para arrematar a borda superior.", photo: stepImages[2] },
        { id: "s4", order: 4, description: `Para a alça, faça duas tiras de ${alcaLen}cm em ponto baixo bem apertado.`, photo: stepImages[3] },
        { id: "s5", order: 5, description: "Acabamento: trance as duas tiras juntas e costure as pontas da alça trançada nas laterais internas da bolsa.", photo: stepImages[4] },
      ],
    };
  });
  return {
    id: "bolsa-trancada",
    title: "Bolsa Trançada Rústica",
    description: "Bolsa estruturada tipo tote, em ponto baixo bem firme, com alça dupla trançada. Escolha o tamanho abaixo para ver as medidas e a contagem de pontos.",
    category: "Bolsas",
    image: illustrationBolsa(),
    style: "Tote",
    diagramKind: "radial-sc",
    variants,
    assemblyPhotos: [assembledBolsa()],
    videos: [],
  };
}

const CACHECOL_TRANCA_SIZES = [
  { label: "Curto", width: 16, height: 130 },
  { label: "Padrão", width: 20, height: 160 },
  { label: "Longo", width: 24, height: 190 },
];
function cachecolTrancaRecipe() {
  const stepImages = finishingCachecol();
  const variants = CACHECOL_TRANCA_SIZES.map((s) => {
    const chain = Math.round(s.width * GAUGE_DC);
    return {
      key: s.label.toLowerCase(),
      label: `${s.label} (${s.width}×${s.height}cm)`,
      size: "",
      width: String(s.width),
      height: String(s.height),
      stitchCount: chain,
      measureLabel: `${s.width}cm x ${s.height}cm`,
      steps: [
        { id: "s1", order: 1, description: `Monte ${chain} correntinhas e trabalhe 2 carreiras em ponto alto simples, sem desenho, para formar a base.`, photo: stepImages[0] },
        { id: "s2", order: 2, description: "Na 3ª carreira, comece o desenho da trança: a cada grupo de 6 pontos, pule os 2 primeiros e trabalhe 2 pontos altos na frente das carreiras anteriores, depois volte e feche os 2 pontos pulados, cruzando as hastes.", photo: stepImages[1] },
        { id: "s3", order: 3, description: `Repita o cruzamento a cada 4 carreiras, mantendo ponto alto liso entre um cruzamento e outro, até atingir ${s.height}cm de comprimento.`, photo: stepImages[2] },
        { id: "s4", order: 4, description: "Finalize com 2 carreiras retas em ponto alto simples, iguais à base, e depois uma carreira de ponto baixo ao redor de toda a peça.", photo: stepImages[3] },
        { id: "s5", order: 5, description: "Acabamento: corte franjas de 15cm e prenda com um nó simples em cada ponta do cachecol, distribuídas a cada 2 pontos.", photo: stepImages[4] },
      ],
    };
  });
  return {
    id: "cachecol-tranca",
    title: "Cachecol Trança Dupla",
    description: "Cachecol despojado com desenho de trança feito só com pontos altos cruzados. Escolha o tamanho abaixo para ver as medidas e a contagem de pontos.",
    category: "Cachecóis",
    image: illustrationCachecol(),
    style: "Trançado",
    diagramKind: "cable",
    variants,
    assemblyPhotos: [assembledCachecol()],
    videos: [],
  };
}

/* ------------------------------------ Dados demo ------------------------------------ */
const seedRecipes = [
  {
    id: "r1",
    title: "Amigurumi Coelhinha Flor",
    description:
      "Uma coelhinha fofa de amigurumi com uma florzinha na orelha. Ideal para iniciantes em amigurumi, feita com ponto baixo.",
    category: "Amigurumi",
    image: illustrationAmigurumi(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(8, "sc", [{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça um anel mágico com 6 pontos baixos para iniciar a cabeça.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Aumente 1 ponto em cada ponto na 2ª carreira (12 pontos).", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Continue aumentando alternado até atingir 24 pontos.", photo: ROUND_STEPS[2] },
    ],
    videos: [
      { id: "v1", title: "Anel mágico passo a passo", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", type: "tutorial" },
    ],
  },
  {
    id: "r2",
    title: "Blusa Infantil Ponto Concha",
    description: "Blusinha leve em ponto concha, ótima para o verão. Receita desta ficha é para o tamanho 4.",
    category: "Blusas",
    image: illustrationBlusa(),
    size: "4",
    style: "Ponto concha",
    width: "",
    height: "",
    diagram: shellStitchChart(6),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 60 correntinhas e feche em argola.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe 3 carreiras em ponto concha para o corpo.", photo: RECT_STEPS[1] },
    ],
    videos: [],
  },
  {
    id: "r3",
    title: "Pantufa Trancinha",
    description: "Pantufa macia em ponto alto com trancinha decorativa na frente. Ficha para o número 35.",
    category: "Pantufas",
    image: illustrationPantufa(),
    size: "35",
    style: "Trancinha",
    width: "",
    height: "",
    diagram: cableStitchChart(2),
    assemblyPhotos: [],
    steps: [{ id: "s1", order: 1, description: "Faça a base com correntinhas do tamanho da sola desejada.", photo: ROUND_STEPS[0] }],
    videos: [],
  },
  {
    id: "r4",
    title: "Cachecol Ondas do Mar",
    description: "Cachecol em ponto ventania, textura ondulada e bem quentinho.",
    category: "Cachecóis",
    image: illustrationCachecol(),
    size: "",
    style: "Ponto ondas",
    width: "18",
    height: "150",
    diagram: waveStitchChart(),
    assemblyPhotos: [],
    steps: [{ id: "s1", order: 1, description: "Monte 40 correntinhas para iniciar a largura.", photo: RECT_STEPS[0] }],
    videos: [],
  },
  blusaOmbroRecipe(),
  casacoKimonoRecipe(),
  bolsaTrancadaRecipe(),
  cachecolTrancaRecipe(),
  pantufaBotaoRosaRecipe(),
  {
    id: "calca-pantalona-boho",
    title: "Calça Pantalona Boho",
    description: "Calça larga e fluida, trabalhada em ponto alto liso, com elástico na cintura. Receita desta ficha é para o tamanho M.",
    category: "Calças",
    image: illustrationCalca(),
    size: "M",
    style: "Pantalona",
    width: "",
    height: "",
    diagram: dcRowsChart(9),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 70 correntinhas para cada perna e feche em argola.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe em ponto alto até formar o comprimento da perna (cerca de 95cm), repetindo para a segunda perna.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Una as duas pernas na altura do quadril e faça uma carreira de ponto baixo passando um elástico na cintura.", photo: RECT_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "legging-infantil-basica",
    title: "Legging Infantil Básica",
    description: "Legging simples e confortável em ponto baixo firme, ótima para o dia a dia. Ficha para o tamanho 4.",
    category: "Calças",
    image: illustrationCalca(),
    size: "4",
    style: "Legging",
    width: "",
    height: "",
    diagram: radialChart(8, "sc", [{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 34 correntinhas para cada perna e feche em argola.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe em ponto baixo até atingir 38cm de comprimento em cada perna.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Una as pernas na altura do quadril e finalize a cintura com uma carreira de ponto baixo e elástico fino.", photo: RECT_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "shorts-saia-praiano",
    title: "Shorts Saia Praiano",
    description: "Shorts com caimento de saia, leve para o verão, em ponto alto vazado. Receita para o tamanho P.",
    category: "Shorts",
    image: illustrationShorts(),
    size: "P",
    style: "Shorts saia",
    width: "",
    height: "",
    diagram: shellStitchChart(5),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 64 correntinhas e feche em argola na altura do quadril.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe em ponto alto vazado (pulando 1 ponto e fazendo 1 corrente) por 6 carreiras, formando a saia.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Divida o trabalho ao meio para formar as duas pernas e feche o fundo com pontos baixos.", photo: RECT_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "shorts-cintura-alta",
    title: "Shorts Cintura Alta Verão",
    description: "Shorts básico de cintura alta, em ponto alto simples, fácil de ajustar ao corpo. Ficha para o tamanho M.",
    category: "Shorts",
    image: illustrationShorts(),
    size: "M",
    style: "Shorts cintura alta",
    width: "",
    height: "",
    diagram: dcRowsChart(8),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 60 correntinhas e feche em argola na altura do quadril.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe em ponto alto por 8 carreiras para formar a cintura alta.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Divida para as duas pernas e continue por mais 5 carreiras em cada uma, fechando com ponto baixo.", photo: RECT_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "biquini-cortininha-retro",
    title: "Biquíni Cortininha Retrô",
    description: "Biquíni com top de cortininha e amarração no pescoço, calcinha simples. Receita para o tamanho P.",
    category: "Biquínis",
    image: illustrationBiquini(),
    size: "P",
    style: "Cortininha",
    width: "",
    height: "",
    diagram: waveStitchChart(),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça duas peças triangulares em ponto alto para o top, com tiras de correntinha para amarrar.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Para a calcinha, faça um triângulo central e duas tiras laterais em ponto baixo firme.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Forre as peças com tecido ou forro próprio para biquíni antes de usar.", photo: ROUND_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "biquini-hot-pants",
    title: "Biquíni Hot Pants Tropical",
    description: "Biquíni com calcinha modelo hot pants e top de triângulo simples. Ficha para o tamanho M.",
    category: "Biquínis",
    image: illustrationBiquini(),
    size: "M",
    style: "Hot pants",
    width: "",
    height: "",
    diagram: dcRowsChart(6),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça o top com dois triângulos em ponto alto, unidos por uma tira central.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Para a calcinha hot pants, monte a base e aumente as laterais em ponto baixo até cobrir o quadril.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize as bordas com uma carreira de ponto baixo bem firme e forre antes de usar.", photo: ROUND_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "quadrado-granny-classico",
    title: "Quadrado Granny Clássico",
    description: "O tradicional quadrado granny, feito em carreiras de grupos de ponto alto. Ótimo para unir vários e formar mantas. Medida: 15×15cm.",
    category: "Quadrados",
    image: illustrationQuadrado(),
    size: "",
    style: "",
    width: "15",
    height: "15",
    diagram: radialChart(8, "dc", [{ kind: "dc", label: "Ponto alto" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça um anel mágico e trabalhe 4 grupos de 3 pontos altos separados por 2 correntinhas.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Na carreira seguinte, aumente 1 grupo de pontos altos em cada canto, mantendo os grupos do meio.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Repita os aumentos até o quadrado atingir 15cm de lado e arremate.", photo: ROUND_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "quadrado-mandala-colorida",
    title: "Quadrado Mandala Colorida",
    description: "Quadrado com um centro redondo (mandala) que depois é encaixado num contorno quadrado. Medida: 20×20cm.",
    category: "Quadrados",
    image: illustrationQuadrado(),
    size: "",
    style: "",
    width: "20",
    height: "20",
    diagram: radialChart(12, "sc", [{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça um anel mágico e trabalhe em rodadas de ponto baixo até formar um círculo de 16cm de diâmetro.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Trocando de cor, trabalhe em ponto alto ao redor do círculo até fechar o quadrado nos 20cm de lado.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixo ao redor de todo o quadrado para uniformizar as bordas.", photo: ROUND_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "tapete-retangular-trancado",
    title: "Tapete Retangular Trançado",
    description: "Tapete resistente em ponto baixo bem firme, com desenho de trança ao centro. Medida: 60×90cm.",
    category: "Retângulos",
    image: illustrationRetangulo(),
    size: "",
    style: "",
    width: "60",
    height: "90",
    diagram: cableStitchChart(3),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte uma corrente de 100 pontos e trabalhe a base em ponto baixo, formando o retângulo de 60cm de largura.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Continue em ponto baixo até atingir 90cm de comprimento, trabalhando o desenho de trança na faixa central.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixo ao redor de toda a borda para dar acabamento.", photo: RECT_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "capa-almofada-retangular",
    title: "Capa de Almofada Retangular",
    description: "Capa simples em ponto alto para almofada retangular, com fechamento por botões. Medida: 40×60cm.",
    category: "Retângulos",
    image: illustrationRetangulo(),
    size: "",
    style: "",
    width: "40",
    height: "60",
    diagram: dcRowsChart(10),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 70 correntinhas e trabalhe em ponto alto até formar um retângulo de 40×60cm (frente da capa).", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Repita para formar a peça de trás em duas partes menores, que se sobrepõem no centro.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Costure as três peças unindo as bordas e finalize com botões na abertura de trás.", photo: RECT_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "tapete-redondo-colorido",
    title: "Tapete Redondo Colorido",
    description: "Tapete redondo alegre, trabalhado em rodadas de ponto baixo trocando de cor a cada carreira.",
    category: "Tapetes",
    image: illustrationTapete(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(14, "sc", [{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça um anel mágico com 8 pontos baixos para iniciar o centro.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Aumente uniformemente a cada carreira, trocando de cor sempre que quiser, até atingir o diâmetro desejado.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixíssimo na cor de contorno para arrematar.", photo: ROUND_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "tapete-oval-rustico",
    title: "Tapete Oval Rústico",
    description: "Tapete oval em barbante, com textura firme, ótimo para entrada de casa.",
    category: "Tapetes",
    image: illustrationTapete(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: dcRowsChart(9),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte uma corrente de 20 pontos e trabalhe ao redor dela em ponto baixo para formar a base oval.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Continue em ponto baixo, aumentando nas pontas do oval, até atingir o tamanho desejado.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixíssimo ao redor de toda a borda.", photo: ROUND_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "guirlanda-flores-croche",
    title: "Guirlanda de Flores de Crochê",
    description: "Guirlanda decorativa feita com várias florzinhas de crochê costuradas numa base circular.",
    category: "Decoração",
    image: illustrationDecoracao(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: shellStitchChart(6),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça uma base circular trançando 3 tiras de barbante e unindo as pontas.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Faça várias florzinhas simples (anel mágico + pétalas em ponto alto) em cores variadas.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure as florzinhas ao redor de toda a base circular, distribuindo as cores.", photo: ROUND_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "porta-copos-floral",
    title: "Porta-Copos Floral",
    description: "Jogo de porta-copos em formato de flor, rápido de fazer e ótimo para presentear.",
    category: "Decoração",
    image: illustrationDecoracao(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: shellStitchChart(6),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça um anel mágico com 8 pontos baixos.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe uma carreira de pétalas em ponto alto, uma para cada ponto da carreira anterior.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Repita para fazer o jogo completo (4 a 6 unidades) e passe uma leve engomadeira para firmar o formato.", photo: ROUND_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "marcador-pagina-coracao",
    title: "Marcador de Página Coração",
    description: "Marcador de página fofo em formato de coração, rápido para fazer de presente.",
    category: "Outro",
    image: illustrationOutro(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: shellStitchChart(4),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça um anel mágico com 2 pontos baixos e trabalhe os dois lóbulos do coração separadamente.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Una os dois lóbulos na base e continue em ponto baixo até formar a ponta do coração.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma tira de correntinha na ponta de cima, para servir de marcador entre as páginas.", photo: ROUND_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "chaveiro-amigurumi-mini",
    title: "Chaveiro Amigurumi Mini",
    description: "Miniatura de amigurumi em formato de bolinha de fio, para pendurar como chaveiro ou enfeite de mochila.",
    category: "Outro",
    image: illustrationOutro(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(6, "sc", [{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça um anel mágico com 6 pontos baixos.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Aumente uma carreira até 12 pontos e depois trabalhe 2 carreiras retas.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Diminua até fechar a bolinha, encha com um pouco de enchimento e prenda a argola do chaveiro.", photo: ROUND_STEPS[2] },
    ],
    videos: [],
  },
  {
    id: "blusa-cropped-ponto-alto",
    title: "Blusa Cropped Ponto Alto",
    description: "Blusinha curtinha e despretensiosa, em ponto alto liso, ótima para compor looks de verão. Receita para o tamanho P.",
    category: "Blusas",
    image: illustrationBlusa(),
    size: "P",
    style: "Cropped",
    width: "",
    height: "",
    diagram: dcRowsChart(7),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 58 correntinhas e feche a 1ª carreira em ponto alto.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe em ponto alto até formar um retângulo curto de cerca de 30cm de altura, para frente e costas.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Costure os ombros e as laterais, deixando as cavas abertas, e finalize com ponto baixo na barra e na gola.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "blusa-manga-longa-inverno",
    title: "Blusa Manga Longa Inverno",
    description: "Blusa quentinha de manga longa, em ponto alto encorpado, ideal para os dias mais frios. Ficha para o tamanho M.",
    category: "Blusas",
    image: illustrationBlusa(),
    size: "M",
    style: "Manga longa",
    width: "",
    height: "",
    diagram: dcRowsChart(9),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 66 correntinhas e trabalhe o corpo em ponto alto até 55cm de altura.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Monte as mangas em formato de trapézio, mais estreitas no punho e largas no ombro.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Costure ombros, laterais e mangas, finalizando com uma carreira de ponto baixo em todas as bordas.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "blusa-regata-verao",
    title: "Blusa Regata Verão",
    description: "Regata fresquinha sem mangas, em ponto baixo vazado, perfeita para dias quentes. Receita para o tamanho G.",
    category: "Blusas",
    image: illustrationBlusa(),
    size: "G",
    style: "Regata",
    width: "",
    height: "",
    diagram: shellStitchChart(6),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 70 correntinhas e trabalhe em ponto baixo vazado (1 ponto, 1 corrente) para o corpo.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Continue até formar o comprimento desejado, cerca de 58cm de altura.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Costure os ombros com tiras finas e as laterais, deixando cavas largas para as alças.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "blusa-gola-alta-outono",
    title: "Blusa Gola Alta Outono",
    description: "Blusa aconchegante com gola alta dobrável, em ponto alto fechado. Ficha para o tamanho M.",
    category: "Blusas",
    image: illustrationBlusa(),
    size: "M",
    style: "Gola alta",
    width: "",
    height: "",
    diagram: dcRowsChart(8),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 64 correntinhas e trabalhe o corpo em ponto alto até 56cm de altura.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Na parte de cima, continue por mais 12cm sem aumentar para formar a gola alta.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Costure ombros e laterais e dobre a gola para fora antes de usar.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "blusa-ventania-praia",
    title: "Blusa Ponto Ventania Praia",
    description: "Blusa leve e ondulada, em ponto ventania, com caimento solto. Receita para o tamanho P.",
    category: "Blusas",
    image: illustrationBlusa(),
    size: "P",
    style: "Ponto ventania",
    width: "",
    height: "",
    diagram: waveStitchChart(),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 62 correntinhas e trabalhe 2 carreiras de base em ponto alto simples.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Continue em ponto ventania (grupos de aumento e diminuição) até formar o corpo, cerca de 54cm.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Costure ombros e laterais, finalizando gola e cavas com ponto baixo.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "casaco-bolero-curto",
    title: "Casaco Bolero Curto",
    description: "Bolero curtinho, só até a cintura, para usar sobre vestidos e blusas. Ficha para o tamanho P.",
    category: "Casaco",
    image: illustrationCasaco(),
    size: "P",
    style: "Bolero",
    width: "",
    height: "",
    diagram: dcRowsChart(7),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 60 correntinhas e trabalhe um retângulo curto de 28cm de altura para o corpo.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Dobre ao meio e costure os ombros, deixando aberturas estreitas para as mangas curtas.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Monte mangas curtas e costure-as, finalizando toda a borda com ponto baixo.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "cardiga-trancado-inverno",
    title: "Cardigã Trançado Inverno",
    description: "Cardigã fechado com botões, desenho de trança nas laterais, bem quentinho. Receita para o tamanho M.",
    category: "Casaco",
    image: illustrationCasaco(),
    size: "M",
    style: "Cardigã",
    width: "",
    height: "",
    diagram: cableStitchChart(3),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 68 correntinhas e trabalhe o corpo em ponto alto, incluindo o desenho de trança nas bordas.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Monte as mangas separadamente, também com trança nos punhos.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Costure ombros, laterais e mangas, e finalize com carreira de casas de botão na frente.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "colete-longo-outono",
    title: "Colete Longo Outono",
    description: "Colete comprido sem mangas, ótimo para compor looks em camadas. Ficha para o tamanho G.",
    category: "Casaco",
    image: illustrationCasaco(),
    size: "G",
    style: "Colete",
    width: "",
    height: "",
    diagram: dcRowsChart(9),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 72 correntinhas e trabalhe o corpo em ponto alto até 85cm de comprimento.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Divida a frente ao meio a partir do busto, formando a abertura do colete.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Costure só os ombros, deixando toda a lateral aberta, e finalize as bordas com ponto baixo.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "casaco-concha-delicado",
    title: "Casaco Ponto Concha Delicado",
    description: "Casaco leve com textura de conchinhas, ideal para meia estação. Receita para o tamanho M.",
    category: "Casaco",
    image: illustrationCasaco(),
    size: "M",
    style: "Casaco longo",
    width: "",
    height: "",
    diagram: shellStitchChart(7),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 64 correntinhas e trabalhe o corpo todo em ponto concha.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Monte as mangas também em ponto concha, mantendo o mesmo desenho.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Costure ombros, laterais e mangas, finalizando as bordas com ponto baixo simples.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "kimono-franjado-verao",
    title: "Kimono Franjado Verão",
    description: "Kimono leve e vazado, com franjas na barra, ótimo para praia ou piscina. Ficha para o tamanho P.",
    category: "Casaco",
    image: illustrationCasaco(),
    size: "P",
    style: "Kimono franjado",
    width: "",
    height: "",
    diagram: waveStitchChart(),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 60 correntinhas e trabalhe o corpo em ponto alto vazado até 70cm de comprimento.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Costure apenas os ombros e um pequeno trecho das laterais, deixando o restante aberto.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Corte e amarre franjas de 12cm ao longo de toda a barra.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "calca-flare-retro",
    title: "Calça Flare Retrô",
    description: "Calça com barra mais larga estilo flare, em ponto alto liso. Receita para o tamanho M.",
    category: "Calças",
    image: illustrationCalca(),
    size: "M",
    style: "Flare",
    width: "",
    height: "",
    diagram: dcRowsChart(9),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 60 correntinhas para cada perna e feche em argola.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe reto até o joelho e depois aumente gradualmente até a barra, formando o flare.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Una as duas pernas na altura do quadril e finalize a cintura com elástico.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "calca-reta-elegante",
    title: "Calça Reta Elegante",
    description: "Calça de corte reto, discreta e fácil de combinar, em ponto alto firme. Ficha para o tamanho P.",
    category: "Calças",
    image: illustrationCalca(),
    size: "P",
    style: "Reta",
    width: "",
    height: "",
    diagram: dcRowsChart(8),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 56 correntinhas para cada perna e feche em argola.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe em ponto alto sem aumentar até formar o comprimento total da perna.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Una as pernas na altura do quadril e finalize a cintura com uma carreira de ponto baixo e elástico.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "calca-jogger-confort",
    title: "Calça Jogger Confort",
    description: "Calça confortável com punho na barra, estilo jogger, em ponto baixo macio. Receita para o tamanho M.",
    category: "Calças",
    image: illustrationCalca(),
    size: "M",
    style: "Jogger",
    width: "",
    height: "",
    diagram: radialChart(9,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 58 correntinhas para cada perna e feche em argola.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe em ponto baixo até próximo do tornozelo e depois diminua para formar o punho.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Una as pernas na altura do quadril e finalize cintura e punhos com carreiras de elástico.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "calca-infantil-listrada",
    title: "Calça Infantil Listrada",
    description: "Calcinha básica infantil, listrada trocando de cor a cada carreira. Ficha para o tamanho 2.",
    category: "Calças",
    image: illustrationCalca(),
    size: "2",
    style: "Reta",
    width: "",
    height: "",
    diagram: dcRowsChart(6),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 34 correntinhas para cada perna e feche em argola.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe em ponto alto trocando de cor a cada 2 carreiras até o comprimento da perna.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Una as pernas na altura do quadril e finalize a cintura com elástico fino.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "calca-pantalona-cintura-alta",
    title: "Calça Pantalona Cintura Alta",
    description: "Pantalona bem larga com cintura alta modeladora, em ponto alto liso. Receita para o tamanho G.",
    category: "Calças",
    image: illustrationCalca(),
    size: "G",
    style: "Pantalona",
    width: "",
    height: "",
    diagram: dcRowsChart(10),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 76 correntinhas para cada perna e feche em argola.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe reto e bem largo até o comprimento total da perna.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Una as pernas e trabalhe mais 10 carreiras sem aumentar na cintura, para o efeito modelador, finalizando com elástico largo.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "shorts-basico-verao",
    title: "Shorts Básico Verão",
    description: "Shorts simples e básico, sem enfeites, ótimo para o dia a dia. Ficha para o tamanho P.",
    category: "Shorts",
    image: illustrationShorts(),
    size: "P",
    style: "Shorts básico",
    width: "",
    height: "",
    diagram: dcRowsChart(7),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 56 correntinhas e feche em argola na altura do quadril.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe em ponto alto por 10 carreiras.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Divida para as duas pernas e continue por mais 4 carreiras em cada, fechando com ponto baixo.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "shorts-listrado-praia",
    title: "Shorts Listrado Praia",
    description: "Shorts despojado com listras coloridas, ótimo para a praia. Receita para o tamanho M.",
    category: "Shorts",
    image: illustrationShorts(),
    size: "M",
    style: "Shorts básico",
    width: "",
    height: "",
    diagram: dcRowsChart(8),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 60 correntinhas e feche em argola, trocando de cor a cada 2 carreiras.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe 10 carreiras listradas para o corpo do shorts.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Divida para as pernas e finalize com ponto baixo nas bordas.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "shorts-saia-boho",
    title: "Shorts Saia Boho",
    description: "Shorts com caimento solto de saia, estilo boho, em ponto vazado. Ficha para o tamanho G.",
    category: "Shorts",
    image: illustrationShorts(),
    size: "G",
    style: "Shorts saia",
    width: "",
    height: "",
    diagram: shellStitchChart(6),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 68 correntinhas e feche em argola na altura do quadril.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe em ponto alto vazado por 8 carreiras, formando o caimento de saia.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Divida para as pernas e finalize com ponto baixo.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "shorts-infantil-fresquinho",
    title: "Shorts Infantil Fresquinho",
    description: "Shorts levinho para os pequenos, em ponto baixo macio. Receita para o tamanho 4.",
    category: "Shorts",
    image: illustrationShorts(),
    size: "4",
    style: "Shorts básico",
    width: "",
    height: "",
    diagram: radialChart(7,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 40 correntinhas e feche em argola na altura do quadril.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe em ponto baixo por 6 carreiras.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Divida para as pernas e finalize com ponto baixo nas bordas.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "shorts-cintura-alta-floral",
    title: "Shorts Cintura Alta Floral",
    description: "Shorts de cintura alta com uma florzinha de aplique na lateral. Ficha para o tamanho P.",
    category: "Shorts",
    image: illustrationShorts(),
    size: "P",
    style: "Shorts cintura alta",
    width: "",
    height: "",
    diagram: dcRowsChart(8),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 56 correntinhas e feche em argola na altura do quadril.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe em ponto alto por 9 carreiras para a cintura alta.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Divida para as pernas, finalize com ponto baixo e costure uma florzinha de aplique na lateral.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "biquini-tradicional-liso",
    title: "Biquíni Tradicional Liso",
    description: "Biquíni de modelo tradicional, sem enfeites, em ponto alto firme. Receita para o tamanho P.",
    category: "Biquínis",
    image: illustrationBiquini(),
    size: "P",
    style: "Tradicional",
    width: "",
    height: "",
    diagram: dcRowsChart(6),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça dois triângulos em ponto alto para o top, com tiras de amarrar no pescoço e nas costas.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Para a calcinha, faça a base e aumente as laterais até cobrir o quadril.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize as bordas com ponto baixo firme e forre antes de usar.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "biquini-body-fio",
    title: "Biquíni Body Fio",
    description: "Biquíni modelo body, com tiras finas cruzadas nas costas. Ficha para o tamanho M.",
    category: "Biquínis",
    image: illustrationBiquini(),
    size: "M",
    style: "Body",
    width: "",
    height: "",
    diagram: waveStitchChart(),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça o top com dois triângulos e tiras finas que se cruzam nas costas.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Para a parte de baixo, faça uma calcinha fio, com tiras laterais bem finas.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com ponto baixo firme nas bordas e forre antes de usar.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "biquini-fio-dental-verao",
    title: "Biquíni Fio Dental Verão",
    description: "Biquíni modelo fio dental, minimalista, em ponto baixo bem firme. Receita para o tamanho P.",
    category: "Biquínis",
    image: illustrationBiquini(),
    size: "P",
    style: "Fio dental",
    width: "",
    height: "",
    diagram: radialChart(6,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça o top com dois triângulos pequenos e tiras finas.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Para a calcinha, faça um triângulo central pequeno com tiras laterais finas.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com ponto baixo e forre bem antes de usar.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "biquini-cortininha-floral",
    title: "Biquíni Cortininha Floral",
    description: "Biquíni cortininha com uma florzinha central no top. Ficha para o tamanho M.",
    category: "Biquínis",
    image: illustrationBiquini(),
    size: "M",
    style: "Cortininha",
    width: "",
    height: "",
    diagram: shellStitchChart(5),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça o top de cortininha com tiras de amarrar no pescoço.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Costure uma florzinha simples no centro do top.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Faça a calcinha tradicional e finalize as bordas com ponto baixo, forrando antes de usar.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "biquini-hot-pants-listrado",
    title: "Biquíni Hot Pants Listrado",
    description: "Biquíni com calcinha hot pants listrada e top triângulo liso. Receita para o tamanho G.",
    category: "Biquínis",
    image: illustrationBiquini(),
    size: "G",
    style: "Hot pants",
    width: "",
    height: "",
    diagram: dcRowsChart(7),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça o top com dois triângulos lisos em ponto alto.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Para a calcinha hot pants, trabalhe trocando de cor a cada carreira até cobrir o quadril.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize as bordas com ponto baixo firme e forre antes de usar.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "pantufa-bota-quentinha",
    title: "Pantufa Bota Quentinha",
    description: "Pantufa modelo bota, cobrindo o tornozelo, ótima para o inverno. Ficha para o número 37.",
    category: "Pantufas",
    image: illustrationPantufa(),
    size: "37",
    style: "Bota",
    width: "",
    height: "",
    diagram: radialChart(11,"dc",[{ kind: "dc", label: "Ponto alto" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça a sola em ponto baixo a partir de um anel mágico, até o comprimento do pé.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe a lateral em ponto alto subindo até cobrir o tornozelo, formando a bota.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Feche a parte de cima e finalize a borda com uma carreira de ponto baixo.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "pantufa-chinelo-simples",
    title: "Pantufa Chinelo Simples",
    description: "Pantufa modelo chinelo, aberta na frente, rápida de fazer. Receita para o número 39.",
    category: "Pantufas",
    image: illustrationPantufa(),
    size: "39",
    style: "Chinelo",
    width: "",
    height: "",
    diagram: radialChart(12,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça a sola em ponto baixo a partir de um anel mágico, até o comprimento do pé.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe uma tira central em ponto alto, presa dos dois lados da sola, formando o chinelo.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize as bordas com uma carreira de ponto baixo.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "pantufa-animais-coelhinho",
    title: "Pantufa Animais Coelhinho",
    description: "Pantufa fofa com carinha e orelhas de coelhinho na frente. Ficha para o número 33.",
    category: "Pantufas",
    image: illustrationPantufa(),
    size: "33",
    style: "Animais",
    width: "",
    height: "",
    diagram: radialChart(10,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça a sola e a lateral da pantufa como de costume, até fechar a parte de cima.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Faça duas orelhas compridas em ponto baixo e um focinho pequeno em ponto baixo.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure as orelhas e o focinho na frente da pantufa, bordando os olhinhos.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "pantufa-com-laco-delicada",
    title: "Pantufa Com Laço Delicada",
    description: "Pantufa simples com um laço de fita ou crochê na frente. Receita para o número 36.",
    category: "Pantufas",
    image: illustrationPantufa(),
    size: "36",
    style: "Com laço",
    width: "",
    height: "",
    diagram: radialChart(11,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça a sola e a lateral da pantufa até fechar a parte de cima.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Faça um laço simples em ponto baixo, ou use uma fita de tecido.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure o laço na frente da pantufa.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "pantufa-infantil-ursinho",
    title: "Pantufa Infantil Ursinho",
    description: "Pantufa fofa com carinha de ursinho, tamanho infantil. Ficha para o número 26.",
    category: "Pantufas",
    image: illustrationPantufa(),
    size: "26",
    style: "Animais",
    width: "",
    height: "",
    diagram: radialChart(8,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça a sola e a lateral da pantufa em tamanho infantil, até fechar a parte de cima.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Faça duas orelhinhas redondas em ponto baixo.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure as orelhinhas e borde os olhinhos e o focinho do ursinho.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "bolsa-carteira-compacta",
    title: "Bolsa Carteira Compacta",
    description: "Carteira compacta em ponto baixo bem firme, com alcinha curta. Medida: 18×12cm.",
    category: "Bolsas",
    image: illustrationBolsa(),
    size: "",
    style: "Carteira",
    width: "18",
    height: "12",
    diagram: radialChart(8,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte a base retangular pequena e trabalhe em ponto baixo bem firme ao redor.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Continue subindo as carreiras até fechar a carteira, deixando a abertura de cima.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure uma alcinha curta e finalize com um botão ou zíper na abertura.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "bolsa-transversal-praia",
    title: "Bolsa Transversal Praia",
    description: "Bolsa pequena transversal, ótima para andar leve na praia. Medida: 24×20cm.",
    category: "Bolsas",
    image: illustrationBolsa(),
    size: "",
    style: "Transversal",
    width: "24",
    height: "20",
    diagram: dcRowsChart(8),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte a base oval e trabalhe o corpo em ponto alto até a altura desejada.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Finalize a borda superior com uma carreira de ponto baixo.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Faça uma alça comprida e fina e costure-a nas laterais para uso transversal.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "bolsa-tote-grande",
    title: "Bolsa Tote Grande",
    description: "Bolsa tote espaçosa, ótima para o dia a dia e compras. Medida: 40×34cm.",
    category: "Bolsas",
    image: illustrationBolsa(),
    size: "",
    style: "Tote",
    width: "40",
    height: "34",
    diagram: radialChart(12,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte uma base oval grande e trabalhe o corpo em ponto baixo firme.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Continue até atingir 34cm de altura, mantendo a firmeza do tecido.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Faça duas alças largas e costure-as bem presas nas laterais internas.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "bolsa-clutch-festa",
    title: "Bolsa Clutch Festa",
    description: "Clutch delicada para usar em festas, sem alça, com fecho simples. Medida: 22×14cm.",
    category: "Bolsas",
    image: illustrationBolsa(),
    size: "",
    style: "Clutch",
    width: "22",
    height: "14",
    diagram: shellStitchChart(5),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte um retângulo em ponto alto com desenho de conchinhas para o corpo da clutch.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Dobre ao meio e costure as laterais, deixando a abertura de cima livre.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com um botão decorativo ou fecho de ímã na abertura.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "mochila-mini-passeio",
    title: "Mochila Mini Passeio",
    description: "Mochila pequena, ótima para passeios curtos e crianças. Medida: 26×30cm.",
    category: "Bolsas",
    image: illustrationBolsa(),
    size: "",
    style: "Mochila",
    width: "26",
    height: "30",
    diagram: dcRowsChart(9),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte a base retangular e trabalhe o corpo em ponto alto até 30cm de altura.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Finalize a borda superior com um cordão para fechar tipo saco.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Faça duas alças e costure-as nas costas da mochila, em formato de mochila saco.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "cachecol-liso-basico",
    title: "Cachecol Liso Básico",
    description: "Cachecol simples e liso, sem desenho especial, rápido de fazer. Medida: 18×140cm.",
    category: "Cachecóis",
    image: illustrationCachecol(),
    size: "",
    style: "Liso",
    width: "18",
    height: "140",
    diagram: dcRowsChart(6),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 30 correntinhas e trabalhe em ponto alto simples.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Continue até atingir 140cm de comprimento.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixo ao redor de toda a peça.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "cachecol-franjas-rustico",
    title: "Cachecol Com Franjas Rústico",
    description: "Cachecol rústico em barbante grosso, com franjas fartas nas pontas. Medida: 20×150cm.",
    category: "Cachecóis",
    image: illustrationCachecol(),
    size: "",
    style: "Com franjas",
    width: "20",
    height: "150",
    diagram: dcRowsChart(7),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 32 correntinhas e trabalhe em ponto alto até 150cm de comprimento.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Finalize com uma carreira de ponto baixo ao redor de toda a peça.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Corte franjas de 18cm e prenda com nós simples em ambas as pontas.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "gola-infinita-confort",
    title: "Gola Infinita Confort",
    description: "Gola infinita curta, para usar dobrada ou solta no pescoço. Medida: 25×60cm.",
    category: "Cachecóis",
    image: illustrationCachecol(),
    size: "",
    style: "Gola infinita",
    width: "25",
    height: "60",
    diagram: radialChart(9,"dc",[{ kind: "dc", label: "Ponto alto" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 100 correntinhas e feche em argola.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe em ponto alto ao redor até atingir 25cm de altura.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixo nas duas bordas da argola.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "cachecol-ondas-suave",
    title: "Cachecol Ponto Ondas Suave",
    description: "Cachecol macio com ondulações suaves, feito em ponto ventania. Medida: 18×150cm.",
    category: "Cachecóis",
    image: illustrationCachecol(),
    size: "",
    style: "Ponto ondas",
    width: "18",
    height: "150",
    diagram: waveStitchChart(),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 34 correntinhas e trabalhe 2 carreiras de base em ponto alto simples.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Continue em ponto ventania até atingir 150cm de comprimento.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixo ao redor de toda a peça.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "cachecol-xadrez-colorido",
    title: "Cachecol Xadrez Colorido",
    description: "Cachecol alegre trocando de cor em blocos, formando um efeito xadrez. Medida: 20×160cm.",
    category: "Cachecóis",
    image: illustrationCachecol(),
    size: "",
    style: "Liso",
    width: "20",
    height: "160",
    diagram: dcRowsChart(8),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 36 correntinhas e trabalhe em ponto alto, trocando de cor a cada 4 carreiras.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Continue até atingir 160cm de comprimento, alternando as cores em blocos.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixo ao redor de toda a peça.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "quadrado-ponto-fechado",
    title: "Quadrado Ponto Fechado",
    description: "Quadrado maciço, sem vazados, ótimo para almofadas e mantas mais quentes. Medida: 12×12cm.",
    category: "Quadrados",
    image: illustrationQuadrado(),
    size: "",
    style: "",
    width: "12",
    height: "12",
    diagram: dcRowsChart(6),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 20 correntinhas e trabalhe em ponto alto fechado, sem espaços.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Continue até formar um quadrado de 12cm de lado.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixo ao redor de toda a borda.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "quadrado-flor-central",
    title: "Quadrado Flor Central",
    description: "Quadrado com uma florzinha no centro, unida depois a um contorno quadrado. Medida: 18×18cm.",
    category: "Quadrados",
    image: illustrationQuadrado(),
    size: "",
    style: "",
    width: "18",
    height: "18",
    diagram: radialChart(8,"dc",[{ kind: "dc", label: "Ponto alto" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça uma florzinha simples com anel mágico e pétalas em ponto alto.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe carreiras quadradas ao redor da flor até atingir 18cm de lado.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixo ao redor de toda a borda.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "quadrado-listrado-colorido",
    title: "Quadrado Listrado Colorido",
    description: "Quadrado simples trocando de cor a cada carreira, ótimo para combinar sobras de fio. Medida: 15×15cm.",
    category: "Quadrados",
    image: illustrationQuadrado(),
    size: "",
    style: "",
    width: "15",
    height: "15",
    diagram: dcRowsChart(7),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 24 correntinhas e trabalhe em ponto alto, trocando de cor a cada carreira.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Continue até formar um quadrado de 15cm de lado.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixo na cor de sua preferência.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "quadrado-vazado-verao",
    title: "Quadrado Vazado Verão",
    description: "Quadrado levinho e vazado, ótimo para mantas de verão. Medida: 20×20cm.",
    category: "Quadrados",
    image: illustrationQuadrado(),
    size: "",
    style: "",
    width: "20",
    height: "20",
    diagram: shellStitchChart(5),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça um anel mágico e trabalhe grupos de ponto alto vazado (V) a partir do centro.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Aumente um grupo em cada canto a cada carreira até atingir 20cm de lado.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixo ao redor de toda a borda.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "quadrado-textura-alta",
    title: "Quadrado Textura Alta",
    description: "Quadrado com relevo, feito em pontos altos relevados que criam textura em 3D. Medida: 16×16cm.",
    category: "Quadrados",
    image: illustrationQuadrado(),
    size: "",
    style: "",
    width: "16",
    height: "16",
    diagram: dcRowsChart(7),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte 26 correntinhas e trabalhe em ponto alto relevado, alternando frente e verso.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Continue até formar um quadrado de 16cm de lado.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixo ao redor de toda a borda.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "manta-retangular-bebe",
    title: "Manta Retangular Bebê",
    description: "Manta macia para bebê, em ponto alto bem fechado. Medida: 70×90cm.",
    category: "Retângulos",
    image: illustrationRetangulo(),
    size: "",
    style: "",
    width: "70",
    height: "90",
    diagram: dcRowsChart(9),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte uma corrente de 120 pontos e trabalhe em ponto alto fechado.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Continue até atingir 90cm de comprimento, mantendo 70cm de largura.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixo ao redor de toda a borda.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "tapete-porta-retangular",
    title: "Tapete de Porta Retangular",
    description: "Tapete firme para a entrada de casa, em ponto baixo bem apertado. Medida: 50×70cm.",
    category: "Retângulos",
    image: illustrationRetangulo(),
    size: "",
    style: "",
    width: "50",
    height: "70",
    diagram: radialChart(10,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte uma corrente de 85 pontos e trabalhe em ponto baixo bem firme.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Continue até atingir 70cm de comprimento, mantendo 50cm de largura.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixíssimo ao redor de toda a borda.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "toalha-mesa-retangular",
    title: "Toalha de Mesa Retangular",
    description: "Toalha delicada em ponto vazado, ótima para mesas de jantar. Medida: 100×150cm.",
    category: "Retângulos",
    image: illustrationRetangulo(),
    size: "",
    style: "",
    width: "100",
    height: "150",
    diagram: shellStitchChart(7),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte uma corrente de 170 pontos e trabalhe em ponto alto vazado.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Continue até atingir 150cm de comprimento, mantendo 100cm de largura.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira decorativa de picô ao redor de toda a borda.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "painel-retangular-decorativo",
    title: "Painel Retangular Decorativo",
    description: "Painel de parede com desenho de trança, para pendurar como decoração. Medida: 40×60cm.",
    category: "Retângulos",
    image: illustrationRetangulo(),
    size: "",
    style: "",
    width: "40",
    height: "60",
    diagram: cableStitchChart(3),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte uma corrente de 68 pontos e trabalhe em ponto alto com o desenho de trança central.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Continue até atingir 60cm de comprimento, mantendo 40cm de largura.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma haste de madeira presa no topo para pendurar.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "capa-notebook-retangular",
    title: "Capa de Notebook Retangular",
    description: "Capa protetora acolchoada para notebook, em ponto baixo bem firme. Medida: 25×35cm.",
    category: "Retângulos",
    image: illustrationRetangulo(),
    size: "",
    style: "",
    width: "25",
    height: "35",
    diagram: dcRowsChart(7),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte uma corrente de 42 pontos e trabalhe em ponto baixo firme, dobrando ao meio.", photo: RECT_STEPS[0] },
      { id: "s2", order: 2, description: "Continue até atingir 35cm de comprimento antes de dobrar.", photo: RECT_STEPS[1] },
      { id: "s3", order: 3, description: "Costure as laterais, deixando a abertura de cima livre, e finalize com um botão.", photo: RECT_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "amigurumi-ursinho-mel",
    title: "Amigurumi Ursinho Mel",
    description: "Ursinho fofo em ponto baixo, com uma pequena laçarote no pescoço. Ideal para presentear.",
    category: "Amigurumi",
    image: illustrationAmigurumi(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(10,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça um anel mágico com 6 pontos baixos para iniciar a cabeça e aumente até 24 pontos.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Faça o corpo, os bracinhos e as perninhas separadamente, também em ponto baixo.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure todas as partes, encha com enchimento e borde os olhinhos e o focinho.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "amigurumi-gatinho-dorminhoco",
    title: "Amigurumi Gatinho Dorminhoco",
    description: "Gatinho de amigurumi deitadinho, com orelhas pontudas e olhos fechados de sono.",
    category: "Amigurumi",
    image: illustrationAmigurumi(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(9,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça o corpo em formato oval, começando por um anel mágico e aumentando gradualmente.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Faça a cabeça separada com duas orelhas triangulares.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure a cabeça ao corpo, encha com enchimento e borde os olhinhos fechados e o bigode.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "amigurumi-passarinho-feliz",
    title: "Amigurumi Passarinho Feliz",
    description: "Passarinho colorido e alegre, com asinhas destacadas e biquinho pontudo.",
    category: "Amigurumi",
    image: illustrationAmigurumi(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(8,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça o corpo em formato de gota, começando por um anel mágico na cabeça.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Faça as asinhas separadamente em ponto baixo achatado e o biquinho pequeno.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure as asinhas e o biquinho, encha o corpo e borde os olhinhos.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "amigurumi-sereia-encantada",
    title: "Amigurumi Sereia Encantada",
    description: "Bonequinha sereia com cauda brilhante e cabelo comprido de franjas.",
    category: "Amigurumi",
    image: illustrationAmigurumi(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(11,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça a cabeça e o corpo em ponto baixo, unindo-os numa peça só.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Faça a cauda de sereia trocando de cor e formando o desenho de barbatana na ponta.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure a cauda ao corpo, encha tudo e finalize o cabelo com tiras de franja costuradas na cabeça.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "amigurumi-foguete-espacial",
    title: "Amigurumi Foguete Espacial",
    description: "FogueLzinho fofo com janela redonda e aletas laterais, para o quarto do bebê.",
    category: "Amigurumi",
    image: illustrationAmigurumi(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(9,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça o corpo do foguete em formato de cilindro alongado, em ponto baixo.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Faça a ponta do foguete diminuindo até fechar, e as aletas laterais em triângulos achatados.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure as aletas e uma janela redonda de outra cor, e encha o corpo com enchimento.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "tapete-quadrado-tranca",
    title: "Tapete Quadrado Trançado",
    description: "Tapete quadrado firme, com desenho de trança central, para qualquer ambiente.",
    category: "Tapetes",
    image: illustrationTapete(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: cableStitchChart(3),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte uma corrente de 90 pontos e trabalhe em ponto baixo formando um quadrado.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe o desenho de trança na faixa central da peça.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixo ao redor de toda a borda.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "tapete-hexagonal-mosaico",
    title: "Tapete Hexagonal Mosaico",
    description: "Tapete formado por hexágonos coloridos costurados uns aos outros, tipo mosaico.",
    category: "Tapetes",
    image: illustrationTapete(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(12,"dc",[{ kind: "dc", label: "Ponto alto" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça vários hexágonos pequenos, cada um com um anel mágico e 6 aumentos por carreira.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Varie as cores de cada hexágono para formar o efeito mosaico.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure os hexágonos uns aos outros até formar o tamanho de tapete desejado.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "tapete-franjas-boho",
    title: "Tapete Franjas Boho",
    description: "Tapete estilo boho, com franjas compridas em todo o contorno.",
    category: "Tapetes",
    image: illustrationTapete(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: dcRowsChart(9),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte uma base retangular ou oval em ponto baixo firme.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Continue até atingir o tamanho desejado, mantendo a textura firme.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Corte franjas compridas (20cm) e prenda ao redor de toda a borda.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "tapete-redondo-listrado",
    title: "Tapete Redondo Listrado",
    description: "Tapete redondo com listras concêntricas coloridas, trocando de cor a cada carreira.",
    category: "Tapetes",
    image: illustrationTapete(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(13,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça um anel mágico e trabalhe em ponto baixo, trocando de cor a cada carreira.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Continue aumentando uniformemente até atingir o diâmetro desejado.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixíssimo na cor de contorno.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "tapete-infantil-nuvem",
    title: "Tapete Infantil Nuvem",
    description: "Tapete fofo em formato de nuvem, ótimo para o quarto das crianças.",
    category: "Tapetes",
    image: illustrationTapete(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(10,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça vários círculos sobrepostos em ponto baixo para formar o contorno de nuvem.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Una os círculos numa peça só, preenchendo os espaços entre eles.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com uma carreira de ponto baixo ao redor de todo o contorno.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "enfeite-porta-coracao",
    title: "Enfeite de Porta Coração",
    description: "Enfeite fofo em formato de coração, para pendurar na porta ou maçaneta.",
    category: "Decoração",
    image: illustrationDecoracao(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: shellStitchChart(4),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça os dois lóbulos do coração separadamente, a partir de um anel mágico.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Una os lóbulos na base e continue em ponto baixo até fechar a ponta do coração.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure uma fita ou correntinha no topo para pendurar.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "movel-estrelas",
    title: "Móbile de Estrelas",
    description: "Móbile delicado com várias estrelinhas de crochê penduradas em alturas diferentes.",
    category: "Decoração",
    image: illustrationDecoracao(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(10,"dc",[{ kind: "dc", label: "Ponto alto" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça várias estrelinhas de 5 pontas em ponto alto, a partir de um anel mágico.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Amarre cada estrelinha numa linha de tamanho diferente.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Prenda todas as linhas numa argola ou galho decorativo para pendurar.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "cesta-organizadora-pequena",
    title: "Cesta Organizadora Pequena",
    description: "Cestinha firme para guardar pequenos objetos, em ponto baixo bem apertado.",
    category: "Decoração",
    image: illustrationDecoracao(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(9,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça a base redonda em ponto baixo, aumentando até o diâmetro desejado.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Sem aumentar mais, continue subindo as carreiras para formar a lateral da cesta.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize a borda de cima com uma carreira de ponto baixo bem firme.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "capa-vaso-planta",
    title: "Capa para Vaso de Planta",
    description: "Capa decorativa para vasos, em ponto alto vazado, para dar um toque especial às plantas.",
    category: "Decoração",
    image: illustrationDecoracao(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: shellStitchChart(6),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça a base redonda do tamanho do fundo do vaso.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Continue em ponto alto vazado subindo as carreiras até cobrir a altura do vaso.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize a borda de cima com uma carreira decorativa de picô.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "enfeite-arvore-natal",
    title: "Enfeite de Árvore de Natal",
    description: "Enfeitezinho de crochê para pendurar na árvore de Natal, em formato de estrela ou floco.",
    category: "Decoração",
    image: illustrationDecoracao(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(8,"dc",[{ kind: "dc", label: "Ponto alto" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça um anel mágico e trabalhe pontas em ponto alto, formando uma estrela ou floco de neve.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Passe uma leve engomadeira para deixar o enfeite mais firme.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure uma linha no topo para pendurar na árvore.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "porta-celular-croche",
    title: "Porta-Celular de Crochê",
    description: "Bolsinha protetora para o celular, com alça para carregar a tiracolo.",
    category: "Outro",
    image: illustrationOutro(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: dcRowsChart(6),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte a base do tamanho do celular e trabalhe em ponto baixo firme ao redor.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Continue subindo até cobrir a altura do celular, deixando a abertura de cima livre.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure uma alça comprida e finalize a abertura com um botão.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "case-oculos",
    title: "Case para Óculos",
    description: "Estojo acolchoado para guardar óculos de sol ou de grau, em ponto baixo firme.",
    category: "Outro",
    image: illustrationOutro(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: dcRowsChart(6),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte um retângulo do tamanho dos óculos, dobrando ao meio.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe em ponto baixo bem firme, unindo as laterais e deixando a abertura de cima livre.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize a abertura com uma carreira de ponto baixo e um botão de fechamento.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "argola-guardanapo",
    title: "Argola de Guardanapo",
    description: "Argolinha decorativa para guardanapos, ótima para mesas postas especiais.",
    category: "Outro",
    image: illustrationOutro(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(8,"dc",[{ kind: "dc", label: "Ponto alto" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Monte uma corrente e feche em argola do tamanho do guardanapo enrolado.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Trabalhe 2 a 3 carreiras em ponto alto ao redor da argola.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Finalize com um detalhe decorativo, como uma florzinha pequena costurada por cima.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "prendedor-cabelo-floral",
    title: "Prendedor de Cabelo Floral",
    description: "Prendedor de cabelo com uma florzinha de crochê costurada numa presilha.",
    category: "Outro",
    image: illustrationOutro(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: shellStitchChart(4),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça uma florzinha simples com anel mágico e pétalas em ponto alto.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Passe uma leve engomadeira na flor para deixá-la mais firme.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure a flor numa presilha ou base de prendedor de cabelo.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
  {
    id: "etiqueta-personalizada-presente",
    title: "Etiqueta Personalizada para Presente",
    description: "Etiquetinha de crochê em formato redondo ou de coração, para amarrar em embrulhos de presente.",
    category: "Outro",
    image: illustrationOutro(),
    size: "",
    style: "",
    width: "",
    height: "",
    diagram: radialChart(7,"sc",[{ kind: "sc", label: "Ponto baixo" }]),
    assemblyPhotos: [],
    steps: [
      { id: "s1", order: 1, description: "Faça um anel mágico e trabalhe 2 carreiras de ponto baixo formando um círculo pequeno.", photo: ROUND_STEPS[0] },
      { id: "s2", order: 2, description: "Borde ou aplique uma letra ou desenho simples no centro, se desejar.", photo: ROUND_STEPS[1] },
      { id: "s3", order: 3, description: "Costure uma fitinha na etiqueta para amarrar no embrulho do presente.", photo: ROUND_STEPS[2] }
    ],
    videos: [],
  },
];

/* ------------------------------------ App ------------------------------------ */
export default function CrochetApp() {
  const [session, setSession] = useState(null);
  const [page, setPage] = useState("login"); // login | dashboard | view | editor | steps
  const [recipes, setRecipes] = useState(seedRecipes);
  const [activeId, setActiveId] = useState(null);
  const [activeVariantKey, setActiveVariantKey] = useState(null);
  const [preset, setPreset] = useState(null); // { category, size?, width?, height? }
  const [toast, setToast] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  function showToast(msg) {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 2200);
  }

  function handleLogin(name, role, email) {
    setSession({ name: name || (role === "admin" ? "Administradora" : "Visitante"), role, email });
    setPage("dashboard");
  }

  function handleLogout() {
    setSession(null);
    setPage("login");
    setActiveId(null);
  }

  function upsertRecipe(recipe) {
    setRecipes((prev) => {
      const exists = prev.some((r) => r.id === recipe.id);
      if (exists) return prev.map((r) => (r.id === recipe.id ? recipe : r));
      return [recipe, ...prev];
    });
  }

  function deleteRecipe(id) {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    showToast("Receita excluída.");
  }

  const activeRecipe = recipes.find((r) => r.id === activeId) || null;

  function goNew(presetValues) {
    setPreset(presetValues || null);
    setActiveId(null);
    setPage("editor");
  }

  function goView(id, variantKey) {
    setActiveId(id);
    setActiveVariantKey(variantKey || null);
    setPage("view");
  }

  return (
    <div className="crochet-app">
      <GlobalStyles />

      {page === "login" && <LoginPage onLogin={handleLogin} />}

      {page !== "login" && session && (
        <Shell session={session} onLogout={handleLogout}>
          {page === "dashboard" && (
            <Dashboard
              recipes={recipes}
              canEdit={session.role === "admin"}
              onNew={() => goNew(null)}
              onNewWithPreset={goNew}
              onView={goView}
              onDelete={deleteRecipe}
            />
          )}

          {page === "view" && activeRecipe && (
            <RecipeView
              recipe={activeRecipe}
              variantKey={activeVariantKey}
              canEdit={session.role === "admin"}
              onSelectVariant={setActiveVariantKey}
              onBack={() => setPage("dashboard")}
              onEdit={() => setPage("editor")}
              onManageSteps={() => setPage("steps")}
              onImageClick={setLightbox}
            />
          )}

          {page === "editor" && session.role === "admin" && (
            <RecipeEditor
              recipe={activeRecipe}
              preset={preset}
              recipes={recipes}
              onCancel={() => {
                setPreset(null);
                setPage(activeRecipe ? "view" : "dashboard");
              }}
              onSave={(recipe) => {
                upsertRecipe(recipe);
                setActiveId(recipe.id);
                setActiveVariantKey(null);
                setPreset(null);
                showToast(activeRecipe ? "Receita atualizada." : "Receita cadastrada.");
                setPage("view");
              }}
            />
          )}

          {page === "steps" && activeRecipe && session.role === "admin" && (
            <StepsAndVideos
              recipe={activeRecipe}
              variantKey={activeVariantKey}
              onBack={() => setPage("view")}
              onChange={(updated) => upsertRecipe(updated)}
              showToast={showToast}
              onImageClick={setLightbox}
            />
          )}
        </Shell>
      )}

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#5B3A45",
            color: "#FFF8F5",
            padding: "12px 22px",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            zIndex: 999,
          }}
        >
          <Check size={16} /> {toast}
        </div>
      )}

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(45,26,32,0.82)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1200,
            padding: 24,
            cursor: "zoom-out",
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            className="icon-btn"
            style={{ position: "absolute", top: 20, right: 20, background: "#FFF8F5" }}
            title="Fechar"
          >
            <X size={18} />
          </button>
          <img
            src={lightbox}
            alt="Imagem ampliada"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "92vw", maxHeight: "88vh", borderRadius: 16, boxShadow: "0 20px 50px rgba(0,0,0,0.35)", background: "#FFFDFC" }}
          />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------ Login ------------------------------------ */
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Preencha e-mail e senha para entrar.");
      return;
    }
    const isAdmin = email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD;
    setError("");
    onLogin(name.trim() || email.split("@")[0], isAdmin ? "admin" : "visitor", email.trim());
  }

  const decorations = [
    { type: "yarn", color: "#F4C95D", size: 78, top: "-4%", left: "-5%", rotate: -8 },
    { type: "hook", color: "#E8A0B4", size: 46, top: "6%", left: "9%", rotate: 25 },
    { type: "yarn", color: "#8ECBE0", size: 60, top: "3%", left: "42%", rotate: 10 },
    { type: "yarn", color: "#F2A9C4", size: 92, top: "-6%", right: "-6%", rotate: 12 },
    { type: "hook", color: "#B9A3DE", size: 42, top: "14%", right: "8%", rotate: -20 },
    { type: "yarn", color: "#B9A3DE", size: 56, top: "40%", left: "3%", rotate: -14 },
    { type: "hook", color: "#F4C95D", size: 40, top: "48%", right: "4%", rotate: 35 },
    { type: "yarn", color: "#8ECBE0", size: 70, bottom: "-5%", left: "6%", rotate: 6 },
    { type: "hook", color: "#F2A9C4", size: 44, bottom: "10%", left: "34%", rotate: -30 },
    { type: "yarn", color: "#F2A9C4", size: 66, bottom: "-6%", right: "10%", rotate: -10 },
    { type: "yarn", color: "#F4C95D", size: 50, bottom: "16%", right: "38%", rotate: 18 },
    { type: "hook", color: "#8ECBE0", size: 38, bottom: "30%", right: "-1%", rotate: 15 },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 40%, #FCEFF3 0%, #FBE4EC 60%, #F6D3E0 100%)",
      }}
    >
      {decorations.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: d.top,
            left: d.left,
            right: d.right,
            bottom: d.bottom,
            transform: `rotate(${d.rotate}deg)`,
            opacity: 0.55,
            pointerEvents: "none",
          }}
        >
          {d.type === "yarn" ? <YarnIcon size={d.size} color={d.color} strokeWidth={1.3} /> : <HookIcon size={d.size} color={d.color} />}
        </div>
      ))}

      <div className="card" style={{ width: "100%", maxWidth: 400, padding: "36px 32px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 8 }}>
          <YarnIcon size={52} />
          <h1 className="display" style={{ fontSize: 32, fontWeight: 700, margin: "14px 0 2px" }}>
            Crochetadas
          </h1>
          <p style={{ fontSize: 13, color: "#B48D96", margin: 0, textAlign: "center", fontWeight: 500 }}>
            receitinhas de crochê
          </p>
        </div>

        <hr className="stitch-divider" style={{ margin: "22px 0" }} />

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label className="label" htmlFor="name">Seu nome (opcional)</label>
            <input id="name" placeholder="Como podemos te chamar?" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="email">E-mail</label>
            <input id="email" type="email" placeholder="voce@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="password">Senha</label>
            <input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error && <p style={{ color: "#B03A52", fontSize: 13, margin: 0, fontWeight: 600 }}>{error}</p>}

          <button type="submit" className="btn-primary" style={{ justifyContent: "center", marginTop: 6 }}>
            Entrar no ateliê <ChevronRight size={16} />
          </button>
        </form>

        <p style={{ fontSize: 12, color: "#B48D96", textAlign: "center", marginTop: 20 }}>
          Este é um protótipo de demonstração — os dados não são salvos ao recarregar a página.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------ Shell (cabeçalho) ------------------------------------ */
function Shell({ session, onLogout, children }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 28px",
          background: "#FFFDFC",
          borderBottom: "1.5px solid #F5D9E2",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <YarnIcon size={30} />
          <span className="display" style={{ fontSize: 19, fontWeight: 700 }}>Crochetadas</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 13.5, color: "#8B5A67", fontWeight: 600 }}>
            Olá, {session.name}
            {session.role === "admin" && <span className="tag" style={{ marginLeft: 8, fontSize: 10.5 }}>Administradora</span>}
          </span>
          <button className="btn-ghost" onClick={onLogout}>
            <LogOut size={15} /> Sair
          </button>
        </div>
      </header>
      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 24px 60px" }}>{children}</main>
    </div>
  );
}

/* ------------------------------------ Dashboard ------------------------------------ */
function Dashboard({ recipes, canEdit, onNew, onNewWithPreset, onView, onDelete }) {
  const [tab, setTab] = useState("buscar"); // buscar | todas
  const [confirmId, setConfirmId] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = recipes.filter((r) => (r.title + r.category).toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 14, marginBottom: 20 }}>
        <div>
          <h2 className="display" style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>Suas receitas</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "#9C6C79" }}>
            {recipes.length} receita{recipes.length !== 1 ? "s" : ""} cadastrada{recipes.length !== 1 ? "s" : ""}
          </p>
        </div>
        {canEdit && (
          <button className="btn-primary" onClick={onNew}>
            <Plus size={16} /> Nova receita
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 24, background: "#FBE4EC", padding: 5, borderRadius: 999, width: "fit-content" }}>
        <button
          onClick={() => setTab("buscar")}
          className="btn-ghost"
          style={{ borderRadius: 999, padding: "8px 18px", background: tab === "buscar" ? "#FFFDFC" : "transparent", color: tab === "buscar" ? "#C4607F" : "#8B5A67" }}
        >
          Buscar por categoria
        </button>
        <button
          onClick={() => setTab("todas")}
          className="btn-ghost"
          style={{ borderRadius: 999, padding: "8px 18px", background: tab === "todas" ? "#FFFDFC" : "transparent", color: tab === "todas" ? "#C4607F" : "#8B5A67" }}
        >
          Todas as receitas
        </button>
      </div>

      {tab === "buscar" && <CategoryExplorer recipes={recipes} canEdit={canEdit} onView={onView} onNewWithPreset={onNewWithPreset} />}

      {tab === "todas" && (
        <div>
          <div style={{ position: "relative", marginBottom: 22, maxWidth: 340 }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: 12, color: "#C99AA8" }} />
            <input placeholder="Buscar por título ou categoria" value={query} onChange={(e) => setQuery(e.target.value)} style={{ paddingLeft: 38 }} />
          </div>

          {filtered.length === 0 && <EmptyMini text={recipes.length === 0 ? "Nenhuma receita ainda." : "Nada encontrado."} />}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 18 }}>
            {filtered.map((r) => {
              const variants = getVariants(r);
              return (
                <div key={r.id} className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <button
                    onClick={() => onView(r.id)}
                    style={{ all: "unset", cursor: "pointer", height: 150, background: "#FBE4EC", overflow: "hidden", display: "block" }}
                  >
                    {r.image ? (
                      <img src={r.image} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <YarnIcon size={40} color="#E8A0B4" />
                      </div>
                    )}
                  </button>
                  <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <span className="tag">{r.category}</span>
                      <span className="tag">{variants.length > 1 ? `${variants.length} tamanhos` : variants[0].label}</span>
                    </div>
                    <h3 className="display" style={{ fontSize: 17, margin: 0, fontWeight: 600 }}>{r.title}</h3>
                    <p style={{ fontSize: 13, color: "#8B5A67", margin: 0, flex: 1, lineHeight: 1.5 }}>
                      {r.description.length > 90 ? r.description.slice(0, 90) + "…" : r.description}
                    </p>
                    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                      <button className="btn-secondary" style={{ flex: 1, justifyContent: "center", padding: "9px 14px" }} onClick={() => onView(r.id)}>
                        Ver ficha <ChevronRight size={14} />
                      </button>
                      {canEdit && (
                        <button className="icon-btn" onClick={() => setConfirmId(r.id)} title="Excluir receita">
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                    {confirmId === r.id && (
                      <div style={{ background: "#FBE4EC", borderRadius: 12, padding: 12, marginTop: 4 }}>
                        <p style={{ fontSize: 12.5, margin: "0 0 8px", color: "#8B5A67" }}>Excluir esta receita permanentemente?</p>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button className="btn-primary" style={{ padding: "6px 14px", fontSize: 12.5 }} onClick={() => { onDelete(r.id); setConfirmId(null); }}>
                            Excluir
                          </button>
                          <button className="btn-ghost" style={{ padding: "6px 10px", fontSize: 12.5 }} onClick={() => setConfirmId(null)}>
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------ Explorador por categoria ------------------------------------ */
function CategoryExplorer({ recipes, canEdit, onView, onNewWithPreset }) {
  const [category, setCategory] = useState(null);
  const [size, setSize] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [style, setStyle] = useState("");

  if (!category) {
    return (
      <div>
        <p style={{ fontSize: 13.5, color: "#9C6C79", margin: "0 0 16px" }}>
          Escolha uma categoria para buscar pela numeração ou pela medida.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
          {CATEGORY_META.map((c) => {
            const Icon = c.icon;
            const count = recipes.filter((r) => r.category === c.name).length;
            return (
              <button key={c.name} className="cat-card" onClick={() => { setCategory(c.name); setSize(null); setWidth(""); setHeight(""); setStyle(""); }}>
                <Icon size={22} color="#C4607F" />
                <span style={{ fontWeight: 700, fontSize: 13 }}>{c.name}</span>
                <span style={{ fontSize: 11, color: "#B48D96" }}>{count} receita{count !== 1 ? "s" : ""}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const group = groupOf(category);
  const styleList = hasStyleField(category) ? uniqueStyles(recipes, category) : null;
  const back = (
    <button className="btn-ghost" onClick={() => { setCategory(null); setSize(null); setStyle(""); }} style={{ marginBottom: 16 }}>
      <ArrowLeft size={15} /> Trocar categoria
    </button>
  );

  const styleDropdown = styleList && (
    <div style={{ maxWidth: 220, marginBottom: 20 }}>
      <label className="label" htmlFor="style-filter">Estilo</label>
      {styleList.length > 0 ? (
        <select id="style-filter" value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="">Todos os estilos</option>
          {styleList.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      ) : (
        <p style={{ fontSize: 12.5, color: "#B48D96", margin: "6px 0 0" }}>
          Os estilos aparecerão aqui conforme forem informados no cadastro das receitas.
        </p>
      )}
    </div>
  );

  if (group === "roupa" || group === "pantufa") {
    const sizeList = group === "roupa" ? CLOTHING_SIZES : PANTUFA_SIZES;
    const catRecipes = recipes.filter((r) => r.category === category && (!style || r.style === style));
    const sizesWithRecipe = new Set(
      catRecipes.flatMap((r) => getVariants(r).map((v) => v.size || v.key))
    );
    const matches = size
      ? catRecipes
          .map((r) => ({ recipe: r, variant: getVariants(r).find((v) => (v.size || v.key) === size) }))
          .filter((m) => m.variant)
      : [];

    return (
      <div>
        {back}
        <h3 className="display" style={{ fontSize: 18, margin: "0 0 4px", fontWeight: 600 }}>{category}</h3>
        <p style={{ fontSize: 13, color: "#9C6C79", margin: "0 0 14px" }}>
          {group === "pantufa" ? "Escolha a numeração, de RN ao 45, e filtre pelo estilo." : "Escolha o tamanho, do RN ao Adulto GG, e filtre pelo estilo."}
        </p>

        {styleDropdown}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(56px, 1fr))", gap: 8, marginBottom: 22 }}>
          {sizeList.map((s) => (
            <button
              key={s}
              className={`size-chip ${sizesWithRecipe.has(s) ? "has-recipe" : ""}`}
              onClick={() => setSize(s)}
              style={size === s ? { outline: "2px solid #C4607F", outlineOffset: 1 } : undefined}
            >
              {s}
            </button>
          ))}
        </div>

        {size && (
          matches.length > 0 ? (
            <RecipeResultsGrid items={matches.map((m) => ({ recipe: m.recipe, variantKey: m.variant.key, badge: m.variant.label }))} onView={onView} />
          ) : (
            <div className="card" style={{ padding: "26px 20px", textAlign: "center" }}>
              <p style={{ margin: "0 0 14px", fontSize: 13.5, color: "#9C6C79" }}>
                Ainda não há receita de <strong>{category}</strong> no tamanho <strong>{size}</strong>
                {style ? <> no estilo <strong>{style}</strong></> : null}.
              </p>
              {canEdit && (
                <button className="btn-primary" onClick={() => onNewWithPreset({ category, size, style })}>
                  <Plus size={15} /> Cadastrar receita neste tamanho
                </button>
              )}
            </div>
          )
        )}
      </div>
    );
  }

  if (group === "medida") {
    const w = parseFloat(width);
    const h = parseFloat(height);
    const hasQuery = width !== "" || height !== "";
    const catRecipes = recipes.filter((r) => r.category === category && (!style || r.style === style));
    let candidates = catRecipes.flatMap((r) => getVariants(r).map((v) => ({ recipe: r, variant: v })));
    if (hasQuery) {
      candidates = candidates
        .map((c) => {
          const rw = parseFloat(c.variant.width) || 0;
          const rh = parseFloat(c.variant.height) || 0;
          const diff = (isNaN(w) ? 0 : Math.abs(rw - w)) + (isNaN(h) ? 0 : Math.abs(rh - h));
          return { ...c, diff };
        })
        .filter((c) => (isNaN(w) || Math.abs((parseFloat(c.variant.width) || 0) - w) <= 5) && (isNaN(h) || Math.abs((parseFloat(c.variant.height) || 0) - h) <= 5))
        .sort((a, b) => a.diff - b.diff);
    }

    return (
      <div>
        {back}
        <h3 className="display" style={{ fontSize: 18, margin: "0 0 4px", fontWeight: 600 }}>{category}</h3>
        <p style={{ fontSize: 13, color: "#9C6C79", margin: "0 0 14px" }}>
          Busque pela largura e altura desejadas (em cm){styleList ? " e filtre pelo estilo" : ""}.
        </p>

        {styleDropdown}

        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 160 }}>
            <label className="label" htmlFor="w">Largura (cm)</label>
            <input id="w" type="number" min="0" placeholder="Ex: 30" value={width} onChange={(e) => setWidth(e.target.value)} />
          </div>
          <div style={{ maxWidth: 160 }}>
            <label className="label" htmlFor="h">Altura (cm)</label>
            <input id="h" type="number" min="0" placeholder="Ex: 40" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
        </div>

        {candidates.length === 0 ? (
          <div className="card" style={{ padding: "26px 20px", textAlign: "center" }}>
            <p style={{ margin: "0 0 14px", fontSize: 13.5, color: "#9C6C79" }}>
              {hasQuery ? "Nenhuma receita encontrada perto dessa medida." : `Nenhuma receita de ${category} cadastrada ainda.`}
            </p>
            {canEdit && (
              <button className="btn-primary" onClick={() => onNewWithPreset({ category, width, height, style })}>
                <Plus size={15} /> Cadastrar receita
              </button>
            )}
          </div>
        ) : (
          <RecipeResultsGrid items={candidates.map((c) => ({ recipe: c.recipe, variantKey: c.variant.key, badge: c.variant.label }))} onView={onView} />
        )}
      </div>
    );
  }

  // group === 'livre'
  const results = recipes.filter((r) => r.category === category);
  return (
    <div>
      {back}
      <h3 className="display" style={{ fontSize: 18, margin: "0 0 14px", fontWeight: 600 }}>{category}</h3>
      {results.length === 0 ? (
        <div className="card" style={{ padding: "26px 20px", textAlign: "center" }}>
          <p style={{ margin: "0 0 14px", fontSize: 13.5, color: "#9C6C79" }}>Nenhuma receita nesta categoria ainda.</p>
          {canEdit && (
            <button className="btn-primary" onClick={() => onNewWithPreset({ category })}>
              <Plus size={15} /> Cadastrar receita
            </button>
          )}
        </div>
      ) : (
        <RecipeResultsGrid items={results.map((r) => ({ recipe: r, variantKey: null, badge: null }))} onView={onView} />
      )}
    </div>
  );
}

function RecipeResultsGrid({ items, onView }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
      {items.map(({ recipe: r, variantKey, badge }, idx) => (
        <button key={`${r.id}-${variantKey || idx}`} onClick={() => onView(r.id, variantKey)} className="card" style={{ all: "unset", cursor: "pointer" }}>
          <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ height: 120, background: "#FBE4EC", overflow: "hidden" }}>
              {r.image ? (
                <img src={r.image} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <YarnIcon size={30} color="#E8A0B4" />
                </div>
              )}
            </div>
            <div style={{ padding: "12px 14px" }}>
              <h4 className="display" style={{ fontSize: 14.5, margin: "0 0 4px", fontWeight: 600 }}>{r.title}</h4>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {badge && <span className="tag" style={{ fontSize: 11 }}>{badge}</span>}
                {r.style && <span className="tag" style={{ fontSize: 11 }}>{r.style}</span>}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------ Ficha da receita (visualização) ------------------------------------ */
function RecipeView({ recipe, variantKey, canEdit, onSelectVariant, onBack, onEdit, onManageSteps, onImageClick }) {
  const group = groupOf(recipe.category);
  const variants = getVariants(recipe);
  const activeVariant = variants.find((v) => v.key === variantKey) || variants[0];
  const diagramSrc = recipe.diagramKind ? computeDiagram(recipe.diagramKind, activeVariant) : recipe.diagram;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <button className="btn-ghost" onClick={onBack} style={{ marginBottom: 14 }}>
        <ArrowLeft size={15} /> Voltar
      </button>

      <div className="card" style={{ overflow: "hidden", marginBottom: 20 }}>
        <div style={{ height: 220, background: "#FBE4EC" }}>
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              onClick={() => onImageClick(recipe.image)}
              style={{ width: "100%", height: "100%", objectFit: "contain", cursor: "zoom-in" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <YarnIcon size={54} color="#E8A0B4" />
            </div>
          )}
        </div>
        <div style={{ padding: "22px 26px" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            <span className="tag">{recipe.category}</span>
            {recipe.style && <span className="tag">{recipe.style}</span>}
          </div>
          <h2 className="display" style={{ fontSize: 23, margin: "0 0 8px", fontWeight: 600 }}>{recipe.title}</h2>
          <p style={{ fontSize: 14, color: "#8B5A67", lineHeight: 1.6, margin: 0 }}>{recipe.description}</p>

          {variants.length > 1 && (
            <div style={{ marginTop: 18 }}>
              <span className="label">{group === "pantufa" ? "Escolha o número" : group === "roupa" ? "Escolha o tamanho" : "Escolha a medida"}</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {variants.map((v) => (
                  <button
                    key={v.key}
                    onClick={() => onSelectVariant(v.key)}
                    className={`size-chip ${v.key === activeVariant.key ? "has-recipe" : ""}`}
                    style={v.key === activeVariant.key ? { outline: "2px solid #C4607F", outlineOffset: 1 } : undefined}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="card" style={{ background: "#FBE4EC", border: "none", padding: "12px 16px", marginTop: 16 }}>
            <span className="label" style={{ marginBottom: 2 }}>Medida deste tamanho</span>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#AD4E6B" }}>{activeVariant.measureLabel || activeVariant.label}</p>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
            {canEdit ? (
              <>
                <button className="btn-primary" onClick={onManageSteps}>
                  <HookIcon size={15} color="#FFF8F5" /> Ver passos e vídeos
                </button>
                <button className="btn-secondary" onClick={onEdit}>
                  <Pencil size={15} /> Editar receita
                </button>
              </>
            ) : (
              recipe.videos && recipe.videos.length > 0 && (
                <span className="tag">
                  <Video size={12} style={{ marginRight: 4, verticalAlign: "-2px" }} />
                  {recipe.videos.length} vídeo{recipe.videos.length !== 1 ? "s" : ""} abaixo
                </span>
              )
            )}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: "22px 26px", marginBottom: 20 }}>
        <h3 className="display" style={{ fontSize: 16.5, margin: "0 0 4px", fontWeight: 600 }}>Modo de fazer — {activeVariant.label}</h3>
        <p style={{ fontSize: 12.5, color: "#B48D96", margin: "0 0 14px" }}>Os pontos abaixo já são para o tamanho selecionado acima, com ilustração de cada passo e o acabamento no final. Toque numa imagem para ampliar.</p>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
          {(activeVariant.steps || []).map((s, i) => (
            <li key={s.id || i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#FBE4EC", color: "#C4607F", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {s.order || i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 8px", fontSize: 13.5, lineHeight: 1.5, paddingTop: 3 }}>{s.description}</p>
                {s.photo && (
                  <img
                    src={s.photo}
                    alt={`Ilustração do passo ${s.order || i + 1}`}
                    onClick={() => onImageClick(s.photo)}
                    style={{ width: 140, borderRadius: 10, border: "1.5px solid #F5D9E2", cursor: "zoom-in" }}
                  />
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="card" style={{ padding: "22px 26px", marginBottom: 20 }}>
        <h3 className="display" style={{ fontSize: 16.5, margin: "0 0 14px", fontWeight: 600 }}>Gráfico de pontos</h3>
        {diagramSrc ? (
          <img
            src={diagramSrc}
            alt="Gráfico de pontos da receita"
            onClick={() => onImageClick(diagramSrc)}
            style={{ maxWidth: "100%", borderRadius: 12, display: "block", margin: "0 auto", cursor: "zoom-in" }}
          />
        ) : (
          <p style={{ fontSize: 13, color: "#B48D96", margin: 0 }}>Nenhum gráfico de pontos adicionado ainda.</p>
        )}
      </div>

      {recipe.videos && recipe.videos.length > 0 && (
        <div className="card" style={{ padding: "22px 26px", marginBottom: 20 }}>
          <h3 className="display" style={{ fontSize: 16.5, margin: "0 0 14px", fontWeight: 600 }}>Vídeos</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recipe.videos.map((v) => (
              <div key={v.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "#FBE4EC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Video size={16} color="#C4607F" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 13.5 }}>{v.title}</span>
                    <span className="tag" style={{ fontSize: 10.5, padding: "2px 9px" }}>{v.type === "tutorial" ? "Tutorial" : "Finalização"}</span>
                  </div>
                  <a href={v.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#B67486", overflowWrap: "anywhere" }}>{v.url}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card" style={{ padding: "22px 26px" }}>
        <h3 className="display" style={{ fontSize: 16.5, margin: "0 0 4px", fontWeight: 600 }}>Fotos da montagem</h3>
        <p style={{ fontSize: 12.5, color: "#B48D96", margin: "0 0 14px" }}>Toque numa imagem para ampliar.</p>
        {recipe.assemblyPhotos.length === 0 ? (
          <p style={{ fontSize: 13, color: "#B48D96", margin: 0 }}>Nenhuma foto de montagem adicionada ainda.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 10 }}>
            {recipe.assemblyPhotos.map((p, i) => (
              <img
                key={i}
                src={p}
                alt={`Montagem ${i + 1}`}
                onClick={() => onImageClick(p)}
                style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 12, cursor: "zoom-in" }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------ Cadastro / Edição de receita ------------------------------------ */
function RecipeEditor({ recipe, preset, recipes, onCancel, onSave }) {
  const [title, setTitle] = useState(recipe?.title || "");
  const [description, setDescription] = useState(recipe?.description || "");
  const [category, setCategory] = useState(recipe?.category || preset?.category || CATEGORY_NAMES[0]);
  const [size, setSize] = useState(recipe?.size || preset?.size || "");
  const [width, setWidth] = useState(recipe?.width || preset?.width || "");
  const [height, setHeight] = useState(recipe?.height || preset?.height || "");
  const [style, setStyle] = useState(recipe?.style || preset?.style || "");
  const [image, setImage] = useState(recipe?.image || "");
  const [diagram, setDiagram] = useState(recipe?.diagram || "");
  const [assemblyPhotos, setAssemblyPhotos] = useState(recipe?.assemblyPhotos || []);
  const [error, setError] = useState("");

  const fileRef = useRef(null);
  const diagramRef = useRef(null);
  const assemblyRef = useRef(null);

  const group = groupOf(category);
  const showStyleField = hasStyleField(category);
  const styleSuggestions = showStyleField ? uniqueStyles(recipes || [], category) : [];

  function readAsDataUrl(file, cb) {
    const reader = new FileReader();
    reader.onload = () => cb(reader.result);
    reader.readAsDataURL(file);
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (file) readAsDataUrl(file, setImage);
  }
  function handleDiagramUpload(e) {
    const file = e.target.files?.[0];
    if (file) readAsDataUrl(file, setDiagram);
  }
  function handleAssemblyUpload(e) {
    const file = e.target.files?.[0];
    if (file) readAsDataUrl(file, (url) => setAssemblyPhotos((prev) => [...prev, url]));
    e.target.value = "";
  }
  function removeAssemblyPhoto(idx) {
    setAssemblyPhotos((prev) => prev.filter((_, i) => i !== idx));
  }

  function submit(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Preencha ao menos o título e a descrição da receita.");
      return;
    }
    const saved = {
      id: recipe?.id || `r${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      size: group === "roupa" || group === "pantufa" ? size : "",
      width: group === "medida" ? width : "",
      height: group === "medida" ? height : "",
      style: showStyleField ? style.trim() : "",
      image,
      diagram,
      assemblyPhotos,
      steps: recipe?.steps || [],
      videos: recipe?.videos || [],
    };
    onSave(saved);
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <button className="btn-ghost" onClick={onCancel} style={{ marginBottom: 14 }}>
        <ArrowLeft size={15} /> Voltar
      </button>

      <div className="card" style={{ padding: "28px 30px" }}>
        <h2 className="display" style={{ fontSize: 22, margin: "0 0 4px", fontWeight: 600 }}>
          {recipe ? "Editar receita" : "Cadastrar nova receita"}
        </h2>
        <p style={{ fontSize: 13.5, color: "#9C6C79", margin: "0 0 20px" }}>
          Depois de salvar, você poderá adicionar os passos e os vídeos desta receita.
        </p>

        <hr className="stitch-divider" style={{ margin: "0 0 22px" }} />

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label className="label" htmlFor="title">Título</label>
            <input id="title" placeholder="Ex: Blusa Infantil Ponto Concha" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="label" htmlFor="category">Categoria</label>
            <select id="category" value={category} onChange={(e) => { setCategory(e.target.value); setSize(""); setWidth(""); setHeight(""); setStyle(""); }}>
              {CATEGORY_NAMES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {(group === "roupa" || group === "pantufa") && (
            <div>
              <label className="label" htmlFor="size">{group === "pantufa" ? "Numeração" : "Tamanho"}</label>
              <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="">Selecione...</option>
                {(group === "pantufa" ? PANTUFA_SIZES : CLOTHING_SIZES).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}

          {group === "medida" && (
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label className="label" htmlFor="width">Largura (cm)</label>
                <input id="width" type="number" min="0" placeholder="Ex: 30" value={width} onChange={(e) => setWidth(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label className="label" htmlFor="height">Altura (cm)</label>
                <input id="height" type="number" min="0" placeholder="Ex: 40" value={height} onChange={(e) => setHeight(e.target.value)} />
              </div>
            </div>
          )}

          {showStyleField && (
            <div>
              <label className="label" htmlFor="style">Estilo</label>
              <input
                id="style"
                list="style-suggestions"
                placeholder="Digite o estilo desta peça (ex: Manga longa, Trancinha, Tote...)"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              />
              <datalist id="style-suggestions">
                {styleSuggestions.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
              <p style={{ fontSize: 12, color: "#B48D96", margin: "6px 0 0" }}>
                O nome que você digitar aqui aparecerá depois na pasta suspensa de filtro por estilo.
              </p>
            </div>
          )}

          <div>
            <label className="label" htmlFor="description">Descrição</label>
            <textarea
              id="description"
              placeholder="Conte um pouco sobre a peça, o ponto usado e o nível de dificuldade."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: "vertical" }}
            />
          </div>

          <div>
            <label className="label">Foto da peça pronta</label>
            <div
              onClick={() => fileRef.current?.click()}
              style={{ border: "1.5px dashed #E8A0B4", borderRadius: 14, padding: image ? 10 : 26, textAlign: "center", cursor: "pointer", background: "#FFFDFC" }}
            >
              {image ? (
                <img src={image} alt="Pré-visualização" style={{ maxHeight: 160, borderRadius: 10, margin: "0 auto", display: "block" }} />
              ) : (
                <div style={{ color: "#B48D96", fontSize: 13.5 }}>
                  <ImageIcon size={22} style={{ marginBottom: 6 }} />
                  <div>Clique para escolher uma imagem</div>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
          </div>

          <div>
            <label className="label">Fotos da montagem</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
              {assemblyPhotos.map((p, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  <img src={p} alt={`Montagem ${idx + 1}`} style={{ width: 68, height: 68, objectFit: "cover", borderRadius: 10 }} />
                  <button
                    type="button"
                    onClick={() => removeAssemblyPhoto(idx)}
                    className="icon-btn"
                    style={{ position: "absolute", top: -6, right: -6, padding: 3, background: "#FFF8F5" }}
                    title="Remover foto"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className="btn-secondary" onClick={() => assemblyRef.current?.click()}>
              <ImageIcon size={15} /> Adicionar foto de montagem
            </button>
            <input ref={assemblyRef} type="file" accept="image/*" onChange={handleAssemblyUpload} style={{ display: "none" }} />
          </div>

          <div>
            <label className="label">Gráfico de pontos (diagrama)</label>
            <div
              onClick={() => diagramRef.current?.click()}
              style={{ border: "1.5px dashed #E8A0B4", borderRadius: 14, padding: diagram ? 10 : 26, textAlign: "center", cursor: "pointer", background: "#FFFDFC" }}
            >
              {diagram ? (
                <img src={diagram} alt="Pré-visualização do gráfico" style={{ maxHeight: 160, borderRadius: 10, margin: "0 auto", display: "block" }} />
              ) : (
                <div style={{ color: "#B48D96", fontSize: 13.5 }}>
                  <ImageIcon size={22} style={{ marginBottom: 6 }} />
                  <div>Clique para adicionar o gráfico com a legenda dos pontos</div>
                </div>
              )}
            </div>
            <input ref={diagramRef} type="file" accept="image/*" onChange={handleDiagramUpload} style={{ display: "none" }} />
          </div>

          {error && <p style={{ color: "#B03A52", fontSize: 13, margin: 0, fontWeight: 600 }}>{error}</p>}

          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <button type="submit" className="btn-primary">
              Salvar e continuar <ChevronRight size={16} />
            </button>
            <button type="button" className="btn-ghost" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------ Passos e Vídeos ------------------------------------ */
function StepsAndVideos({ recipe, variantKey, onBack, onChange, showToast, onImageClick }) {
  const [tab, setTab] = useState("steps"); // steps | videos
  const variants = getVariants(recipe);
  const activeVariant = variants.find((v) => v.key === variantKey) || variants[0];
  const variantSteps = activeVariant.steps || [];

  const [stepDesc, setStepDesc] = useState("");
  const [stepPhoto, setStepPhoto] = useState("");
  const [editingStepId, setEditingStepId] = useState(null);
  const stepFileRef = useRef(null);

  function resetStepForm() {
    setStepDesc("");
    setStepPhoto("");
    setEditingStepId(null);
  }

  function handleStepPhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setStepPhoto(reader.result);
    reader.readAsDataURL(file);
  }

  function saveStep(e) {
    e.preventDefault();
    if (!stepDesc.trim()) return;
    let steps;
    if (editingStepId) {
      steps = variantSteps.map((s) => (s.id === editingStepId ? { ...s, description: stepDesc.trim(), photo: stepPhoto } : s));
    } else {
      const nextOrder = variantSteps.length ? Math.max(...variantSteps.map((s) => s.order)) + 1 : 1;
      steps = [...variantSteps, { id: `s${Date.now()}`, order: nextOrder, description: stepDesc.trim(), photo: stepPhoto }];
    }
    onChange(updateVariantSteps(recipe, activeVariant.key, steps));
    showToast(editingStepId ? "Passo atualizado." : "Passo adicionado.");
    resetStepForm();
  }

  function editStep(step) {
    setEditingStepId(step.id);
    setStepDesc(step.description);
    setStepPhoto(step.photo || "");
  }

  function deleteStep(id) {
    const steps = variantSteps
      .filter((s) => s.id !== id)
      .sort((a, b) => a.order - b.order)
      .map((s, i) => ({ ...s, order: i + 1 }));
    onChange(updateVariantSteps(recipe, activeVariant.key, steps));
    if (editingStepId === id) resetStepForm();
    showToast("Passo removido.");
  }

  function moveStep(id, direction) {
    const sorted = [...variantSteps].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((s) => s.id === id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    [sorted[idx].order, sorted[swapIdx].order] = [sorted[swapIdx].order, sorted[idx].order];
    onChange(updateVariantSteps(recipe, activeVariant.key, sorted));
  }

  const sortedSteps = [...variantSteps].sort((a, b) => a.order - b.order);

  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoType, setVideoType] = useState("tutorial");
  const [editingVideoId, setEditingVideoId] = useState(null);

  function resetVideoForm() {
    setVideoTitle("");
    setVideoUrl("");
    setVideoType("tutorial");
    setEditingVideoId(null);
  }

  function saveVideo(e) {
    e.preventDefault();
    if (!videoTitle.trim() || !videoUrl.trim()) return;
    let videos;
    if (editingVideoId) {
      videos = recipe.videos.map((v) => (v.id === editingVideoId ? { ...v, title: videoTitle.trim(), url: videoUrl.trim(), type: videoType } : v));
    } else {
      videos = [...recipe.videos, { id: `v${Date.now()}`, title: videoTitle.trim(), url: videoUrl.trim(), type: videoType }];
    }
    onChange({ ...recipe, videos });
    showToast(editingVideoId ? "Vídeo atualizado." : "Vídeo adicionado.");
    resetVideoForm();
  }

  function editVideo(v) {
    setEditingVideoId(v.id);
    setVideoTitle(v.title);
    setVideoUrl(v.url);
    setVideoType(v.type);
  }

  function deleteVideo(id) {
    onChange({ ...recipe, videos: recipe.videos.filter((v) => v.id !== id) });
    if (editingVideoId === id) resetVideoForm();
    showToast("Vídeo removido.");
  }

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <button className="btn-ghost" onClick={onBack} style={{ marginBottom: 14 }}>
        <ArrowLeft size={15} /> Voltar à ficha
      </button>

      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
        <div style={{ width: 64, height: 64, borderRadius: 14, overflow: "hidden", background: "#FBE4EC", flexShrink: 0 }}>
          {recipe.image ? (
            <img src={recipe.image} alt={recipe.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <YarnIcon size={26} color="#E8A0B4" />
            </div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <span className="tag">{recipe.category}</span>
          <h2 className="display" style={{ fontSize: 21, margin: "4px 0 0", fontWeight: 600 }}>{recipe.title}</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12.5, color: "#B48D96" }}>Editando o tamanho: <strong>{activeVariant.label}</strong></p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 20, background: "#FBE4EC", padding: 5, borderRadius: 999, width: "fit-content" }}>
        <button
          onClick={() => setTab("steps")}
          className="btn-ghost"
          style={{ borderRadius: 999, padding: "8px 18px", background: tab === "steps" ? "#FFFDFC" : "transparent", color: tab === "steps" ? "#C4607F" : "#8B5A67" }}
        >
          <HookIcon size={14} color={tab === "steps" ? "#C4607F" : "#8B5A67"} /> Passos ({variantSteps.length})
        </button>
        <button
          onClick={() => setTab("videos")}
          className="btn-ghost"
          style={{ borderRadius: 999, padding: "8px 18px", background: tab === "videos" ? "#FFFDFC" : "transparent", color: tab === "videos" ? "#C4607F" : "#8B5A67" }}
        >
          <Video size={14} /> Vídeos ({recipe.videos.length})
        </button>
      </div>

      {tab === "steps" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card" style={{ padding: "22px 24px" }}>
            <h3 className="display" style={{ fontSize: 16.5, margin: "0 0 14px", fontWeight: 600 }}>
              {editingStepId ? "Editar passo" : "Adicionar passo"}
            </h3>
            <form onSubmit={saveStep} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label className="label" htmlFor="stepdesc">Descrição do passo</label>
                <textarea
                  id="stepdesc"
                  rows={3}
                  placeholder="Ex: Faça 6 pontos baixos no anel mágico."
                  value={stepDesc}
                  onChange={(e) => setStepDesc(e.target.value)}
                  style={{ resize: "vertical" }}
                />
              </div>
              <div>
                <label className="label">Foto do passo (opcional)</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button type="button" className="btn-secondary" onClick={() => stepFileRef.current?.click()}>
                    <ImageIcon size={15} /> {stepPhoto ? "Trocar foto" : "Escolher foto"}
                  </button>
                  {stepPhoto && <img src={stepPhoto} alt="Prévia do passo" style={{ height: 44, borderRadius: 8 }} />}
                  <input ref={stepFileRef} type="file" accept="image/*" onChange={handleStepPhoto} style={{ display: "none" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button type="submit" className="btn-primary">
                  <Plus size={15} /> {editingStepId ? "Salvar alteração" : "Adicionar passo"}
                </button>
                {editingStepId && (
                  <button type="button" className="btn-ghost" onClick={resetStepForm}>
                    Cancelar edição
                  </button>
                )}
              </div>
            </form>
          </div>

          {sortedSteps.length === 0 ? (
            <EmptyMini text="Nenhum passo cadastrado ainda. Adicione o primeiro acima." />
          ) : (
            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {sortedSteps.map((s, idx) => (
                <li key={s.id} className="card" style={{ padding: "14px 16px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#FBE4EC", color: "#C4607F", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {s.order}
                  </div>
                  {s.photo && (
                    <img
                      src={s.photo}
                      alt={`Passo ${s.order}`}
                      onClick={() => onImageClick(s.photo)}
                      style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 10, flexShrink: 0, cursor: "zoom-in" }}
                    />
                  )}
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, flex: 1, paddingTop: 4 }}>{s.description}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <button className="icon-btn" style={{ padding: 5 }} disabled={idx === 0} onClick={() => moveStep(s.id, "up")} title="Mover para cima">
                      <ArrowUp size={13} />
                    </button>
                    <button className="icon-btn" style={{ padding: 5 }} disabled={idx === sortedSteps.length - 1} onClick={() => moveStep(s.id, "down")} title="Mover para baixo">
                      <ArrowDown size={13} />
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <button className="icon-btn" style={{ padding: 5 }} onClick={() => editStep(s)} title="Editar passo">
                      <Pencil size={13} />
                    </button>
                    <button className="icon-btn" style={{ padding: 5 }} onClick={() => deleteStep(s.id)} title="Excluir passo">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {tab === "videos" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card" style={{ padding: "22px 24px" }}>
            <h3 className="display" style={{ fontSize: 16.5, margin: "0 0 14px", fontWeight: 600 }}>
              {editingVideoId ? "Editar vídeo" : "Adicionar vídeo"}
            </h3>
            <form onSubmit={saveVideo} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label className="label" htmlFor="vtitle">Título do vídeo</label>
                <input id="vtitle" placeholder="Ex: Como fechar o amigurumi" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} />
              </div>
              <div>
                <label className="label" htmlFor="vurl">Link do vídeo</label>
                <input id="vurl" placeholder="https://..." value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
              </div>
              <div>
                <label className="label" htmlFor="vtype">Tipo</label>
                <select id="vtype" value={videoType} onChange={(e) => setVideoType(e.target.value)}>
                  <option value="tutorial">Tutorial</option>
                  <option value="finalizacao">Finalização</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button type="submit" className="btn-primary">
                  <Plus size={15} /> {editingVideoId ? "Salvar alteração" : "Adicionar vídeo"}
                </button>
                {editingVideoId && (
                  <button type="button" className="btn-ghost" onClick={resetVideoForm}>
                    Cancelar edição
                  </button>
                )}
              </div>
            </form>
          </div>

          {recipe.videos.length === 0 ? (
            <EmptyMini text="Nenhum vídeo cadastrado ainda. Adicione o primeiro acima." />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recipe.videos.map((v) => (
                <div key={v.id} className="card" style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#FBE4EC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Video size={18} color="#C4607F" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontWeight: 700, fontSize: 13.5 }}>{v.title}</span>
                      <span className="tag" style={{ fontSize: 10.5, padding: "2px 9px" }}>{v.type === "tutorial" ? "Tutorial" : "Finalização"}</span>
                    </div>
                    <a href={v.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#B67486", overflowWrap: "anywhere" }}>{v.url}</a>
                  </div>
                  <button className="icon-btn" onClick={() => editVideo(v)} title="Editar vídeo">
                    <Pencil size={14} />
                  </button>
                  <button className="icon-btn" onClick={() => deleteVideo(v.id)} title="Excluir vídeo">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EmptyMini({ text }) {
  return (
    <div className="card" style={{ padding: "26px 20px", textAlign: "center" }}>
      <p style={{ margin: 0, fontSize: 13.5, color: "#9C6C79" }}>{text}</p>
    </div>
  );
}
