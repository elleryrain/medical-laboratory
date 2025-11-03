import { HttpException, Inject, Injectable } from '@nestjs/common';
import { DB_PROVIDER } from '../db/db.provider';
import { DB_TYPE } from '../db/db.type';
import { dailyTasksTable } from '../../drizzle/schemas/schema';
import { and, eq, gte, lte } from 'drizzle-orm';

@Injectable()
export class DailyTaskRepository {
  constructor(@Inject(DB_PROVIDER) private readonly db: DB_TYPE) {}

  async addDailyTask(task: typeof dailyTasksTable.$inferInsert) {
    const newTasks = await this.db
      .insert(dailyTasksTable)
      .values(task)
      .returning();
    return newTasks[0];
  }

  async getPersonDailyTasksInTimeRange(
    userId: number,
    startTimeRange: Date,
    finishTimeRange: Date,
  ) {
    const tasks = await this.db
      .select()
      .from(dailyTasksTable)
      .where(
        and(
          eq(dailyTasksTable.adminId, userId),
          gte(dailyTasksTable.startTaskDateTime, startTimeRange),
          lte(dailyTasksTable.startTaskDateTime, finishTimeRange),
        ),
      );

    return tasks;
  }

  async toggleTaskState(taskId: number) {
    const [taskData] = await this.db
      .select()
      .from(dailyTasksTable)
      .where(eq(dailyTasksTable.id, taskId));

    if (!taskData) {
      throw new HttpException('task not found', 404);
    }
    console.log('task data: ', taskData);
    const [updatedTask] = await this.db
      .update(dailyTasksTable)
      .set({
        ...taskData,
        isCompleted: !taskData.isCompleted,
      })
      .where(eq(dailyTasksTable.id, taskId))
      .returning();
    console.log('updatedTask: ', updatedTask);
    return updatedTask;
  }
}
