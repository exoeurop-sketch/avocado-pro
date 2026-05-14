// scripts/generate-version.js
// Génère public/version.json avec un timestamp unique à chaque build
// À exécuter automatiquement avant le build (npm run build)

const fs = require("fs");
const path = require("path");

const now = new Date();
const timestamp = now.toISOString();
const dateShort = timestamp.slice(0, 10);
const timeShort = timestamp.slice(11, 19).replace(/:/g, "");

const version = {
  version: `1.0.0-${dateShort}`,
  build: `${dateShort.replace(/-/g, "")}-${timeShort}`,
  deployedAt: timestamp,
  hash: Math.random().toString(36).substring(2, 10), // hash unique
};

const outputPath = path.join(__dirname, "..", "public", "version.json");
fs.writeFileSync(outputPath, JSON.stringify(version, null, 2));

console.log("✅ version.json generated:", version.build);
