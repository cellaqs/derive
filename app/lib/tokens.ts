/**
 * Dérive — Design Tokens
 * Fonte única da verdade para cores, tipografia e espaçamentos.
 * Importe `tokens` nos componentes em vez de usar hex/px soltos.
 */

export const tokens = {
  // ─── Cores ────────────────────────────────────────────────────────────────

  color: {
    // ── Figma tokens oficiais: --color/light/* ────────────────────────────

    /** --color/light/dark/950 — texto principal, quase preto */
    dark950: "#1a1a18",

    /** --color/light/dark/800 — texto secundário escuro */
    dark800: "#393936",

    /** --color/light/dark/500 — texto muted médio */
    dark500: "#6a6962",

    /** --color/light/dark/400 — labels de campo */
    dark400: "#84837d",

    /** --color/light/dark/300 — bordas de input */
    dark300: "#a7a6a1",

    /** --color/light/dark/200 — placeholder */
    dark200: "#cac9c5",

    /** --color/light/red/600 — vermelho primário */
    red600: "#c8382a",

    /** --color/light/neutrals/white */
    white: "#ffffff",

    // ── Fundos ────────────────────────────────────────────────────────────

    /** Fundo externo (cinza quente) */
    bgOuter: "#d9d7d2",

    /** Fundo principal das telas (creme) */
    bgCard: "#f5f0e8",

    /** Fundo da caixa de upload de foto */
    bgUpload: "#f0e9de",

    // ── Bordas e divisores ────────────────────────────────────────────────

    /** Divisor de seção */
    divider: "#e0dbd3",

    /** Borda de input */
    borderInput: "#a7a6a1",

    /** Borda da caixa de upload */
    borderUpload: "#676360",

    /** Texto/ícone na caixa de upload */
    inkUpload: "#403f3b",

    // ── Aliases legíveis ──────────────────────────────────────────────────

    /** Vermelho primário (alias de red600) */
    red: "#c8382a",

    /** Texto principal (alias de dark950) */
    ink: "#1a1a18",

    /** Texto muted em telas escuras */
    inkMuted: "#928f8a",
  },

  // ─── Tipografia ───────────────────────────────────────────────────────────

  font: {
    /** DM Serif Display — títulos editoriais */
    serif: "var(--font-dm-serif)",

    /** Instrument Serif — itálicos editoriais */
    editorial: "var(--font-instrument-serif)",

    /** DM Sans — labels, botões, caps */
    sans: "var(--font-dm-sans)",
  },

  // ─── Tamanhos de fonte ────────────────────────────────────────────────────

  fontSize: {
    label: "9px",
    labelMd: "10px",
    body: "12px",
    bodyMd: "15px",
    quote: "11px",
    instruction: "44px",
    titleSm: "26px",
    titleMd: "36px",
    titleLg: "52px",
    display: "64px",
  },

  // ─── Espaçamentos-chave ───────────────────────────────────────────────────

  spacing: {
    pagePx: "24px",   // padding horizontal da página
    pagePt: "24px",   // padding top da página
    sectionGap: "32px",
    photoToRua: "10px",
    ruaToText: "36px",
  },

  // ─── Outros ───────────────────────────────────────────────────────────────

  shadow: {
    card: "0 10px 35px rgba(0,0,0,0.14)",
  },

  radius: {
    none: "0px",
  },
} as const

// Atalhos rápidos para as cores mais usadas
export const { color } = tokens
