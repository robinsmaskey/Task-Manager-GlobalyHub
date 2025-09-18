import { Request, Response, NextFunction } from 'express';
import { Priority } from '../entities/tasks';

export const validateTask = (req: Request, res: Response, next: NextFunction) => {
  const { title, due_date, priority } = req.body;

  // For POST requests (create), title and due_date are required
  if (req.method === 'POST') {
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Title is required and must be a non-empty string' 
      });
    }

    if (!due_date || isNaN(Date.parse(due_date))) {
      return res.status(400).json({ 
        error: 'Valid due date is required' 
      });
    }
  }

  // For PUT requests (update), validate only if fields are provided
  if (req.method === 'PUT' || req.method === 'PATCH') {
    if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
      return res.status(400).json({ 
        error: 'Title must be a non-empty string if provided' 
      });
    }

    if (due_date !== undefined && isNaN(Date.parse(due_date))) {
      return res.status(400).json({ 
        error: 'Due date must be a valid date if provided' 
      });
    }
  }

  // Validate priority if provided
  if (priority && !['high', 'medium', 'low'].includes(priority)) {
    return res.status(400).json({ 
      error: 'Priority must be one of: high, medium, low' 
    });
  }

  next();
};

export const validateTaskId = (req: Request, res: Response, next: NextFunction) => {
  const taskId = parseInt(req.params.id);
  if (isNaN(taskId) || taskId <= 0) {
    return res.status(400).json({ 
      error: 'Invalid task ID. Must be a positive integer.' 
    });
  }
  next();
};

export const validateTaskQuery = (req: Request, res: Response, next: NextFunction) => {
  const { priority, sortBy, sortOrder } = req.query;

  if (priority && !['high', 'medium', 'low'].includes(priority as string)) {
    return res.status(400).json({ 
      error: 'Priority filter must be one of: high, medium, low' 
    });
  }

  if (sortBy && !['due_date', 'priority'].includes(sortBy as string)) {
    return res.status(400).json({ 
      error: 'sortBy must be either "due_date" or "priority"' 
    });
  }

  if (sortOrder && !['asc', 'desc'].includes(sortOrder as string)) {
    return res.status(400).json({ 
      error: 'sortOrder must be either "asc" or "desc"' 
    });
  }

  next();
};