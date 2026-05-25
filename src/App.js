import { useUser, useClerk, useSignIn } from "@clerk/clerk-react";
import { useState, useEffect, useCallback } from "react";
import LegalFooter from "./Legal";
import VersionChecker from "./VersionChecker";
import { REAL_PRICES, LATEST_WEEK, CIRAD_REF, WEEKLY_SUPPLY_EU, REAL_WEEKS, TOP_IMPORTERS, CALIBRES_LIST, CALIBRE_WEIGHTS, ORIGIN_COLOR, ORIGIN_FLAG, FORECAST_WEEKS, FORECAST_PRICES, FORECAST_SUPPLY, FORECAST_TREND, FORECAST_STRATEGY, FORECAST_FACTORS, PERU_WEEKLY_EUROPE, PERU_WEEKLY_USA, PERU_WEEKLY_ASIA, PERU_ANNUAL_TOTAL, PERU_ANNUAL_EUROPE, PERU_ANNUAL_USA, PERU_ANNUAL_ASIA, PERU_EUROPE_BY_COUNTRY, PERU_ASIA_BY_COUNTRY, PERU_HECTARES_HISTORY, PERU_REGIONS, PERU_2026_INSIGHTS, PERU_ARRIVALS_EUROPE, TRANSIT_WEEKS, TOP_EU_PORTS, TOP_PERU_EXPORTERS, TOP_SHIPPING_COMPANIES } from "./data";

// ─── ADMIN ────────────────────────────────────────────────────────────────────
const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL || "exoeurop@gmail.com";

// ─── TRADUCTIONS ──────────────────────────────────────────────────────────────
const T = {
  fr: {
    tabs:["💰 Prix calibres","📦 Volumes","🏢 Importateurs","📈 Prévisions","🇵🇪 Saison Pérou","🔮 Analyse IA","📋 Mon Stock","🧮 Calculateur"],
    origin:"Origine", week:"Semaine", size:"Calibre",
    realCif:"Prix CIF Europe réels", cifNote:"Cal. 14–24 = €/caisse 4kg · Cal. 26–32 = €/kg",
    col:{cal:"Cal.",weight:"Poids",min:"Min",max:"Max",trend:"Tendance",growth:"Croissance",importer:"Importateur"},
    kpi:[{label:"Offre EU S22",val:"19.2M kg",sub:"883 cnts · PIC atteint ✓"},{label:"CIRAD Cal.18 S22",val:"9.65€",sub:"↘ -3,0% vs S21"},{label:"Pérou S22 Europe",val:"~883 cnts",sub:"Pic d'arrivée confirmé"},{label:"Prix S22 Cal.18",val:"9.5–10.0€",sub:"CIF /caisse 4kg ↘"}],
    supplyTitle:"Disponibilité palta Hass Europe 2026 (M kg/semaine)",
    supplyNote:"Réel jusqu'à S22 · S23+ = projections",
    ciradTitle:"Prix référence CIRAD · Hass Cal.18 · €/caisse 4kg",
    ciradAlert:"↘ Tendance baissière confirmée · Pression offre croissante",
    blocks:[
      {title:"🟢 Calibres favorables",items:["Cal. 14-18 : demande ferme, offre limitée","Cal. 20 : rôle charnière, stable","Afrique du Sud : gros fruits disponibles"],color:"#16a34a"},
      {title:"🔴 Calibres sous pression",items:["Cal. 22-32 : 60-70% offre Pérou Sierra","Inventaires petits fruits s'accumulent","Colombia & Kenya : petits calibres dominant"],color:"#f87171"},
      {title:"📅 Semaine 20 : tournant Olmos",items:["Entrée zone Olmos Pérou : calibres ↑","Amélioration temporaire 2-3 semaines","Puis retour prédominance petits calibres"],color:"#f59e0b"},
      {title:"🌍 USA → impact Europe",items:["Mexique record : 1Md+ kg exportés","Pérou & Colombia redirigés vers EU","Pression offre Europe S19-22"],color:"#60a5fa"},
    ],
    importersTitle:"Top importateurs Pérou → Europe", importersSub:"Conteneurs réels saison 2026 (S19-S22)",
    impCumul:"📊 Cumul total", impCumulLabel:"Cumul S1-S22", impWeekLabel:"Containers", impSharePct:"Part %",
    portsTitle:"Top ports d'arrivée EU", portsSub:"Conteneurs cumulés saison 2026",
    exportersTitle:"Top exportateurs Pérou", exportersSub:"Conteneurs cumulés saison 2026",
    shippingTitle:"Compagnies maritimes", shippingSub:"Parts de marché Pérou → Europe",
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
    fcTitle:"Prévisions S20-S23", fcSub:"Basées sur saisonnalité, climat & tendances marché",
    fcStrategyTitle:"📅 Stratégie acheteur",
    fcFactorsTitle:"🌍 Facteurs marché",
    fcChartTitle:"Évolution prix prévue · Cal.18 (€/caisse 4kg)",
    fcSupplyTitle:"Volume offre EU prévu (M kg/sem)",
    fcTableTitle:"Tableau prévisionnel par calibre & origine",
    fcTrendBig:"Grands (14-18)", fcTrendMid:"Moyens (20-22)", fcTrendSml:"Petits (24-32)",
    fcImpactHigh:"Impact fort", fcImpactMid:"Impact moyen", fcImpactLow:"Impact faible",
    stockTitle:"📋 Mon Stock", stockSub:"Comparaison achats vs prix du marché",
    stockTotalQty:"Total caisses", stockTotalCost:"Valeur achat",
    stockTotalMarket:"Valeur marché", stockGain:"Plus-value",
    stockAddTitle:"Ajouter un achat", stockDate:"Date", stockOrigin:"Origine",
    stockCal:"Calibre", stockQty:"Qté caisses", stockPrice:"Prix payé €/caisse",
    stockBtnAdd:"+ Ajouter", stockBtnImport:"📂 Importer CSV/Excel",
    stockBtnExport:"📥 Exporter CSV", stockBtnClear:"🗑️ Tout effacer",
    stockColMarket:"Prix marché", stockColEcart:"Écart",
    stockEmpty:"Aucun achat enregistré. Ajoutez votre premier achat ci-dessus ou importez un fichier.",
    stockImportError:"Format invalide. Colonnes attendues : Date,Origine,Calibre,Qté,Prix",
    stockImportHelp:"Format : Date,Origine,Calibre,Qté,Prix (1 ligne d'en-tête)",
    stockConfirmClear:"Effacer tous les achats ? Cette action est irréversible.",
    stockGoodBuy:"🟢 Bon", stockOkBuy:"🟡 OK", stockBadBuy:"🔴 -",
    psTitle:"🇵🇪 Saison Pérou 2026", psSub:"Données agrégées · estimations marché",
    psInsightsTitle:"Indicateurs clés saison 2026",
    psWeeklyTitle:"Volumes hebdomadaires 2026 (TM)",
    psDestEurope:"Europe", psDestUSA:"USA", psDestAsia:"Asie", psDestTotal:"Total",
    psCountriesTitle:"Répartition par pays destinataire 2026",
    psRegionsTitle:"Régions productrices Pérou",
    psRegionsSub:"Hectares + producteurs + calendrier de récolte",
    psHectaresTitle:"Évolution hectares Pérou (2018-2025)",
    psPeak:"Pic récolte", psHa:"ha", psProducers:"producteurs",
    psYearTitle:"Évolution annuelle exports Pérou (TM)",
    psWorldHaTitle:"Hectares mondiales 2025 (top 10)",
    psWeekShort:"S", psMonthly:"Mensuel",
    psViewToggle:"Type de volumes :", psViewDeparture:"🚢 Départs Pérou", psViewArrival:"📦 Arrivées Europe",
    psTransitNote:"⏱️ Transit maritime moyen : 3 semaines (Callao → Rotterdam/Algeciras/Hamburg)",
    psViewArrivalDesc:"Volumes RÉELS qui arrivent en Europe = ce qui pèse sur les prix EU",
    psViewDepartureDesc:"Volumes au départ du Pérou = à venir en Europe dans 3 semaines",
    calcTitle:"🧮 Simulateur de rentabilité conteneur",
    calcSub:"Calculez votre prix de revient et marge avant d'acheter",
    calcConfig:"1️⃣ Configuration",
    calcFees:"2️⃣ Frais logistiques (modifiables)",
    calcSale:"3️⃣ Vente",
    calcResults:"📊 Résultats",
    calcPreset:"Préréglage régional",
    calcPresetES:"🇪🇸 Espagne", calcPresetFR:"🇫🇷 France", calcPresetNL:"🇳🇱 Pays-Bas", calcPresetCustom:"⚙️ Custom",
    calcOrigin:"Origine", calcCal:"Calibre", calcBoxes:"Nb caisses", calcCif:"Prix CIF (€/caisse)",
    calcPort:"Frais portuaires (€/caisse)", calcStorage:"Stockage frigo (€/caisse)",
    calcRipen:"Mûrissage (€/caisse)", calcTransport:"Transport entrepôt (€/caisse)",
    calcLoss:"Pertes/écarts (%)",
    calcSalePrice:"Prix vente cible (€/caisse)",
    calcCostTotal:"Coût achat total", calcFeesTotal:"Frais logistiques",
    calcLossTotal:"Pertes", calcBreakeven:"Prix de revient",
    calcBreakevenUnit:"Prix revient /caisse", calcRevenue:"Chiffre d'affaires",
    calcMargin:"MARGE BRUTE", calcMarketComp:"Comparaison prix marché S",
    calcVerdictGood:"🟢 ACHAT RENTABLE", calcVerdictOk:"🟡 RENTABLE MAIS JUSTE",
    calcVerdictBad:"🔴 MARGE FAIBLE", calcVerdictLoss:"⛔ PERTE PROBABLE",
    calcMarketLow:"sous le marché ✅", calcMarketAligned:"aligné marché", calcMarketHigh:"au-dessus marché ⚠️",
    calcResetSim:"🔄 Réinitialiser",
  },
  en: {
    tabs:["💰 Calibre prices","📦 Volumes","🏢 Importers","📈 Forecast","🇵🇪 Peru Season","🔮 AI Analysis","📋 My Stock","🧮 Calculator"],
    origin:"Origin", week:"Week", size:"Grade",
    realCif:"Real CIF Europe prices", cifNote:"Cal. 14–24 = €/4kg box · Cal. 26–32 = €/kg",
    col:{cal:"Grade",weight:"Weight",min:"Min",max:"Max",trend:"Trend",growth:"Growth",importer:"Importer"},
    kpi:[{label:"EU Supply W22",val:"19.2M kg",sub:"883 cnts · PEAK reached ✓"},{label:"CIRAD Cal.18 W22",val:"9.65€",sub:"↘ -3.0% vs W21"},{label:"Peru W22 Europe",val:"~883 cnts",sub:"Arrival peak confirmed"},{label:"Price W22 Cal.18",val:"9.5–10.0€",sub:"CIF /4kg box ↘"}],
    supplyTitle:"Hass avocado availability Europe 2026 (M kg/week)",
    supplyNote:"Actual up to W22 · W23+ = forecasts",
    ciradTitle:"CIRAD reference price · Hass Cal.18 · €/4kg box",
    ciradAlert:"↘ Confirmed downward trend · Growing supply pressure",
    blocks:[
      {title:"🟢 Favourable grades",items:["Cal. 14-18: firm demand, limited supply","Cal. 20: pivot grade, stable","South Africa: large fruit available"],color:"#16a34a"},
      {title:"🔴 Grades under pressure",items:["Cal. 22-32: 60-70% Peru Sierra supply","Small fruit inventory accumulating","Colombia & Kenya: small grades dominant"],color:"#f87171"},
      {title:"📅 Week 20: Olmos turning point",items:["Olmos Peru entry: grades ↑","Temporary improvement 2-3 weeks","Then back to small grade dominance"],color:"#f59e0b"},
      {title:"🌍 USA → Europe impact",items:["Mexico record: 1B+ kg exported","Peru & Colombia redirected to EU","EU supply pressure W19-22"],color:"#60a5fa"},
    ],
    importersTitle:"Top importers Peru → Europe", importersSub:"Real containers season 2026 (W19-W22)",
    impCumul:"📊 Total cumul.", impCumulLabel:"Cumul W1-W22", impWeekLabel:"Containers", impSharePct:"Share %",
    portsTitle:"Top EU arrival ports", portsSub:"Cumulative containers season 2026",
    exportersTitle:"Top Peru exporters", exportersSub:"Cumulative containers season 2026",
    shippingTitle:"Shipping companies", shippingSub:"Market share Peru → Europe",
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
    fcTitle:"Forecast W20-W23", fcSub:"Based on seasonality, climate & market trends",
    fcStrategyTitle:"📅 Buyer strategy",
    fcFactorsTitle:"🌍 Market factors",
    fcChartTitle:"Forecasted price evolution · Grade 18 (€/4kg box)",
    fcSupplyTitle:"Forecasted EU supply (M kg/week)",
    fcTableTitle:"Forecast table by grade & origin",
    fcTrendBig:"Large (14-18)", fcTrendMid:"Medium (20-22)", fcTrendSml:"Small (24-32)",
    fcImpactHigh:"High impact", fcImpactMid:"Medium impact", fcImpactLow:"Low impact",
    stockTitle:"📋 My Stock", stockSub:"Compare purchases vs market price",
    stockTotalQty:"Total boxes", stockTotalCost:"Purchase value",
    stockTotalMarket:"Market value", stockGain:"Gain/Loss",
    stockAddTitle:"Add purchase", stockDate:"Date", stockOrigin:"Origin",
    stockCal:"Grade", stockQty:"Boxes qty", stockPrice:"Paid €/box",
    stockBtnAdd:"+ Add", stockBtnImport:"📂 Import CSV/Excel",
    stockBtnExport:"📥 Export CSV", stockBtnClear:"🗑️ Clear all",
    stockColMarket:"Market price", stockColEcart:"Spread",
    stockEmpty:"No purchases recorded. Add your first purchase above or import a file.",
    stockImportError:"Invalid format. Expected columns: Date,Origin,Grade,Qty,Price",
    stockImportHelp:"Format: Date,Origin,Grade,Qty,Price (1 header row)",
    stockConfirmClear:"Clear all purchases? This action is irreversible.",
    stockGoodBuy:"🟢 Good", stockOkBuy:"🟡 OK", stockBadBuy:"🔴 -",
    psTitle:"🇵🇪 Peru Season 2026", psSub:"Aggregated data · market estimates",
    psInsightsTitle:"Key season 2026 indicators",
    psWeeklyTitle:"Weekly volumes 2026 (MT)",
    psDestEurope:"Europe", psDestUSA:"USA", psDestAsia:"Asia", psDestTotal:"Total",
    psCountriesTitle:"Distribution by destination country 2026",
    psRegionsTitle:"Peru producing regions",
    psRegionsSub:"Hectares + producers + harvest calendar",
    psHectaresTitle:"Peru hectares evolution (2018-2025)",
    psPeak:"Harvest peak", psHa:"ha", psProducers:"producers",
    psYearTitle:"Yearly Peru exports evolution (MT)",
    psWorldHaTitle:"World hectares 2025 (top 10)",
    psWeekShort:"W", psMonthly:"Monthly",
    psViewToggle:"Volume type:", psViewDeparture:"🚢 Peru departures", psViewArrival:"📦 Europe arrivals",
    psTransitNote:"⏱️ Average maritime transit: 3 weeks (Callao → Rotterdam/Algeciras/Hamburg)",
    psViewArrivalDesc:"Volumes ACTUALLY arriving in Europe = what really moves EU prices",
    psViewDepartureDesc:"Volumes leaving Peru = will arrive in Europe in 3 weeks",
    calcTitle:"🧮 Container profitability simulator",
    calcSub:"Calculate your cost price and margin before buying",
    calcConfig:"1️⃣ Configuration",
    calcFees:"2️⃣ Logistics costs (editable)",
    calcSale:"3️⃣ Sale",
    calcResults:"📊 Results",
    calcPreset:"Regional preset",
    calcPresetES:"🇪🇸 Spain", calcPresetFR:"🇫🇷 France", calcPresetNL:"🇳🇱 Netherlands", calcPresetCustom:"⚙️ Custom",
    calcOrigin:"Origin", calcCal:"Grade", calcBoxes:"# boxes", calcCif:"CIF Price (€/box)",
    calcPort:"Port fees (€/box)", calcStorage:"Cold storage (€/box)",
    calcRipen:"Ripening (€/box)", calcTransport:"Transport (€/box)",
    calcLoss:"Losses/shrinkage (%)",
    calcSalePrice:"Target sale price (€/box)",
    calcCostTotal:"Total purchase cost", calcFeesTotal:"Logistics costs",
    calcLossTotal:"Losses", calcBreakeven:"Break-even price",
    calcBreakevenUnit:"Break-even /box", calcRevenue:"Revenue",
    calcMargin:"GROSS MARGIN", calcMarketComp:"Market price comparison W",
    calcVerdictGood:"🟢 PROFITABLE BUY", calcVerdictOk:"🟡 PROFITABLE BUT TIGHT",
    calcVerdictBad:"🔴 LOW MARGIN", calcVerdictLoss:"⛔ LIKELY LOSS",
    calcMarketLow:"below market ✅", calcMarketAligned:"market aligned", calcMarketHigh:"above market ⚠️",
    calcResetSim:"🔄 Reset",
  },
  es: {
    tabs:["💰 Precios calibres","📦 Volúmenes","🏢 Importadores","📈 Previsiones","🇵🇪 Temporada Perú","🔮 Análisis IA","📋 Mi Stock","🧮 Calculadora"],
    origin:"Origen", week:"Semana", size:"Calibre",
    realCif:"Precios CIF Europa reales", cifNote:"Cal. 14–24 = €/caja 4kg · Cal. 26–32 = €/kg",
    col:{cal:"Cal.",weight:"Peso",min:"Mín",max:"Máx",trend:"Tendencia",growth:"Crecimiento",importer:"Importador"},
    kpi:[{label:"Oferta EU S22",val:"19.2M kg",sub:"883 cnts · PICO alcanzado ✓"},{label:"CIRAD Cal.18 S22",val:"9.65€",sub:"↘ -3,0% vs S21"},{label:"Perú S22 Europa",val:"~883 cnts",sub:"Pico de llegada confirmado"},{label:"Precio S22 Cal.18",val:"9.5–10.0€",sub:"CIF /caja 4kg ↘"}],
    supplyTitle:"Disponibilidad palta Hass Europa 2026 (M kg/semana)",
    supplyNote:"Real hasta S22 · S23+ = proyecciones",
    ciradTitle:"Precio referencia CIRAD · Hass Cal.18 · €/caja 4kg",
    ciradAlert:"↘ Tendencia bajista confirmada · Presión de oferta creciente",
    blocks:[
      {title:"🟢 Calibres favorables",items:["Cal. 14-18: demanda firme, oferta limitada","Cal. 20: calibre bisagra, estable","Sudáfrica: fruta grande disponible"],color:"#16a34a"},
      {title:"🔴 Calibres bajo presión",items:["Cal. 22-32: 60-70% oferta Perú Sierra","Inventarios fruta pequeña acumulándose","Colombia & Kenia: calibres pequeños dominan"],color:"#f87171"},
      {title:"📅 Semana 20: hito Olmos",items:["Entrada zona Olmos Perú: calibres ↑","Mejora temporal 2-3 semanas","Luego vuelta a predominio fruta pequeña"],color:"#f59e0b"},
      {title:"🌍 USA → impacto Europa",items:["México récord: +1.000M kg exportados","Perú & Colombia redirigidos a EU","Presión oferta Europa S19-22"],color:"#60a5fa"},
    ],
    importersTitle:"Top importadores Perú → Europa", importersSub:"Contenedores reales temporada 2026 (S19-S22)",
    impCumul:"📊 Acum. total", impCumulLabel:"Acum. S1-S22", impWeekLabel:"Contenedores", impSharePct:"Cuota %",
    portsTitle:"Top puertos llegada UE", portsSub:"Contenedores acumulados temporada 2026",
    exportersTitle:"Top exportadores Perú", exportersSub:"Contenedores acumulados temporada 2026",
    shippingTitle:"Compañías navieras", shippingSub:"Cuotas mercado Perú → Europa",
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
    fcTitle:"Previsiones S20-S23", fcSub:"Basadas en estacionalidad, clima y tendencias del mercado",
    fcStrategyTitle:"📅 Estrategia comprador",
    fcFactorsTitle:"🌍 Factores del mercado",
    fcChartTitle:"Evolución prevista de precios · Cal.18 (€/caja 4kg)",
    fcSupplyTitle:"Volumen previsto oferta UE (M kg/sem)",
    fcTableTitle:"Tabla previsional por calibre y origen",
    fcTrendBig:"Grandes (14-18)", fcTrendMid:"Medianos (20-22)", fcTrendSml:"Pequeños (24-32)",
    fcImpactHigh:"Impacto alto", fcImpactMid:"Impacto medio", fcImpactLow:"Impacto bajo",
    stockTitle:"📋 Mi Stock", stockSub:"Compara compras vs precio de mercado",
    stockTotalQty:"Total cajas", stockTotalCost:"Valor compra",
    stockTotalMarket:"Valor mercado", stockGain:"Ganancia/Pérdida",
    stockAddTitle:"Agregar compra", stockDate:"Fecha", stockOrigin:"Origen",
    stockCal:"Calibre", stockQty:"Cant. cajas", stockPrice:"Pagado €/caja",
    stockBtnAdd:"+ Agregar", stockBtnImport:"📂 Importar CSV/Excel",
    stockBtnExport:"📥 Exportar CSV", stockBtnClear:"🗑️ Borrar todo",
    stockColMarket:"Precio mercado", stockColEcart:"Diferencia",
    stockEmpty:"No hay compras registradas. Agregue su primera compra arriba o importe un archivo.",
    stockImportError:"Formato inválido. Columnas esperadas: Fecha,Origen,Calibre,Cant.,Precio",
    stockImportHelp:"Formato: Fecha,Origen,Calibre,Cant.,Precio (1 fila de encabezado)",
    stockConfirmClear:"¿Borrar todas las compras? Esta acción es irreversible.",
    stockGoodBuy:"🟢 Bueno", stockOkBuy:"🟡 OK", stockBadBuy:"🔴 -",
    psTitle:"🇵🇪 Temporada Perú 2026", psSub:"Datos agregados · estimaciones mercado",
    psInsightsTitle:"Indicadores clave temporada 2026",
    psWeeklyTitle:"Volúmenes semanales 2026 (TM)",
    psDestEurope:"Europa", psDestUSA:"EE.UU.", psDestAsia:"Asia", psDestTotal:"Total",
    psCountriesTitle:"Distribución por país destino 2026",
    psRegionsTitle:"Regiones productoras Perú",
    psRegionsSub:"Hectáreas + productores + calendario de cosecha",
    psHectaresTitle:"Evolución hectáreas Perú (2018-2025)",
    psPeak:"Pico cosecha", psHa:"ha", psProducers:"productores",
    psYearTitle:"Evolución anual exportaciones Perú (TM)",
    psWorldHaTitle:"Hectáreas mundiales 2025 (top 10)",
    psWeekShort:"S", psMonthly:"Mensual",
    psViewToggle:"Tipo de volúmenes:", psViewDeparture:"🚢 Salidas Perú", psViewArrival:"📦 Llegadas Europa",
    psTransitNote:"⏱️ Tránsito marítimo promedio: 3 semanas (Callao → Rotterdam/Algeciras/Hamburg)",
    psViewArrivalDesc:"Volúmenes que REALMENTE llegan a Europa = lo que afecta precios EU",
    psViewDepartureDesc:"Volúmenes saliendo de Perú = llegarán a Europa en 3 semanas",
    calcTitle:"🧮 Simulador de rentabilidad contenedor",
    calcSub:"Calcula tu precio de coste y margen antes de comprar",
    calcConfig:"1️⃣ Configuración",
    calcFees:"2️⃣ Costes logísticos (editables)",
    calcSale:"3️⃣ Venta",
    calcResults:"📊 Resultados",
    calcPreset:"Preajuste regional",
    calcPresetES:"🇪🇸 España", calcPresetFR:"🇫🇷 Francia", calcPresetNL:"🇳🇱 Países Bajos", calcPresetCustom:"⚙️ Custom",
    calcOrigin:"Origen", calcCal:"Calibre", calcBoxes:"N° cajas", calcCif:"Precio CIF (€/caja)",
    calcPort:"Tasas portuarias (€/caja)", calcStorage:"Almacén frigorífico (€/caja)",
    calcRipen:"Maduración (€/caja)", calcTransport:"Transporte (€/caja)",
    calcLoss:"Pérdidas/mermas (%)",
    calcSalePrice:"Precio venta objetivo (€/caja)",
    calcCostTotal:"Coste compra total", calcFeesTotal:"Costes logísticos",
    calcLossTotal:"Pérdidas", calcBreakeven:"Precio de coste",
    calcBreakevenUnit:"Coste /caja", calcRevenue:"Facturación",
    calcMargin:"MARGEN BRUTO", calcMarketComp:"Comparativa precio mercado S",
    calcVerdictGood:"🟢 COMPRA RENTABLE", calcVerdictOk:"🟡 RENTABLE PERO JUSTO",
    calcVerdictBad:"🔴 MARGEN BAJO", calcVerdictLoss:"⛔ PÉRDIDA PROBABLE",
    calcMarketLow:"bajo mercado ✅", calcMarketAligned:"alineado mercado", calcMarketHigh:"sobre mercado ⚠️",
    calcResetSim:"🔄 Reiniciar",
  },
};

const FLAG_MAP={NL:"🇳🇱",ES:"🇪🇸",DE:"🇩🇪",UK:"🇬🇧",BE:"🇧🇪",FR:"🇫🇷"};
const ORIGINS=Object.keys(ORIGIN_COLOR);
function getTrend(o,c){const p16=REAL_PRICES[16]?.[o]?.[c];const p18=REAL_PRICES[18]?.[o]?.[c];if(!p16||!p18)return"—";const d=((p18[0]+p18[1])/2)-((p16[0]+p16[1])/2);return d>0.3?"↗":d<-0.3?"↘":"=";}
function y2026Footnote(lang){return lang==="es"?"Proyección 2026 — Estimación interna":lang==="en"?"2026 projection — Internal estimate":"Projection 2026 — Estimation interne";}
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
  const[rates,setRates]=useState({USD:1.085, PEN:4.05, COP:4250, ZAR:19.8, BRL:5.55}); // Taux par défaut (mai 2026)
  const[ratesDate,setRatesDate]=useState("fallback");
  const[ratesStatus,setRatesStatus]=useState("fallback"); // "loading" | "ok" | "error" | "fallback"
  const[usdAmount,setUsdAmount]=useState(100); // montant USD pour conversion rapide
  const[aiText,setAiText]=useState("");
  const[aiLoading,setAiLoading]=useState(false);
  // ─── STOCK ─────────────────────────────────────────────────────────────
  const[stock,setStock]=useState(()=>{try{return JSON.parse(localStorage.getItem("hm_stock")||"[]");}catch{return[];}});
  const[stockForm,setStockForm]=useState({date:new Date().toISOString().slice(0,10),origin:"Peru",cal:18,qty:"",price:""});
  useEffect(()=>{localStorage.setItem("hm_stock",JSON.stringify(stock));},[stock]);
  const stockMarketPrice=(o,c)=>{
    const w=Math.max(...Object.keys(REAL_PRICES).map(Number));
    const p=REAL_PRICES[w]?.[o]?.[c];
    if(!p)return null;
    return (p[0]+p[1])/2; // moyenne min-max
  };
  const stockAddRow=()=>{
    if(!stockForm.qty||!stockForm.price)return;
    const r={...stockForm,qty:Number(stockForm.qty),price:Number(stockForm.price),id:Date.now()};
    setStock([r,...stock]);
    setStockForm({...stockForm,qty:"",price:""});
  };
  const stockDeleteRow=(id)=>setStock(stock.filter(r=>r.id!==id));
  const stockClearAll=()=>{if(window.confirm(t.stockConfirmClear))setStock([]);};
  const stockExport=()=>{
    const csv=["Date,Origine,Calibre,Quantité,Prix payé (€/caisse),Prix marché (€/caisse),Écart %"];
    stock.forEach(r=>{
      const m=stockMarketPrice(r.origin,r.cal);
      const ecart=m?(((m-r.price)/m)*100).toFixed(1):"";
      csv.push(`${r.date},${r.origin},${r.cal},${r.qty},${r.price.toFixed(2)},${m?m.toFixed(2):"N/A"},${ecart}`);
    });
    const blob=new Blob([csv.join("\n")],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;a.download=`stock_${new Date().toISOString().slice(0,10)}.csv`;a.click();
    URL.revokeObjectURL(url);
  };
  const stockImport=(file)=>{
    const reader=new FileReader();
    reader.onload=(e)=>{
      const text=e.target.result;
      const lines=text.split(/\r?\n/).filter(l=>l.trim());
      const rows=[];
      for(let i=1;i<lines.length;i++){ // skip header
        const cols=lines[i].split(/[,;\t]/);
        if(cols.length<5)continue;
        const r={
          date:cols[0].trim(),
          origin:cols[1].trim(),
          cal:Number(cols[2]),
          qty:Number(cols[3]),
          price:Number(cols[4]),
          id:Date.now()+i
        };
        if(r.qty&&r.price&&r.cal&&ORIGIN_FLAG[r.origin])rows.push(r);
      }
      if(rows.length)setStock([...rows,...stock]);
      else alert(t.stockImportError);
    };
    reader.readAsText(file);
  };
  const stockTotals=stock.reduce((acc,r)=>{
    const m=stockMarketPrice(r.origin,r.cal);
    acc.qty+=r.qty;
    acc.cost+=r.qty*r.price;
    if(m)acc.market+=r.qty*m;
    return acc;
  },{qty:0,cost:0,market:0});
  const stockGain=stockTotals.market-stockTotals.cost;
  const stockGainPct=stockTotals.cost>0?(stockGain/stockTotals.cost)*100:0;
  // ─── PERU SEASON : toggle départ / arrivée ──────────────────────────────
  const[psView,setPsView]=useState("arrival"); // "arrival" = défaut (le plus utile pour les acheteurs EU)
  // ─── IMPORTATEURS : toggle Cumul vs Semaine ─────────────────────────────
  const[impView,setImpView]=useState("week22"); // "cumul" | "week19" | "week20" | "week21" | "week22"
  // ─── CALCULATEUR DE RENTABILITÉ ─────────────────────────────────────────
  const CALC_PRESETS={
    "ES":{port:0.25,storage:0.10,ripen:0.35,transport:0.15,loss:3},
    "FR":{port:0.30,storage:0.15,ripen:0.40,transport:0.20,loss:3},
    "NL":{port:0.35,storage:0.20,ripen:0.45,transport:0.25,loss:3},
  };
  const[calcPreset,setCalcPreset]=useState("FR"); // "ES" | "FR" | "NL" | "CUSTOM"
  const[calc,setCalc]=useState(()=>{
    try{
      const saved=JSON.parse(localStorage.getItem("hm_calc")||"null");
      if(saved)return saved;
    }catch{}
    return {
      origin:"Peru", cal:18, boxes:5280, cif:11.50, salePrice:15.50,
      port:0.30, storage:0.15, ripen:0.40, transport:0.20, loss:3,
    };
  });
  useEffect(()=>{localStorage.setItem("hm_calc",JSON.stringify(calc));},[calc]);
  const applyCalcPreset=(p)=>{
    setCalcPreset(p);
    if(p!=="CUSTOM"&&CALC_PRESETS[p]){
      setCalc({...calc,...CALC_PRESETS[p]});
    }
  };
  const updateCalc=(field,val)=>{
    setCalc({...calc,[field]:val});
    setCalcPreset("CUSTOM"); // dès qu'on modifie, on passe en custom
  };
  // Calculs dérivés (en temps réel)
  const calcCostTotal=calc.boxes*calc.cif;
  const calcFeesPerBox=calc.port+calc.storage+calc.ripen+calc.transport;
  const calcFeesTotal=calc.boxes*calcFeesPerBox;
  const calcLossBoxes=calc.boxes*(calc.loss/100);
  const calcLossValue=calcLossBoxes*(calc.cif+calcFeesPerBox);
  const calcBreakeven=calcCostTotal+calcFeesTotal+calcLossValue;
  const calcSellableBoxes=calc.boxes-calcLossBoxes;
  const calcBreakevenUnit=calcSellableBoxes>0?calcBreakeven/calcSellableBoxes:0;
  const calcRevenue=calcSellableBoxes*calc.salePrice;
  const calcMargin=calcRevenue-calcBreakeven;
  const calcMarginPct=calcBreakeven>0?(calcMargin/calcBreakeven)*100:0;
  // Comparaison marché
  const calcMarketPrice=(()=>{
    const w=LATEST_WEEK;
    const p=REAL_PRICES[w]?.[calc.origin]?.[calc.cal];
    if(!p)return null;
    return (p[0]+p[1])/2;
  })();
  const calcMarketDiff=calcMarketPrice?((calc.cif-calcMarketPrice)/calcMarketPrice*100):null;
  // Verdict — utilise une clé statique, le label sera traduit dans le JSX
  const calcVerdict=(()=>{
    if(calcMarginPct<0)return {key:"loss",color:"#dc2626",bg:"#fee2e2",border:"#f87171"};
    if(calcMarginPct<5)return {key:"bad",color:"#dc2626",bg:"#fee2e2",border:"#f87171"};
    if(calcMarginPct<15)return {key:"ok",color:"#ca8a04",bg:"#fef3c7",border:"#fbbf24"};
    return {key:"good",color:"#15803d",bg:"#dcfce7",border:"#4ade80"};
  })();
  const resetCalc=()=>{
    setCalc({
      origin:"Peru", cal:18, boxes:5280, cif:11.50, salePrice:15.50,
      port:0.30, storage:0.15, ripen:0.40, transport:0.20, loss:3,
    });
    setCalcPreset("FR");
  };
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
    try{
      // Timeout de 5 sec pour ne pas bloquer si l'API ne répond pas
      const controller=new AbortController();
      const timeoutId=setTimeout(()=>controller.abort(),5000);
      const r=await fetch("https://api.frankfurter.dev/v2/rates?base=EUR&quotes=USD,PEN,COP,ZAR,BRL",{signal:controller.signal});
      clearTimeout(timeoutId);
      if(!r.ok)throw new Error("API error");
      const d=await r.json();
      if(d.rates&&d.rates.USD){
        setRates(d.rates);
        setRatesDate(d.date);
        setRatesStatus("ok");
      }else{
        setRatesStatus("fallback"); // garde les valeurs par défaut
      }
    }catch{
      setRatesStatus("fallback"); // API bloquée ou hors-ligne, on garde les valeurs par défaut
    }
  },[]);
  useEffect(()=>{fetchRates();},[fetchRates]);

  const getAI=async()=>{
    setAiLoading(true);setAiText("");
    const history=allWeeks.map(w=>{const p=REAL_PRICES[w]?.[origin]?.[cal];return p?`W${w}:${p[0]}–${p[1]}`:`W${w}:N/A`;}).join(" | ");
    const prompt=`Hass avocado Europe expert. 4 sentences (${lang==="fr"?"French":lang==="es"?"Spanish":"English"}), concrete buying advice:\nOrigin:${t.origins[origin]}|Grade:${cal}|Week:${week}\nPrices:${history}\nCIRAD W22=9.65€↘ EU supply W22=19.2Mkg (883 cnts - PEAK reached)\nContext:${ctx?.note}|${ctx?.season}\nGrades:large ${ctx?.big} medium ${ctx?.medium} small ${ctx?.small}`;
    try{const r=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt})});const d=await r.json();setAiText(d.text||"N/A");}
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
              <div style={{background:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:8,padding:"6px 10px",fontSize:10,minWidth:180}}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}>
                  <span style={{fontSize:12}}>💱</span>
                  <span style={{color:ratesStatus==="ok"?"#15803d":"#92400e",fontWeight:700,fontSize:10}}>USD → EUR</span>
                  <span style={{color:"#9ca3af",fontSize:9,marginLeft:"auto"}}>
                    {ratesStatus==="ok"?ratesDate:ratesStatus==="loading"?"…":"≈"}
                  </span>
                  <button onClick={fetchRates} style={{background:"none",border:"none",color:"#4b5563",cursor:"pointer",fontSize:12,padding:0,marginLeft:2}} title="Actualiser">↻</button>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={usdAmount}
                    onChange={e=>setUsdAmount(Number(e.target.value)||0)}
                    style={{width:60,padding:"3px 6px",borderRadius:5,border:"1px solid #dee2e6",fontSize:11,fontFamily:"'Space Mono',monospace",textAlign:"right",fontWeight:700,color:"#1e40af",background:"#eff6ff"}}
                  />
                  <span style={{fontSize:11,color:"#6b7280",fontWeight:700}}>$ =</span>
                  <span style={{fontSize:13,fontFamily:"'Space Mono',monospace",fontWeight:700,color:"#15803d"}}>
                    {(usdAmount/rates.USD).toFixed(2)} €
                  </span>
                </div>
                <div style={{color:"#6b7280",fontSize:9,marginTop:3,fontFamily:"'Space Mono',monospace"}}>
                  1€={rates.USD.toFixed(4)}$ · 1$={(1/rates.USD).toFixed(4)}€
                </div>
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
            <div style={{display:"grid",gridTemplateColumns:"80px 140px 140px 110px",padding:"7px 14px",background:"#ffffff",borderBottom:"1px solid #dee2e6"}}>
              {[t.col.cal,t.col.min,t.col.max,t.col.trend].map(h=><div key={h} style={{fontSize:10,color:"#374151",textTransform:"uppercase",letterSpacing:"0.06em"}}>{h}</div>)}
            </div>
            {CALIBRES_LIST.map((c,i)=>{const p=REAL_PRICES[week]?.[origin]?.[c];const tr=getTrend(origin,c);const isSel=cal===c;const isKg=c>=26;return(
              <div key={c} onClick={()=>setCal(c)} style={{display:"grid",gridTemplateColumns:"80px 140px 140px 110px",padding:"10px 14px",cursor:"pointer",background:isSel?`${cfg.color}12`:i%2===0?"#f8f9fa":"#f1f3f5",borderLeft:isSel?`3px solid ${cfg.color}`:"3px solid transparent",borderBottom:i<CALIBRES_LIST.length-1?"1px solid #dee2e6":"none"}}>
                <div style={{fontFamily:"'Space Mono',monospace",fontWeight:700,color:cfg.color,fontSize:14,display:"flex",alignItems:"center",gap:4}}>{c}{isSel&&<span style={{fontSize:7,background:cfg.color,color:"#000",borderRadius:3,padding:"1px 3px"}}>●</span>}</div>
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

        {tab===2&&(<div>
          {/* TOP IMPORTATEURS — Vraies données S19-S22 avec TOGGLE */}
          <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",overflow:"hidden",marginBottom:14}}>
            <div style={{padding:"10px 14px",borderBottom:"1px solid #dee2e6"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6,marginBottom:10}}>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:"#16a34a"}}>🏢 {t.importersTitle}</div>
                  <div style={{fontSize:10,color:"#6b7280",marginTop:2}}>{t.importersSub}</div>
                </div>
              </div>
              {/* TOGGLE Cumul / S19 / S20 / S21 / S22 */}
              <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                {[
                  {key:"cumul",label:t.impCumul,color:"#16a34a"},
                  {key:"week19",label:"S19",color:"#6b7280"},
                  {key:"week20",label:"S20",color:"#6b7280"},
                  {key:"week21",label:"S21",color:"#6b7280"},
                  {key:"week22",label:"S22",color:"#16a34a"},
                ].map(o=>(
                  <button key={o.key} onClick={()=>setImpView(o.key)} style={{padding:"5px 12px",borderRadius:6,background:impView===o.key?o.color:"#ffffff",color:impView===o.key?"white":"#6b7280",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",border:`1px solid ${impView===o.key?o.color:"#dee2e6"}`}}>{o.label}</button>
                ))}
              </div>
            </div>
            {(()=>{
              // Récupère la valeur affichée selon la vue sélectionnée
              const getVal=(imp)=>{
                if(impView==="cumul")return imp.cumul;
                if(impView==="week19")return imp.w19||0;
                if(impView==="week20")return imp.w20||0;
                if(impView==="week21")return imp.w21||0;
                if(impView==="week22")return imp.w22||0;
                return 0;
              };
              const sorted=[...TOP_IMPORTERS].sort((a,b)=>getVal(b)-getVal(a));
              const maxVal=getVal(sorted[0])||1;
              return(<>
                <div style={{display:"grid",gridTemplateColumns:"28px 1fr 36px 80px 70px",padding:"7px 14px",background:"#ffffff",borderBottom:"1px solid #dee2e6",fontSize:10,color:"#374151",textTransform:"uppercase",letterSpacing:"0.05em"}}>
                  <div>#</div>
                  <div>{t.col.importer}</div>
                  <div>🌍</div>
                  <div style={{textAlign:"right"}}>{impView==="cumul"?t.impCumulLabel:t.impWeekLabel}</div>
                  <div style={{textAlign:"right"}}>{t.impSharePct}</div>
                </div>
                {sorted.map((imp,i)=>{
                  const val=getVal(imp);
                  const barW=(val/maxVal)*100;
                  const totalAll=sorted.reduce((s,x)=>s+getVal(x),0);
                  const pct=totalAll>0?(val/totalAll*100):0;
                  return(
                    <div key={imp.name} style={{display:"grid",gridTemplateColumns:"28px 1fr 36px 80px 70px",padding:"10px 14px",position:"relative",background:i%2===0?"#f8f9fa":"#f1f3f5",borderBottom:i<sorted.length-1?"1px solid #dee2e6":"none"}}>
                      <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${barW*0.4}%`,background:"#4ade8008",pointerEvents:"none"}}/>
                      <div style={{fontSize:11,color:"#374151",fontFamily:"'Space Mono',monospace",display:"flex",alignItems:"center"}}>#{i+1}</div>
                      <div style={{fontSize:11,color:"#065f46",display:"flex",alignItems:"center",fontWeight:i<3?700:400}}>{imp.name}</div>
                      <div style={{fontSize:14,display:"flex",alignItems:"center"}}>{FLAG_MAP[imp.country]||"🌍"}</div>
                      <div style={{fontFamily:"'Space Mono',monospace",fontSize:13,color:i<3?"#16a34a":"#374151",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>{val}</div>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}><span style={{fontSize:11,fontFamily:"'Space Mono',monospace",fontWeight:700,color:"#6b7280"}}>{pct.toFixed(1)}%</span></div>
                    </div>
                  );
                })}
              </>);
            })()}
          </div>

          {/* 3 CARTES : PORTS + EXPORTATEURS + COMPAGNIES */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:12}}>
            
            {/* TOP PORTS D'ARRIVÉE */}
            <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",overflow:"hidden"}}>
              <div style={{padding:"10px 14px",borderBottom:"1px solid #dee2e6",background:"#ffffff"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#1e40af"}}>🚢 {t.portsTitle}</div>
                <div style={{fontSize:10,color:"#6b7280",marginTop:2}}>{t.portsSub}</div>
              </div>
              {TOP_EU_PORTS.map((p,i)=>{
                const barW=(p.containers/TOP_EU_PORTS[0].containers)*100;
                return(
                  <div key={p.port} style={{padding:"8px 14px",display:"flex",alignItems:"center",gap:8,borderBottom:i<TOP_EU_PORTS.length-1?"1px solid #f3f4f6":"none"}}>
                    <span style={{fontSize:14}}>{p.flag}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:11,fontWeight:700,color:"#374151",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.port}</div>
                      <div style={{height:5,background:"#e5e7eb",borderRadius:3,marginTop:3,overflow:"hidden"}}>
                        <div style={{width:`${barW}%`,height:"100%",background:"#1e40af"}}></div>
                      </div>
                    </div>
                    <div style={{textAlign:"right",fontFamily:"'Space Mono',monospace",fontSize:10}}>
                      <div style={{fontWeight:700,color:"#1e40af"}}>{p.containers}</div>
                      <div style={{color:"#9ca3af"}}>{p.pct}%</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TOP EXPORTATEURS PÉROU */}
            <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",overflow:"hidden"}}>
              <div style={{padding:"10px 14px",borderBottom:"1px solid #dee2e6",background:"#ffffff"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#15803d"}}>🇵🇪 {t.exportersTitle}</div>
                <div style={{fontSize:10,color:"#6b7280",marginTop:2}}>{t.exportersSub}</div>
              </div>
              {TOP_PERU_EXPORTERS.map((e,i)=>{
                const barW=(e.containers/TOP_PERU_EXPORTERS[0].containers)*100;
                return(
                  <div key={e.name} style={{padding:"8px 14px",display:"flex",alignItems:"center",gap:8,borderBottom:i<TOP_PERU_EXPORTERS.length-1?"1px solid #f3f4f6":"none"}}>
                    <span style={{fontSize:10,color:"#9ca3af",fontFamily:"'Space Mono',monospace",fontWeight:700,minWidth:18}}>#{i+1}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:11,fontWeight:600,color:"#374151",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{e.name}</div>
                      <div style={{height:5,background:"#e5e7eb",borderRadius:3,marginTop:3,overflow:"hidden"}}>
                        <div style={{width:`${barW}%`,height:"100%",background:"#16a34a"}}></div>
                      </div>
                    </div>
                    <div style={{textAlign:"right",fontFamily:"'Space Mono',monospace",fontSize:10}}>
                      <div style={{fontWeight:700,color:"#15803d"}}>{e.containers}</div>
                      <div style={{color:"#9ca3af"}}>{e.share}%</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TOP COMPAGNIES MARITIMES */}
            <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",overflow:"hidden"}}>
              <div style={{padding:"10px 14px",borderBottom:"1px solid #dee2e6",background:"#ffffff"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#92400e"}}>⚓ {t.shippingTitle}</div>
                <div style={{fontSize:10,color:"#6b7280",marginTop:2}}>{t.shippingSub}</div>
              </div>
              {TOP_SHIPPING_COMPANIES.map((s,i)=>{
                const barW=(s.containers/TOP_SHIPPING_COMPANIES[0].containers)*100;
                return(
                  <div key={s.name} style={{padding:"8px 14px",borderBottom:i<TOP_SHIPPING_COMPANIES.length-1?"1px solid #f3f4f6":"none"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:11,fontWeight:700,color:"#374151"}}>{s.name}</div>
                      </div>
                      <div style={{textAlign:"right",fontFamily:"'Space Mono',monospace",fontSize:10}}>
                        <div style={{fontWeight:700,color:"#92400e"}}>{s.containers}</div>
                        <div style={{color:"#9ca3af"}}>{s.pct}%</div>
                      </div>
                    </div>
                    <div style={{height:5,background:"#e5e7eb",borderRadius:3,marginTop:4,overflow:"hidden"}}>
                      <div style={{width:`${barW}%`,height:"100%",background:"#f59e0b"}}></div>
                    </div>
                    <div style={{fontSize:9,color:"#9ca3af",marginTop:3,fontStyle:"italic"}}>⏱️ {s.transit}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>)}

        {tab===3&&(<div>
          {/* En-tête prévisions */}
          <div style={{background:"linear-gradient(135deg,#fef3c7,#fde68a)",borderRadius:14,border:"1px solid #f59e0b40",padding:14,marginBottom:12}}>
            <div style={{fontSize:14,fontWeight:700,color:"#92400e",marginBottom:4}}>📈 {t.fcTitle}</div>
            <div style={{fontSize:11,color:"#78350f"}}>{t.fcSub}</div>
          </div>

          {/* BANDEAU INFO TRANSIT */}
          <div style={{background:"#dbeafe",borderRadius:10,border:"1px solid #60a5fa",padding:"8px 12px",marginBottom:12,fontSize:11,color:"#1e40af",lineHeight:1.5}}>
            ⏱️ <b>{t.psTransitNote.replace("⏱️ ","")}</b><br/>
            {t.psViewArrivalDesc}
          </div>

          {/* Stratégie acheteur — Carte par semaine */}
          <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",padding:14,marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,color:"#374151",marginBottom:10}}>{t.fcStrategyTitle}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10}}>
              {FORECAST_WEEKS.map(w=>{const s=FORECAST_STRATEGY[w];const tr=FORECAST_TREND[w];return(
                <div key={w} style={{background:"#ffffff",borderRadius:10,padding:12,border:`2px solid ${s.color}40`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <div style={{fontSize:14,fontWeight:700,color:"#374151"}}>S{w}</div>
                    <div style={{fontSize:11,fontWeight:700,color:s.color,padding:"3px 8px",borderRadius:6,background:s.color+"15"}}>{s.label}</div>
                  </div>
                  <div style={{fontSize:11,color:"#4b5563",lineHeight:1.5,marginBottom:8}}>{s.reason}</div>
                  <div style={{display:"flex",gap:6,fontSize:10,color:"#6b7280"}}>
                    <span>{t.fcTrendBig}: <b style={{color:trendColor(tr.big),fontSize:13}}>{tr.big}</b></span>
                    <span>{t.fcTrendMid}: <b style={{color:trendColor(tr.medium),fontSize:13}}>{tr.medium}</b></span>
                    <span>{t.fcTrendSml}: <b style={{color:trendColor(tr.small),fontSize:13}}>{tr.small}</b></span>
                  </div>
                  <div style={{fontSize:10,color:"#6b7280",marginTop:6,fontStyle:"italic"}}>{tr.note}</div>
                </div>);})}
            </div>
          </div>

          {/* Graphique évolution prix Cal.18 (réel + prévision) */}
          <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",padding:14,marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,color:"#374151",marginBottom:12}}>{t.fcChartTitle}</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:6,height:160,paddingBottom:24,borderBottom:"1px solid #dee2e6",position:"relative"}}>
              {[...REAL_WEEKS,...FORECAST_WEEKS].map(w=>{
                const isReal=REAL_WEEKS.includes(w);
                const p=isReal?REAL_PRICES[w]?.["Peru"]?.[18]:FORECAST_PRICES[w]?.["Peru"]?.[18];
                if(!p)return null;
                const avg=(p[0]+p[1])/2;
                const h=Math.max(8,(avg/14)*140);
                return(<div key={w} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative"}}>
                  <div style={{fontSize:9,fontFamily:"'Space Mono',monospace",color:isReal?"#16a34a":"#f59e0b",fontWeight:700,marginBottom:3}}>{avg.toFixed(1)}€</div>
                  <div style={{width:"80%",height:h,background:isReal?"linear-gradient(180deg,#4ade80,#16a34a)":"linear-gradient(180deg,#fbbf24,#f59e0b)",borderRadius:"4px 4px 0 0",border:isReal?"none":"1px dashed #92400e"}}></div>
                  <div style={{fontSize:10,color:"#4b5563",fontFamily:"'Space Mono',monospace",position:"absolute",bottom:-20}}>S{w}</div>
                </div>);
              })}
            </div>
            <div style={{display:"flex",gap:14,marginTop:8,fontSize:10,color:"#4b5563",justifyContent:"center"}}>
              <span><span style={{display:"inline-block",width:10,height:10,background:"#16a34a",borderRadius:2,marginRight:4,verticalAlign:"middle"}}></span>{t.real}</span>
              <span><span style={{display:"inline-block",width:10,height:10,background:"#f59e0b",borderRadius:2,marginRight:4,verticalAlign:"middle"}}></span>{t.proj}</span>
            </div>
          </div>

          {/* Volume offre EU */}
          <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",padding:14,marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,color:"#374151",marginBottom:12}}>{t.fcSupplyTitle}</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:8,height:120,paddingBottom:24,borderBottom:"1px solid #dee2e6",position:"relative"}}>
              {Object.entries({...WEEKLY_SUPPLY_EU,...FORECAST_SUPPLY}).filter(([w])=>w>=14&&w<=23).map(([w,v])=>{
                const wi=parseInt(w);const isReal=wi<=LATEST_WEEK;const h=Math.max(8,(v/30)*100);
                return(<div key={w} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative"}}>
                  <div style={{fontSize:9,fontFamily:"'Space Mono',monospace",color:isReal?"#3b82f6":"#f59e0b",fontWeight:700,marginBottom:3}}>{v}M</div>
                  <div style={{width:"80%",height:h,background:isReal?"linear-gradient(180deg,#60a5fa,#3b82f6)":"linear-gradient(180deg,#fbbf24,#f59e0b)",borderRadius:"4px 4px 0 0"}}></div>
                  <div style={{fontSize:10,color:"#4b5563",fontFamily:"'Space Mono',monospace",position:"absolute",bottom:-20}}>S{w}</div>
                </div>);
              })}
            </div>
          </div>

          {/* Tableau prévisionnel */}
          <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",padding:14,marginBottom:12,overflowX:"auto"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#374151",marginBottom:10}}>{t.fcTableTitle}</div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:"#fff",borderBottom:"2px solid #dee2e6"}}>
                <th style={{padding:"8px 10px",textAlign:"left",color:"#4b5563",fontWeight:700}}>{t.col.cal}</th>
                {FORECAST_WEEKS.flatMap(w=>ORIGINS.filter(o=>o!=="Spain").map(o=>(
                  <th key={`${w}-${o}`} style={{padding:"8px 6px",textAlign:"center",color:ORIGIN_COLOR[o],fontWeight:700,fontSize:10}}>S{w}<br/>{ORIGIN_FLAG[o]}</th>
                )))}
              </tr></thead>
              <tbody>
                {CALIBRES_LIST.map(c=>(
                  <tr key={c} style={{borderBottom:"1px solid #f1f5f9"}}>
                    <td style={{padding:"6px 10px",fontWeight:700,color:"#374151",fontFamily:"'Space Mono',monospace"}}>{c}</td>
                    {FORECAST_WEEKS.flatMap(w=>ORIGINS.filter(o=>o!=="Spain").map(o=>{
                      const p=FORECAST_PRICES[w]?.[o]?.[c];
                      return(<td key={`${w}-${o}-${c}`} style={{padding:"6px 4px",textAlign:"center",fontFamily:"'Space Mono',monospace",fontSize:11,color:p?"#16a34a":"#cbd5e1"}}>
                        {p?<span><b>{p[0]}</b>-<b>{p[1]}</b></span>:"—"}
                      </td>);
                    }))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{fontSize:10,color:"#6b7280",marginTop:8,fontStyle:"italic"}}>{t.cifNote}</div>
          </div>

          {/* Facteurs marché */}
          <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",padding:14}}>
            <div style={{fontSize:13,fontWeight:700,color:"#374151",marginBottom:10}}>{t.fcFactorsTitle}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:8}}>
              {FORECAST_FACTORS.map((f,i)=>{const c=f.weight==="high"?"#f87171":f.weight==="medium"?"#fbbf24":"#4ade80";const lbl=f.weight==="high"?t.fcImpactHigh:f.weight==="medium"?t.fcImpactMid:t.fcImpactLow;return(
                <div key={i} style={{background:"#ffffff",borderRadius:10,padding:10,border:`1px solid ${c}40`,borderLeft:`3px solid ${c}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                    <span style={{fontSize:18}}>{f.icon}</span>
                    <span style={{fontSize:12,fontWeight:700,color:"#374151",flex:1}}>{f.label}</span>
                  </div>
                  <div style={{fontSize:10,color:"#4b5563",lineHeight:1.5,marginBottom:6}}>{f.impact}</div>
                  <div style={{fontSize:9,fontWeight:700,color:c,textTransform:"uppercase"}}>{lbl}</div>
                </div>);})}
            </div>
          </div>
        </div>)}

        {tab===4&&(<div>
          {/* HEADER */}
          <div style={{marginBottom:14}}>
            <div style={{fontSize:16,fontWeight:700,color:"#374151"}}>{t.psTitle}</div>
            <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>{t.psSub}</div>
          </div>

          {/* INSIGHTS KEY METRICS */}
          <div style={{marginBottom:18}}>
            <div style={{fontSize:11,fontWeight:700,color:"#374151",textTransform:"uppercase",marginBottom:8}}>{t.psInsightsTitle}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:10}}>
              {PERU_2026_INSIGHTS.map((ins,i)=>(
                <div key={i} style={{background:"#f0fdf4",borderRadius:12,border:"1px solid #4ade80",padding:"12px 14px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                    <span style={{fontSize:18}}>{ins.icon}</span>
                    <span style={{fontSize:10,color:"#166534",fontWeight:600,textTransform:"uppercase"}}>{ins.title}</span>
                  </div>
                  <div style={{fontSize:18,fontWeight:800,color:"#15803d",fontFamily:"'Space Mono',monospace"}}>{ins.value}</div>
                  <div style={{fontSize:10,color:"#166534",marginTop:4,lineHeight:1.4}}>{ins.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* WEEKLY VOLUMES CHART avec TOGGLE DÉPART/ARRIVÉE */}
          <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",padding:14,marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:10}}>
              <div style={{fontSize:11,fontWeight:700,color:"#374151",textTransform:"uppercase"}}>{t.psWeeklyTitle}</div>
              <div style={{display:"inline-flex",background:"#ffffff",border:"1px solid #dee2e6",borderRadius:8,padding:3}}>
                <button onClick={()=>setPsView("arrival")} style={{padding:"5px 10px",borderRadius:6,border:"none",background:psView==="arrival"?"#16a34a":"transparent",color:psView==="arrival"?"white":"#6b7280",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{t.psViewArrival}</button>
                <button onClick={()=>setPsView("departure")} style={{padding:"5px 10px",borderRadius:6,border:"none",background:psView==="departure"?"#f59e0b":"transparent",color:psView==="departure"?"white":"#6b7280",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{t.psViewDeparture}</button>
              </div>
            </div>
            <div style={{fontSize:10,color:"#6b7280",marginBottom:10,fontStyle:"italic"}}>{psView==="arrival"?t.psViewArrivalDesc:t.psViewDepartureDesc}</div>
            <div style={{fontSize:9,color:"#9ca3af",marginBottom:10}}>{t.psTransitNote}</div>
            <div style={{display:"flex",gap:8,marginBottom:10,fontSize:10,flexWrap:"wrap"}}>
              {psView==="departure"?(<>
                <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:10,height:10,background:"#16a34a",borderRadius:2,display:"inline-block"}}></span>{t.psDestEurope}</span>
                <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:10,height:10,background:"#f59e0b",borderRadius:2,display:"inline-block"}}></span>{t.psDestUSA}</span>
                <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:10,height:10,background:"#dc2626",borderRadius:2,display:"inline-block"}}></span>{t.psDestAsia}</span>
              </>):(
                <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:10,height:10,background:"#16a34a",borderRadius:2,display:"inline-block"}}></span>📦 {t.psDestEurope}</span>
              )}
            </div>
            <div style={{display:"flex",alignItems:"flex-end",gap:2,height:160,padding:"0 4px",overflowX:"auto"}}>
              {[14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38].map(w=>{
                const max=psView==="departure"?40000:25000;
                const isCurrent=w===LATEST_WEEK;
                if(psView==="departure"){
                  const eu=PERU_WEEKLY_EUROPE[w]||0;
                  const us=PERU_WEEKLY_USA[w]||0;
                  const as=PERU_WEEKLY_ASIA[w]||0;
                  const tot=eu+us+as;
                  return(
                    <div key={w} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,minWidth:24}}>
                      <div style={{fontSize:8,color:"#6b7280",fontFamily:"'Space Mono',monospace"}}>{Math.round(tot/1000)}k</div>
                      <div style={{display:"flex",flexDirection:"column-reverse",width:18,height:120,justifyContent:"flex-start"}}>
                        <div style={{height:`${(eu/max)*120}px`,background:"#16a34a",width:"100%"}} title={`Europe: ${eu} TM`}></div>
                        <div style={{height:`${(us/max)*120}px`,background:"#f59e0b",width:"100%"}} title={`USA: ${us} TM`}></div>
                        <div style={{height:`${(as/max)*120}px`,background:"#dc2626",width:"100%"}} title={`Asia: ${as} TM`}></div>
                      </div>
                      <div style={{fontSize:9,color:isCurrent?"#f59e0b":"#6b7280",fontWeight:isCurrent?700:400,fontFamily:"'Space Mono',monospace"}}>{t.psWeekShort}{w}</div>
                    </div>
                  );
                } else {
                  // ARRIVÉE EU
                  const arr=PERU_ARRIVALS_EUROPE[w]||0;
                  return(
                    <div key={w} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,minWidth:24}}>
                      <div style={{fontSize:8,color:arr>20000?"#dc2626":"#6b7280",fontFamily:"'Space Mono',monospace",fontWeight:arr>20000?700:400}}>{Math.round(arr/1000)}k</div>
                      <div style={{display:"flex",flexDirection:"column-reverse",width:18,height:120,justifyContent:"flex-start"}}>
                        <div style={{height:`${(arr/max)*120}px`,background:arr>20000?"#dc2626":"#16a34a",width:"100%"}} title={`Arrivée EU: ${arr} TM (départ S${w-TRANSIT_WEEKS})`}></div>
                      </div>
                      <div style={{fontSize:9,color:isCurrent?"#16a34a":"#6b7280",fontWeight:isCurrent?700:400,fontFamily:"'Space Mono',monospace"}}>{t.psWeekShort}{w}</div>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          {/* COUNTRIES BREAKDOWN */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:12,marginBottom:14}}>
            <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",padding:14}}>
              <div style={{fontSize:11,fontWeight:700,color:"#374151",textTransform:"uppercase",marginBottom:10}}>🇪🇺 {t.psDestEurope} 2026</div>
              {PERU_EUROPE_BY_COUNTRY.map((c,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0",fontSize:11}}>
                  <span style={{minWidth:120,color:"#374151"}}>{c.flag} {c.country}</span>
                  <div style={{flex:1,height:8,background:"#e5e7eb",borderRadius:4,overflow:"hidden"}}>
                    <div style={{width:`${c.pct*2}%`,height:"100%",background:"#16a34a"}}></div>
                  </div>
                  <span style={{minWidth:50,textAlign:"right",fontFamily:"'Space Mono',monospace",fontWeight:700,color:"#15803d"}}>{c.pct}%</span>
                  <span style={{minWidth:40,textAlign:"right",fontSize:10,fontFamily:"'Space Mono',monospace",color:c.evol>0?"#16a34a":"#dc2626",fontWeight:700}}>{c.evol>0?"+":""}{c.evol}%</span>
                </div>
              ))}
            </div>

            <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",padding:14}}>
              <div style={{fontSize:11,fontWeight:700,color:"#374151",textTransform:"uppercase",marginBottom:10}}>🌏 {t.psDestAsia} 2026</div>
              {PERU_ASIA_BY_COUNTRY.map((c,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0",fontSize:11}}>
                  <span style={{minWidth:120,color:"#374151"}}>{c.flag} {c.country}</span>
                  <div style={{flex:1,height:8,background:"#e5e7eb",borderRadius:4,overflow:"hidden"}}>
                    <div style={{width:`${Math.min(c.pct*2,100)}%`,height:"100%",background:"#dc2626"}}></div>
                  </div>
                  <span style={{minWidth:50,textAlign:"right",fontFamily:"'Space Mono',monospace",fontWeight:700,color:"#dc2626"}}>{c.pct}%</span>
                  <span style={{minWidth:40,textAlign:"right",fontSize:10,fontFamily:"'Space Mono',monospace",color:c.evol>0?"#16a34a":"#dc2626",fontWeight:700}}>{c.evol>0?"+":""}{c.evol}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* PERU REGIONS TABLE */}
          <div style={{background:"#ffffff",borderRadius:14,border:"1px solid #dee2e6",padding:14,marginBottom:14,overflow:"auto"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#374151",textTransform:"uppercase",marginBottom:4}}>{t.psRegionsTitle}</div>
            <div style={{fontSize:10,color:"#6b7280",marginBottom:10}}>{t.psRegionsSub}</div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:600}}>
              <thead>
                <tr style={{borderBottom:"2px solid #dee2e6"}}>
                  <th style={{padding:"8px 6px",textAlign:"left",fontSize:9,color:"#6b7280",textTransform:"uppercase",fontWeight:600}}>Region</th>
                  <th style={{padding:"8px 6px",textAlign:"right",fontSize:9,color:"#6b7280",textTransform:"uppercase",fontWeight:600}}>{t.psHa}</th>
                  <th style={{padding:"8px 6px",textAlign:"right",fontSize:9,color:"#6b7280",textTransform:"uppercase",fontWeight:600}}>{t.psProducers}</th>
                  <th style={{padding:"8px 6px",textAlign:"center",fontSize:9,color:"#6b7280",textTransform:"uppercase",fontWeight:600}}>F M A M J J A S</th>
                  <th style={{padding:"8px 6px",textAlign:"left",fontSize:9,color:"#6b7280",textTransform:"uppercase",fontWeight:600}}>{t.psPeak}</th>
                </tr>
              </thead>
              <tbody>
                {PERU_REGIONS.map((r,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                    <td style={{padding:"7px 6px",fontWeight:700,color:"#374151"}}>{r.name}<div style={{fontSize:9,color:"#9ca3af",fontWeight:400}}>{r.note}</div></td>
                    <td style={{padding:"7px 6px",textAlign:"right",fontFamily:"'Space Mono',monospace",color:"#15803d",fontWeight:700}}>{r.ha.toLocaleString()}</td>
                    <td style={{padding:"7px 6px",textAlign:"right",fontFamily:"'Space Mono',monospace",color:"#374151"}}>{r.producers.toLocaleString()}</td>
                    <td style={{padding:"7px 6px",textAlign:"center"}}>
                      <div style={{display:"inline-flex",gap:1}}>
                        {[2,3,4,5,6,7,8,9].map(m=>(
                          <span key={m} style={{width:12,height:12,borderRadius:2,background:r.harvestMonths.includes(m)?"#16a34a":"#e5e7eb",display:"inline-block"}}></span>
                        ))}
                      </div>
                    </td>
                    <td style={{padding:"7px 6px",fontSize:10,color:"#16a34a",fontWeight:600}}>{r.peak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* HECTARES EVOLUTION */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:12,marginBottom:14}}>
            <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",padding:14}}>
              <div style={{fontSize:11,fontWeight:700,color:"#374151",textTransform:"uppercase",marginBottom:10}}>{t.psHectaresTitle}</div>
              {Object.entries(PERU_HECTARES_HISTORY).map(([y,h])=>{
                const max=85000;
                return(
                  <div key={y} style={{display:"flex",alignItems:"center",gap:8,padding:"3px 0",fontSize:11}}>
                    <span style={{minWidth:40,color:"#6b7280",fontFamily:"'Space Mono',monospace"}}>{y}</span>
                    <div style={{flex:1,height:14,background:"#e5e7eb",borderRadius:3,overflow:"hidden"}}>
                      <div style={{width:`${(h/max)*100}%`,height:"100%",background:"linear-gradient(90deg,#16a34a,#15803d)"}}></div>
                    </div>
                    <span style={{minWidth:60,textAlign:"right",fontFamily:"'Space Mono',monospace",fontWeight:700,color:"#15803d"}}>{h.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            <div style={{background:"#f8f9fa",borderRadius:14,border:"1px solid #dee2e6",padding:14}}>
              <div style={{fontSize:11,fontWeight:700,color:"#374151",textTransform:"uppercase",marginBottom:10}}>{t.psYearTitle}</div>
              {Object.keys(PERU_ANNUAL_TOTAL).map(y=>{
                const tot=PERU_ANNUAL_TOTAL[y];
                const eu=PERU_ANNUAL_EUROPE[y]||0;
                const us=PERU_ANNUAL_USA[y]||0;
                const as=PERU_ANNUAL_ASIA[y]||0;
                const max=800000;
                const isProj=y==="2026";
                return(
                  <div key={y} style={{padding:"3px 0",fontSize:11}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                      <span style={{minWidth:50,color:"#6b7280",fontFamily:"'Space Mono',monospace"}}>{y}{isProj?"*":""}</span>
                      <span style={{flex:1,fontFamily:"'Space Mono',monospace",fontWeight:700,color:"#15803d",fontSize:12}}>{tot.toLocaleString()} TM</span>
                    </div>
                    <div style={{display:"flex",height:8,borderRadius:3,overflow:"hidden",background:"#e5e7eb"}}>
                      <div style={{width:`${(eu/max)*100}%`,background:"#16a34a"}} title={`EU: ${eu}`}></div>
                      <div style={{width:`${(us/max)*100}%`,background:"#f59e0b"}} title={`USA: ${us}`}></div>
                      <div style={{width:`${(as/max)*100}%`,background:"#dc2626"}} title={`Asia: ${as}`}></div>
                    </div>
                  </div>
                );
              })}
              <div style={{fontSize:9,color:"#9ca3af",marginTop:8,fontStyle:"italic"}}>* {y2026Footnote(lang)}</div>
            </div>
          </div>

        </div>)}

        {tab===5&&(<div>
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

        {tab===6&&(<div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:12}}>
            <div>
              <div style={{fontSize:16,fontWeight:700,color:"#374151"}}>{t.stockTitle}</div>
              <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>{t.stockSub}</div>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <label style={{padding:"7px 12px",borderRadius:8,border:"1px solid #4ade80",background:"#f0fdf4",color:"#16a34a",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                {t.stockBtnImport}
                <input type="file" accept=".csv,.tsv,.txt" onChange={(e)=>{if(e.target.files[0])stockImport(e.target.files[0]);e.target.value="";}} style={{display:"none"}}/>
              </label>
              {stock.length>0&&<button onClick={stockExport} style={{padding:"7px 12px",borderRadius:8,border:"1px solid #60a5fa",background:"#eff6ff",color:"#2563eb",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{t.stockBtnExport}</button>}
              {stock.length>0&&<button onClick={stockClearAll} style={{padding:"7px 12px",borderRadius:8,border:"1px solid #f87171",background:"#fef2f2",color:"#dc2626",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{t.stockBtnClear}</button>}
            </div>
          </div>

          {stock.length>0&&(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:14}}>
              <div style={{background:"#f8f9fa",borderRadius:12,border:"1px solid #dee2e6",padding:"12px 14px"}}>
                <div style={{fontSize:10,color:"#6b7280",textTransform:"uppercase",fontWeight:600}}>{t.stockTotalQty}</div>
                <div style={{fontSize:20,fontWeight:700,color:"#374151",fontFamily:"'Space Mono',monospace",marginTop:4}}>{stockTotals.qty}</div>
              </div>
              <div style={{background:"#fef3c7",borderRadius:12,border:"1px solid #fbbf24",padding:"12px 14px"}}>
                <div style={{fontSize:10,color:"#92400e",textTransform:"uppercase",fontWeight:600}}>{t.stockTotalCost}</div>
                <div style={{fontSize:20,fontWeight:700,color:"#92400e",fontFamily:"'Space Mono',monospace",marginTop:4}}>{stockTotals.cost.toFixed(0)}€</div>
              </div>
              <div style={{background:"#dbeafe",borderRadius:12,border:"1px solid #60a5fa",padding:"12px 14px"}}>
                <div style={{fontSize:10,color:"#1e40af",textTransform:"uppercase",fontWeight:600}}>{t.stockTotalMarket}</div>
                <div style={{fontSize:20,fontWeight:700,color:"#1e40af",fontFamily:"'Space Mono',monospace",marginTop:4}}>{stockTotals.market.toFixed(0)}€</div>
              </div>
              <div style={{background:stockGain>=0?"#dcfce7":"#fee2e2",borderRadius:12,border:`1px solid ${stockGain>=0?"#4ade80":"#f87171"}`,padding:"12px 14px"}}>
                <div style={{fontSize:10,color:stockGain>=0?"#166534":"#991b1b",textTransform:"uppercase",fontWeight:600}}>{t.stockGain}</div>
                <div style={{fontSize:20,fontWeight:700,color:stockGain>=0?"#166534":"#991b1b",fontFamily:"'Space Mono',monospace",marginTop:4}}>{stockGain>=0?"+":""}{stockGain.toFixed(0)}€</div>
                <div style={{fontSize:10,color:stockGain>=0?"#166534":"#991b1b",fontWeight:600,marginTop:2}}>{stockGain>=0?"+":""}{stockGainPct.toFixed(1)}%</div>
              </div>
            </div>
          )}

          <div style={{background:"#f8f9fa",borderRadius:12,border:"1px solid #dee2e6",padding:14,marginBottom:14}}>
            <div style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:10}}>{t.stockAddTitle}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:8}}>
              <div>
                <div style={{fontSize:10,color:"#6b7280",marginBottom:4,fontWeight:600}}>{t.stockDate}</div>
                <input type="date" value={stockForm.date} onChange={e=>setStockForm({...stockForm,date:e.target.value})} style={{width:"100%",padding:"7px 9px",borderRadius:6,border:"1px solid #dee2e6",fontSize:12,fontFamily:"inherit",boxSizing:"border-box"}}/>
              </div>
              <div>
                <div style={{fontSize:10,color:"#6b7280",marginBottom:4,fontWeight:600}}>{t.stockOrigin}</div>
                <select value={stockForm.origin} onChange={e=>setStockForm({...stockForm,origin:e.target.value})} style={{width:"100%",padding:"7px 9px",borderRadius:6,border:"1px solid #dee2e6",fontSize:12,fontFamily:"inherit",boxSizing:"border-box",background:"white"}}>
                  {ORIGINS.map(o=><option key={o} value={o}>{ORIGIN_FLAG[o]} {t.origins[o]}</option>)}
                </select>
              </div>
              <div>
                <div style={{fontSize:10,color:"#6b7280",marginBottom:4,fontWeight:600}}>{t.stockCal}</div>
                <select value={stockForm.cal} onChange={e=>setStockForm({...stockForm,cal:Number(e.target.value)})} style={{width:"100%",padding:"7px 9px",borderRadius:6,border:"1px solid #dee2e6",fontSize:12,fontFamily:"inherit",boxSizing:"border-box",background:"white"}}>
                  {CALIBRES_LIST.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <div style={{fontSize:10,color:"#6b7280",marginBottom:4,fontWeight:600}}>{t.stockQty}</div>
                <input type="number" min="1" placeholder="100" value={stockForm.qty} onChange={e=>setStockForm({...stockForm,qty:e.target.value})} style={{width:"100%",padding:"7px 9px",borderRadius:6,border:"1px solid #dee2e6",fontSize:12,fontFamily:"inherit",boxSizing:"border-box"}}/>
              </div>
              <div>
                <div style={{fontSize:10,color:"#6b7280",marginBottom:4,fontWeight:600}}>{t.stockPrice}</div>
                <input type="number" step="0.01" min="0" placeholder="11.50" value={stockForm.price} onChange={e=>setStockForm({...stockForm,price:e.target.value})} style={{width:"100%",padding:"7px 9px",borderRadius:6,border:"1px solid #dee2e6",fontSize:12,fontFamily:"inherit",boxSizing:"border-box"}}/>
              </div>
              <div style={{display:"flex",alignItems:"flex-end"}}>
                <button onClick={stockAddRow} disabled={!stockForm.qty||!stockForm.price} style={{width:"100%",padding:"7px 10px",borderRadius:6,border:"none",background:(!stockForm.qty||!stockForm.price)?"#dee2e6":"linear-gradient(135deg,#16a34a,#15803d)",color:(!stockForm.qty||!stockForm.price)?"#9ca3af":"white",fontSize:12,fontWeight:700,cursor:(!stockForm.qty||!stockForm.price)?"not-allowed":"pointer",fontFamily:"inherit"}}>{t.stockBtnAdd}</button>
              </div>
            </div>
            <div style={{fontSize:10,color:"#9ca3af",marginTop:8,fontStyle:"italic"}}>💡 {t.stockImportHelp}</div>
          </div>

          {stock.length===0?(
            <div style={{background:"#f9fafb",borderRadius:12,border:"2px dashed #dee2e6",padding:"40px 20px",textAlign:"center"}}>
              <div style={{fontSize:36,marginBottom:8}}>📋</div>
              <div style={{fontSize:13,color:"#6b7280"}}>{t.stockEmpty}</div>
            </div>
          ):(
            <div style={{background:"#ffffff",borderRadius:12,border:"1px solid #dee2e6",overflow:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead style={{background:"#f8f9fa",borderBottom:"2px solid #dee2e6"}}>
                  <tr>
                    <th style={{padding:"10px 12px",textAlign:"left",fontSize:10,color:"#6b7280",textTransform:"uppercase",fontWeight:600}}>{t.stockDate}</th>
                    <th style={{padding:"10px 12px",textAlign:"left",fontSize:10,color:"#6b7280",textTransform:"uppercase",fontWeight:600}}>{t.stockOrigin}</th>
                    <th style={{padding:"10px 12px",textAlign:"center",fontSize:10,color:"#6b7280",textTransform:"uppercase",fontWeight:600}}>{t.stockCal}</th>
                    <th style={{padding:"10px 12px",textAlign:"center",fontSize:10,color:"#6b7280",textTransform:"uppercase",fontWeight:600}}>{t.stockQty}</th>
                    <th style={{padding:"10px 12px",textAlign:"right",fontSize:10,color:"#6b7280",textTransform:"uppercase",fontWeight:600}}>{t.stockPrice}</th>
                    <th style={{padding:"10px 12px",textAlign:"right",fontSize:10,color:"#6b7280",textTransform:"uppercase",fontWeight:600}}>{t.stockColMarket}</th>
                    <th style={{padding:"10px 12px",textAlign:"center",fontSize:10,color:"#6b7280",textTransform:"uppercase",fontWeight:600}}>{t.stockColEcart}</th>
                    <th style={{padding:"10px 12px",textAlign:"center",fontSize:10,color:"#6b7280",textTransform:"uppercase",fontWeight:600}}></th>
                  </tr>
                </thead>
                <tbody>
                  {stock.map(r=>{
                    const m=stockMarketPrice(r.origin,r.cal);
                    const isKg=r.cal>=26;
                    const ecart=m?(((m-r.price)/m)*100):null;
                    const status=ecart===null?{lbl:"—",col:"#9ca3af"}:ecart>=5?{lbl:t.stockGoodBuy,col:"#16a34a"}:ecart<=-5?{lbl:t.stockBadBuy,col:"#dc2626"}:{lbl:t.stockOkBuy,col:"#ca8a04"};
                    return(
                      <tr key={r.id} style={{borderBottom:"1px solid #f3f4f6"}}>
                        <td style={{padding:"10px 12px",color:"#374151",fontFamily:"'Space Mono',monospace"}}>{r.date}</td>
                        <td style={{padding:"10px 12px",color:"#374151"}}>{ORIGIN_FLAG[r.origin]} {t.origins[r.origin]}</td>
                        <td style={{padding:"10px 12px",textAlign:"center",fontWeight:700,color:"#374151",fontFamily:"'Space Mono',monospace"}}>{r.cal}</td>
                        <td style={{padding:"10px 12px",textAlign:"center",color:"#374151",fontFamily:"'Space Mono',monospace"}}>{r.qty}</td>
                        <td style={{padding:"10px 12px",textAlign:"right",color:"#92400e",fontWeight:700,fontFamily:"'Space Mono',monospace"}}>{r.price.toFixed(2)}€{isKg?"/kg":""}</td>
                        <td style={{padding:"10px 12px",textAlign:"right",color:"#1e40af",fontWeight:700,fontFamily:"'Space Mono',monospace"}}>{m?`${m.toFixed(2)}€${isKg?"/kg":""}`:"—"}</td>
                        <td style={{padding:"10px 12px",textAlign:"center",fontFamily:"'Space Mono',monospace",fontWeight:700,color:status.col}}>
                          {ecart!==null?`${ecart>0?"+":""}${ecart.toFixed(1)}%`:"—"}
                          <div style={{fontSize:9,fontWeight:600,marginTop:2}}>{status.lbl}</div>
                        </td>
                        <td style={{padding:"10px 12px",textAlign:"center"}}>
                          <button onClick={()=>stockDeleteRow(r.id)} style={{background:"transparent",border:"none",color:"#dc2626",fontSize:14,cursor:"pointer",padding:4}} title="Supprimer">✕</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>)}

        {tab===7&&(<div>
          {/* HEADER */}
          <div style={{marginBottom:14}}>
            <div style={{fontSize:16,fontWeight:700,color:"#374151"}}>{t.calcTitle}</div>
            <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>{t.calcSub}</div>
          </div>

          {/* PRESETS RÉGIONAUX */}
          <div style={{background:"#f8f9fa",borderRadius:12,border:"1px solid #dee2e6",padding:14,marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:"#374151",textTransform:"uppercase",marginBottom:8}}>{t.calcPreset}</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {[
                {key:"ES",label:t.calcPresetES},
                {key:"FR",label:t.calcPresetFR},
                {key:"NL",label:t.calcPresetNL},
                {key:"CUSTOM",label:t.calcPresetCustom},
              ].map(p=>(
                <button key={p.key} onClick={()=>applyCalcPreset(p.key)} style={{padding:"7px 14px",borderRadius:8,background:calcPreset===p.key?"#16a34a":"#ffffff",color:calcPreset===p.key?"white":"#6b7280",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",border:`1px solid ${calcPreset===p.key?"#16a34a":"#dee2e6"}`}}>{p.label}</button>
              ))}
            </div>
          </div>

          {/* CONFIGURATION + RÉSULTATS GRID */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:14,marginBottom:14}}>

            {/* COLONNE GAUCHE — INPUTS */}
            <div>
              {/* SECTION CONFIG */}
              <div style={{background:"#ffffff",borderRadius:12,border:"1px solid #dee2e6",padding:14,marginBottom:12}}>
                <div style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:10}}>{t.calcConfig}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <div>
                    <div style={{fontSize:10,color:"#6b7280",marginBottom:4,fontWeight:600}}>{t.calcOrigin}</div>
                    <select value={calc.origin} onChange={e=>updateCalc("origin",e.target.value)} style={{width:"100%",padding:"7px 9px",borderRadius:6,border:"1px solid #dee2e6",fontSize:12,fontFamily:"inherit",boxSizing:"border-box",background:"white"}}>
                      {ORIGINS.map(o=><option key={o} value={o}>{ORIGIN_FLAG[o]} {t.origins[o]}</option>)}
                    </select>
                  </div>
                  <div>
                    <div style={{fontSize:10,color:"#6b7280",marginBottom:4,fontWeight:600}}>{t.calcCal}</div>
                    <select value={calc.cal} onChange={e=>updateCalc("cal",Number(e.target.value))} style={{width:"100%",padding:"7px 9px",borderRadius:6,border:"1px solid #dee2e6",fontSize:12,fontFamily:"inherit",boxSizing:"border-box",background:"white"}}>
                      {CALIBRES_LIST.map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <div style={{fontSize:10,color:"#6b7280",marginBottom:4,fontWeight:600}}>{t.calcBoxes}</div>
                    <input type="number" min="1" value={calc.boxes} onChange={e=>updateCalc("boxes",Number(e.target.value))} style={{width:"100%",padding:"7px 9px",borderRadius:6,border:"1px solid #dee2e6",fontSize:12,fontFamily:"inherit",boxSizing:"border-box"}}/>
                  </div>
                  <div>
                    <div style={{fontSize:10,color:"#6b7280",marginBottom:4,fontWeight:600}}>{t.calcCif}</div>
                    <input type="number" step="0.10" min="0" value={calc.cif} onChange={e=>updateCalc("cif",Number(e.target.value))} style={{width:"100%",padding:"7px 9px",borderRadius:6,border:"1px solid #dee2e6",fontSize:12,fontFamily:"inherit",boxSizing:"border-box",background:"#fef3c7"}}/>
                  </div>
                </div>
                {calcMarketPrice&&(
                  <div style={{marginTop:8,padding:8,background:"#dbeafe",borderRadius:6,fontSize:10,color:"#1e40af"}}>
                    💡 {t.calcMarketCif||"CIF marché S"}{LATEST_WEEK}: <b>{calcMarketPrice.toFixed(2)}€</b>
                    {calcMarketDiff!==null&&(
                      <span style={{marginLeft:6,fontWeight:700,color:calcMarketDiff<-2?"#16a34a":calcMarketDiff>2?"#dc2626":"#92400e"}}>
                        ({calcMarketDiff>0?"+":""}{calcMarketDiff.toFixed(1)}% {calcMarketDiff<-2?t.calcMarketLow:calcMarketDiff>2?t.calcMarketHigh:t.calcMarketAligned})
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* SECTION FRAIS */}
              <div style={{background:"#ffffff",borderRadius:12,border:"1px solid #dee2e6",padding:14,marginBottom:12}}>
                <div style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:10}}>{t.calcFees}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {[
                    {field:"port",label:t.calcPort,step:0.05},
                    {field:"storage",label:t.calcStorage,step:0.05},
                    {field:"ripen",label:t.calcRipen,step:0.05},
                    {field:"transport",label:t.calcTransport,step:0.05},
                    {field:"loss",label:t.calcLoss,step:0.5},
                  ].map(f=>(
                    <div key={f.field}>
                      <div style={{fontSize:10,color:"#6b7280",marginBottom:4,fontWeight:600}}>{f.label}</div>
                      <input type="number" step={f.step} min="0" value={calc[f.field]} onChange={e=>updateCalc(f.field,Number(e.target.value))} style={{width:"100%",padding:"7px 9px",borderRadius:6,border:"1px solid #dee2e6",fontSize:12,fontFamily:"inherit",boxSizing:"border-box"}}/>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION VENTE */}
              <div style={{background:"#ffffff",borderRadius:12,border:"1px solid #dee2e6",padding:14}}>
                <div style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:10}}>{t.calcSale}</div>
                <div>
                  <div style={{fontSize:10,color:"#6b7280",marginBottom:4,fontWeight:600}}>{t.calcSalePrice}</div>
                  <input type="number" step="0.10" min="0" value={calc.salePrice} onChange={e=>updateCalc("salePrice",Number(e.target.value))} style={{width:"100%",padding:"7px 9px",borderRadius:6,border:"1px solid #16a34a",fontSize:13,fontFamily:"inherit",boxSizing:"border-box",background:"#f0fdf4",fontWeight:700,color:"#15803d"}}/>
                </div>
                <button onClick={resetCalc} style={{marginTop:10,width:"100%",padding:"7px 12px",borderRadius:6,border:"1px solid #dee2e6",background:"#f8f9fa",color:"#6b7280",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{t.calcResetSim}</button>
              </div>
            </div>

            {/* COLONNE DROITE — RÉSULTATS */}
            <div>
              <div style={{background:"linear-gradient(145deg,#f8f9fa,#ffffff)",borderRadius:14,border:"1px solid #dee2e6",padding:18,marginBottom:12}}>
                <div style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:14,textTransform:"uppercase"}}>{t.calcResults}</div>
                
                {/* Détail coûts */}
                <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
                    <span style={{color:"#6b7280"}}>{t.calcCostTotal}</span>
                    <span style={{fontFamily:"'Space Mono',monospace",fontWeight:600,color:"#374151"}}>{calcCostTotal.toFixed(0)} €</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
                    <span style={{color:"#6b7280"}}>+ {t.calcFeesTotal}</span>
                    <span style={{fontFamily:"'Space Mono',monospace",fontWeight:600,color:"#374151"}}>{calcFeesTotal.toFixed(0)} €</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
                    <span style={{color:"#6b7280"}}>+ {t.calcLossTotal} ({calc.loss}%)</span>
                    <span style={{fontFamily:"'Space Mono',monospace",fontWeight:600,color:"#dc2626"}}>{calcLossValue.toFixed(0)} €</span>
                  </div>
                  <div style={{borderTop:"1px solid #dee2e6",paddingTop:8,display:"flex",justifyContent:"space-between",fontSize:13}}>
                    <span style={{color:"#374151",fontWeight:700}}>{t.calcBreakeven}</span>
                    <span style={{fontFamily:"'Space Mono',monospace",fontWeight:700,color:"#92400e"}}>{calcBreakeven.toFixed(0)} €</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:11}}>
                    <span style={{color:"#9ca3af"}}>{t.calcBreakevenUnit}</span>
                    <span style={{fontFamily:"'Space Mono',monospace",fontWeight:600,color:"#92400e"}}>{calcBreakevenUnit.toFixed(2)} €</span>
                  </div>
                </div>

                {/* Chiffre d'affaires */}
                <div style={{background:"#f0fdf4",borderRadius:8,padding:12,marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
                    <span style={{color:"#15803d",fontWeight:600}}>{t.calcRevenue}</span>
                    <span style={{fontFamily:"'Space Mono',monospace",fontWeight:700,color:"#15803d"}}>{calcRevenue.toFixed(0)} €</span>
                  </div>
                  <div style={{fontSize:10,color:"#16a34a",marginTop:3}}>{calcSellableBoxes.toFixed(0)} {t.calcBoxes.toLowerCase()} × {calc.salePrice.toFixed(2)}€</div>
                </div>

                {/* MARGE BRUTE */}
                <div style={{background:calcVerdict.bg,borderRadius:10,border:`2px solid ${calcVerdict.border}`,padding:14,textAlign:"center"}}>
                  <div style={{fontSize:10,color:calcVerdict.color,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{t.calcMargin}</div>
                  <div style={{fontSize:26,fontWeight:800,color:calcVerdict.color,fontFamily:"'Space Mono',monospace",lineHeight:1}}>
                    {calcMargin>=0?"+":""}{calcMargin.toFixed(0)} €
                  </div>
                  <div style={{fontSize:13,fontWeight:700,color:calcVerdict.color,marginTop:4}}>
                    {calcMargin>=0?"+":""}{calcMarginPct.toFixed(1)}%
                  </div>
                  <div style={{fontSize:11,color:calcVerdict.color,fontWeight:700,marginTop:8}}>{calcVerdict.key==="loss"?t.calcVerdictLoss:calcVerdict.key==="bad"?t.calcVerdictBad:calcVerdict.key==="ok"?t.calcVerdictOk:t.calcVerdictGood}</div>
                </div>
              </div>
            </div>
          </div>
        </div>)}

        <LegalFooter lang={lang} />
        <VersionChecker lang={lang} />
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
