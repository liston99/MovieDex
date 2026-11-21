const fs = require("fs");
const path = require("path");

const { TMDB_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

const missing = Object.entries({ TMDB_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY })
  .filter(([, value]) => !value)
  .map(([name]) => name);

if (missing.length) {
  console.error(`Missing environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

const config = `const API_KEY = ${JSON.stringify(TMDB_API_KEY)};
const DB_URL = ${JSON.stringify(SUPABASE_URL)};
const DB_ANON_KEY = ${JSON.stringify(SUPABASE_ANON_KEY)};


const databaseClient =
  window.supabase.createClient(
    DB_URL,
    DB_ANON_KEY
  );
`;

fs.writeFileSync(path.join(__dirname, "scripts", "config.js"), config);
console.log("scripts/config.js created");
