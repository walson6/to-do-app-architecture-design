import { TodoRepository } from "./repositories/todo.repository.js";

console.log("All Todos in DB:");
console.log(JSON.stringify(TodoRepository.getAll(), null, 2));

// run with "npm run inspect"

