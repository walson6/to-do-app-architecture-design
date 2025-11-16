import { FastifyInstance } from "fastify";
import { todoStore } from "./todo.store";

async function todoRoutes(app: FastifyInstance) {

  // Get all todos
  app.get("/todos", async () => {
    return todoStore.getAll();
  });

  // Get one todo
  app.get("/todos/:id", async (request, reply) => {
    const id = Number((request.params as any).id);
    const todo = todoStore.get(id);
    if (!todo) return reply.status(404).send({ message: "Not found" });
    return todo;
  });

  // Create todo
  app.post("/todos", async (request, reply) => {
    const { title, description, dueDate } = request.body as any;

    if (!title || !description || !dueDate) {
      return reply.status(400).send({ message: "Missing required fields" });
    }

    const todo = todoStore.create({ title, description, dueDate });
    return reply.status(201).send(todo);
  });

  // Update todo
  app.put("/todos/:id", async (request, reply) => {
    const id = Number((request.params as any).id);
    const data = request.body as any;
    const updated = todoStore.update(id, data);
    if (!updated) return reply.status(404).send({ message: "Not found" });
    return updated;
  });

  // Delete todo
  app.delete("/todos/:id", async (request, reply) => {
    const id = Number((request.params as any).id);
    const success = todoStore.delete(id);
    if (!success) return reply.status(404).send({ message: "Not found" });
    return { message: "Deleted" };
  });
}

export default todoRoutes;
