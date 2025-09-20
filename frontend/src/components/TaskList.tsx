//Animated Integration

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import type { Task } from "../types/tasks";

const TaskList: React.FC = () => {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"dueDate" | "priority">("dueDate");

  // Filter and sort tasks
  const filteredTasks = tasks.filter(
    (t) => filter === "all" || t.priority === filter
  );

  const sortedTasks = [...filteredTasks].sort((a: Task, b: Task) => {
    if (sortBy === "dueDate") {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    }
    const priorityOrder: Record<string, number> = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Only</option>
          <option value="medium">Medium Only</option>
          <option value="low">Low Only</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "dueDate" | "priority")}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition"
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      {/* Task Items */}
      <AnimatePresence>
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 dark:text-gray-400 text-center mt-10"
          >
            No tasks found.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
