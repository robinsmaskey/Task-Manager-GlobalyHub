import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Moon, Sun } from "lucide-react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Optional: save mode in localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors flex flex-col items-center">
      {/* Header */}
      <header className="max-w-4xl w-full mb-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
          📝 Task Manager
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
          Create, edit, filter, sort, and track your tasks
        </p>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mt-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition hover:scale-105"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Column */}
        <div className="md:col-span-1 flex flex-col justify-start -mt-12">
          <TaskForm />
        </div>

        {/* Task List Column */}
        <div className="md:col-span-2">
          <TaskList />
        </div>
      </main>
    </div>
  );
}

export default App;

