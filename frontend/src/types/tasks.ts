export type Priority = "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string; 
  priority: Priority;
  completed: boolean;
}
