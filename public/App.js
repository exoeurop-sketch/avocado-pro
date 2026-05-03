import { useState, useEffect, useCallback } from "react";

// ─── DONNÉES ─────────────────────────────────────────────────────────────────
const REAL_PRICES = {
  16: {
    "Peru": { 14:[12.50,14.00],16:[12.50,13.50],18:[12.00,13.00],20:[11.50,12.50],22:[10.00,12.00],24:[8.50,10.50],26:[1.90,2.00],28:[1.80,1.90],30:[1.50,1.70],32:[1.40,1.60] },
    "Colombia": { 14:[11.00,12.00],16:[10.50,12.00],18:[10.50,12.00],20:[9.50,10.50],22:[8.50,10.50],24:[8.00,9.00],26:[1.40,1.70],28:[1.30,1.50],30:[1.20,1.40],32:[1.10,1.20] },
    "Spain": { 14:[14.00,15.00],16:[14.00,15.00],18:[14.00,14.50],20:[13.00,14.00],22:[12.00,14.00],24:[12.00,14.00],26:[2.50,3.00] },
    "South Africa": { 14:[11.50,12.50],16:[11.00,12.50],18:[11.00,12.50],20:[11.00,12.00],22:[10.00,11.00],24:[8.00,9.50] },
    "Brazil": { 14:[11.50,12.50],16:[11.00,12.50],18:[11.00,12.50],20:[11.00,12.00],22:[10.00,11.00] },
  },
  17: {
    "Peru": { 14:[12.50,14.00],16:[12.50,13.50],18:[12.00,13.50],20:[11.00,12.00],22:[8.50,11.00],24:[7.50,9.00],26:[1.60,1.80],28:[1.60,1.70],30:[1.30,1.50],32:[1.20,1.30] },
    "Colombia": { 14:[11.00,12.50],16:[11.00,12.50],18:[11.00,12.00],20:[10.50,11.50],22:[8.50,10.00],24:[7.50,8.50],26:[1.40,1.70],28:[1.30,1.50],30:[1.20,1.50],32:[1.10,1.30] },
    "Spain": { 14:[14.00,15.00],16:[14.00,15.00],18:[14.00,14.50],20:[12.80,13.50],22:[11.50,13.00],24:[11.50,13.00],26:[2.30,2.80] },
    "South Africa": { 14:[11.50,12.50],16:[11.50,12.50],18:[11.50,12.50],20:[10.50,11.50],22:[9.50,10.00] },
    "Brazil": { 14:[11.50,12.50],16:[11.00,12.50],18:[11.00,12.50],20:[10.50,12.00],22:[9.50,10.50] },
  },
  18: {
    "Peru": { 14:[12.00,13.50],16:[12.00,13.00],18:[11.50,12.50],20:[10.50,11.50],22:[9.50,11.00],24:[7.00,8.00],26:[1.50,1.70],28:[1.40,1.60],30:[1.20,1.30],32:[1.20,1.30] },
    "Colombia": { 14:[11.00,11.50],16:[11.00,11.50],18:[11.00,11.50],20:[10.00,11.00],22:[8.00,9.00],24:[6.00,7.00],26:[1.20,1.60],28:[1.20,1.40],30:[1.15,1.30],32:[1.00,1.20] },
    "South Africa": { 14:[11.00,12.50],16:[11.00,12.50],18:[11.00,12.50],20:[10.00,11.00] },
    "Brazil": { 14:[11.00,12.50],16:[11.50,12.50],18:[11.00,12.50],20:[10.00,11.00],22:[8.00,9.00] },
  },
};

const CIRAD_REF = { 11:11.97,12:11.86,13:12.14,14:12.22,15:12.30,16:12.45,17:11.87 };

const WEEKLY_SUPPLY_EU = { 14:21.7,15:22.5,16:24.7,17:27.7,18:26.5,19:24.9,20:25.0,21:25.2,22:24.8 };
const REAL_WEEKS = [14,15,16,17,18];

const TOP_IMPORTERS = [
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

const ORIGIN_COLOR = { "Peru":"#f59e0b","Colombia":"#4ade80","South Africa":"#34d399","Brazil":"#60a5fa","Spain":"#f87171" };
const ORIGIN_FLAG  = { "Peru":"🇵🇪","Colombia":"🇨🇴","South Africa":"🇿🇦","Brazil":"🇧🇷","Spain":"🇪🇸" };
const FLAG_MAP = { NL:"🇳🇱",ES:"🇪🇸",DE:"🇩🇪",UK:"🇬🇧",BE:"🇧🇪",FR:"🇫🇷" };
const CALIBRES_LIST = [14,16,18,20,22,24,26,28,30,32];
const CALIBRE_WEIGHTS = { 14:"285-333g",16:"250-285g",18:"222-250g",20:"200-222g",22:"182-200g",24:"167-182g",26:"154-167g",28:"143-154g",30:"133-143g",32:"125-133g" };

// ─── TRADUCTIONS ─────────────────────────────────────────────────────────────
const T = {
  fr: {
    appSub: "Europe · Données réelles hebdomadaires",
    liveRates: "BCE live", updated: "Mis à jour",
    tabs: ["💰 Prix calibres","📦 Volumes","🏢 Importateurs","🔮 Analyse IA"],
    origin: "Origine", week: "Semaine", size: "Calibre",
    realCif: "Prix CIF Europe réels",
    cifNote: "Cal. 14–24 = €/caisse 4kg · Cal. 26–32 = €/kg",
    col: { cal:"Cal.",weight:"Poids",min:"Min",max:"Max",trend:"Tendance",country:"🌍",growth:"Croissance",importer:"Importateur" },
    kpi: [
      { label:"Offre EU S18", val:"27M kg", sub:"Peak +20% vs 2025" },
      { label:"CIRAD Cal.18 S17", val:"11.87€", sub:"↘ Tendance baissière" },
      { label:"Pérou S17 Europe", val:"~800 cnts", sub:"70% de l'offre EU" },
      { label:"Prix S18 Cal.18", val:"11.5–12.5€", sub:"CIF /caisse 4kg ↘" },
    ],
    supplyTitle:"Disponibilité palta Hass Europe 2026 (M kg/semaine)",
    supplyNote:"Réel jusqu'à S18 · S19+ = projections",
    ciradTitle:"Prix référence CIRAD · Hass Cal.18 · €/caisse 4kg",
    ciradAlert:"↘ Tendance baissière confirmée · Pression offre croissante",
    blocks: [
      { title:"🟢 Calibres favorables", items:["Cal. 14-18 : demande ferme, offre limitée","Cal. 20 : rôle charnière, stable","Afrique du Sud : gros fruits disponibles"], color:"#4ade80" },
      { title:"🔴 Calibres sous pression", items:["Cal. 22-32 : 60-70% offre Pérou Sierra","Inventaires petits fruits s'accumulent","Colombia & Kenya : petits calibres dominant"], color:"#f87171" },
      { title:"📅 Semaine 20 : tournant Olmos", items:["Entrée zone Olmos Pérou : calibres ↑","Amélioration temporaire 2-3 semaines","Puis retour prédominance petits calibres"], color:"#f59e0b" },
      { title:"🌍 USA → impact Europe", items:["Mexique record : 1Md+ kg exportés","Pérou & Colombia redirigés vers EU","Pression offre Europe S19-22"], color:"#60a5fa" },
    ],
    importersTitle:"Top importateurs Pérou → Europe",
    importersSub:"Conteneurs cumulés · Source: données Excel réelles",
    colPrev:"Au 17/04", colLast:"Au 01/05",
    aiTitle:"Analyse & Prédiction IA",
    aiSub:"Basée sur données réelles S16–S18",
    aiBtn:"🔍 Analyser & Prédire", aiLoading:"⏳ Analyse...",
    aiPlaceholder:'Sélectionnez une origine + calibre puis cliquez "Analyser & Prédire"',
    trendLabel:"Tendance", nd:"N/D", real:"Réel", peak:"Peak", proj:"Projection",
    origins: { "Peru":"Pérou","Colombia":"Colombie","South Africa":"Afrique du Sud","Brazil":"Brésil","Spain":"Espagne" },
    situation:"Situation",
    calBig:"Grands (14-18)", calMid:"Moyens (20-22)", calSml:"Petits (24-32)",
    ctx: {
      "Peru":         { big:"↗",medium:"↘",small:"↘↘", note:"60-70% cal.22-32 Sierra. Entrée Olmos sem.20. ~750 cnts/sem Europe.", season:"Pic saisonnier · transition Sierra → Côte" },
      "Colombia":     { big:"=",medium:"↘",small:"↘↘", note:"Flor traviesa, petits calibres dominant. -60% vs 2025 vers Europe.", season:"Début saison flor traviesa" },
      "South Africa": { big:"↗",medium:"=", small:"=",  note:"Avantage calibres grands. Maluma difficile. Peak S17-18.", season:"Post-peak, réduction graduelle" },
      "Brazil":       { big:"=",medium:"↘",small:"↘",  note:"Peak passé. Réorientation vers Argentine/Uruguay.", season:"Réduction après peak" },
      "Spain":        { big:"↘",medium:"↘",small:"↘",  note:"Fin de saison définitive. Marché interne uniquement.", season:"Clôture de saison" },
    },
  },
  en: {
    appSub: "Europe · Real weekly data",
    liveRates: "ECB live", updated: "Updated",
    tabs: ["💰 Calibre prices","📦 Volumes","🏢 Importers","🔮 AI Analysis"],
    origin: "Origin", week: "Week", size: "Grade",
    realCif: "Real CIF Europe prices",
    cifNote: "Cal. 14–24 = €/4kg box · Cal. 26–32 = €/kg",
    col: { cal:"Grade",weight:"Weight",min:"Min",max:"Max",trend:"Trend",country:"🌍",growth:"Growth",importer:"Importer" },
    kpi: [
      { label:"EU Supply W18", val:"27M kg", sub:"Peak +20% vs 2025" },
      { label:"CIRAD Cal.18 W17", val:"11.87€", sub:"↘ Downward trend" },
      { label:"Peru W17 Europe", val:"~800 cnts", sub:"70% of EU supply" },
      { label:"Price W18 Cal.18", val:"11.5–12.5€", sub:"CIF /4kg box ↘" },
    ],
    supplyTitle:"Hass avocado availability Europe 2026 (M kg/week)",
    supplyNote:"Actual up to W18 · W19+ = forecasts",
    ciradTitle:"CIRAD reference price · Hass Cal.18 · €/4kg box",
    ciradAlert:"↘ Confirmed downward trend · Growing supply pressure",
    blocks: [
      { title:"🟢 Favourable grades", items:["Cal. 14-18: firm demand, limited supply","Cal. 20: pivot grade, stable","South Africa: large fruit available"], color:"#4ade80" },
      { title:"🔴 Grades under pressure", items:["Cal. 22-32: 60-70% Peru Sierra supply","Small fruit inventory accumulating","Colombia & Kenya: small grades dominant"], color:"#f87171" },
      { title:"📅 Week 20: Olmos turning point", items:["Olmos zone Peru entry: grades ↑","Temporary improvement 2-3 weeks","Then back to small grade dominance"], color:"#f59e0b" },
      { title:"🌍 USA → Europe impact", items:["Mexico record: 1B+ kg exported","Peru & Colombia redirected to EU","EU supply pressure W19-22"], color:"#60a5fa" },
    ],
    importersTitle:"Top importers Peru → Europe",
    importersSub:"Cumulative containers · Source: real Excel data",
    colPrev:"At 17/04", colLast:"At 01/05",
    aiTitle:"AI Analysis & Prediction",
    aiSub:"Based on real data W16–W18",
    aiBtn:"🔍 Analyse & Predict", aiLoading:"⏳ Analysing...",
    aiPlaceholder:'Select an origin + grade then click "Analyse & Predict"',
    trendLabel:"Trend", nd:"N/A", real:"Actual", peak:"Peak", proj:"Forecast",
    origins: { "Peru":"Peru","Colombia":"Colombia","South Africa":"South Africa","Brazil":"Brazil","Spain":"Spain" },
    situation:"Situation",
    calBig:"Large (14-18)", calMid:"Medium (20-22)", calSml:"Small (24-32)",
    ctx: {
      "Peru":         { big:"↗",medium:"↘",small:"↘↘", note:"60-70% cal.22-32 Sierra. Olmos entry W20. ~750 cnts/week Europe.", season:"Seasonal peak · Sierra → Coast transition" },
      "Colombia":     { big:"=",medium:"↘",small:"↘↘", note:"Flor traviesa, small grades dominant. -60% vs 2025 to Europe.", season:"Start of flor traviesa season" },
      "South Africa": { big:"↗",medium:"=", small:"=",  note:"Large grade advantage. Maluma difficult. Peak W17-18.", season:"Post-peak, gradual reduction" },
      "Brazil":       { big:"=",medium:"↘",small:"↘",  note:"Peak passed. Redirecting to Argentina/Uruguay.", season:"Reduction after peak" },
      "Spain":        { big:"↘",medium:"↘",small:"↘",  note:"End of season. Domestic market only.", season:"Season close" },
    },
  },
  es: {
    appSub: "Europa · Datos reales semanales",
    liveRates: "BCE en vivo", updated: "Actualizado",
    tabs: ["💰 Precios calibres","📦 Volúmenes","🏢 Importadores","🔮 Análisis IA"],
    origin: "Origen", week: "Semana", size: "Calibre",
    realCif: "Precios CIF Europa reales",
    cifNote: "Cal. 14–24 = €/caja 4kg · Cal. 26–32 = €/kg",
    col: { cal:"Cal.",weight:"Peso",min:"Mín",max:"Máx",trend:"Tendencia",country:"🌍",growth:"Crecimiento",importer:"Importador" },
    kpi: [
      { label:"Oferta EU S18", val:"27M kg", sub:"Pico +20% vs 2025" },
      { label:"CIRAD Cal.18 S17", val:"11.87€", sub:"↘ Tendencia bajista" },
      { label:"Perú S17 Europa", val:"~800 cnts", sub:"70% de oferta EU" },
      { label:"Precio S18 Cal.18", val:"11.5–12.5€", sub:"CIF /caja 4kg ↘" },
    ],
    supplyTitle:"Disponibilidad palta Hass Europa 2026 (M kg/semana)",
    supplyNote:"Real hasta S18 · S19+ = proyecciones",
    ciradTitle:"Precio referencia CIRAD · Hass Cal.18 · €/caja 4kg",
    ciradAlert:"↘ Tendencia bajista confirmada · Presión de oferta creciente",
    blocks: [
      { title:"🟢 Calibres favorables", items:["Cal. 14-18: demanda firme, oferta limitada","Cal. 20: calibre bisagra, estable","Sudáfrica: fruta grande disponible"], color:"#4ade80" },
      { title:"🔴 Calibres bajo presión", items:["Cal. 22-32: 60-70% oferta Perú Sierra","Inventarios fruta pequeña acumulándose","Colombia & Kenia: calibres pequeños dominan"], color:"#f87171" },
      { title:"📅 Semana 20: hito Olmos", items:["Entrada zona Olmos Perú: calibres ↑","Mejora temporal 2-3 semanas","Luego vuelta a predominio fruta pequeña"], color:"#f59e0b" },
      { title:"🌍 USA → impacto Europa", items:["México récord: +1.000M kg exportados","Perú & Colombia redirigidos a EU","Presión oferta Europa S19-22"], color:"#60a5fa" },
    ],
    importersTitle:"Top importadores Perú → Europa",
    importersSub:"Contenedores acumulados · Fuente: datos Excel reales",
    colPrev:"Al 17/04", colLast:"Al 01/05",
    aiTitle:"Análisis & Predicción IA",
    aiSub:"Basado en datos reales S16–S18",
    aiBtn:"🔍 Analizar & Predecir", aiLoading:"⏳ Analizando...",
    aiPlaceholder:'Seleccione un origen + calibre y haga clic en "Analizar & Predecir"',
    trendLabel:"Tendencia", nd:"N/D", real:"Real", peak:"Pico", proj:"Proyección",
    origins: { "Peru":"Perú","Colombia":"Colombia","South Africa":"Sudáfrica","Brazil":"Brasil","Spain":"España" },
    situation:"Situación",
    calBig:"Grandes (14-18)", calMid:"Medianos (20-22)", calSml:"Pequeños (24-32)",
    ctx: {
      "Peru":         { big:"↗",medium:"↘",small:"↘↘", note:"60-70% cal.22-32 Sierra. Entrada Olmos sem.20. ~750 cnts/sem Europa.", season:"Pico estacional · transición Sierra → Costa" },
      "Colombia":     { big:"=",medium:"↘",small:"↘↘", note:"Flor traviesa, calibres pequeños dominan. -60% vs 2025 a Europa.", season:"Inicio temporada flor traviesa" },
      "South Africa": { big:"↗",medium:"=", small:"=",  note:"Ventaja calibres grandes. Maluma difícil. Pico S17-18.", season:"Post-pico, reducción gradual" },
      "Brazil":       { big:"=",medium:"↘",small:"↘",  note:"Pico pasado. Reorientación hacia Argentina/Uruguay.", season:"Reducción post-pico" },
      "Spain":        { big:"↘",medium:"↘",small:"↘",  note:"Fin de temporada definitivo. Solo mercado interno.", season:"Cierre de temporada" },
    },
  },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function getTrend(origin, cal) {
  const p16 = REAL_PRICES[16]?.[origin]?.[cal];
  const p18 = REAL_PRICES[18]?.[origin]?.[cal];
  if (!p16 || !p18) return "—";
  const diff = ((p18[0]+p18[1])/2) - ((p16[0]+p16[1])/2);
  if (diff > 0.3) return "↗"; if (diff < -0.3) return "↘"; return "=";
}
function trendColor(t) {
  if (t==="↗"||t==="↗↗") return "#4ade80";
  if (t==="↘"||t==="↘↘") return "#f87171";
  return "#fbbf24";
}

// ─── COMPOSANTS ──────────────────────────────────────────────────────────────
function LangBtn({ lang, current, onClick }) {
  const labels = { fr:"🇫🇷 FR", en:"🇬🇧 EN", es:"🇪🇸 ES" };
  return (
    <button onClick={onClick} style={{
      padding:"5px 12px", borderRadius:8,
      border:`1px solid ${current===lang ? "#4ade80" : "#1a2740"}`,
      background: current===lang ? "#4ade8022" : "transparent",
      color: current===lang ? "#4ade80" : "#6b7280",
      fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
      transition:"all 0.15s",
    }}>{labels[lang]}</button>
  );
}

function Tag({ label, active, onClick, color="#4ade80" }) {
  return (
    <button onClick={onClick} style={{
      padding:"5px 11px", borderRadius:20,
      border:`1px solid ${active ? color : "#1e2d3d"}`,
      background: active ? `${color}18` : "transparent",
      color: active ? color : "#6b7280",
      fontSize:12, cursor:"pointer", transition:"all 0.15s",
      fontFamily:"inherit", whiteSpace:"nowrap",
    }}>{label}</button>
  );
}

function KpiCard({ label, val, sub, color, icon }) {
  return (
    <div style={{ flex:1, minWidth:130, background:"linear-gradient(145deg,#0b1624,#101f30)", border:`1px solid ${color}20`, borderRadius:12, padding:"12px 14px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", bottom:-6, right:-6, fontSize:40, opacity:0.07 }}>{icon}</div>
      <div style={{ fontSize:10, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:3 }}>{label}</div>
      <div style={{ fontSize:18, fontWeight:800, color, fontFamily:"'Space Mono',monospace", lineHeight:1 }}>{val}</div>
      <div style={{ fontSize:10, color:"#4b5563", marginTop:3 }}>{sub}</div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang]       = useState("fr");
  const [tab, setTab]         = useState(0);
  const [origin, setOrigin]   = useState("Peru");
  const [cal, setCal]         = useState(18);
  const [week, setWeek]       = useState(18);
  const [rates, setRates]     = useState({});
  const [ratesDate, setRatesDate] = useState(null);
  const [ratesStatus, setRatesStatus] = useState("loading");
  const [aiText, setAiText]   = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const t = T[lang];
  const allWeeks = Object.keys(REAL_PRICES).map(Number).sort();
  const ORIGINS = Object.keys(ORIGIN_COLOR);

  const fetchRates = useCallback(async () => {
    setRatesStatus("loading");
    try {
      const res = await fetch("https://api.frankfurter.dev/v2/rates?base=EUR&quotes=USD,PEN,COP,ZAR,BRL,GBP");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRates(data.rates||{}); setRatesDate(data.date||new Date().toISOString().slice(0,10)); setRatesStatus("ok");
    } catch { setRatesStatus("error"); setRatesDate(new Date().toISOString().slice(0,10)); }
  }, []);

  useEffect(() => { fetchRates(); }, [fetchRates]);

  const getAI = async () => {
    setAiLoading(true); setAiText("");
    const ctx = t.ctx[origin];
    const history = allWeeks.map(w => { const p=REAL_PRICES[w]?.[origin]?.[cal]; return p?`W${w}:${p[0]}–${p[1]}`:`W${w}:N/A`; }).join(" | ");
    const prompt = `Avocado Hass Europe market expert. Short analysis (4 sentences, ${lang==="fr"?"French":lang==="es"?"Spanish":"English"}), concrete buying advice:\nOrigin:${t.origins[origin]} | Grade:${cal} | Latest week:${week}\nReal CIF prices (€/4kg box, grade26+=€/kg): ${history}\nCIRAD ref cal.18: W16=12.45€ W17=11.87€ (↘)\nEU supply W18: 27M kg/week (peak)\nContext: ${ctx?.note} | Season: ${ctx?.season}\nGrades: large ${ctx?.big} · medium ${ctx?.medium} · small ${ctx?.small}\nWeek 20: Olmos Peru entry, temporary grade improvement.`;
    try {
      const res = await fetch("/api/analyze", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setAiText(data.text || data.error || "N/A");
    } catch { setAiText("Connection error."); }
    setAiLoading(false);
  };

  const cfg = { color: ORIGIN_COLOR[origin], flag: ORIGIN_FLAG[origin] };
  const ctx = t.ctx[origin];
  const maxSupply = Math.max(...Object.values(WEEKLY_SUPPLY_EU));
  const ciradWeeks = Object.keys(CIRAD_REF).map(Number);
  const maxC = Math.max(...Object.values(CIRAD_REF));
  const minC = Math.min(...Object.values(CIRAD_REF));

  return (
    <div style={{ minHeight:"100vh", background:"#07101a", color:"#f1f5f9", fontFamily:"'DM Sans',-apple-system,sans-serif", paddingBottom:60 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <div style={{ background:"linear-gradient(135deg,#04200f,#0b1a10,#07101a)", padding:"16px 16px 12px", borderBottom:"1px solid #0f2918" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10, marginBottom:10 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:26 }}>🥑</span>
              <div>
                <h1 style={{ margin:0, fontSize:19, fontWeight:800, letterSpacing:"-0.02em" }}>
                  Hass<span style={{ color:"#4ade80" }}>Market</span>
                  <span style={{ fontSize:10, color:"#4b5563", fontWeight:400, marginLeft:8 }}>{t.appSub}</span>
                </h1>
                <div style={{ fontSize:10, color:"#4b5563" }}>
                  {new Date().toLocaleDateString(lang==="fr"?"fr-FR":lang==="es"?"es-ES":"en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}
                </div>
              </div>
            </div>

            {/* Taux + langue */}
            <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
              {/* Sélecteur langue */}
              <div style={{ display:"flex", gap:4, background:"#0b1624", border:"1px solid #1a2740", borderRadius:10, padding:"4px 6px" }}>
                {["fr","en","es"].map(l => <LangBtn key={l} lang={l} current={lang} onClick={() => setLang(l)} />)}
              </div>
              {/* Taux */}
              <div style={{ background:"#0b1624", border:"1px solid #1a2740", borderRadius:10, padding:"7px 12px", fontSize:11 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:ratesStatus==="ok"?"#4ade80":"#f87171" }} />
                  <span style={{ color:ratesStatus==="ok"?"#4ade80":"#f87171", fontWeight:700 }}>{t.liveRates} {ratesStatus==="ok"?"✓":"—"}</span>
                  <button onClick={fetchRates} style={{ background:"none", border:"1px solid #1a2740", borderRadius:4, color:"#4b5563", cursor:"pointer", fontSize:11, padding:"1px 5px" }}>↻</button>
                </div>
                {ratesDate && <div style={{ color:"#374151", fontSize:10 }}>{t.updated}: {new Date(ratesDate).toLocaleDateString()} {rates.USD?`· 1€=${rates.USD.toFixed(3)}$`:""}</div>}
              </div>
            </div>
          </div>

          {/* KPI */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {t.kpi.map((k,i) => (
              <KpiCard key={i} label={k.label} val={k.val} sub={k.sub}
                color={["#f59e0b","#f87171","#4ade80","#60a5fa"][i]} icon={["📦","📊","🚢","💰"][i]} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"12px 14px 0" }}>

        {/* TABS */}
        <div style={{ display:"flex", gap:6, marginBottom:10, overflowX:"auto", paddingBottom:4 }}>
          {t.tabs.map((lbl,i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              padding:"8px 14px", borderRadius:10, border:"1px solid",
              borderColor: tab===i ? "#4ade80" : "#1a2740",
              background: tab===i ? "#4ade8018" : "transparent",
              color: tab===i ? "#4ade80" : "#6b7280",
              fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap",
            }}>{lbl}</button>
          ))}
        </div>

        {/* ── TAB PRIX ── */}
        {tab===0 && (
          <div>
            <div style={{ display:"flex", gap:10, marginBottom:10, flexWrap:"wrap" }}>
              <div style={{ background:"#0b1624", borderRadius:12, border:"1px solid #1a2740", padding:"12px 14px", flex:2, minWidth:220 }}>
                <div style={{ fontSize:10, color:"#6b7280", textTransform:"uppercase", marginBottom:7 }}>{t.origin}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {ORIGINS.map(o => <Tag key={o} label={`${ORIGIN_FLAG[o]} ${t.origins[o]}`} active={origin===o} onClick={() => setOrigin(o)} color={ORIGIN_COLOR[o]} />)}
                </div>
              </div>
              <div style={{ background:"#0b1624", borderRadius:12, border:"1px solid #1a2740", padding:"12px 14px" }}>
                <div style={{ fontSize:10, color:"#6b7280", textTransform:"uppercase", marginBottom:7 }}>{t.week}</div>
                <div style={{ display:"flex", gap:5 }}>
                  {allWeeks.map(w => (
                    <button key={w} onClick={() => setWeek(w)} style={{
                      padding:"5px 12px", borderRadius:8, border:`1px solid ${week===w?"#4ade80":"#1a2740"}`,
                      background: week===w?"#4ade8018":"transparent", color: week===w?"#4ade80":"#6b7280",
                      fontSize:13, cursor:"pointer", fontFamily:"'Space Mono',monospace", fontWeight:700,
                    }}>S{w}</button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background:"#0b1624", borderRadius:14, border:"1px solid #1a2740", overflow:"hidden" }}>
              <div style={{ padding:"10px 14px", borderBottom:"1px solid #1a2740", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:6 }}>
                <span style={{ fontSize:12, fontWeight:700, color:cfg.color }}>{cfg.flag} {t.origins[origin]} · {t.week} {week} · {t.realCif}</span>
                <span style={{ fontSize:10, color:"#4b5563" }}>{t.cifNote}</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"60px 90px 110px 110px 90px", padding:"7px 14px", background:"#07101a", borderBottom:"1px solid #1a2740" }}>
                {[t.col.cal,t.col.weight,t.col.min,t.col.max,t.col.trend].map(h => (
                  <div key={h} style={{ fontSize:10, color:"#374151", textTransform:"uppercase", letterSpacing:"0.06em" }}>{h}</div>
                ))}
              </div>
              {CALIBRES_LIST.map((c,i) => {
                const p = REAL_PRICES[week]?.[origin]?.[c];
                const tr = getTrend(origin,c);
                const isSel = cal===c;
                const isKg = c>=26;
                return (
                  <div key={c} onClick={() => setCal(c)} style={{
                    display:"grid", gridTemplateColumns:"60px 90px 110px 110px 90px",
                    padding:"10px 14px", cursor:"pointer",
                    background: isSel?`${cfg.color}12`:i%2===0?"#0b1624":"#0d1a28",
                    borderLeft: isSel?`3px solid ${cfg.color}`:"3px solid transparent",
                    borderBottom: i<CALIBRES_LIST.length-1?"1px solid #1a2740":"none",
                  }}>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontWeight:700, color:cfg.color, fontSize:14, display:"flex", alignItems:"center", gap:4 }}>
                      {c}{isSel&&<span style={{ fontSize:7, background:cfg.color, color:"#000", borderRadius:3, padding:"1px 3px" }}>●</span>}
                    </div>
                    <div style={{ fontSize:11, color:"#6b7280", display:"flex", alignItems:"center" }}>{CALIBRE_WEIGHTS[c]}</div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#4ade80", fontWeight:700, display:"flex", alignItems:"center" }}>
                      {p?`${p[0]}${isKg?" €/kg":"€"}`:<span style={{ color:"#374151" }}>{t.nd}</span>}
                    </div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#34d399", fontWeight:700, display:"flex", alignItems:"center" }}>
                      {p?`${p[1]}${isKg?" €/kg":"€"}`:""}
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                      <span style={{ fontSize:16, color:trendColor(tr), fontWeight:700 }}>{tr}</span>
                      <span style={{ fontSize:9, color:"#374151" }}>S{allWeeks[0]}→S{allWeeks[allWeeks.length-1]}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {ctx && (
              <div style={{ background:"#0b1624", borderRadius:12, border:"1px solid #1a2740", padding:14, marginTop:10 }}>
                <div style={{ fontSize:11, fontWeight:700, color:cfg.color, marginBottom:8 }}>
                  {cfg.flag} {t.situation} {t.origins[origin]} · {ctx.season}
                </div>
                <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:8 }}>
                  {[[t.calBig,ctx.big],[t.calMid,ctx.medium],[t.calSml,ctx.small]].map(([lbl,tr]) => (
                    <div key={lbl} style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ fontSize:11, color:"#6b7280" }}>{lbl}</span>
                      <span style={{ fontSize:18, color:trendColor(tr), fontWeight:700 }}>{tr}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize:11, color:"#6b7280", borderTop:"1px solid #1a2740", paddingTop:8 }}>💡 {ctx.note}</div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB VOLUMES ── */}
        {tab===1 && (
          <div>
            <div style={{ background:"#0b1624", borderRadius:14, border:"1px solid #1a2740", padding:16, marginBottom:10 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#4ade80", marginBottom:4 }}>📦 {t.supplyTitle}</div>
              <div style={{ fontSize:10, color:"#4b5563", marginBottom:14 }}>{t.supplyNote}</div>
              <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:100 }}>
                {Object.entries(WEEKLY_SUPPLY_EU).map(([w,v]) => {
                  const isReal = REAL_WEEKS.includes(parseInt(w));
                  const isPeak = parseInt(w)>=18;
                  return (
                    <div key={w} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                      <div style={{ fontSize:8, color:isReal?"#4ade80":"#4b5563" }}>{v}M</div>
                      <div style={{ width:"100%", borderRadius:"3px 3px 0 0", background:isReal?(isPeak?"#f59e0b":"#4ade80"):"#1a2740", height:`${(v/maxSupply)*80}px`, minHeight:5, opacity:isReal?1:0.5, border:!isReal?"1px dashed #374151":"none" }} />
                      <div style={{ fontSize:9, color:isReal?"#6b7280":"#374151" }}>S{w}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display:"flex", gap:14, marginTop:10, fontSize:10 }}>
                {[[" #4ade80",t.real],["#f59e0b",t.peak],["#1a2740",t.proj]].map(([bg,lbl]) => (
                  <div key={lbl} style={{ display:"flex", alignItems:"center", gap:4 }}>
                    <div style={{ width:8, height:8, background:bg.trim(), borderRadius:2, border:lbl===t.proj?"1px dashed #374151":"none" }} />
                    <span style={{ color:"#6b7280" }}>{lbl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background:"#0b1624", borderRadius:14, border:"1px solid #1a2740", padding:16, marginBottom:10 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#fbbf24", marginBottom:4 }}>📈 {t.ciradTitle}</div>
              <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:80 }}>
                {ciradWeeks.map(w => {
                  const v = CIRAD_REF[w];
                  const h = ((v-minC)/(maxC-minC))*58+12;
                  const isLatest = w===Math.max(...ciradWeeks);
                  return (
                    <div key={w} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                      <div style={{ fontSize:8, color:"#fbbf24" }}>{v.toFixed(2)}</div>
                      <div style={{ width:"100%", background:isLatest?"#f87171":"#fbbf24", borderRadius:"3px 3px 0 0", height:`${h}px` }} />
                      <div style={{ fontSize:9, color:"#6b7280" }}>S{w}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop:10, background:"#07101a", borderRadius:8, padding:"8px 12px", fontSize:11, color:"#f87171" }}>
                ⚠️ S{Math.max(...ciradWeeks)} = {CIRAD_REF[Math.max(...ciradWeeks)]}€ · {t.ciradAlert}
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {t.blocks.map(block => (
                <div key={block.title} style={{ background:"#0b1624", borderRadius:12, border:`1px solid ${block.color}20`, padding:14 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:block.color, marginBottom:10 }}>{block.title}</div>
                  {block.items.map(item => (
                    <div key={item} style={{ fontSize:11, color:"#9ca3af", marginBottom:5, paddingLeft:10, borderLeft:`2px solid ${block.color}40` }}>{item}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB IMPORTATEURS ── */}
        {tab===2 && (
          <div style={{ background:"#0b1624", borderRadius:14, border:"1px solid #1a2740", overflow:"hidden" }}>
            <div style={{ padding:"10px 14px", borderBottom:"1px solid #1a2740", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:6 }}>
              <span style={{ fontSize:12, fontWeight:700, color:"#4ade80" }}>🏢 {t.importersTitle}</span>
              <span style={{ fontSize:10, color:"#4b5563" }}>{t.importersSub}</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"28px 1fr 36px 80px 80px 72px", padding:"7px 14px", background:"#07101a", borderBottom:"1px solid #1a2740" }}>
              {["#",t.col.importer,t.col.country,t.colPrev,t.colLast,t.col.growth].map(h => (
                <div key={h} style={{ fontSize:10, color:"#374151", textTransform:"uppercase", letterSpacing:"0.05em" }}>{h}</div>
              ))}
            </div>
            {TOP_IMPORTERS.map((imp,i) => {
              const growth = ((imp.w18-imp.w17)/imp.w17*100);
              const barW = (imp.w18/TOP_IMPORTERS[0].w18)*100;
              return (
                <div key={imp.name} style={{
                  display:"grid", gridTemplateColumns:"28px 1fr 36px 80px 80px 72px",
                  padding:"10px 14px", position:"relative",
                  background: i%2===0?"#0b1624":"#0d1a28",
                  borderBottom: i<TOP_IMPORTERS.length-1?"1px solid #1a2740":"none",
                }}>
                  <div style={{ position:"absolute", left:0, top:0, height:"100%", width:`${barW*0.4}%`, background:"#4ade8008", pointerEvents:"none" }} />
                  <div style={{ fontSize:11, color:"#374151", fontFamily:"'Space Mono',monospace", display:"flex", alignItems:"center" }}>#{i+1}</div>
                  <div style={{ fontSize:12, color:"#d1fae5", display:"flex", alignItems:"center", fontWeight:i<3?700:400 }}>{imp.name}</div>
                  <div style={{ fontSize:14, display:"flex", alignItems:"center" }}>{FLAG_MAP[imp.country]||"🌍"}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#6b7280", display:"flex", alignItems:"center" }}>{imp.w17}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#4ade80", fontWeight:700, display:"flex", alignItems:"center" }}>{imp.w18}</div>
                  <div style={{ display:"flex", alignItems:"center" }}>
                    <span style={{ fontSize:11, fontFamily:"'Space Mono',monospace", fontWeight:700, color:growth>50?"#4ade80":growth>20?"#fbbf24":"#f87171" }}>
                      +{growth.toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── TAB IA ── */}
        {tab===3 && (
          <div>
            <div style={{ display:"flex", gap:10, marginBottom:12, flexWrap:"wrap" }}>
              <div style={{ background:"#0b1624", borderRadius:12, border:"1px solid #1a2740", padding:"12px 14px", flex:2, minWidth:220 }}>
                <div style={{ fontSize:10, color:"#6b7280", textTransform:"uppercase", marginBottom:7 }}>{t.origin}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {ORIGINS.map(o => <Tag key={o} label={`${ORIGIN_FLAG[o]} ${t.origins[o]}`} active={origin===o} onClick={() => setOrigin(o)} color={ORIGIN_COLOR[o]} />)}
                </div>
              </div>
              <div style={{ background:"#0b1624", borderRadius:12, border:"1px solid #1a2740", padding:"12px 14px" }}>
                <div style={{ fontSize:10, color:"#6b7280", textTransform:"uppercase", marginBottom:7 }}>{t.size}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                  {CALIBRES_LIST.map(c => (
                    <button key={c} onClick={() => setCal(c)} style={{
                      padding:"3px 8px", borderRadius:6, border:`1px solid ${cal===c?"#4ade80":"#1a2740"}`,
                      background:cal===c?"#4ade8018":"transparent", color:cal===c?"#4ade80":"#6b7280",
                      fontSize:12, cursor:"pointer", fontFamily:"'Space Mono',monospace", fontWeight:700,
                    }}>{c}</button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background:"linear-gradient(135deg,#0b1624,#101f30)", borderRadius:14, border:`1px solid ${cfg.color}30`, padding:16, marginBottom:12 }}>
              <div style={{ fontSize:13, fontWeight:700, color:cfg.color, marginBottom:10 }}>
                {cfg.flag} {t.origins[origin]} · Cal. {cal}
              </div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {allWeeks.map(w => {
                  const p = REAL_PRICES[w]?.[origin]?.[cal];
                  const isKg = cal>=26;
                  return (
                    <div key={w} style={{ flex:1, minWidth:85, background:"#07101a", borderRadius:10, padding:"10px 12px", border:`1px solid ${w===18?cfg.color+"40":"#1a2740"}` }}>
                      <div style={{ fontSize:10, color:"#4b5563", marginBottom:4 }}>S{w}</div>
                      {p ? <>
                        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:14, color:"#4ade80", fontWeight:700 }}>{p[0]}–{p[1]}</div>
                        <div style={{ fontSize:9, color:"#374151" }}>€/{isKg?"kg":"box"}</div>
                      </> : <div style={{ color:"#374151", fontSize:12 }}>{t.nd}</div>}
                    </div>
                  );
                })}
                <div style={{ flex:1, minWidth:70, background:"#07101a", borderRadius:10, padding:"10px 12px", border:"1px dashed #374151" }}>
                  <div style={{ fontSize:10, color:"#4b5563", marginBottom:4 }}>{t.trendLabel}</div>
                  <div style={{ fontSize:22, color:trendColor(getTrend(origin,cal)), fontWeight:700 }}>{getTrend(origin,cal)}</div>
                </div>
              </div>
            </div>

            <div style={{ background:"linear-gradient(135deg,#04200f,#0b1624)", borderRadius:14, border:"1px solid #14532d", padding:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:aiText?14:0, flexWrap:"wrap", gap:10 }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#4ade80" }}>✨ {t.aiTitle}</div>
                  <div style={{ fontSize:10, color:"#4b5563", marginTop:2 }}>{t.aiSub} · {ratesDate}</div>
                </div>
                <button onClick={getAI} disabled={aiLoading} style={{
                  background:aiLoading?"#1a2740":"linear-gradient(135deg,#166534,#15803d)",
                  border:"none", borderRadius:9, padding:"10px 20px",
                  color:aiLoading?"#4b5563":"white", fontSize:13, fontWeight:600,
                  cursor:aiLoading?"not-allowed":"pointer", fontFamily:"inherit",
                }}>{aiLoading?t.aiLoading:t.aiBtn}</button>
              </div>
              {aiText ? (
                <div style={{ background:"#07101a", borderRadius:10, padding:14, fontSize:13, lineHeight:1.8, color:"#d1fae5", borderLeft:"3px solid #4ade80" }}>{aiText}</div>
              ) : !aiLoading && (
                <div style={{ fontSize:11, color:"#374151", textAlign:"center", padding:"20px 0" }}>{t.aiPlaceholder}</div>
              )}
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
    </div>
  );
}
