//Integration

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Task } from "../types/tasks";

interface TaskContextProps {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  updateTask: (id: string, updatedTask: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const API_URL = "http://localhost:3000";

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // 🔄 Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}`);
      const data = await res.json();

      // map backend -> frontend format
      setTasks(
        data.map((t: any) => ({
          id: String(t.id),
          title: t.title,
          description: t.description ?? "",
          dueDate: t.due_date,
          priority: t.priority,
          completed: t.completed,
        }))
      );
    } catch (err) {
      console.error("❌ Failed to fetch tasks", err);
    }
  };

  // ➕ Add task
  const addTask = async (task: Omit<Task, "id">) => {
    try {
      const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          due_date: task.due_date,
          priority: task.priority,
        }),
      });

      if (!res.ok) throw new Error("Failed to add task");

      await fetchTasks();
    } catch (err) {
      console.error("❌ Failed to add task", err);
    }
  };

  // ✏️ Update task
  const updateTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedTask,
          due_date: updatedTask.due_date,
        }),
      });

      if (!res.ok) throw new Error("Failed to update task");

      await fetchTasks();
    } catch (err) {
      console.error("❌ Failed to update task", err);
    }
  };

  // 🗑️ Delete task
  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete task");

      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete task", err);
    }
  };

  // ✅ Toggle complete
  const toggleComplete = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}/toggle-complete`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Failed to toggle complete");

      await fetchTasks();
    } catch (err) {
      console.error("❌ Failed to toggle complete", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, fetchTasks, addTask, updateTask, deleteTask, toggleComplete }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
};


