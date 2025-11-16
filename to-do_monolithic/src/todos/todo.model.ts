export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

type TodoRow = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: number; // stored as 0 or 1 in DB
};
