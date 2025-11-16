import Fastify from "fastify";
import path from "path";
import todoRoutes from "./todos/todo.routes";

const app = Fastify();

// Serve static files from public/
app.register(require('@fastify/static'), {
  root: path.join(__dirname, "../public"),
  prefix: "/",
});

app.register(todoRoutes);

app.get("/", async (request, reply) => {
  // Redirect to index.html
  return (reply as any).sendFile("index.html");
});

export default app;
