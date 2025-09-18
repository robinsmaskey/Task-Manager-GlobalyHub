import { Router } from "express";
import { TaskController } from '../controllers/taskcontroller';
import { validateTask, validateTaskQuery, validateTaskId } from '../middleware/validation';

const router = Router();

// Apply validation middleware to all routes that need task ID
router.param('id', validateTaskId);

// GET /tasks - Get all tasks with optional filtering and sorting
router.get('/', validateTaskQuery, TaskController.getAllTasks);

// GET /tasks/:id - Get a specific task
router.get('/:id', TaskController.getTaskById);

// POST /tasks - Create a new task
router.post('/', validateTask, TaskController.createTask);

// PUT /tasks/:id - Update a task
router.put('/:id', validateTask, TaskController.updateTask);

// PATCH /tasks/:id/toggle-complete - Toggle task completion status
router.patch('/:id/toggle-complete', TaskController.toggleTaskComplete);

// DELETE /tasks/:id - Delete a task
router.delete('/:id', TaskController.deleteTask);

// export default router;
export { router };
