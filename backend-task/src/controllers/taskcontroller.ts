import { Request, Response } from 'express';
import { TaskService } from '../services/taskservice';
import { TaskFilterOptions } from '../entities/tasks';

export class TaskController {
  static async getAllTasks(req: Request, res: Response) {
    try {
      const { priority, sortBy = 'due_date', sortOrder = 'asc' } = req.query;

      const filterOptions: TaskFilterOptions = {
        priority: priority as 'high' | 'medium' | 'low' | undefined,
        sortBy: sortBy as 'due_date' | 'priority',
        sortOrder: sortOrder as 'asc' | 'desc'
      };

      const tasks = await TaskService.getAllTasks(filterOptions);
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  static async getTaskById(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.id);
      const task = await TaskService.getTaskById(taskId);

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json(task);
    } catch (error) {
      console.error('Error fetching task:', error);
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  }

  static async createTask(req: Request, res: Response) {
    try {
      const { title, description, due_date, priority } = req.body;

      const taskData = {
        title: title.trim(),
        description: description?.trim() || '',
        due_date: new Date(due_date),
        priority: priority || 'medium'
        
      };

      const newTask = await TaskService.createTask(taskData);
      res.status(201).json(newTask);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.id);
      const updateData = { ...req.body };

      // Convert due_date to Date object if provided
      if (updateData.due_date) {
        updateData.due_date = new Date(updateData.due_date);
      }

      const updatedTask = await TaskService.updateTask(taskId, updateData);

      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.id);
      const deleted = await TaskService.deleteTask(taskId);

      if (!deleted) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }

  static async toggleTaskComplete(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.id);
      const updatedTask = await TaskService.toggleTaskComplete(taskId);

      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json(updatedTask);
    } catch (error) {
      console.error('Error toggling task completion:', error);
      res.status(500).json({ error: 'Failed to toggle task completion' });
    }
  }
}