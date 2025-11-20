import type { Request, Response } from "express";
import { TodoService } from "../services/todo.service.js";

export const TodoController = {
  getAll(req: Request, res: Response) {
    res.json(TodoService.getAllTodos());
  },
  create(req: Request, res: Response) {
    const { title, description, dueDate } = req.body;
    const todo = TodoService.createTodo({ title, description, dueDate });
    res.json(todo);
  },
  // update, delete, toggle completion similarly
};
