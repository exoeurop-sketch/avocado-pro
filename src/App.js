import { useUser, useClerk, useSignIn } from "@clerk/clerk-react";
import { useState, useEffect, useCallback } from "react";
import { REAL_PRICES, LATEST_WEEK, CIRAD_REF, WEEKLY_SUPPLY_EU, REAL_WEEKS, TOP_IMPORTERS, CALIBRES_LIST, CALIBRE_WEIGHTS, ORIGIN_COLOR, ORIGIN_FLAG } from "./data";

// ─── ADMIN ────────────────────────────────────────────────────────────────────
const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL || "exoeurop@gmail.com";

// ─── TRADUCTIONS ──────────────────────────────────────────────────────────────
const T = {
  fr: {
    tabs:["💰 Prix calibres","📦 Volumes","🏢 Importateurs","🔮 Analyse IA"],
    origin:"Origine", week:"Semaine", size:"Calibre",
    realCif:"Prix CIF Europe réels", cifNote:"Cal. 14–24 = €/caisse 4kg · Cal. 26–32 = €/kg",
    col:{cal:"Cal.",weight:"Poids",min:"Min",max:"Max",trend:"Tendance",growth:"Croissance",importer:"Importateur"},
    kpi:[{label:"Offre EU S18",val:"27M kg",sub:"Peak +20% vs 2025"},{label:"CIRAD Cal.18 S17",val:"11.87€",sub:"↘ Tendance baissière"},{label:"Pérou S17 Europe",val:"~800 cnts",sub:"70% de l'offre EU"},{label:"Prix S18 Cal.18",val:"11.5–12.5€",sub:"CIF /caisse 4kg ↘"}],
    supplyTitle:"Disponibilité palta Hass Europe 2026 (M kg/semaine)",
    supplyNote:"Réel jusqu'à S18 · S19+ = projections",
    ciradTitle:"Prix référence CIRAD · Hass Cal.18 · €/caisse 4kg",
    ciradAlert:"↘ Tendance baissière confirmée · Pression offre croissante",
    blocks:[
      {title:"🟢 Calibres favorables",items:["Cal. 14-18 : demande ferme, offre limitée","Cal. 20 : rôle charnière, stable","Afrique du Sud : gros fruits disponibles"],color:"#16a34a"},
      {title:"🔴 Calibres sous pression",items:["Cal. 22-32 : 60-70% offre Pérou Sierra","Inventaires petits fruits s'accumulent","Colombia & Kenya : petits calibres dominant"],color:"#f87171"},
      {title:"📅 Semaine 20 : tournant Olmos",items:["Entrée zone Olmos Pérou : calibres ↑","Amélioration temporaire 2-3 semaines","Puis retour prédominance petits calibres"],color:"#f59e0b"},
      {title:"🌍 USA → impact Europe",items:["Mexique record : 1Md+ kg exportés","Pérou & Colombia redirigés vers EU","Pression offre Europe S19-22"],color:"#60a5fa"},
    ],
    importersTitle:"Top importateurs Pérou → Europe", importersSub:"Conteneurs cumulés · données réelles",
    colPrev:"Au 17/04", colLast:"Au 01/05",
    aiTitle:"Analyse & Prédiction IA", aiSub:"Données réelles S16–S18",
    aiBtn:"🔍 Analyser & Prédire", aiLoading:"⏳ Analyse...",
    aiPlaceholder:"Sélectionnez une origine + calibre puis cliquez Analyser",
    trendLabel:"Tendance", nd:"N/D", real:"Réel", peak:"Peak", proj:"Projection",
    origins:{"Peru":"Pérou","Colombia":"Colombie","South Africa":"Afrique du Sud","Brazil":"Brésil","Spain":"Espagne"},
    situation:"Situation", calBig:"Grands (14-18)", calMid:"Moyens (20-22)", calSml:"Petits (24-32)",
    liveRates:"BCE live", updated:"MAJ", logout:"Déconnexion", admin:"Admin",
    loginTitle:"Connexion", loginSub:"Accédez à HassMarket Pro",
    loginEmail:"Email", loginPass:"Mot de passe", loginBtn:"Se connecter",
    loginError:"Email ou mot de passe incorrect.",
    ctx:{
      "Peru":        {big:"↗",medium:"↘",small:"↘↘",note:"60-70% cal.22-32 Sierra. Entrée Olmos sem.20.",season:"Pic saisonnier · Sierra → Côte"},
      "Colombia":    {big:"=",medium:"↘",small:"↘↘",note:"Flor traviesa, petits calibres dominant.",season:"Début flor traviesa"},
      "South Africa":{big:"↗",medium:"=",small:"=",note:"Avantage calibres grands. Maluma difficile.",season:"Post-peak"},
      "Brazil":      {big:"=",medium:"↘",small:"↘",note:"Peak passé. Réorientation Argentine/Uruguay.",season:"Réduction post-peak"},
      "Spain":       {big:"↘",medium:"↘",small:"↘",note:"Fin de saison. Marché interne uniquement.",season:"Clôture saison"},
    },
  },
  en: {
    tabs:["💰 Calibre prices","📦 Volumes","🏢 Importers","🔮 AI Analysis"],
    origin:"Origin", week:"Week", size:"Grade",
    realCif:"Real CIF Europe prices", cifNote:"Cal. 14–24 = €/4kg box · Cal. 26–32 = €/kg",
    col:{cal:"Grade",weight:"Weight",min:"Min",max:"Max",trend:"Trend",growth:"Growth",importer:"Importer"},
    kpi:[{label:"EU Supply W18",val:"27M kg",sub:"Peak +20% vs 2025"},{label:"CIRAD Cal.18 W17",val:"11.87€",sub:"↘ Downward trend"},{label:"Peru W17 Europe",val:"~800 cnts",sub:"70% of EU supply"},{label:"Price W18 Cal.18",val:"11.5–12.5€",sub:"CIF /4kg box ↘"}],
    supplyTitle:"Hass avocado availability Europe 2026 (M kg/week)",
    supplyNote:"Actual up to W18 · W19+ = forecasts",
    ciradTitle:"CIRAD reference price · Hass Cal.18 · €/4kg box",
    ciradAlert:"↘ Confirmed downward trend · Growing supply pressure",
    blocks:[
      {title:"🟢 Favourable grades",items:["Cal. 14-18: firm demand, limited supply","Cal. 20: pivot grade, stable","South Africa: large fruit available"],color:"#16a34a"},
      {title:"🔴 Grades under pressure",items:["Cal. 22-32: 60-70% Peru Sierra supply","Small fruit inventory accumulating","Colombia & Kenya: small grades dominant"],color:"#f87171"},
      {title:"📅 Week 20: Olmos turning point",items:["Olmos Peru entry: grades ↑","Temporary improvement 2-3 weeks","Then back to small grade dominance"],color:"#f59e0b"},
      {title:"🌍 USA → Europe impact",items:["Mexico record: 1B+ kg exported","Peru & Colombia redirected to EU","EU supply pressure W19-22"],color:"#60a5fa"},
    ],
    importersTitle:"Top importers Peru → Europe", importersSub:"Cumulative containers · real data",
    colPrev:"At 17/04", colLast:"At 01/05",
    aiTitle:"AI Analysis & Prediction", aiSub:"Real data W16–W18",
    aiBtn:"🔍 Analyse & Predict", aiLoading:"⏳ Analysing...",
    aiPlaceholder:"Select an origin + grade then click Analyse",
    trendLabel:"Trend", nd:"N/A", real:"Actual", peak:"Peak", proj:"Forecast",
    origins:{"Peru":"Peru","Colombia":"Colombia","South Africa":"South Africa","Brazil":"Brazil","Spain":"Spain"},
    situation:"Situation", calBig:"Large (14-18)", calMid:"Medium (20-22)", calSml:"Small (24-32)",
    liveRates:"ECB live", updated:"Updated", logout:"Sign out", admin:"Admin",
    loginTitle:"Sign in", loginSub:"Access HassMarket Pro",
    loginEmail:"Email", loginPass:"Password", loginBtn:"Sign in",
    loginError:"Incorrect email or password.",
    ctx:{
      "Peru":        {big:"↗",medium:"↘",small:"↘↘",note:"60-70% cal.22-32 Sierra. Olmos entry W20.",season:"Seasonal peak · Sierra → Coast"},
      "Colombia":    {big:"=",medium:"↘",small:"↘↘",note:"Flor traviesa, small grades dominant.",season:"Start of flor traviesa"},
      "South Africa":{big:"↗",medium:"=",small:"=",note:"Large grade advantage. Maluma difficult.",season:"Post-peak"},
      "Brazil":      {big:"=",medium:"↘",small:"↘",note:"Peak passed. Redirecting to Argentina/Uruguay.",season:"Post-peak reduction"},
      "Spain":       {big:"↘",medium:"↘",small:"↘",note:"End of season. Domestic market only.",season:"Season close"},
    },
  },
  es: {
    tabs:["💰 Precios calibres","📦 Volúmenes","🏢 Importadores","🔮 Análisis IA"],
    origin:"Origen", week:"Semana", size:"Calibre",
    realCif:"Precios CIF Europa reales", cifNote:"Cal. 14–24 = €/caja 4kg · Cal. 26–32 = €/kg",
    col:{cal:"Cal.",weight:"Peso",min:"Mín",max:"Máx",trend:"Tendencia",growth:"Crecimiento",importer:"Importador"},
    kpi:[{label:"Oferta EU S18",val:"27M kg",sub:"Pico +20% vs 2025"},{label:"CIRAD Cal.18 S17",val:"11.87€",sub:"↘ Tendencia bajista"},{label:"Perú S17 Europa",val:"~800 cnts",sub:"70% oferta EU"},{label:"Precio S18 Cal.18",val:"11.5–12.5€",sub:"CIF /caja 4kg ↘"}],
    supplyTitle:"Disponibilidad palta Hass Europa 2026 (M kg/semana)",
    supplyNote:"Real hasta S18 · S19+ = proyecciones",
    ciradTitle:"Precio referencia CIRAD · Hass Cal.18 · €/caja 4kg",
    ciradAlert:"↘ Tendencia bajista confirmada · Presión de oferta creciente",
    blocks:[
      {title:"🟢 Calibres favorables",items:["Cal. 14-18: demanda firme, oferta limitada","Cal. 20: calibre bisagra, estable","Sudáfrica: fruta grande disponible"],color:"#16a34a"},
      {title:"🔴 Calibres bajo presión",items:["Cal. 22-32: 60-70% oferta Perú Sierra","Inventarios fruta pequeña acumulándose","Colombia & Kenia: calibres pequeños dominan"],color:"#f87171"},
      {title:"📅 Semana 20: hito Olmos",items:["Entrada zona Olmos Perú: calibres ↑","Mejora temporal 2-3 semanas","Luego vuelta a predominio fruta pequeña"],color:"#f59e0b"},
      {title:"🌍 USA → impacto Europa",items:["México récord: +1.000M kg exportados","Perú & Colombia redirigidos a EU","Presión oferta Europa S19-22"],color:"#60a5fa"},
    ],
    importersTitle:"Top importadores Perú → Europa", importersSub:"Contenedores acumulados · datos reales",
    colPrev:"Al 17/04", colLast:"Al 01/05",
    aiTitle:"Análisis & Predicción IA", aiSub:"Datos reales S16–S18",
    aiBtn:"🔍 Analizar & Predecir", aiLoading:"⏳ Analizando...",
    aiPlaceholder:"Seleccione un origen + calibre y haga clic en Analizar",
    trendLabel:"Tendencia", nd:"N/D", real:"Real", peak:"Pico", proj:"Proyección",
    origins:{"Peru":"Perú","Colombia":"Colombia","South Africa":"Sudáfrica","Brazil":"Brasil","Spain":"España"},
    situation:"Situación", calBig:"Grandes (14-18)", calMid:"Medianos (20-22)", calSml:"Pequeños (24-32)",
    liveRates:"BCE en vivo", updated:"Actualizado", logout:"Cerrar sesión", admin:"Admin",
    loginTitle:"Iniciar sesión", loginSub:"Acceda a HassMarket Pro",
    loginEmail:"Email", loginPass:"Contraseña", loginBtn:"Iniciar sesión",
    loginError:"Email o contraseña incorrectos.",
    ctx:{
      "Peru":        {big:"↗",medium:"↘",small:"↘↘",note:"60-70% cal.22-32 Sierra. Entrada Olmos sem.20.",season:"Pico estacional · Sierra → Costa"},
      "Colombia":    {big:"=",medium:"↘",small:"↘↘",note:"Flor traviesa, calibres pequeños dominan.",season:"Inicio flor traviesa"},
      "South Africa":{big:"↗",medium:"=",small:"=",note:"Ventaja calibres grandes. Maluma difícil.",season:"Post-pico"},
      "Brazil":      {big:"=",medium:"↘",small:"↘",note:"Pico pasado. Reorientación Argentina/Uruguay.",season:"Reducción post-pico"},
      "Spain":       {big:"↘",medium:"↘",small:"↘",note:"Fin de temporada. Solo mercado interno.",season:"Cierre temporada"},
    },
  },
};

const FLAG_MAP={NL:"🇳🇱",ES:"🇪🇸",DE:"🇩🇪",UK:"🇬🇧",BE:"🇧🇪",FR:"🇫🇷"};
const ORIGINS=Object.keys(ORIGIN_COLOR);
function getTrend(o,c){const p16=REAL_PRICES[16]?.[o]?.[c];const p18=REAL_PRICES[18]?.[o]?.[c];if(!p16||!p18)return"—";const d=((p18[0]+p18[1])/2)-((p16[0]+p16[1])/2);return d>0.3?"↗":d<-0.3?"↘":"=";}
function trendColor(t){return t==="↗"||t==="↗↗"?"#4ade80":t==="↘"||t==="↘↘"?"#f87171":"#fbbf24";}
function Tag({label,active,onClick,color="#4ade80"}){return <button onClick={onClick} style={{padding:"5px 11px",borderRadius:20,border:`1px solid ${active?color:"#dee2e6"}`,background:active?`${color}18`:"transparent",color:active?color:"#4b5563",fontSize:12,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>{label}</button>;}

function LoginPage({t}){
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const {signIn,isLoaded}=useSignIn();
  const handleLogin=async(e)=>{
    e.preventDefault();if(!isLoaded)return;
    setLoading(true);setError("");
    try{const r=await signIn.create({identifier:email,password:pass});if(r.status!=="complete")setError(t.loginError);}
    catch{setError(t.loginError);}
    setLoading(false);
  };
  return(
    <div style={{minHeight:"100vh",background:"#f8fafc",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"'DM Sans',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700;800&display=swap" rel="stylesheet"/>
      <div style={{marginBottom:24,textAlign:"center"}}>
        <div style={{fontSize:44,marginBottom:12}}>🥑</div>
        <h1 style={{fontSize:24,fontWeight:800,margin:0}}>Hass<span style={{color:"#16a34a"}}>Market</span> Pro</h1>
        <p style={{fontSize:13,color:"#4b5563",marginTop:6}}>{t.loginSub}</p>
      </div>
      <div style={{background:"#f8f9fa",borderRadius:18,border:"1px solid #dee2e6",padding:"32px 28px",width:"100%",maxWidth:380}}>
        <h2 style={{fontSize:18,fontWeight:700,marginBottom:20}}>{t.loginTitle}</h2>
        <form onSubmit={handleLogin}>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:11,color:"#4b5563",textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:5}}>{t.loginEmail}</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required style={{width:"100%",padding:"11px 14px",borderRadius:10,border:"1px solid #dee2e6",background:"#ffffff",color:"#111827",fontSize:14,fontFamily:"inherit",outline:"none"}}/>
          </div>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,color:"#4b5563",textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:5}}>{t.loginPass}</label>
            <input type="password" value={pass} onChange={e=>setPass(e.target.value)} required style={{width:"100%",padding:"11px 14px",borderRadius:10,border:"1px solid #dee2e6",background:"#ffffff",color:"#111827",fontSize:14,fontFamily:"inherit",outline:"none"}}/>
          </div>
          {error&&<div style={{fontSize:12,color:"#f87171",marginBottom:12,background:"#fff5f5",borderRadius:8,padding:"8px 12px"}}>{error}</div>}
          <button type="submit" disabled={loading} style={{width:"100%",padding:"13px",borderRadius:10,border:"none",background:loading?"#dee2e6":"linear-gradient(135deg,#166534,#15803d)",color:loading?"#4b5563":"white",fontSize:14,fontWeight:700,cursor:loading?"not-allowed":"pointer",fontFamily:"inherit"}}>
            {loading?"⏳...":t.loginBtn}
          </button>
        </form>
      </div>
      <div style={{marginTop:16,fontSize:11,color:"#9ca3af"}}>HassMarket Pro · Accès sur invitation uniquement</div>
    </div>
  );
}

function Dashboard({userEmail,isAdmin,lang,setLang}){
  const{signOut}=useClerk();
  const[tab,setTab]=useState(0);
  const[origin,setOrigin]=useState("Peru");
  const[cal,setCal]=useState(18);
  const[week,setWeek]=useState(LATEST_WEEK);
  const[rates,setRates]=useState({});
  const[ratesDate,setRatesDate]=useState(null);
  const[ratesStatus,setRatesStatus]=useState("loading");
  const[aiText,setAiText]=useState("");
  const[aiLoading,setAiLoading]=useState(false);
  const t=T[lang];
  const allWeeks=Object.keys(REAL_PRICES).map(Number).sort();
  const cfg={color:ORIGIN_COLOR[origin],flag:ORIGIN_FLAG[origin]};
  const ctx=t.ctx[origin];
  const maxSupply=Math.max(...Object.values(WEEKLY_SUPPLY_EU));
  const ciradWeeks=Object.keys(CIRAD_REF).map(Number);
  const maxC=Math.max(...Object.values(CIRAD_REF));
  const minC=Math.min(...Object.values(CIRAD_REF));

  const fetchRates=useCallback(async()=>{
    setRatesStatus("loading");
    try{const r=await fetch("https://api.frankfurter.dev/v2/rates?base=EUR&quotes=USD,PEN,COP,ZAR,BRL");const d=await r.json();setRates(d.rates||{});setRatesDate(d.date);setRatesStatus("ok");}
    catch{setRatesStatus("error");}
  },[]);
  useEffect(()=>{fetchRates();},[fetchRates]);

  const getAI=async()=>{
    setAiLoading(true);setAiText("");
    const history=allWeeks.map(w=>{const p=REAL_PRICES[w]?.[origin]?.[cal];return p?`W${w}:${p[0]}–${p[1]}`:`W${w}:N/A`;}).join(" | ");
    const prompt=`Hass avocado Europe expert. 4 sentences (${lang==="fr"?"French":lang==="es"?"Spanish":"English"}), concrete buying advice:\nOrigin:${t.origins[origin]}|Grade:${cal}|Week:${week}\nPrices:${history}\nCIRAD W17=11.87€↘ EU supply W18=27Mkg\nContext:${ctx?.note}|${ctx?.season}\nGrades:large ${ctx?.big} medium ${ctx?.medium} small ${ctx?.small}`;
    try{const r=await fetch("/.netlify/functions/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt})});const d=await r.json();setAiText(d.text||"N/A");}
    catch{setAiText("Connection error.");}
    setAiLoading(false);
  };

  return(
    <div style={{minHeight:"100vh",background:"#ffffff",color:"#111827",fontFamily:"'DM Sans',sans-serif",paddingBottom:60}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"/>
      <div style={{background:"linear-gradient(135deg,#f0fff4,#f0fff4,#ffffff)",padding:"14px 16px",borderBottom:"1px solid #e5e7eb"}}>
        <div style={{maxWidth:1000,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:22}}>🥑</span>
              <span style={{fontSize:18,fontWeight:800,letterSpacing:"-0.02em"}}>Hass<span style={{color:"#16a34a"}}>Market</span> Pro</span>
              {isAdmin&&<span style={{fontSize:10,background:"#f59e0b22",color:"#f59e0b",borderRadius:6,padding:"2px 8px",fontWeight:700}}>⭐ {t.admin}</span>}
            </div>
            <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
              <div style={{display:"flex",gap:3,background:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:8,padding:"3px 4px"}}>
                {["fr","en","es"].map(l=><button key={l} onClick={()=>setLang(l)} style={{padding:"4px 9px",borderRadius:6,border:`1px solid ${lang===l?"#4ade80":"transparent"}`,background:lang===l?"#4ade8020":"transparent",color:lang===l?"#4ade80":"#6b7280",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{l==="fr"?"🇫🇷 FR":l==="en"?"🇬🇧 EN":"🇪🇸 ES"}</button>)}
              </div>
              <div style={{background:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:8,padding:"5px 10px",fontSize:10}}>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:ratesStatus==="ok"?"#4ade80":"#f87171"}}/>
                  <span style={{color:ratesStatus==="ok"?"#4ade80":"#f87171",fontWeight:700}}>{t.liveRates} {ratesStatus==="ok"?"✓":"—"}</span>
                  <button onClick={fetchRates} style={{background:"none",border:"none",color:"#4b5563",cursor:"pointer",fontSize:12,padding:0}}>↻</button>
                </div>
                {ratesDate&&<div style={{color:"#6b7280",fontSize:9}}>{t.updated}: {ratesDate}{rates.USD?` · 1€=${rates.USD.toFixed(3)}$`:""}</div>}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6,background:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:8,padding:"5px 10px"}}>
                <span style={{fontSize:10,color:"#4b5563",maxWidth:130,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{userEmail}</span>
                <button onClick={()=>signOut()} style={{fontSize:10,color:"#f87171",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:700}}>{t.logout}</button>
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {t.kpi.map((k,i)=>(
              <div key={i} style={{flex:1,minWidth:120,background:"linear-gradient(145deg,#f8f9fa,#e9ecef)",border:`1px solid ${["#f59e0b","#f87171","#4ade80","#60a5fa"][i]}20`,borderRadius:10,padding:"10px 12px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",bottom:-4,right:-4,fontSize:30,opacity:0.07}}>{["📦","📊","🚢","💰"][i]}</div>
                <div style={{fontSize:9,color:"#4b5563",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:2}}>{k.label}</div>
                <div style={{fontSize:15,fontWeight:800,color:["#f59e0b","#f87171","#4ade80","#60a5fa"][i],fontFamily:"'Space Mono',monospace",lineHeight:1}}>{k.val}</div>
                <div style={{fontSize:9,color:"#4b5563",marginTop:2}}>{k.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{maxWidth:1000,margin:"0 auto",padding:"12px 14px 0"}}>
        <div style={{display:"flex",gap:6,marginBottom:10,overflowX:"auto",paddingBottom:4}}>
          {t.tabs.map((lbl,i)=><button key={i} onClick={()=>setTab(i)} style={{padding:"8px 14px",borderRadius:10,border:"1px solid",borderColor:tab===i?"#16a34a":"#d1d5db",background:tab===i?"#f0fdf4":"transparent",color:tab===i?"#16a34a":"#6b7280",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>{lbl}</button>)}
        </div>

        {tab===0&&(<div>
          <div style={{display:"flex",gap:10,marginBottom:10,flexWrap:"wrap"}}>
            <div style={{background:"#f8f9fa",borderRadius:12,border:"1px solid #dee2e6",padding:"12px 14px",flex:2,minWidth:220}}>
              <div style={{fontSize:10,color:"#4b5563",textTransform:"uppercase",marginBottom:7}}>{t.origin}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{ORIGINS.map(o=><Tag key={o} label={`${ORIGIN_FLAG[o]} ${t.origins[o]}`} active={origin===o} onClick={()=>setOrigin(o)} color={ORIGIN_COLOR[o]}/>)}</div>
            </div>
            <div style={{background:"#f8f9fa",borderRadius:12,border:"1px solid #dee2e6",padding:"12px 14px"}}>
              <div style={{fontSize:10,color:"#4b5563",textTransform:"uppercase",marginBottom:7}}>{t.week}</div>
              <div style={{display:"flex",gap:5}}>{allWeeks.map(w=><button key={w} onClick={()=>setWeek(w)} style={{padding:"5px 12px",borderRadius:8,border:`1px solid ${week===w?"#4ade80":"#dee2e6"}`,background:week===w?"#4ade8018":"transparent",color:week===w?"#4ade80":"#6b7280",fontSize:13,cursor:"pointer",fontFamily:"'Space Mono',monospace",fontWeight:700}}>S{w}</button>)}</div>
            </div>
          </div>
          <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",overflow:"hidden"}}>
            <div style={{padding:"10px 14px",borderBottom:"1px solid #dee2e6",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6}}>
              <span style={{fontSize:12,fontWeight:700,color:cfg.color}}>{cfg.flag} {t.origins[origin]} · {t.week} {week} · {t.realCif}</span>
              <span style={{fontSize:10,color:"#6b7280"}}>{t.cifNote}</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"60px 90px 110px 110px 90px",padding:"7px 14px",background:"#ffffff",borderBottom:"1px solid #dee2e6"}}>
              {[t.col.cal,t.col.weight,t.col.min,t.col.max,t.col.trend].map(h=><div key={h} style={{fontSize:10,color:"#374151",textTransform:"uppercase",letterSpacing:"0.06em"}}>{h}</div>)}
            </div>
            {CALIBRES_LIST.map((c,i)=>{const p=REAL_PRICES[week]?.[origin]?.[c];const tr=getTrend(origin,c);const isSel=cal===c;const isKg=c>=26;return(
              <div key={c} onClick={()=>setCal(c)} style={{display:"grid",gridTemplateColumns:"60px 90px 110px 110px 90px",padding:"10px 14px",cursor:"pointer",background:isSel?`${cfg.color}12`:i%2===0?"#f8f9fa":"#f1f3f5",borderLeft:isSel?`3px solid ${cfg.color}`:"3px solid transparent",borderBottom:i<CALIBRES_LIST.length-1?"1px solid #dee2e6":"none"}}>
                <div style={{fontFamily:"'Space Mono',monospace",fontWeight:700,color:cfg.color,fontSize:14,display:"flex",alignItems:"center",gap:4}}>{c}{isSel&&<span style={{fontSize:7,background:cfg.color,color:"#000",borderRadius:3,padding:"1px 3px"}}>●</span>}</div>
                <div style={{fontSize:11,color:"#4b5563",display:"flex",alignItems:"center"}}>{CALIBRE_WEIGHTS[c]}</div>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:13,color:"#16a34a",fontWeight:700,display:"flex",alignItems:"center"}}>{p?`${p[0]}${isKg?" €/kg":"€"}`:<span style={{color:"#9ca3af"}}>{t.nd}</span>}</div>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:13,color:"#059669",fontWeight:700,display:"flex",alignItems:"center"}}>{p?`${p[1]}${isKg?" €/kg":"€"}`:""}</div>
                <div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:16,color:trendColor(tr),fontWeight:700}}>{tr}</span><span style={{fontSize:9,color:"#9ca3af"}}>S{allWeeks[0]}→S{allWeeks[allWeeks.length-1]}</span></div>
              </div>);})}
          </div>
          {ctx&&(<div style={{background:"#f8f9fa",borderRadius:12,border:"1px solid #dee2e6",padding:14,marginTop:10}}>
            <div style={{fontSize:11,fontWeight:700,color:cfg.color,marginBottom:8}}>{cfg.flag} {t.situation} {t.origins[origin]} · {ctx.season}</div>
            <div style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:8}}>{[[t.calBig,ctx.big],[t.calMid,ctx.medium],[t.calSml,ctx.small]].map(([lbl,tr])=><div key={lbl} style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:11,color:"#6b7280"}}>{lbl}</span><span style={{fontSize:18,color:trendColor(tr),fontWeight:700}}>{tr}</span></div>)}</div>
            <div style={{fontSize:11,color:"#4b5563",borderTop:"1px solid #dee2e6",paddingTop:8}}>💡 {ctx.note}</div>
          </div>)}
        </div>)}

        {tab===1&&(<div>
          <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",padding:16,marginBottom:10}}>
            <div style={{fontSize:12,fontWeight:700,color:"#16a34a",marginBottom:4}}>📦 {t.supplyTitle}</div>
            <div style={{fontSize:10,color:"#4b5563",marginBottom:14}}>{t.supplyNote}</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:5,height:90}}>
              {Object.entries(WEEKLY_SUPPLY_EU).map(([w,v])=>{const isReal=REAL_WEEKS.includes(parseInt(w));const isPeak=parseInt(w)>=18;return(<div key={w} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                <div style={{fontSize:8,color:isReal?"#4ade80":"#4b5563"}}>{v}M</div>
                <div style={{width:"100%",borderRadius:"3px 3px 0 0",background:isReal?(isPeak?"#f59e0b":"#4ade80"):"#dee2e6",height:`${(v/maxSupply)*74}px`,minHeight:5,opacity:isReal?1:0.5,border:!isReal?"1px dashed #374151":"none"}}/>
                <div style={{fontSize:9,color:isReal?"#6b7280":"#374151"}}>S{w}</div>
              </div>);})}
            </div>
          </div>
          <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",padding:16,marginBottom:10}}>
            <div style={{fontSize:12,fontWeight:700,color:"#fbbf24",marginBottom:14}}>📈 {t.ciradTitle}</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:6,height:70}}>
              {ciradWeeks.map(w=>{const v=CIRAD_REF[w];const h=((v-minC)/(maxC-minC))*52+12;const isL=w===Math.max(...ciradWeeks);return(<div key={w} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                <div style={{fontSize:8,color:"#fbbf24"}}>{v.toFixed(2)}</div>
                <div style={{width:"100%",background:isL?"#f87171":"#fbbf24",borderRadius:"3px 3px 0 0",height:`${h}px`}}/>
                <div style={{fontSize:9,color:"#6b7280"}}>S{w}</div>
              </div>);})}
            </div>
            <div style={{marginTop:10,background:"#ffffff",borderRadius:8,padding:"8px 12px",fontSize:11,color:"#f87171"}}>⚠️ {t.ciradAlert}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {t.blocks.map(b=><div key={b.title} style={{background:"#f8f9fa",borderRadius:12,border:`1px solid ${b.color}20`,padding:14}}>
              <div style={{fontSize:12,fontWeight:700,color:b.color,marginBottom:10}}>{b.title}</div>
              {b.items.map(item=><div key={item} style={{fontSize:11,color:"#374151",marginBottom:5,paddingLeft:10,borderLeft:`2px solid ${b.color}40`}}>{item}</div>)}
            </div>)}
          </div>
        </div>)}

        {tab===2&&(<div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",overflow:"hidden"}}>
          <div style={{padding:"10px 14px",borderBottom:"1px solid #dee2e6",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6}}>
            <span style={{fontSize:12,fontWeight:700,color:"#16a34a"}}>🏢 {t.importersTitle}</span>
            <span style={{fontSize:10,color:"#6b7280"}}>{t.importersSub}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"28px 1fr 36px 80px 80px 72px",padding:"7px 14px",background:"#ffffff",borderBottom:"1px solid #dee2e6"}}>
            {["#",t.col.importer,"🌍",t.colPrev,t.colLast,t.col.growth].map(h=><div key={h} style={{fontSize:10,color:"#374151",textTransform:"uppercase",letterSpacing:"0.05em"}}>{h}</div>)}
          </div>
          {TOP_IMPORTERS.map((imp,i)=>{const growth=((imp.w18-imp.w17)/imp.w17*100);const barW=(imp.w18/TOP_IMPORTERS[0].w18)*100;return(
            <div key={imp.name} style={{display:"grid",gridTemplateColumns:"28px 1fr 36px 80px 80px 72px",padding:"10px 14px",position:"relative",background:i%2===0?"#f8f9fa":"#f1f3f5",borderBottom:i<TOP_IMPORTERS.length-1?"1px solid #dee2e6":"none"}}>
              <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${barW*0.4}%`,background:"#4ade8008",pointerEvents:"none"}}/>
              <div style={{fontSize:11,color:"#374151",fontFamily:"'Space Mono',monospace",display:"flex",alignItems:"center"}}>#{i+1}</div>
              <div style={{fontSize:12,color:"#065f46",display:"flex",alignItems:"center",fontWeight:i<3?700:400}}>{imp.name}</div>
              <div style={{fontSize:14,display:"flex",alignItems:"center"}}>{FLAG_MAP[imp.country]||"🌍"}</div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#4b5563",display:"flex",alignItems:"center"}}>{imp.w17}</div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:13,color:"#16a34a",fontWeight:700,display:"flex",alignItems:"center"}}>{imp.w18}</div>
              <div style={{display:"flex",alignItems:"center"}}><span style={{fontSize:11,fontFamily:"'Space Mono',monospace",fontWeight:700,color:growth>50?"#4ade80":growth>20?"#fbbf24":"#f87171"}}>+{growth.toFixed(0)}%</span></div>
            </div>);})}
        </div>)}

        {tab===3&&(<div>
          <div style={{display:"flex",gap:10,marginBottom:12,flexWrap:"wrap"}}>
            <div style={{background:"#f8f9fa",borderRadius:12,border:"1px solid #dee2e6",padding:"12px 14px",flex:2,minWidth:220}}>
              <div style={{fontSize:10,color:"#4b5563",textTransform:"uppercase",marginBottom:7}}>{t.origin}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{ORIGINS.map(o=><Tag key={o} label={`${ORIGIN_FLAG[o]} ${t.origins[o]}`} active={origin===o} onClick={()=>setOrigin(o)} color={ORIGIN_COLOR[o]}/>)}</div>
            </div>
            <div style={{background:"#f8f9fa",borderRadius:12,border:"1px solid #dee2e6",padding:"12px 14px"}}>
              <div style={{fontSize:10,color:"#4b5563",textTransform:"uppercase",marginBottom:7}}>{t.size}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{CALIBRES_LIST.map(c=><button key={c} onClick={()=>setCal(c)} style={{padding:"3px 8px",borderRadius:6,border:`1px solid ${cal===c?"#4ade80":"#dee2e6"}`,background:cal===c?"#4ade8018":"transparent",color:cal===c?"#4ade80":"#6b7280",fontSize:12,cursor:"pointer",fontFamily:"'Space Mono',monospace",fontWeight:700}}>{c}</button>)}</div>
            </div>
          </div>
          <div style={{background:"linear-gradient(135deg,#f8f9fa,#e9ecef)",borderRadius:14,border:`1px solid ${cfg.color}30`,padding:16,marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,color:cfg.color,marginBottom:10}}>{cfg.flag} {t.origins[origin]} · Cal. {cal}</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {allWeeks.map(w=>{const p=REAL_PRICES[w]?.[origin]?.[cal];const isKg=cal>=26;return(
                <div key={w} style={{flex:1,minWidth:80,background:"#ffffff",borderRadius:10,padding:"10px 12px",border:`1px solid ${w===LATEST_WEEK?cfg.color+"40":"#dee2e6"}`}}>
                  <div style={{fontSize:10,color:"#4b5563",marginBottom:4}}>S{w}</div>
                  {p?<><div style={{fontFamily:"'Space Mono',monospace",fontSize:13,color:"#16a34a",fontWeight:700}}>{p[0]}–{p[1]}</div><div style={{fontSize:9,color:"#9ca3af"}}>€/{isKg?"kg":"box"}</div></>:<div style={{color:"#374151",fontSize:12}}>{t.nd}</div>}
                </div>);})}
              <div style={{flex:1,minWidth:70,background:"#ffffff",borderRadius:10,padding:"10px 12px",border:"1px dashed #374151"}}>
                <div style={{fontSize:10,color:"#4b5563",marginBottom:4}}>{t.trendLabel}</div>
                <div style={{fontSize:22,color:trendColor(getTrend(origin,cal)),fontWeight:700}}>{getTrend(origin,cal)}</div>
              </div>
            </div>
          </div>
          <div style={{background:"linear-gradient(135deg,#f0fff4,#f8f9fa)",borderRadius:14,border:"1px solid #d1fae5",padding:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:aiText?14:0,flexWrap:"wrap",gap:10}}>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:"#16a34a"}}>✨ {t.aiTitle}</div>
                <div style={{fontSize:10,color:"#4b5563",marginTop:2}}>{t.aiSub}</div>
              </div>
              <button onClick={getAI} disabled={aiLoading} style={{background:aiLoading?"#dee2e6":"linear-gradient(135deg,#166534,#15803d)",border:"none",borderRadius:9,padding:"10px 20px",color:aiLoading?"#4b5563":"white",fontSize:13,fontWeight:600,cursor:aiLoading?"not-allowed":"pointer",fontFamily:"inherit"}}>
                {aiLoading?t.aiLoading:t.aiBtn}
              </button>
            </div>
            {aiText?<div style={{background:"#ffffff",borderRadius:10,padding:14,fontSize:13,lineHeight:1.8,color:"#065f46",borderLeft:"3px solid #4ade80"}}>{aiText}</div>
            :!aiLoading&&<div style={{fontSize:11,color:"#374151",textAlign:"center",padding:"20px 0"}}>{t.aiPlaceholder}</div>}
          </div>
        </div>)}
      </div>
    </div>
  );
}

export default function App(){
  const{isLoaded,isSignedIn,user}=useUser();
  const[lang,setLang]=useState("fr");
  const t=T[lang];

  if(!isLoaded){return(
    <div style={{minHeight:"100vh",background:"#ffffff",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{fontSize:36}}>🥑</div>
    </div>
  );}

  if(!isSignedIn) return <LoginPage t={t}/>;

  const userEmail=user.primaryEmailAddress?.emailAddress||"";
  const isAdmin=userEmail.toLowerCase()===ADMIN_EMAIL.toLowerCase();

  return <Dashboard userEmail={userEmail} isAdmin={isAdmin} lang={lang} setLang={setLang}/>;
}
