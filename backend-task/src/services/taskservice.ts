import { AppDataSource } from "../data-source";
import { Task, CreateTaskData, UpdateTaskData, TaskFilterOptions } from "../entities/tasks";

export class TaskService {
  private static taskRepo = AppDataSource.getRepository(Task);

  static async getAllTasks(filterOptions: TaskFilterOptions): Promise<Task[]> {
    const qb = this.taskRepo.createQueryBuilder("task");

    // Filtering
    if (filterOptions.priority) {
      qb.andWhere("task.priority = :priority", { priority: filterOptions.priority });
    }

    // Sorting
    if (filterOptions.sortBy) {
      qb.orderBy(`task.${filterOptions.sortBy}`, filterOptions.sortOrder.toUpperCase() as "ASC" | "DESC");
    }

    return await qb.getMany();
  }

  static async getTaskById(id: number): Promise<Task | null> {
    return await this.taskRepo.findOneBy({ id });
  }

  static async createTask(taskData: CreateTaskData): Promise<Task> {
    const task = this.taskRepo.create({
      title: taskData.title,
      description: taskData.description || "",
      due_date: taskData.due_date,
      priority: taskData.priority,
      completed: false,
    });

    return await this.taskRepo.save(task);
  }

  static async updateTask(id: number, taskData: UpdateTaskData): Promise<Task | null> {
    const task = await this.taskRepo.findOneBy({ id });
    if (!task) return null;

    Object.assign(task, taskData, { updated_at: new Date() });

    if (taskData.due_date) {
      task.due_date = taskData.due_date;
    }

    return await this.taskRepo.save(task);
  }

  static async deleteTask(id: number): Promise<boolean> {
    const result = await this.taskRepo.delete(id);
    return result.affected !== 0;
  }

  static async toggleTaskComplete(id: number): Promise<Task | null> {
    const task = await this.taskRepo.findOneBy({ id });
    if (!task) return null;

    task.completed = !task.completed;
    task.updated_at = new Date();

    return await this.taskRepo.save(task);
  }
}
