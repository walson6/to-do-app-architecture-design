import { todoStore } from "./todos/todo.store";

console.log("All Todos in DB:");
console.log(todoStore.getAll());

// run with "npx ts-node src/inspect-db.ts"