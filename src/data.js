// ─────────────────────────────────────────────────────────────────────────────
// data.js — Données marché palta Hass Europe
// Mettre à jour chaque semaine avec les nouvelles données des rapports PDF/Excel
// ─────────────────────────────────────────────────────────────────────────────

// PRIX RÉELS CIF EUROPE par semaine / origine / calibre
// Cal. 14–24 : €/caisse 4kg  |  Cal. 26–32 : €/kg
export const REAL_PRICES = {
  16: {
    "Pérou": {
      14: [12.50, 14.00], 16: [12.50, 13.50], 18: [12.00, 13.00],
      20: [11.50, 12.50], 22: [10.00, 12.00], 24: [8.50, 10.50],
      26: [1.90, 2.00],   28: [1.80, 1.90],   30: [1.50, 1.70],  32: [1.40, 1.60],
    },
    "Colombia": {
      14: [11.00, 12.00], 16: [10.50, 12.00], 18: [10.50, 12.00],
      20: [9.50, 10.50],  22: [8.50, 10.50],  24: [8.00, 9.00],
      26: [1.40, 1.70],   28: [1.30, 1.50],   30: [1.20, 1.40],  32: [1.10, 1.20],
    },
    "Espagne": {
      14: [14.00, 15.00], 16: [14.00, 15.00], 18: [14.00, 14.50],
      20: [13.00, 14.00], 22: [12.00, 14.00], 24: [12.00, 14.00],
      26: [2.50, 3.00],
    },
    "Afrique du Sud": {
      14: [11.50, 12.50], 16: [11.00, 12.50], 18: [11.00, 12.50],
      20: [11.00, 12.00], 22: [10.00, 11.00], 24: [8.00, 9.50],
    },
    "Brésil": {
      14: [11.50, 12.50], 16: [11.00, 12.50], 18: [11.00, 12.50],
      20: [11.00, 12.00], 22: [10.00, 11.00],
    },
  },
  17: {
    "Pérou": {
      14: [12.50, 14.00], 16: [12.50, 13.50], 18: [12.00, 13.50],
      20: [11.00, 12.00], 22: [8.50, 11.00],  24: [7.50, 9.00],
      26: [1.60, 1.80],   28: [1.60, 1.70],   30: [1.30, 1.50],  32: [1.20, 1.30],
    },
    "Colombia": {
      14: [11.00, 12.50], 16: [11.00, 12.50], 18: [11.00, 12.00],
      20: [10.50, 11.50], 22: [8.50, 10.00],  24: [7.50, 8.50],
      26: [1.40, 1.70],   28: [1.30, 1.50],   30: [1.20, 1.50],  32: [1.10, 1.30],
    },
    "Espagne": {
      14: [14.00, 15.00], 16: [14.00, 15.00], 18: [14.00, 14.50],
      20: [12.80, 13.50], 22: [11.50, 13.00], 24: [11.50, 13.00],
      26: [2.30, 2.80],
    },
    "Afrique du Sud": {
      14: [11.50, 12.50], 16: [11.50, 12.50], 18: [11.50, 12.50],
      20: [10.50, 11.50], 22: [9.50, 10.00],
    },
    "Brésil": {
      14: [11.50, 12.50], 16: [11.00, 12.50], 18: [11.00, 12.50],
      20: [10.50, 12.00], 22: [9.50, 10.50],
    },
  },
  18: {
    "Pérou": {
      14: [12.00, 13.50], 16: [12.00, 13.00], 18: [11.50, 12.50],
      20: [10.50, 11.50], 22: [9.50, 11.00],  24: [7.00, 8.00],
      26: [1.50, 1.70],   28: [1.40, 1.60],   30: [1.20, 1.30],  32: [1.20, 1.30],
    },
    "Colombia": {
      14: [11.00, 11.50], 16: [11.00, 11.50], 18: [11.00, 11.50],
      20: [10.00, 11.00], 22: [8.00, 9.00],   24: [6.00, 7.00],
      26: [1.20, 1.60],   28: [1.20, 1.40],   30: [1.15, 1.30],  32: [1.00, 1.20],
    },
    "Afrique du Sud": {
      14: [11.00, 12.50], 16: [11.00, 12.50], 18: [11.00, 12.50],
      20: [10.00, 11.00],
    },
    "Brésil": {
      14: [11.00, 12.50], 16: [11.50, 12.50], 18: [11.00, 12.50],
      20: [10.00, 11.00], 22: [8.00, 9.00],
    },
  },
  // ── AJOUTER ICI LES NOUVELLES SEMAINES ──────────────────────────────────
  // 19: { "Pérou": { 14: [...], ... }, ... },
};

// Dernière semaine disponible (mettre à jour chaque semaine)
export const LATEST_WEEK = 18;

// Prix référence CIRAD Hass Cal.18 (€/caisse 4kg) — marché spot Europe
export const CIRAD_REF = {
  11: 11.97, 12: 11.86, 13: 12.14, 14: 12.22,
  15: 12.30, 16: 12.45, 17: 11.87,
  // 18: x.xx  ← ajouter chaque semaine
};

// Volumes hebdomadaires Europe totaux (millions kg)
// Sources: rapports S16-S18 + projections
export const WEEKLY_SUPPLY_EU = {
  14: 21.7, 15: 22.5, 16: 24.7, 17: 27.7, 18: 26.5,
  19: 24.9, 20: 27.0, 21: 25.2, 22: 24.8,
  // projections — mettre à jour avec données réelles
};

// Semaines réelles (pas projections)
export const REAL_WEEKS = [14, 15, 16, 17, 18];

// Top importateurs Pérou → Europe (conteneurs cumulés)
// Mettre à jour en ajoutant une nouvelle colonne chaque semaine
export const TOP_IMPORTERS = [
  { name: "Nature's Pride BV",       country: "NL", volumes: { "S17 (17/04)": 178.5, "S22 (01/05)": 306.5 } },
  { name: "Trops Import-Export SL",  country: "ES", volumes: { "S17 (17/04)": 96,    "S22 (01/05)": 183   } },
  { name: "Hillfresh Int. BV",       country: "NL", volumes: { "S17 (17/04)": 153,   "S22 (01/05)": 191   } },
  { name: "Jose Luis Montosa SL",    country: "ES", volumes: { "S17 (17/04)": 122,   "S22 (01/05)": 152   } },
  { name: "OGL Food Trade GmbH",     country: "DE", volumes: { "S17 (17/04)": 87,    "S22 (01/05)": 147   } },
  { name: "Axarfruit SL",            country: "ES", volumes: { "S17 (17/04)": 129,   "S22 (01/05)": 149   } },
  { name: "Roveg Fruit BV",          country: "NL", volumes: { "S17 (17/04)": 100,   "S22 (01/05)": 118   } },
  { name: "HL Hall Int. Ltd",        country: "UK", volumes: { "S17 (17/04)": 107,   "S22 (01/05)": 122   } },
  { name: "CMR Group",               country: "BE", volumes: { "S17 (17/04)": 85,    "S22 (01/05)": 115   } },
  { name: "Cía Aguacatera del Sur",  country: "ES", volumes: { "S17 (17/04)": 74,    "S22 (01/05)": 111   } },
];

// Contexte marché par origine (mettre à jour chaque semaine)
export const MARKET_CONTEXT = {
  "Pérou": {
    big: "↗", medium: "↘", small: "↘↘",
    note: "60-70% cal.22-32 Sierra. Entrée Olmos semaine 20. ~750 cnts/sem Europe.",
    containers_week: 791,
    season: "Pic saisonnier · transition Sierra → Côte",
  },
  "Colombia": {
    big: "=", medium: "↘", small: "↘↘",
    note: "Flor traviesa, petits calibres dominant. -60% vs 2025 vers Europe.",
    containers_week: 50,
    season: "Début saison flor traviesa",
  },
  "Afrique du Sud": {
    big: "↗", medium: "=", small: "=",
    note: "Avantage calibres grands. Maluma difficile. Peak S17-18, réduction prévue.",
    containers_week: 120,
    season: "Post-peak, réduction graduelle",
  },
  "Brésil": {
    big: "=", medium: "↘", small: "↘",
    note: "Peak passé. Réorientation vers Argentine/Uruguay. EU <120 cnts/sem.",
    containers_week: 80,
    season: "Réduction après peak",
  },
  "Espagne": {
    big: "↘", medium: "↘", small: "↘",
    note: "Fin de saison définitive. Marché interne uniquement.",
    containers_week: 5,
    season: "Clôture de saison",
  },
};

// Config origines
export const ORIGINS_CONFIG = {
  "Pérou":          { flag: "🇵🇪", color: "#f59e0b", currency: "PEN" },
  "Colombia":       { flag: "🇨🇴", color: "#4ade80", currency: "COP" },
  "Afrique du Sud": { flag: "🇿🇦", color: "#34d399", currency: "ZAR" },
  "Brésil":         { flag: "🇧🇷", color: "#60a5fa", currency: "BRL" },
  "Espagne":        { flag: "🇪🇸", color: "#f87171", currency: "EUR" },
};

export const CALIBRES_LIST = [14, 16, 18, 20, 22, 24, 26, 28, 30, 32];

export const CALIBRE_WEIGHTS = {
  14: "285-333g", 16: "250-285g", 18: "222-250g", 20: "200-222g",
  22: "182-200g", 24: "167-182g", 26: "154-167g", 28: "143-154g",
  30: "133-143g", 32: "125-133g",
};
