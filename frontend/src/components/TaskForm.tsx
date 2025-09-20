//Integrated Animated

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTasks } from "../context/TaskContext";
import type { Priority } from "../types/tasks";

const TaskForm: React.FC = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, description, due_date, priority, completed: false });
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 50 }}  // Form starts slightly lower
      animate={{ opacity: 1, y: 0 }}   // Moves up
      transition={{ duration: 0.5 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 text-center">
        Add New Task
      </h2>

      <input
        type="text"
        placeholder="Task Title"
        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        className="border p-3 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="datetime-local"
        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition"
        value={due_date}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />

      <select
        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg p-3 font-semibold transition"
      >
        Add Task
      </motion.button>
    </motion.form>
  );
};

export default TaskForm;
