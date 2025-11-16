import Database from "better-sqlite3";
import path from "path";
import { Todo } from "./todo.model";

const dbPath = path.resolve(__dirname, "..", "..", "db", "todos.db");
const db = new Database(dbPath);

db.prepare(`
CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  dueDate TEXT NOT NULL,
  completed INTEGER NOT NULL
)
`).run();

type TodoRow = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: number;
};

export const todoStore = {
  getAll(): Todo[] {
    const rows = db.prepare("SELECT * FROM todos").all() as TodoRow[];
    return rows.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      dueDate: row.dueDate,
      completed: !!row.completed,
    }));
  },

  get(id: number): Todo | undefined {
    const row = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow | undefined;
    if (!row) return undefined;
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      dueDate: row.dueDate,
      completed: !!row.completed,
    };
  },

  create(data: { title: string; description: string; dueDate: string }): Todo {
    const stmt = db.prepare("INSERT INTO todos (title, description, dueDate, completed) VALUES (?, ?, ?, 0)");
    const info = stmt.run(data.title, data.description, data.dueDate);
    return { id: Number(info.lastInsertRowid), ...data, completed: false };
  },

  update(id: number, data: Partial<Omit<Todo, "id">>): Todo | undefined {
    const todo = this.get(id);
    if (!todo) return undefined;

    const updated = {
      title: data.title ?? todo.title,
      description: data.description ?? todo.description,
      dueDate: data.dueDate ?? todo.dueDate,
      completed: data.completed ?? todo.completed ? 1 : 0
    };

    db.prepare("UPDATE todos SET title = ?, description = ?, dueDate = ?, completed = ? WHERE id = ?")
      .run(updated.title, updated.description, updated.dueDate, updated.completed, id);

    return this.get(id);
  },

  delete(id: number): boolean {
    const result = db.prepare("DELETE FROM todos WHERE id = ?").run(id);
    return result.changes > 0;
  }
};
