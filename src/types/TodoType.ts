export interface TodoData {
  name: string;
  todos: Todo[];
}

export interface Todo {
  id: number;
  text: string;
  priority: number;
}

export interface TodoAction {
  type: "create" | "edit" | "delete" | "error";
  payload: Todo;
}

export interface RadioOption {
  id: number;
  text: string;
}
