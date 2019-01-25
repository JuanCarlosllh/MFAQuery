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

CREATE TABLE "UserProduct"(
  "userId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  PRIMARY KEY ("userId", "productId"),
  FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE,
  FOREIGN KEY ("productId") REFERENCES products(id) ON UPDATE CASCADE
)