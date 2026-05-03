# Avocado Pro — Déploiement Cloudflare Pages

Cette version du projet est prête pour **Cloudflare Pages** (au lieu de Netlify).

## Ce qui a changé par rapport à la version Netlify

| Avant (Netlify) | Maintenant (Cloudflare) |
|---|---|
| `netlify/functions/analyze.js` (Node.js, `exports.handler`) | `functions/api/analyze.js` (Workers runtime, `onRequestPost`) |
| `netlify.toml` | `public/_redirects` (pour le routing SPA) |
| `@anthropic-ai/sdk` (devDependency) | Plus besoin — la fonction utilise `fetch` natif |
| Endpoint : `/.netlify/functions/analyze` | Endpoint : `/api/analyze` |
| `App.js` appelait directement `api.anthropic.com` (CORS + clé exposée) | `App.js` appelle `/api/analyze` (sécurisé) |

> **Important** : la version originale de `App.js` appelait l'API Anthropic directement depuis le navigateur, ce qui aurait exposé la clé API publiquement et bloqué les requêtes par CORS. La nouvelle version passe par la fonction serveur — la clé reste côté Cloudflare.

---

## Déploiement — option 1 : via le dashboard Cloudflare (le plus simple)

### 1. Pousser le projet sur GitHub
```bash
cd avocado-pro
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TON-USER/avocado-pro.git
git push -u origin main
```

### 2. Créer le projet sur Cloudflare Pages
1. Va sur https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Choisis ton repo `avocado-pro`
3. Configuration de build :
   - **Framework preset** : `Create React App`
   - **Build command** : `npm run build`
   - **Build output directory** : `build`
   - **Root directory** : (laisser vide)
4. **Environment variables** → ajouter :
   - Nom : `ANTHROPIC_API_KEY`
   - Valeur : `sk-ant-...` (ta clé)
   - **Type : Secret** (clique sur "Encrypt")
5. Clique **Save and Deploy**

Cloudflare détecte automatiquement le dossier `functions/` et expose `/api/analyze` comme endpoint.

### 3. Vérifier
- Frontend : `https://avocado-pro.pages.dev`
- Test fonction : `POST https://avocado-pro.pages.dev/api/analyze` avec `{"prompt":"hello"}`

---

## Déploiement — option 2 : via Wrangler CLI (sans Git)

```bash
npm install -g wrangler
npm install
npm run build
wrangler pages deploy build --project-name=avocado-pro
```

Pour la variable d'environnement :
```bash
wrangler pages secret put ANTHROPIC_API_KEY --project-name=avocado-pro
```

---

## Développement local

```bash
npm install
npm start              # frontend sur http://localhost:3000
```

Pour tester aussi la fonction `/api/analyze` en local :
```bash
npm install -g wrangler
npm run build
npx wrangler pages dev build --compatibility-date=2024-01-01
```
N'oublie pas de mettre `ANTHROPIC_API_KEY` dans un fichier `.dev.vars` à la racine :
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxx
```

---

## Structure du projet

```
avocado-pro/
├── functions/
│   └── api/
│       └── analyze.js       ← Cloudflare Pages Function (POST /api/analyze)
├── public/
│   ├── index.html
│   └── _redirects            ← SPA routing (toutes les routes → index.html)
├── src/
│   ├── App.js                ← appelle /api/analyze
│   ├── data.js
│   └── index.js
├── package.json
└── README.md
```

---

## Notes

- Les **Cloudflare Pages Functions** tournent sur le runtime Workers (V8 isolates), pas Node.js. C'est pour ça qu'on n'utilise pas le SDK `@anthropic-ai/sdk` (qui dépend de modules Node) et qu'on appelle l'API Anthropic via `fetch` direct.
- Le plan gratuit Cloudflare Pages inclut **100 000 requêtes de fonction/jour** et la bande passante illimitée — largement suffisant pour cette app.
- Si tu veux ajouter un domaine custom : Pages → ton projet → **Custom domains** → Set up.
