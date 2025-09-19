# 📝 Task Manager

A full-stack Task Manager application built with **TypeScript, Node.js, Express.js, React.js, Tailwind CSS, and PostgreSQL**.  
It allows users to create, view, update, delete, and complete tasks with filtering and sorting options.

---

## ✨ Features
- Create tasks with title, description, due date, and priority  
- View tasks with sorting (by due date or priority)  
- Filter tasks by priority  
- Mark tasks as complete/incomplete  
- Edit existing tasks  
- Delete tasks  

---

## 🛠 Tech Stack
- **Frontend:** React (TypeScript), Tailwind CSS  
- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** PostgreSQL (via TypeORM)  

---

## 📦 Prerequisites
Make sure you have installed:
- Node.js (>= 18.x)  
- npm (or yarn)  
- PostgreSQL (>= 14.x)  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/robinsmaskey/Task-Manager-GlobalyHub.git
cd task-manager
2. Install dependencies
Backend:

cd backend
npm install


Frontend:

cd ../frontend
npm install
3. Database setup

Ensure PostgreSQL is running.
You should already have a PostgreSQL user (e.g. robins) and a database (task_manager).

To connect manually:

psql -h localhost -U robins -d task_manager

4. Run migrations

Generate a migration (only needed when entities change):

npx typeorm-ts-node-commonjs migration:generate ./src/migrations/InitialMigration -d ./src/data-source.ts


Run migrations:
npx typeorm-ts-node-commonjs migration:run -d ./src/data-source.ts


5. Start the backend server
cd backend
npm start
Runs at: http://localhost:3000


6. Start the frontend
cd ../frontend/task-manager
npm start

Runs at: http://localhost:3001
Enter your password when prompted.

Inside the psql shell you can check:

\dt
SELECT * FROM tasks;
