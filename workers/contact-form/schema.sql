CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  referer TEXT,
  created_at TEXT NOT NULL
);
