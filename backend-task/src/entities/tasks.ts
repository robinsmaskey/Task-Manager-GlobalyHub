import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export type Priority = "high" | "medium" | "low";

@Entity({ name: "tasks" })
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "timestamptz" }) // PostgreSQL datetime
  due_date!: Date;

  @Column({ type: "varchar", length: 10 })
  priority!: Priority;

  @Column({ type: "boolean", default: false })
  completed!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  due_date: Date;
  priority: Priority;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  due_date?: Date;
  priority?: Priority;
  completed?: boolean;
}

export interface TaskQueryParams {
  priority?: Priority;
  sortBy?: "due_date" | "priority";
  sortOrder?: "asc" | "desc";
}

export interface TaskFilterOptions {
  priority?: Priority;
  sortBy: "due_date" | "priority";
  sortOrder: "asc" | "desc";
}
