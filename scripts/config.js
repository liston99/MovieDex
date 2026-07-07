const API_KEY = "bec103e2d7d7f52f8ef13ddec0abfb6b";
const DB_URL = "https://japbdxduxehexnliprty.supabase.co";
const DB_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphcGJkeGR1eGVoZXhubGlwcnR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3MjAzMjUsImV4cCI6MjA5NDI5NjMyNX0.46KOVVm8AK9Kp7z_WLSSHUG5KEntQ0cJR0TVvkJP4fs"


const databaseClient =
  window.supabase.createClient(
    DB_URL,
    DB_ANON_KEY
  );