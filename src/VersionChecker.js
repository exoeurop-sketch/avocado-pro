// VersionChecker.js — Détection automatique de nouvelle version
// Vérifie /version.json toutes les 5 minutes
// Affiche un bandeau "Nouvelle version disponible" avec bouton refresh

import React, { useState, useEffect, useRef } from "react";

const TXT = {
  fr: {
    title: "🔄 Nouvelle version disponible",
    desc: "Une mise à jour de HassMarket Pro est prête. Rafraîchissez pour profiter des derniers prix.",
    btn: "Mettre à jour",
    later: "Plus tard",
  },
  en: {
    title: "🔄 New version available",
    desc: "An update of HassMarket Pro is ready. Refresh to access the latest prices.",
    btn: "Update now",
    later: "Later",
  },
  es: {
    title: "🔄 Nueva versión disponible",
    desc: "Hay una actualización lista de HassMarket Pro. Actualiza para acceder a los últimos precios.",
    btn: "Actualizar",
    later: "Más tarde",
  },
};

// Récupère le hash de version au démarrage de l'app (initiale)
const INITIAL_VERSION = window.__APP_VERSION__ || "initial";

export default function VersionChecker({ lang = "fr" }) {
  const t = TXT[lang] || TXT.fr;
  const [hasUpdate, setHasUpdate] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const currentVersionRef = useRef(INITIAL_VERSION);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Vérifie la version au démarrage et toutes les 5 minutes
    const checkVersion = async () => {
      try {
        // Cache-busting : ajoute un timestamp unique à l'URL
        const res = await fetch(`/version.json?t=${Date.now()}`, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        if (!res.ok) return;
        const data = await res.json();
        const newVersion = data.version || data.build || data.hash;
        if (!newVersion) return;

        // Premier appel : enregistre la version actuelle
        if (currentVersionRef.current === "initial") {
          currentVersionRef.current = newVersion;
          return;
        }

        // Si la version a changé, déclencher la notification
        if (newVersion !== currentVersionRef.current) {
          setHasUpdate(true);
        }
      } catch (e) {
        // Silence les erreurs réseau (offline, etc.)
      }
    };

    // Premier check après 30 secondes (laisse le temps à l'app de charger)
    const firstCheck = setTimeout(checkVersion, 30000);

    // Puis toutes les 5 minutes
    intervalRef.current = setInterval(checkVersion, 5 * 60 * 1000);

    // Check aussi quand l'onglet redevient visible (économie batterie)
    const onVisibilityChange = () => {
      if (!document.hidden) checkVersion();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearTimeout(firstCheck);
      clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const handleRefresh = () => {
    // Force le rechargement complet (bypass cache)
    if ("caches" in window) {
      // Vide tous les caches Service Worker éventuels
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }
    window.location.reload(true);
  };

  const handleDismiss = () => {
    setDismissed(true);
    // Reset après 30 min : si pas mis à jour, on relance la notif
    setTimeout(() => setDismissed(false), 30 * 60 * 1000);
  };

  if (!hasUpdate || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        maxWidth: 380,
        zIndex: 10000,
        background: "linear-gradient(135deg, #16a34a, #15803d)",
        color: "white",
        borderRadius: 14,
        padding: "16px 20px",
        boxShadow: "0 10px 40px rgba(22,163,74,0.4)",
        animation: "slideIn 0.4s ease-out",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>
        {t.title}
      </div>
      <div style={{ fontSize: 12, opacity: 0.95, marginBottom: 12, lineHeight: 1.5 }}>
        {t.desc}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={handleRefresh}
          style={{
            flex: 1,
            padding: "8px 14px",
            background: "white",
            color: "#15803d",
            border: "none",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {t.btn}
        </button>
        <button
          onClick={handleDismiss}
          style={{
            padding: "8px 14px",
            background: "rgba(255,255,255,0.2)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {t.later}
        </button>
      </div>
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
