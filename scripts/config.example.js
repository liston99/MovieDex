// Copy this file to scripts/config.js and fill in your own values.

const API_KEY = "YOUR_TMDB_API_KEY";
const DB_URL = "https://YOUR_PROJECT_REF.supabase.co";
const DB_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";


const databaseClient =
  window.supabase.createClient(
    DB_URL,
    DB_ANON_KEY
  );
