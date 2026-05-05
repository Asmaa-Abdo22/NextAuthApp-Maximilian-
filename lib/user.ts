import db from "./db";

export function createUser( email: string , password: string) {
  const result = db.prepare("INSERT INTO users ( email,password) VALUES (?, ?)");
  const info = result.run( email, password);
  return info.lastInsertRowid;
}
