import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { TodoController } from "./controllers/todo.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/todos", TodoController.getAll);
app.post("/todos", TodoController.create);
// PUT/DELETE routes

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
