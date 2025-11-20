import { TodoRepository } from "../repositories/todo.repository.js";
import type { Todo } from "../models/todo.model.js";

export const TodoService = {
  getAllTodos(): Todo[] {
    return TodoRepository.getAll();
  },
  createTodo(data: { title: string; description: string; dueDate: string }): Todo {
    // you could add extra validation here
    return TodoRepository.create(data);
  },
  // update, delete similarly
};
