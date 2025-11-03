import { Injectable } from '@nestjs/common';
import { DailyTaskRepository } from './daily-task.repository';
import { GlobalConfigNamespace } from '../../types/global';
import { endOfDay, parse, startOfDay } from 'date-fns';
import { dailyTasksTable } from '../../drizzle/schemas/schema';

@Injectable()
export class DailyTaskService {
  constructor(private readonly dailyTaskRepository: DailyTaskRepository) {}
  async addDailyTask(name: string, userId: number, startTaskDatetime?: string) {
    const taskGeneratedColor =
      GlobalConfigNamespace.DAILY_COLORS[
        Math.floor(Math.random() * GlobalConfigNamespace.DAILY_COLORS.length)
      ];
    let date: Date | null = null;
    if (startTaskDatetime) {
      date = parse(
        startTaskDatetime,
        GlobalConfigNamespace.dateStringFormat,
        new Date(),
      );
    } else {
      date = new Date();
    }
    const payload: typeof dailyTasksTable.$inferInsert = {
      name,
      adminId: userId,
      color: taskGeneratedColor,
      startTaskDateTime: date,
      isCompleted: false,
    };
    console.log('addDailyTask| payload: ', payload);
    return await this.dailyTaskRepository.addDailyTask(payload);
  }

  async getPersonCurrentDailyTasks(userId: number) {
    const startDay = startOfDay(Date.now());
    const finishDay = endOfDay(Date.now());
    return await this.dailyTaskRepository.getPersonDailyTasksInTimeRange(
      userId,
      startDay,
      finishDay,
    );
  }

  async toggleDailyTaskStatus(taskId: number) {
    return await this.dailyTaskRepository.toggleTaskState(taskId);
  }
}
