// Legal.js — Documents légaux HassMarket Pro (CGV, Confidentialité, Mentions légales)
// Spain - Autónomo - Yannick NUBLAT

import React, { useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION ENTREPRISE
// ═══════════════════════════════════════════════════════════════════════════
const COMPANY = {
  name: "Yannick NUBLAT",
  status: "Autónomo (España)",
  nie: "Y4305575N",
  vat: "ESY4305575N",
  address: "Paseo San Cristóbal, n° 18",
  postalCode: "18690",
  city: "Almuñécar",
  province: "Granada",
  country: "España",
  email: "exoeurop@gmail.com",
  domain: "avocado-pro.pages.dev",
  serviceName: "HassMarket Pro",
};

// ═══════════════════════════════════════════════════════════════════════════
// TEXTES LÉGAUX FR / EN / ES
// ═══════════════════════════════════════════════════════════════════════════
const LEGAL = {
  fr: {
    footerCopyright: `© ${new Date().getFullYear()} ${COMPANY.serviceName} — Tous droits réservés`,
    footerLinks: { cgv: "CGV", privacy: "Confidentialité", legal: "Mentions légales", contact: "Contact" },
    close: "Fermer",
    cgvTitle: "Conditions Générales de Vente",
    cgvContent: `1. OBJET ET CHAMP D'APPLICATION

Les présentes Conditions Générales de Vente (« CGV ») régissent l'accès et l'utilisation du service ${COMPANY.serviceName} (le « Service »), édité par ${COMPANY.name}, ${COMPANY.status}, NIE ${COMPANY.nie}, dont le siège est situé ${COMPANY.address}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.country}.

Le Service est destiné exclusivement à des professionnels (B2B) du secteur de l'importation, du négoce et de la distribution d'avocats Hass. En souscrivant un abonnement, le Client reconnaît avoir lu, compris et accepté sans réserve les présentes CGV.

2. DESCRIPTION DU SERVICE

${COMPANY.serviceName} est une plateforme SaaS proposant des données agrégées de marché concernant l'avocat Hass : prix CIF Europe par calibre et origine, volumes d'importation, répartition par pays destinataire, prévisions saisonnières et analyses stratégiques.

Les données présentées sont des estimations issues d'analyses propriétaires multi-sources, fournies à titre informatif. Elles ne constituent en aucun cas un conseil financier, commercial ou juridique. Le Client demeure seul responsable de ses décisions d'achat et de vente.

3. ABONNEMENT ET TARIFS

Le Service est proposé sous forme d'abonnement payant selon les formules suivantes :
• Abonnement Mensuel : 149,00 € HT par mois
• Abonnement Annuel : 1 490,00 € HT par an (équivalent à environ 124 €/mois)

Les prix sont indiqués hors taxes. La TVA applicable est calculée automatiquement selon le pays du Client (Stripe Tax). L'abonnement est renouvelé automatiquement à échéance, sauf résiliation par le Client dans les conditions prévues à l'article 6.

4. MODALITÉS DE PAIEMENT

Le paiement est effectué par carte bancaire via le prestataire Stripe Payments, conforme aux normes PCI-DSS. ${COMPANY.serviceName} ne stocke aucune donnée bancaire. En cas d'échec de paiement, l'accès au Service peut être suspendu après notification.

5. GARANTIE SATISFAIT OU REMBOURSÉ — 14 JOURS

Le Client bénéficie d'un délai de 14 jours calendaires à compter de la première souscription pour demander le remboursement intégral de son abonnement, sans avoir à justifier sa décision.

Pour exercer ce droit, le Client doit envoyer une demande à ${COMPANY.email}. Le remboursement est effectué sous 14 jours via le moyen de paiement initial. Cette garantie ne s'applique qu'à la première souscription d'un même Client.

6. DURÉE ET RÉSILIATION

L'abonnement est conclu pour la durée choisie (mensuelle ou annuelle) avec reconduction tacite. Le Client peut résilier à tout moment depuis son espace client ou par email à ${COMPANY.email}. La résiliation prend effet à la fin de la période en cours. Aucun remboursement prorata temporis n'est effectué hors période de garantie.

7. PROPRIÉTÉ INTELLECTUELLE

L'ensemble du Service (interface, code, données agrégées, méthodologie d'analyse, graphismes, textes) est protégé par le droit d'auteur et appartient exclusivement à ${COMPANY.name}.

Toute reproduction, extraction, redistribution, revente, mise à disposition publique ou exploitation commerciale, totale ou partielle, est strictement interdite sans autorisation écrite préalable.

L'accès au Service est strictement personnel. Le partage des identifiants ou la connexion simultanée multiple constitue une violation des présentes CGV et peut entraîner la suspension immédiate du compte sans remboursement.

8. PROTECTION DES DONNÉES

Les données personnelles du Client sont traitées conformément au Règlement Général sur la Protection des Données (RGPD) et à la politique de confidentialité accessible sur ${COMPANY.domain}.

9. LIMITATION DE RESPONSABILITÉ

${COMPANY.serviceName} fournit des données à titre indicatif. ${COMPANY.name} ne saurait être tenu responsable :
• Des décisions commerciales prises par le Client sur la base des données fournies
• Des pertes financières directes ou indirectes liées à l'utilisation du Service
• D'éventuelles interruptions techniques, retards de mise à jour ou erreurs de données
• De cas de force majeure (panne, attaque informatique, défaillance fournisseur tiers)

La responsabilité de ${COMPANY.name} est en tout état de cause limitée au montant de l'abonnement payé sur les 12 derniers mois.

10. LOI APPLICABLE ET JURIDICTION

Les présentes CGV sont soumises au droit espagnol. En cas de litige, et après tentative de résolution amiable, les tribunaux de Granada (España) seront seuls compétents.

11. CONTACT

Pour toute question : ${COMPANY.email}
${COMPANY.name} — ${COMPANY.address}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.country}
NIE : ${COMPANY.nie} — Statut : ${COMPANY.status}`,

    privacyTitle: "Politique de Confidentialité",
    privacyContent: `${COMPANY.name} (« nous ») accorde une importance fondamentale à la protection de vos données personnelles. Cette politique décrit les données collectées, leurs finalités, et vos droits.

1. RESPONSABLE DU TRAITEMENT

${COMPANY.name}, ${COMPANY.status}
NIE : ${COMPANY.nie}
${COMPANY.address}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.country}
Email : ${COMPANY.email}

2. DONNÉES COLLECTÉES

• Identification : nom, prénom, adresse email
• Facturation : adresse, NIF/numéro TVA professionnel, données de paiement (gérées par Stripe, jamais stockées par nous)
• Utilisation : logs de connexion, pages consultées, actions effectuées
• Contenu : si vous utilisez l'onglet Mon Stock, ces données sont stockées localement dans votre navigateur uniquement (localStorage) et ne sont jamais transmises à nos serveurs

3. FINALITÉS DU TRAITEMENT

• Créer et gérer votre compte (base légale : exécution du contrat)
• Traiter votre paiement et émettre vos factures (base légale : obligation légale)
• Vous fournir le service et le support (base légale : exécution du contrat)
• Vous envoyer des informations sur le service (base légale : intérêt légitime)
• Respecter nos obligations comptables et fiscales (base légale : obligation légale)

4. SOUS-TRAITANTS

Nous faisons appel à des prestataires de confiance, eux-mêmes conformes au RGPD :
• Clerk, Inc. (États-Unis) — authentification utilisateurs
• Stripe Payments Europe Ltd. (Irlande) — traitement des paiements
• Cloudflare, Inc. (États-Unis) — hébergement et distribution
• Google LLC (États-Unis) — service IA Gemini (analyses optionnelles)

Les transferts hors UE sont encadrés par les Clauses Contractuelles Types de la Commission Européenne.

5. DURÉE DE CONSERVATION

• Données de compte : durée de l'abonnement + 3 ans après résiliation
• Données de facturation : 10 ans (obligation légale espagnole)
• Logs techniques : 12 mois maximum

6. VOS DROITS RGPD

• Droit d'accès, rectification, effacement (oubli)
• Droit à la limitation du traitement
• Droit à la portabilité des données
• Droit d'opposition

Pour exercer ces droits, contactez-nous à ${COMPANY.email}. Nous vous répondrons sous 30 jours maximum.

Vous pouvez également déposer une réclamation auprès de l'AEPD (Agencia Española de Protección de Datos) : www.aepd.es

7. COOKIES

${COMPANY.serviceName} utilise uniquement des cookies techniques essentiels au fonctionnement du service (authentification). Aucun cookie publicitaire ou de traçage tiers n'est utilisé.

8. SÉCURITÉ

Vos données sont protégées par chiffrement HTTPS, authentification renforcée et hébergement sécurisé. En cas de violation de données, nous notifierons l'AEPD et les utilisateurs concernés sous 72h conformément au RGPD.

9. MODIFICATIONS

Cette politique peut être mise à jour. Vous serez informé par email en cas de modification substantielle.`,

    legalTitle: "Mentions Légales",
    legalContent: `ÉDITEUR DU SITE

${COMPANY.name}
Statut : ${COMPANY.status}
NIE : ${COMPANY.nie}
Numéro de TVA intracommunautaire : ${COMPANY.vat}

Adresse : ${COMPANY.address}
${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.province}, ${COMPANY.country}

Email : ${COMPANY.email}
Site web : https://${COMPANY.domain}

DIRECTEUR DE LA PUBLICATION

${COMPANY.name}

HÉBERGEMENT

Le site ${COMPANY.serviceName} est hébergé par :
Cloudflare, Inc.
101 Townsend Street, San Francisco, CA 94107, USA
www.cloudflare.com

PRESTATAIRES TECHNIQUES

• Authentification : Clerk, Inc. (USA)
• Paiement : Stripe Payments Europe Ltd. (Irlande)
• Service IA : Google LLC (USA)

PROPRIÉTÉ INTELLECTUELLE

L'ensemble du site (textes, logos, graphismes, données agrégées, code source, méthodologie d'analyse) est la propriété exclusive de ${COMPANY.name} et est protégé par les lois espagnoles et internationales relatives à la propriété intellectuelle.

Toute reproduction, représentation, modification, publication, adaptation totale ou partielle est strictement interdite sans autorisation écrite préalable, sous peine de poursuites judiciaires.

LITIGES

En cas de litige, les tribunaux compétents sont ceux de Granada (España).

CONTACT

${COMPANY.email}`,

    disclaimer: "⚠️ Les données présentées sont des estimations agrégées à titre informatif uniquement. Elles ne constituent pas un conseil financier ou commercial. L'utilisateur reste seul responsable de ses décisions.",
  },

  en: {
    footerCopyright: `© ${new Date().getFullYear()} ${COMPANY.serviceName} — All rights reserved`,
    footerLinks: { cgv: "Terms", privacy: "Privacy", legal: "Legal", contact: "Contact" },
    close: "Close",
    cgvTitle: "Terms and Conditions",
    cgvContent: `1. SCOPE

These Terms and Conditions ("Terms") govern access to and use of the ${COMPANY.serviceName} service (the "Service"), operated by ${COMPANY.name}, ${COMPANY.status}, NIE ${COMPANY.nie}, located at ${COMPANY.address}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.country}.

The Service is intended exclusively for professionals (B2B) in the Hass avocado import, trading, and distribution sector.

2. SERVICE DESCRIPTION

${COMPANY.serviceName} is a SaaS platform offering aggregated market data for Hass avocados: CIF Europe prices by grade and origin, import volumes, country distribution, seasonal forecasts, and strategic analyses.

The data are estimates from proprietary multi-source analyses, provided for informational purposes only. They do not constitute financial, commercial, or legal advice. The Customer remains solely responsible for their decisions.

3. SUBSCRIPTION AND PRICING

• Monthly: €149.00 excl. VAT/month
• Annual: €1,490.00 excl. VAT/year (≈ €124/month)

VAT is calculated automatically (Stripe Tax). Subscriptions renew automatically unless cancelled.

4. PAYMENT

Payment via Stripe Payments (PCI-DSS compliant). ${COMPANY.serviceName} does not store banking data. Failed payments may result in suspension after notification.

5. 14-DAY MONEY-BACK GUARANTEE

14-day full refund period from first subscription, no justification required. Send refund requests to ${COMPANY.email}. Refunds processed within 14 days. Applies only to first-time subscriptions.

6. DURATION AND CANCELLATION

Cancel anytime from customer area or by email to ${COMPANY.email}. Cancellation takes effect at the end of the current period. No prorated refunds outside the 14-day guarantee.

7. INTELLECTUAL PROPERTY

The entire Service is protected by copyright and belongs exclusively to ${COMPANY.name}. Any reproduction, extraction, redistribution, resale, or commercial exploitation is strictly prohibited without prior written authorization.

Account access is strictly personal. Sharing credentials or simultaneous multi-device login violates these Terms and may result in immediate suspension without refund.

8. DATA PROTECTION

Personal data processed in accordance with GDPR. See Privacy Policy.

9. LIMITATION OF LIABILITY

${COMPANY.name} cannot be held liable for commercial decisions, financial losses, technical interruptions, data errors, or force majeure events. Liability limited to subscription amount paid in last 12 months.

10. APPLICABLE LAW

Spanish law. Granada courts (Spain) jurisdiction.

11. CONTACT

${COMPANY.email}
${COMPANY.name} — ${COMPANY.address}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.country}
NIE: ${COMPANY.nie}`,

    privacyTitle: "Privacy Policy",
    privacyContent: `${COMPANY.name} ("we") values protection of your personal data.

1. DATA CONTROLLER

${COMPANY.name}, ${COMPANY.status}
NIE: ${COMPANY.nie}
${COMPANY.address}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.country}
Email: ${COMPANY.email}

2. DATA COLLECTED

• Identification: name, email
• Billing: address, VAT number, payment data (handled by Stripe)
• Usage: connection logs, pages viewed
• My Stock data: stored locally in your browser only (localStorage), never transmitted to our servers

3. PURPOSES

• Account management (legal basis: contract)
• Payment processing (legal basis: legal obligation)
• Service delivery and support (legal basis: contract)
• Service communications (legal basis: legitimate interest)

4. PROCESSORS

• Clerk, Inc. (USA) — authentication
• Stripe Payments Europe Ltd. (Ireland) — payments
• Cloudflare, Inc. (USA) — hosting
• Google LLC (USA) — Gemini AI

Non-EU transfers framed by EU Standard Contractual Clauses.

5. RETENTION

• Account data: subscription + 3 years
• Billing: 10 years (Spanish legal obligation)
• Technical logs: max 12 months

6. YOUR GDPR RIGHTS

Access, rectification, erasure, restriction, portability, objection. Contact ${COMPANY.email}. Response within 30 days.

You may file a complaint with AEPD (Spanish DPA): www.aepd.es

7. COOKIES

Only essential technical cookies (authentication). No tracking cookies.

8. SECURITY

HTTPS encryption, strong authentication, secure hosting. Breaches notified to AEPD and users within 72h per GDPR.`,

    legalTitle: "Legal Notice",
    legalContent: `SITE PUBLISHER

${COMPANY.name}
Status: ${COMPANY.status}
NIE: ${COMPANY.nie}
Intra-EU VAT: ${COMPANY.vat}

Address: ${COMPANY.address}
${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.province}, ${COMPANY.country}

Email: ${COMPANY.email}
Website: https://${COMPANY.domain}

PUBLICATION DIRECTOR: ${COMPANY.name}

HOSTING

${COMPANY.serviceName} is hosted by:
Cloudflare, Inc.
101 Townsend Street, San Francisco, CA 94107, USA

TECHNICAL PROVIDERS

• Authentication: Clerk, Inc. (USA)
• Payment: Stripe Payments Europe Ltd. (Ireland)
• AI Service: Google LLC (USA)

INTELLECTUAL PROPERTY

The entire site (texts, logos, graphics, aggregated data, source code, methodology) is the exclusive property of ${COMPANY.name} and protected by Spanish and international intellectual property laws.

Any reproduction, modification, publication, or adaptation in whole or in part is strictly prohibited without prior written authorization, under penalty of legal action.

DISPUTES

Granada courts (Spain) jurisdiction.

CONTACT: ${COMPANY.email}`,

    disclaimer: "⚠️ The data presented are aggregated estimates for informational purposes only. They do not constitute financial or commercial advice. Users remain solely responsible for their decisions.",
  },

  es: {
    footerCopyright: `© ${new Date().getFullYear()} ${COMPANY.serviceName} — Todos los derechos reservados`,
    footerLinks: { cgv: "Términos", privacy: "Privacidad", legal: "Aviso Legal", contact: "Contacto" },
    close: "Cerrar",
    cgvTitle: "Términos y Condiciones",
    cgvContent: `1. OBJETO Y ÁMBITO

Los presentes Términos y Condiciones ("Términos") rigen el acceso y uso del servicio ${COMPANY.serviceName} (el "Servicio"), operado por ${COMPANY.name}, ${COMPANY.status}, NIE ${COMPANY.nie}, con domicilio en ${COMPANY.address}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.country}.

El Servicio está destinado exclusivamente a profesionales (B2B) del sector de importación, comercio y distribución de palta Hass.

2. DESCRIPCIÓN DEL SERVICIO

${COMPANY.serviceName} es una plataforma SaaS que ofrece datos agregados de mercado para palta Hass: precios CIF Europa por calibre y origen, volúmenes de importación, distribución por país, previsiones estacionales y análisis estratégicos.

Los datos son estimaciones de análisis propietarios multi-fuente, con fines informativos. No constituyen asesoramiento financiero, comercial o legal. El Cliente sigue siendo el único responsable de sus decisiones.

3. SUSCRIPCIÓN Y PRECIOS

• Mensual: 149,00 € sin IVA/mes
• Anual: 1.490,00 € sin IVA/año (≈ 124 €/mes)

El IVA se calcula automáticamente (Stripe Tax). Las suscripciones se renuevan automáticamente salvo cancelación.

4. PAGO

Pago mediante Stripe Payments (cumple PCI-DSS). ${COMPANY.serviceName} no almacena datos bancarios. Los fallos de pago pueden resultar en suspensión tras notificación.

5. GARANTÍA DE DEVOLUCIÓN — 14 DÍAS

Plazo de 14 días naturales desde la primera suscripción para reembolso íntegro, sin justificación. Solicitar a ${COMPANY.email}. Reembolso en 14 días. Aplicable solo a primera suscripción.

6. DURACIÓN Y CANCELACIÓN

Cancele en cualquier momento desde su área cliente o por email a ${COMPANY.email}. Cancelación efectiva al final del período. No hay reembolsos prorrateados fuera de la garantía.

7. PROPIEDAD INTELECTUAL

Todo el Servicio está protegido por derechos de autor y pertenece exclusivamente a ${COMPANY.name}. Cualquier reproducción, extracción, redistribución, reventa o explotación comercial está estrictamente prohibida sin autorización escrita previa.

El acceso a la cuenta es estrictamente personal. Compartir credenciales o conexión simultánea múltiple viola estos Términos y puede resultar en suspensión inmediata sin reembolso.

8. PROTECCIÓN DE DATOS

Los datos personales se tratan conforme al RGPD. Ver Política de Privacidad.

9. LIMITACIÓN DE RESPONSABILIDAD

${COMPANY.name} no se hace responsable de decisiones comerciales, pérdidas financieras, interrupciones técnicas, errores de datos o casos de fuerza mayor. Responsabilidad limitada al importe pagado en los últimos 12 meses.

10. LEY APLICABLE

Ley española. Tribunales de Granada (España) competentes.

11. CONTACTO

${COMPANY.email}
${COMPANY.name} — ${COMPANY.address}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.country}
NIE: ${COMPANY.nie}`,

    privacyTitle: "Política de Privacidad",
    privacyContent: `${COMPANY.name} ("nosotros") valora la protección de sus datos personales.

1. RESPONSABLE DEL TRATAMIENTO

${COMPANY.name}, ${COMPANY.status}
NIE: ${COMPANY.nie}
${COMPANY.address}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.country}
Email: ${COMPANY.email}

2. DATOS RECOPILADOS

• Identificación: nombre, email
• Facturación: dirección, NIF/IVA, datos de pago (gestionados por Stripe)
• Uso: logs de conexión, páginas vistas
• Datos de Mi Stock: almacenados localmente en su navegador (localStorage) únicamente, nunca transmitidos a nuestros servidores

3. FINALIDADES

• Gestión de cuenta (base legal: contrato)
• Procesamiento de pagos (base legal: obligación legal)
• Prestación del servicio y soporte (base legal: contrato)
• Comunicaciones del servicio (base legal: interés legítimo)

4. ENCARGADOS DEL TRATAMIENTO

• Clerk, Inc. (EE.UU.) — autenticación
• Stripe Payments Europe Ltd. (Irlanda) — pagos
• Cloudflare, Inc. (EE.UU.) — alojamiento
• Google LLC (EE.UU.) — servicio IA Gemini

Las transferencias fuera UE se enmarcan en las Cláusulas Contractuales Tipo de la Comisión Europea.

5. CONSERVACIÓN

• Datos de cuenta: duración suscripción + 3 años
• Datos de facturación: 10 años (obligación legal española)
• Logs técnicos: máximo 12 meses

6. SUS DERECHOS RGPD

Acceso, rectificación, supresión, limitación, portabilidad, oposición. Contacto: ${COMPANY.email}. Respuesta en 30 días.

También puede presentar reclamación ante la AEPD: www.aepd.es

7. COOKIES

Solo cookies técnicas esenciales (autenticación). Sin cookies de seguimiento.

8. SEGURIDAD

Cifrado HTTPS, autenticación reforzada, alojamiento seguro. Las violaciones se notifican a la AEPD y usuarios en 72h según RGPD.`,

    legalTitle: "Aviso Legal",
    legalContent: `EDITOR DEL SITIO

${COMPANY.name}
Estatuto: ${COMPANY.status}
NIE: ${COMPANY.nie}
Número IVA intracomunitario: ${COMPANY.vat}

Dirección: ${COMPANY.address}
${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.province}, ${COMPANY.country}

Email: ${COMPANY.email}
Sitio web: https://${COMPANY.domain}

DIRECTOR DE PUBLICACIÓN: ${COMPANY.name}

ALOJAMIENTO

${COMPANY.serviceName} está alojado por:
Cloudflare, Inc.
101 Townsend Street, San Francisco, CA 94107, EE.UU.

PROVEEDORES TÉCNICOS

• Autenticación: Clerk, Inc. (EE.UU.)
• Pago: Stripe Payments Europe Ltd. (Irlanda)
• Servicio IA: Google LLC (EE.UU.)

PROPIEDAD INTELECTUAL

Todo el sitio (textos, logotipos, gráficos, datos agregados, código fuente, metodología) es propiedad exclusiva de ${COMPANY.name} y está protegido por las leyes españolas e internacionales sobre propiedad intelectual.

Toda reproducción, modificación, publicación, adaptación total o parcial está estrictamente prohibida sin autorización escrita previa, bajo pena de acciones legales.

DISPUTAS

Tribunales de Granada (España) competentes.

CONTACTO: ${COMPANY.email}`,

    disclaimer: "⚠️ Los datos presentados son estimaciones agregadas con fines informativos únicamente. No constituyen asesoramiento financiero o comercial. El usuario sigue siendo el único responsable de sus decisiones.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// MODAL — Affichage d'un document légal
// ═══════════════════════════════════════════════════════════════════════════
function LegalModal({ isOpen, onClose, title, content, lang }) {
  if (!isOpen) return null;
  const txt = LEGAL[lang] || LEGAL.fr;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#ffffff", borderRadius: 14, maxWidth: 720, width: "100%", maxHeight: "85vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #e5e7eb", background: "linear-gradient(135deg,#16a34a,#15803d)", color: "white" }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{title}</div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>{txt.close} ✕</button>
        </div>
        <div style={{ padding: "20px 24px", overflow: "auto", fontSize: 12, lineHeight: 1.7, color: "#374151", whiteSpace: "pre-wrap", fontFamily: "Inter, sans-serif" }}>
          {content}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FOOTER + DISCLAIMER
// ═══════════════════════════════════════════════════════════════════════════
export default function LegalFooter({ lang = "fr" }) {
  const txt = LEGAL[lang] || LEGAL.fr;
  const [open, setOpen] = useState(null);

  const linkStyle = { background: "transparent", border: "none", color: "#6b7280", fontSize: 11, cursor: "pointer", fontFamily: "inherit", textDecoration: "underline", padding: "2px 6px" };

  return (
    <>
      <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: "8px 12px", marginTop: 18, marginBottom: 6, fontSize: 10, color: "#92400e", textAlign: "center" }}>
        {txt.disclaimer}
      </div>

      <div style={{ marginTop: 12, paddingTop: 14, paddingBottom: 8, borderTop: "1px solid #e5e7eb", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10, fontSize: 10, color: "#9ca3af" }}>
        <div>{txt.footerCopyright}</div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <button style={linkStyle} onClick={() => setOpen("cgv")}>{txt.footerLinks.cgv}</button>
          <span style={{ color: "#d1d5db" }}>·</span>
          <button style={linkStyle} onClick={() => setOpen("privacy")}>{txt.footerLinks.privacy}</button>
          <span style={{ color: "#d1d5db" }}>·</span>
          <button style={linkStyle} onClick={() => setOpen("legal")}>{txt.footerLinks.legal}</button>
          <span style={{ color: "#d1d5db" }}>·</span>
          <a href={`mailto:${COMPANY.email}`} style={{ ...linkStyle, color: "#6b7280" }}>{txt.footerLinks.contact}</a>
        </div>
      </div>

      <LegalModal isOpen={open === "cgv"} onClose={() => setOpen(null)} title={txt.cgvTitle} content={txt.cgvContent} lang={lang} />
      <LegalModal isOpen={open === "privacy"} onClose={() => setOpen(null)} title={txt.privacyTitle} content={txt.privacyContent} lang={lang} />
      <LegalModal isOpen={open === "legal"} onClose={() => setOpen(null)} title={txt.legalTitle} content={txt.legalContent} lang={lang} />
    </>
  );
}
