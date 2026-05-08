export const REAL_PRICES = {
  16: {
    "Peru":         { 14:[12.50,14.00],16:[12.50,13.50],18:[12.00,13.00],20:[11.50,12.50],22:[10.00,12.00],24:[8.50,10.50],26:[1.90,2.00],28:[1.80,1.90],30:[1.50,1.70],32:[1.40,1.60] },
    "Colombia":     { 14:[11.00,12.00],16:[10.50,12.00],18:[10.50,12.00],20:[9.50,10.50],22:[8.50,10.50],24:[8.00,9.00],26:[1.40,1.70],28:[1.30,1.50],30:[1.20,1.40],32:[1.10,1.20] },
    "Spain":        { 14:[14.00,15.00],16:[14.00,15.00],18:[14.00,14.50],20:[13.00,14.00],22:[12.00,14.00],24:[12.00,14.00],26:[2.50,3.00] },
    "South Africa": { 14:[11.50,12.50],16:[11.00,12.50],18:[11.00,12.50],20:[11.00,12.00],22:[10.00,11.00],24:[8.00,9.50] },
    "Brazil":       { 14:[11.50,12.50],16:[11.00,12.50],18:[11.00,12.50],20:[11.00,12.00],22:[10.00,11.00] },
  },
  17: {
    "Peru":         { 14:[12.50,14.00],16:[12.50,13.50],18:[12.00,13.50],20:[11.00,12.00],22:[8.50,11.00],24:[7.50,9.00],26:[1.60,1.80],28:[1.60,1.70],30:[1.30,1.50],32:[1.20,1.30] },
    "Colombia":     { 14:[11.00,12.50],16:[11.00,12.50],18:[11.00,12.00],20:[10.50,11.50],22:[8.50,10.00],24:[7.50,8.50],26:[1.40,1.70],28:[1.30,1.50],30:[1.20,1.50],32:[1.10,1.30] },
    "Spain":        { 14:[14.00,15.00],16:[14.00,15.00],18:[14.00,14.50],20:[12.80,13.50],22:[11.50,13.00],24:[11.50,13.00],26:[2.30,2.80] },
    "South Africa": { 14:[11.50,12.50],16:[11.50,12.50],18:[11.50,12.50],20:[10.50,11.50],22:[9.50,10.00] },
    "Brazil":       { 14:[11.50,12.50],16:[11.00,12.50],18:[11.00,12.50],20:[10.50,12.00],22:[9.50,10.50] },
  },
  18: {
    "Peru":         { 14:[12.00,13.50],16:[12.00,13.00],18:[11.50,12.50],20:[10.50,11.50],22:[9.50,11.00],24:[7.00,8.00],26:[1.50,1.70],28:[1.40,1.60],30:[1.20,1.30],32:[1.20,1.30] },
    "Colombia":     { 14:[11.00,11.50],16:[11.00,11.50],18:[11.00,11.50],20:[10.00,11.00],22:[8.00,9.00],24:[6.00,7.00],26:[1.20,1.60],28:[1.20,1.40],30:[1.15,1.30],32:[1.00,1.20] },
    "South Africa": { 14:[11.00,12.50],16:[11.00,12.50],18:[11.00,12.50],20:[10.00,11.00] },
    "Brazil":       { 14:[11.00,12.50],16:[11.50,12.50],18:[11.00,12.50],20:[10.00,11.00],22:[8.00,9.00] },
  },
  19: {
    "Peru":         { 14:[11.00,12.00],16:[11.00,12.00],18:[11.00,12.00],20:[9.50,10.50],22:[8.00,9.00],24:[7.00,8.00],26:[1.30,1.50],28:[1.20,1.40],30:[1.10,1.30],32:[1.00,1.20] },
    "Colombia":     { 16:[10.00,11.00],18:[10.00,11.00],20:[9.00,10.00],22:[7.50,8.50],24:[6.00,7.00],26:[1.20,1.40],28:[1.10,1.30],30:[1.00,1.20],32:[0.90,1.10] },
    "South Africa": { 14:[8.00,9.00],16:[10.50,11.50],18:[10.50,11.50],20:[9.00,10.00],22:[7.50,8.50] },
    "Brazil":       { 14:[9.50,11.00],16:[9.50,11.00],18:[9.50,11.00],20:[8.50,9.50],22:[7.50,8.50] },
  },
};
export const LATEST_WEEK = 19;
export const CIRAD_REF = { 11:11.97,12:11.86,13:12.14,14:12.22,15:12.30,16:12.45,17:11.87,18:11.21 };
export const WEEKLY_SUPPLY_EU = { 14:21.7,15:22.5,16:24.7,17:27.7,18:26.5,19:24.9,20:23.8,21:25.5,22:25.2 };
export const REAL_WEEKS = [14,15,16,17,18,19];
export const TOP_IMPORTERS = [
  { name:"Nature's Pride BV",      country:"NL", w17:178.5, w18:306.5 },
  { name:"Trops Import-Export SL", country:"ES", w17:96,    w18:183   },
  { name:"Hillfresh Int. BV",      country:"NL", w17:153,   w18:191   },
  { name:"Jose Luis Montosa SL",   country:"ES", w17:122,   w18:152   },
  { name:"OGL Food Trade GmbH",    country:"DE", w17:87,    w18:147   },
  { name:"Axarfruit SL",           country:"ES", w17:129,   w18:149   },
  { name:"Roveg Fruit BV",         country:"NL", w17:100,   w18:118   },
  { name:"HL Hall Int. Ltd",       country:"UK", w17:107,   w18:122   },
  { name:"CMR Group",              country:"BE", w17:85,    w18:115   },
  { name:"Cía Aguacatera del Sur", country:"ES", w17:74,    w18:111   },
];
export const CALIBRES_LIST = [14,16,18,20,22,24,26,28,30,32];
export const CALIBRE_WEIGHTS = { 14:"285-333g",16:"250-285g",18:"222-250g",20:"200-222g",22:"182-200g",24:"167-182g",26:"154-167g",28:"143-154g",30:"133-143g",32:"125-133g" };
export const ORIGIN_COLOR = { "Peru":"#f59e0b","Colombia":"#4ade80","South Africa":"#34d399","Brazil":"#60a5fa","Spain":"#f87171" };
export const ORIGIN_FLAG  = { "Peru":"🇵🇪","Colombia":"🇨🇴","South Africa":"🇿🇦","Brazil":"🇧🇷","Spain":"🇪🇸" };

// ─── PRÉVISIONS S20-S23 ──────────────────────────────────────────────────────
// Basées sur : tendance CIRAD S14→S18 (-9.9%), peak Pérou S20-S22, Olmos S20+,
// sortie progressive Brésil/Sierra S22-S23, qualité Maluma SA en déclin.
export const FORECAST_WEEKS = [20, 21, 22, 23];

// Prévisions de prix par origine et calibre [min, max]
// Logique : suite tendance baissière S19 puis stabilisation S22-S23 (équilibre Olmos/sortie Brésil)
export const FORECAST_PRICES = {
  20: {
    "Peru":         { 14:[10.50,11.50],16:[10.50,11.50],18:[10.50,11.50],20:[9.00,10.00],22:[7.50,8.50],24:[6.50,7.50],26:[1.20,1.40],28:[1.10,1.30],30:[1.00,1.20],32:[0.90,1.10] },
    "Colombia":     { 16:[9.50,10.50],18:[9.50,10.50],20:[8.50,9.50],22:[7.00,8.00],24:[5.50,6.50],26:[1.10,1.30],28:[1.00,1.20],30:[0.90,1.10],32:[0.80,1.00] },
    "South Africa": { 14:[7.50,8.50],16:[10.00,11.00],18:[10.00,11.00],20:[8.50,9.50],22:[7.00,8.00] },
    "Brazil":       { 14:[9.00,10.50],16:[9.00,10.50],18:[9.00,10.50],20:[8.00,9.00],22:[7.00,8.00] },
  },
  21: {
    "Peru":         { 14:[10.00,11.00],16:[10.00,11.00],18:[10.00,11.00],20:[8.50,9.50],22:[7.00,8.00],24:[6.00,7.00],26:[1.10,1.30],28:[1.00,1.20],30:[0.90,1.10],32:[0.80,1.00] },
    "Colombia":     { 16:[9.00,10.00],18:[9.00,10.00],20:[8.00,9.00],22:[6.50,7.50],24:[5.00,6.00],26:[1.00,1.20],28:[0.90,1.10],30:[0.80,1.00],32:[0.70,0.90] },
    "South Africa": { 16:[9.50,10.50],18:[9.50,10.50],20:[8.00,9.00],22:[6.50,7.50] },
    "Brazil":       { 16:[8.50,10.00],18:[8.50,10.00],20:[7.50,8.50],22:[6.50,7.50] },
  },
  22: {
    "Peru":         { 14:[10.00,11.00],16:[10.00,11.00],18:[10.50,11.50],20:[9.00,10.00],22:[7.50,8.50],24:[6.50,7.50],26:[1.20,1.40],28:[1.10,1.30],30:[1.00,1.20],32:[0.90,1.10] },
    "Colombia":     { 16:[9.00,10.00],18:[9.00,10.00],20:[8.00,9.00],22:[7.00,8.00],24:[5.50,6.50],26:[1.10,1.30],28:[1.00,1.20],30:[0.90,1.10],32:[0.80,1.00] },
    "South Africa": { 18:[9.50,10.50],20:[8.50,9.50],22:[7.00,8.00] },
    "Brazil":       { 18:[8.50,10.00],20:[8.00,9.00] },
  },
  23: {
    "Peru":         { 14:[10.50,11.50],16:[10.50,11.50],18:[11.00,12.00],20:[9.50,10.50],22:[8.00,9.00],24:[7.00,8.00],26:[1.30,1.50],28:[1.20,1.40],30:[1.10,1.30],32:[1.00,1.20] },
    "Colombia":     { 18:[9.50,10.50],20:[8.50,9.50],22:[7.50,8.50],24:[6.00,7.00],26:[1.20,1.40],28:[1.10,1.30],30:[1.00,1.20] },
    "South Africa": { 18:[9.00,10.00],20:[8.00,9.00] },
  },
};

// Volume offre EU prévu (M kg/semaine) — selon CIRAD : ~25M stable S20-S22 puis légère hausse S23
export const FORECAST_SUPPLY = { 20:25.0, 21:25.5, 22:25.0, 23:24.5 };

// Tendance globale par semaine et catégorie de calibres
// Légende : ↘↘ très baissier · ↘ baissier · = stable · ↗ haussier · ↗↗ très haussier
export const FORECAST_TREND = {
  20: { big:"↘", medium:"↘", small:"↘", note:"Peak Pérou + Olmos. Pression maximale sur tous calibres." },
  21: { big:"↘", medium:"↘", small:"↘↘", note:"Inventaires accumulés, liquidations sur petits calibres." },
  22: { big:"=", medium:"↗", small:"↘", note:"Sortie Brésil amorcée. Calibres moyens commencent à remonter." },
  23: { big:"↗", medium:"↗", small:"=", note:"Fin Sierra + Brésil → équilibre courbe calibres. Rebond cal.18-22." },
};

// Carte stratégique acheteur — recommandation par semaine
export const FORECAST_STRATEGY = {
  20: { color:"#16a34a", label:"🟢 ACHETER", reason:"Prix au plus bas. Idéal pour gros volumes promotionnels." },
  21: { color:"#16a34a", label:"🟢 ACHETER", reason:"Petits calibres en liquidation, opportunité industrie/transformation." },
  22: { color:"#f59e0b", label:"🟡 ATTENDRE", reason:"Transition. Préparer les commandes cal.18-22 pour S23." },
  23: { color:"#3b82f6", label:"🔵 STOCKER", reason:"Rebond confirmé. Sécuriser les volumes avant montée S24+." },
};

// Facteurs climat & contexte (impactent les prévisions)
export const FORECAST_FACTORS = [
  { icon:"🌡️", label:"Stress hydrique Pérou Sierra", impact:"Qualité variable, materia seca insuffisante", weight:"medium" },
  { icon:"🥑", label:"Maluma SA pulpe grise", impact:"Effet contagion sur Hass cal.12-16", weight:"high" },
  { icon:"🇺🇸", label:"Post Cinco de Mayo", impact:"Libération volumes Mexique/USA → moins de pression", weight:"low" },
  { icon:"⚗️", label:"Contrôles cadmium Pays-Bas", impact:"Délais 3-4j supplémentaires en commercialisation", weight:"medium" },
  { icon:"📅", label:"Promotions DE/FR/NL", impact:"Soutien consommation -5% à -15% prix retail", weight:"high" },
  { icon:"🌿", label:"Olmos Pérou démarrage", impact:"Calibres moyens-grands à partir de S20", weight:"high" },
];
