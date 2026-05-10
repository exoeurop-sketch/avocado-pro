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
    "Peru":         { 14:[9.50,10.50],16:[9.50,10.50],18:[9.50,10.50],20:[8.00,9.00],22:[6.50,7.50],24:[5.50,6.50],26:[1.00,1.20],28:[0.90,1.10],30:[0.80,1.00],32:[0.70,0.90] },
    "Colombia":     { 16:[8.50,9.50],18:[8.50,9.50],20:[7.50,8.50],22:[6.00,7.00],24:[4.50,5.50],26:[0.90,1.10],28:[0.80,1.00],30:[0.70,0.90],32:[0.60,0.80] },
    "South Africa": { 16:[9.00,10.00],18:[9.00,10.00],20:[7.50,8.50],22:[6.00,7.00] },
    "Brazil":       { 16:[8.00,9.50],18:[8.00,9.50],20:[7.00,8.00],22:[6.00,7.00] },
  },
  23: {
    "Peru":         { 14:[9.00,10.00],16:[9.00,10.00],18:[9.00,10.00],20:[7.50,8.50],22:[6.00,7.00],24:[5.00,6.00],26:[0.90,1.10],28:[0.80,1.00],30:[0.70,0.90],32:[0.60,0.80] },
    "Colombia":     { 16:[8.00,9.00],18:[8.00,9.00],20:[7.00,8.00],22:[5.50,6.50],24:[4.00,5.00],26:[0.80,1.00],28:[0.70,0.90],30:[0.60,0.80],32:[0.50,0.70] },
    "South Africa": { 16:[8.50,9.50],18:[8.50,9.50],20:[7.00,8.00],22:[5.50,6.50] },
    "Brazil":       { 16:[7.50,9.00],18:[7.50,9.00],20:[6.50,7.50],22:[5.50,6.50] },
  },
};

// Volumes ARRIVÉE EU prévus (M kg/semaine) — basés sur arrivées réelles (départs Pérou S-3)
export const FORECAST_SUPPLY = { 20:19.6, 21:20.1, 22:19.8, 23:20.2 };

// Tendance globale par semaine et catégorie de calibres
// Légende : ↘↘ très baissier · ↘ baissier · = stable · ↗ haussier · ↗↗ très haussier
export const FORECAST_TREND = {
  20: { big:"↘", medium:"↘", small:"↘", note:"Arrivées EU 19.6K TM (départs S17). Volumes en hausse, pression confirmée." },
  21: { big:"↘", medium:"↘", small:"↘↘", note:"Arrivées EU 20.1K TM. Pic d'arrivée approche, prix sous tension." },
  22: { big:"↘", medium:"↘", small:"↘", note:"Arrivées EU 19.8K TM. Plateau haut, sur-offre maintenue." },
  23: { big:"↘↘", medium:"↘↘", small:"↘↘", note:"Arrivées EU 20.2K TM. Début pic réel EU (départs S20). Prix au plancher." },
};

// Carte stratégique acheteur — recommandation par semaine
export const FORECAST_STRATEGY = {
  20: { color:"#f59e0b", label:"🟡 SURVEILLER", reason:"Arrivées EU encore modérées (départs S17). Préparer commandes pour S22-S23." },
  21: { color:"#16a34a", label:"🟢 ACHETER", reason:"Volumes EU en hausse, prix en baisse. Idéal pour gros volumes promotionnels." },
  22: { color:"#16a34a", label:"🟢 ACHETER", reason:"Sur-offre EU confirmée (~20K TM/sem). Sécuriser les commandes calibres premium." },
  23: { color:"#16a34a", label:"🟢 ACHETER MAX", reason:"PIC réel arrivées EU (départs S20). Prix au plancher — opportunité maximale." },
};

// Facteurs climat & contexte (impactent les prévisions)
export const FORECAST_FACTORS = [
  { icon:"📈", label:"Volumes Pérou record 2026", impact:"+8% vs 2025 vers Europe — pression continue S20-S30", weight:"high" },
  { icon:"⚠️", label:"Pic saison S22-S23", impact:"35 000 TM/sem — sur-offre maximale, prix au plancher", weight:"high" },
  { icon:"🌿", label:"Olmos Pérou en pleine production", impact:"12 800 ha — calibres moyens-grands abondants S20-S30", weight:"high" },
  { icon:"📅", label:"Promotions DE/FR/NL", impact:"Soutien consommation -5% à -15% prix retail", weight:"medium" },
  { icon:"🇺🇸", label:"Diversification USA + Asie (+8%)", impact:"Décharge partielle de la pression Europe", weight:"medium" },
  { icon:"🇪🇸", label:"Fin saison Espagne", impact:"Disparition concurrence locale, Pérou domine 100%", weight:"low" },
];

// ═══════════════════════════════════════════════════════════════════════════
// DONNÉES SAISON 2026 — Estimations agrégées multi-sources (analyse interne)
// ═══════════════════════════════════════════════════════════════════════════

// Volumes hebdomadaires Pérou TOTAL toutes destinations 2026 (TM)
// Réel S01-S14, Projeté S15-S52
export const PERU_WEEKLY_TOTAL = {
  6:3105,7:2330,8:6119,9:7190,10:8846,11:10790,12:16830,13:16350,14:17240,
  15:22110,16:26800,17:26030,18:28390,19:30840,20:32220,21:32920,22:34100,23:35190,
  24:33250,25:31800,26:31520,27:30940,28:30760,29:30580,30:29510,31:25410,
  32:24140,33:25230,34:22880,35:21620,36:16420,37:13370,38:7182,39:2953,
};

// Volumes hebdomadaires Pérou → EUROPE 2026 (TM)
export const PERU_WEEKLY_EUROPE = {
  6:1871,7:2167,8:4238,9:5324,10:7496,11:9177,12:9970,13:12540,14:13140,
  15:15620,16:19480,17:19490,18:19890,19:19610,20:20010,21:20320,22:20030,23:19640,
  24:19550,25:17670,26:17480,27:18080,28:18090,29:18100,30:17910,31:15720,
  32:15130,33:16730,34:16340,35:15450,36:12570,37:10780,38:5789,39:2496,
};

// Volumes hebdomadaires Pérou → USA 2026 (TM)
export const PERU_WEEKLY_USA = {
  15:999,16:1799,17:2000,18:2701,19:3702,20:3804,21:5608,22:5811,23:6716,
  24:7621,25:7323,26:7627,27:6727,28:6931,29:6532,30:6333,31:5330,
  32:4930,33:4630,34:3524,35:3022,36:2016,37:1311,38:504,
};

// Volumes hebdomadaires Pérou → ASIE 2026 (TM)
export const PERU_WEEKLY_ASIA = {
  3:767,4:131,5:1091,6:1212,8:1658,9:1567,10:607,11:435,12:132,13:1924,
  14:1925,15:3315,16:3225,17:1968,18:3420,19:3940,20:4124,21:3394,22:4422,23:4394,
  24:2890,25:3257,26:2872,27:1864,28:1437,29:1081,30:938,31:1990,
  32:1899,33:1920,34:1563,35:1400,
};

// ─── TRANSIT MARITIME ─────────────────────────────────────────────────────
// Délai moyen Callao → ports Europe (Rotterdam, Algeciras, Hamburg)
// Moyenne 3 semaines (21 jours) selon les compagnies maritimes
export const TRANSIT_WEEKS = 3;

// Calcul automatique des ARRIVÉES Europe = départs S-3
// Ex: arrivée S22 = départ S19
export function computeEUArrivals(departures) {
  const arrivals = {};
  Object.entries(departures).forEach(([w, tm]) => {
    const arrivalWeek = Number(w) + TRANSIT_WEEKS;
    arrivals[arrivalWeek] = tm;
  });
  return arrivals;
}

// Volumes ARRIVÉE en Europe (calculés depuis départs Pérou + 3 semaines)
// C'est CE QUI PRESSE RÉELLEMENT LES PRIX EU
export const PERU_ARRIVALS_EUROPE = computeEUArrivals({
  6:1879,7:2167,8:4297,9:5395,10:7593,11:9358,12:10100,13:12760,14:13317,
  15:15890,16:19720,17:19620,18:20140,19:19770,20:20240,21:20470,22:20240,23:19790,
  24:19660,25:17720,26:17640,27:18270,28:18130,29:18250,30:18030,31:15780,
  32:15220,33:16770,34:16470,35:15510,36:12640,37:10840,38:5810,39:2510,
});

// Export annuel Pérou TOTAL (TM)
export const PERU_ANNUAL_TOTAL = {
  2020:384200, 2021:505900, 2022:583900, 2023:592200, 2024:535700, 2025:740500, 2026:781600,
};

// Export annuel Pérou → Europe (TM)
export const PERU_ANNUAL_EUROPE = {
  2020:241100, 2021:293000, 2022:330300, 2023:360300, 2024:335500, 2025:465100, 2026:501400,
};

// Export annuel Pérou → USA (TM)
export const PERU_ANNUAL_USA = {
  2020:80270, 2021:87270, 2022:127400, 2023:76760, 2024:63800, 2025:98200, 2026:103700,
};

// Export annuel Pérou → Asie (TM)
export const PERU_ANNUAL_ASIA = {
  2020:29310, 2021:45200, 2022:47720, 2023:71030, 2024:52000, 2025:73360, 2026:79590,
};

// Répartition Pérou → Europe par pays 2026 (TM)
export const PERU_EUROPE_BY_COUNTRY = [
  { country:"Pays-Bas",   flag:"🇳🇱", tm:207400, pct:43, evol:15 },
  { country:"Espagne",    flag:"🇪🇸", tm:137000, pct:29, evol:-3 },
  { country:"Royaume-Uni",flag:"🇬🇧", tm:56860,  pct:12, evol:15 },
  { country:"France",     flag:"🇫🇷", tm:22760,  pct:5,  evol:-9 },
  { country:"Allemagne",  flag:"🇩🇪", tm:16460,  pct:3,  evol:8 },
  { country:"Belgique",   flag:"🇧🇪", tm:2492,   pct:1,  evol:-2 },
  { country:"Autres",     flag:"🇪🇺", tm:34120,  pct:7,  evol:14 },
];

// Répartition Pérou → Asie par pays 2026 (TM)
export const PERU_ASIA_BY_COUNTRY = [
  { country:"Chine",     flag:"🇨🇳", tm:44430, pct:55,  evol:2 },
  { country:"Japon",     flag:"🇯🇵", tm:23220, pct:29,  evol:15 },
  { country:"Corée Sud", flag:"🇰🇷", tm:10980, pct:14,  evol:22 },
  { country:"Thaïlande", flag:"🇹🇭", tm:392,   pct:0.5, evol:5 },
  { country:"Autres",    flag:"🌏", tm:1143,  pct:1,   evol:64 },
];

// Répartition Pérou → USA par côte 2026 (TM)
export const PERU_USA_BY_PORT = [
  { port:"Côte Est",   tm:80950, pct:77, evol:14 },
  { port:"Côte Ouest", tm:16810, pct:16, evol:-12 },
  { port:"Savannah",   tm:2985,  pct:3,  evol:-34 },
  { port:"Miami",      tm:3663,  pct:3,  evol:-9 },
  { port:"Houston",    tm:603,   pct:1,  evol:-39 },
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
  2018:52900, 2019:62350, 2020:68970, 2021:75380, 2022:79660,
  2023:81290, 2024:81560, 2025:81620,
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
  { name:"La Libertad", ha:18810, producers:1720, harvestMonths:[5,6,7,8],          peak:"Mai-Août",    note:"Région majeure Costa Norte" },
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
  { icon:"📈", title:"Volume record",   value:"758 200 TM",  detail:"+5% vs 2025, nouveau record historique" },
  { icon:"🇪🇺", title:"Europe leader",  value:"491 400 TM",  detail:"≈65% de l'export, +8% vs 2025" },
  { icon:"🇺🇸", title:"USA en hausse",  value:"104 200 TM",  detail:"+5%, accès limité concurrence Mexique" },
  { icon:"🇨🇳", title:"Asie diversif.", value:"83 100 TM",   detail:"+8%, stratégie anti-saturation Europe" },
  { icon:"⚠️", title:"Pic saison",      value:"S22-S23",     detail:"35-36 000 TM/sem, vigilance prix" },
  { icon:"🌿", title:"Olmos moteur",   value:"12 700 ha",    detail:"Lambayeque — flux Mar-Sep, calibres moyens-grands" },
];

