import "reflect-metadata";
import { DataSource } from 'typeorm';
import { Task } from './entities/tasks';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'robins',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'task_manager',
  synchronize: false,          // disable auto sync
  logging: process.env.NODE_ENV === 'development',
  entities: [Task],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});