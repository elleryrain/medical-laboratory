import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PostBodyCreateDailyTask } from './dto/create';
import { DailyTaskService } from './daily-task.service';
import { UpdateQueryToggleTaskState } from './dto/update';

@Controller('profile/daily-task')
export class DailyTaskController {
  constructor(private readonly dailyTaskService: DailyTaskService) {}

  @Post()
  async createDailyTaskHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() body: PostBodyCreateDailyTask,
  ) {
    const { id: userId } = req.raw.user;
    const { name, startTaskDateTime } = body;
    const newTask = await this.dailyTaskService.addDailyTask(
      name,
      userId,
      startTaskDateTime,
    );
    return reply.send(newTask);
  }

  @Get()
  async getDailyTasksHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    const { id: userId } = req.raw.user;
    const tasks =
      await this.dailyTaskService.getPersonCurrentDailyTasks(userId);
    return reply.send(tasks);
  }

  @Post('toggle-status')
  async toggleDailyTaskStatus(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Query() query: UpdateQueryToggleTaskState,
  ) {
    const { taskId } = query;
    const newTaskState =
      await this.dailyTaskService.toggleDailyTaskStatus(taskId);
    return reply.send(newTaskState);
  }
}
