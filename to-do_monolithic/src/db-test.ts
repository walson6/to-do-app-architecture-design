import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "..", "db", "todos.db");  
console.log("Opening DB at:", dbPath);

const db = new Database(dbPath);  // should work now

// Test table
db.prepare(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    dueDate TEXT,
    completed INTEGER
  )
`).run();

const todos = db.prepare("SELECT * FROM todos").all();
console.log("Todos:", todos);
