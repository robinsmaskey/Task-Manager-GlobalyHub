//Animated Integration

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTasks } from "../context/TaskContext";
import type { Task } from "../types/tasks";

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { deleteTask, toggleComplete, updateTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);

  const handleSave = () => {
    updateTask(task.id, { title: editTitle, description: editDesc });
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="p-5 rounded-2xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col gap-3 transition"
    >
      {isEditing ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition"
          />
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="border p-2 rounded-lg h-20 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg p-2 mt-2 font-medium transition"
          >
            Save
          </motion.button>
        </>
      ) : (
        <>
          {/* Title + Badges */}
          <div className="flex justify-between items-start">
            <h3
              className={`text-lg font-semibold ${
                task.completed
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : "text-gray-800 dark:text-gray-100"
              }`}
            >
              {task.title}
            </h3>

            <div className="flex gap-2">
              {/* Priority */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  task.priority === "high"
                    ? "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100"
                    : task.priority === "medium"
                    ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100"
                    : "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100"
                }`}
              >
                {task.priority}
              </span>

              {/* Completed */}
              {task.completed && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-green-300 text-green-900 dark:bg-green-600 dark:text-green-100"
                >
                  Completed
                </motion.span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mt-1">{task.description}</p>

          {/* Due Date */}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Due: {new Date(task.due_date).toLocaleString()}
          </p>
        </>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 mt-3">
        <motion.input
          whileTap={{ scale: 0.9 }}
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="w-5 h-5 accent-blue-600 dark:accent-blue-400 cursor-pointer"
        />
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => deleteTask(task.id)}
          className="text-red-500 dark:text-red-400 hover:underline"
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
