CREATE TABLE products(
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  image TEXT,
  price TEXT NOT NULL,
  type TEXT NOT NULL
)

CREATE TABLE users(
  id INTEGER PRIMARY KEY NOT NULL,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)