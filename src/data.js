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

// ═══════════════════════════════════════════════════════════════════════════
// DONNÉES PROHASS 2026 — Source officielle producteurs Pérou (AMC/SENASA)
// ═══════════════════════════════════════════════════════════════════════════

// Volumes hebdomadaires Pérou TOTAL toutes destinations 2026 (TM)
// Réel S01-S14, Projeté S15-S52
export const PERU_WEEKLY_TOTAL = {
  6:3200,7:2400,8:6300,9:7400,10:9100,11:11100,12:17300,13:16800,14:17700,
  15:22700,16:27500,17:26700,18:29100,19:31600,20:33000,21:33700,22:34900,23:36000,
  24:34000,25:32500,26:32200,27:31600,28:31400,29:31200,30:30100,31:25900,
  32:24600,33:25700,34:23300,35:22000,36:16700,37:13600,38:7300,39:3000,
};

// Volumes hebdomadaires Pérou → EUROPE 2026 (TM)
export const PERU_WEEKLY_EUROPE = {
  6:1900,7:2200,8:4300,9:5400,10:7600,11:9300,12:10100,13:12700,14:13300,
  15:15800,16:19700,17:19700,18:20100,19:19800,20:20200,21:20500,22:20200,23:19800,
  24:19700,25:17800,26:17600,27:18200,28:18200,29:18200,30:18000,31:15800,
  32:15200,33:16800,34:16400,35:15500,36:12600,37:10800,38:5800,39:2500,
};

// Volumes hebdomadaires Pérou → USA 2026 (TM)
export const PERU_WEEKLY_USA = {
  15:1000,16:1800,17:2000,18:2700,19:3700,20:3800,21:5600,22:5800,23:6700,
  24:7600,25:7300,26:7600,27:6700,28:6900,29:6500,30:6300,31:5300,
  32:4900,33:4600,34:3500,35:3000,36:2000,37:1300,38:500,
};

// Volumes hebdomadaires Pérou → ASIE 2026 (TM)
export const PERU_WEEKLY_ASIA = {
  3:760,4:130,5:1080,6:1200,8:1640,9:1550,10:600,11:430,12:130,13:1900,
  14:1900,15:3270,16:3180,17:1940,18:3370,19:3880,20:4060,21:3340,22:4350,23:4320,
  24:2840,25:3200,26:2820,27:1830,28:1410,29:1060,30:920,31:1950,
  32:1860,33:1880,34:1530,35:1370,
};

// Export annuel Pérou TOTAL (TM)
export const PERU_ANNUAL_TOTAL = {
  2020:375755, 2021:494519, 2022:570599, 2023:578465, 2024:523035, 2025:722754, 2026:762557,
};

// Export annuel Pérou → Europe (TM)
export const PERU_ANNUAL_EUROPE = {
  2020:235092, 2021:285632, 2022:321829, 2023:350947, 2024:326609, 2025:452637, 2026:487735,
};

// Export annuel Pérou → USA (TM)
export const PERU_ANNUAL_USA = {
  2020:78057, 2021:84824, 2022:123765, 2023:74550, 2024:65774, 2025:101137, 2026:106847,
};

// Export annuel Pérou → Asie (TM)
export const PERU_ANNUAL_ASIA = {
  2020:30175, 2021:46513, 2022:49086, 2023:73029, 2024:53446, 2025:75365, 2026:81732,
};

// Répartition Pérou → Europe par pays 2026 (TM)
export const PERU_EUROPE_BY_COUNTRY = [
  { country:"Pays-Bas",   flag:"🇳🇱", tm:212107, pct:43, evol:15 },
  { country:"Espagne",    flag:"🇪🇸", tm:140104, pct:29, evol:-3 },
  { country:"Royaume-Uni",flag:"🇬🇧", tm:58108,  pct:12, evol:15 },
  { country:"France",     flag:"🇫🇷", tm:23253,  pct:5,  evol:-9 },
  { country:"Allemagne",  flag:"🇩🇪", tm:16803,  pct:3,  evol:8 },
  { country:"Belgique",   flag:"🇧🇪", tm:2544,   pct:1,  evol:-2 },
  { country:"Autres",     flag:"🇪🇺", tm:34816,  pct:7,  evol:14 },
];

// Répartition Pérou → Asie par pays 2026 (TM)
export const PERU_ASIA_BY_COUNTRY = [
  { country:"Chine",     flag:"🇨🇳", tm:45315, pct:55,  evol:2 },
  { country:"Japon",     flag:"🇯🇵", tm:23668, pct:29,  evol:15 },
  { country:"Corée Sud", flag:"🇰🇷", tm:11186, pct:14,  evol:22 },
  { country:"Thaïlande", flag:"🇹🇭", tm:399,   pct:0.5, evol:5 },
  { country:"Autres",    flag:"🌏", tm:1164,  pct:1,   evol:64 },
];

// Répartition Pérou → USA par côte 2026 (TM)
export const PERU_USA_BY_PORT = [
  { port:"Côte Est",   tm:82377, pct:77, evol:14 },
  { port:"Côte Ouest", tm:17099, pct:16, evol:-12 },
  { port:"Savannah",   tm:3035,  pct:3,  evol:-34 },
  { port:"Miami",      tm:3723,  pct:3,  evol:-9 },
  { port:"Houston",    tm:613,   pct:1,  evol:-39 },
];

// Répartition mondiale par destination Pérou 2026 (donut)
export const PERU_DESTINATIONS_2026 = [
  { name:"Europe", pct:64, color:"#16a34a" },
  { name:"USA",    pct:14, color:"#f59e0b" },
  { name:"Chili",  pct:8,  color:"#fbbf24" },
  { name:"Chine",  pct:6,  color:"#dc2626" },
  { name:"Japon",  pct:3,  color:"#3b82f6" },
  { name:"Autres", pct:5,  color:"#a855f7" },
];

// Hectares cultivées Pérou par année
export const PERU_HECTARES_HISTORY = {
  2018:54302, 2019:63974, 2020:70730, 2021:77274, 2022:81620,
  2023:83263, 2024:83503, 2025:83529,
};

// Hectares mondiales 2025 par pays (top 10)
export const WORLD_HECTARES_2025 = [
  { country:"Mexique",    flag:"🇲🇽", ha:258000 },
  { country:"Pérou",      flag:"🇵🇪", ha:84000 },
  { country:"Colombie",   flag:"🇨🇴", ha:40000 },
  { country:"Chili",      flag:"🇨🇱", ha:32000 },
  { country:"Californie", flag:"🇺🇸", ha:21000 },
  { country:"Kenya",      flag:"🇰🇪", ha:15000 },
  { country:"Espagne",    flag:"🇪🇸", ha:15000 },
  { country:"Sudáfrica",  flag:"🇿🇦", ha:14000 },
  { country:"Australie",  flag:"🇦🇺", ha:12000 },
  { country:"Maroc",      flag:"🇲🇦", ha:10000 },
];

// Régions productrices Pérou avec calendrier de récolte
export const PERU_REGIONS = [
  { name:"La Libertad", ha:19106, producers:1746, harvestMonths:[5,6,7,8],          peak:"Mai-Août",    note:"Région majeure Costa Norte" },
  { name:"Lima",        ha:14892, producers:5401, harvestMonths:[4,5,6,7,8,9],      peak:"Avr-Sep",     note:"Costa Centro, exporters historiques" },
  { name:"Ica",         ha:13858, producers:3250, harvestMonths:[5,6,7,8,9],        peak:"Mai-Sep",     note:"Costa Sur, qualité premium" },
  { name:"Lambayeque",  ha:12844, producers:396,  harvestMonths:[3,4,5,6,7,8,9],    peak:"Mar-Sep",     note:"Olmos — moteur volumes 2026" },
  { name:"Ancash",      ha:6278,  producers:3489, harvestMonths:[4,5,6,7,8,9],      peak:"Avr-Sep",     note:"Costa Norte" },
  { name:"Huancavelica",ha:4475,  producers:3940, harvestMonths:[2,3,4],            peak:"Fév-Avr",     note:"Sierra — démarrage saison" },
  { name:"Ayacucho",    ha:4063,  producers:6030, harvestMonths:[2,3,4],            peak:"Fév-Avr",     note:"Sierra — petits producteurs" },
  { name:"Arequipa",    ha:2167,  producers:1417, harvestMonths:[3,4,5,8,9],        peak:"Mar-Sep",     note:"Bi-saison" },
  { name:"Apurímac",    ha:1601,  producers:1687, harvestMonths:[2,3,4],            peak:"Fév-Avr",     note:"Sierra Sur" },
  { name:"Cusco",       ha:1260,  producers:1177, harvestMonths:[3,4,5,6],          peak:"Mar-Juin",    note:"Sierra Sud-Est" },
];

// Insights stratégiques saison 2026 (résumé exécutif)
export const PERU_2026_INSIGHTS = [
  { icon:"📈", title:"Volume record",   value:"762 557 TM",  detail:"+6% vs 2025, nouveau record historique" },
  { icon:"🇪🇺", title:"Europe leader",  value:"487 735 TM",  detail:"64% de l'export, +8% vs 2025" },
  { icon:"🇺🇸", title:"USA en hausse",  value:"106 847 TM",  detail:"+6%, accès limité par concurrence Mexique" },
  { icon:"🇨🇳", title:"Asie diversif.", value:"81 732 TM",   detail:"+8%, stratégie anti-saturation Europe" },
  { icon:"⚠️", title:"Pic saison",      value:"S22-S23",     detail:"35-36 000 TM/sem, vigilance prix" },
  { icon:"🌿", title:"Olmos moteur",   value:"12 844 ha",    detail:"Lambayeque — flux Mar-Sep, calibres moyens-grands" },
];

