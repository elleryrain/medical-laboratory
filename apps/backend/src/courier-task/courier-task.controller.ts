import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateCourierTaskDTO } from './dto/create';
import { repl } from '@nestjs/core';
import { CourierTaskService } from './courier-task.service';

@Controller('courierTask')
export class CourierTaskController {
  constructor(private readonly courierTaskService: CourierTaskService) {}

  @Post()
  async createCourierTaskHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() body: CreateCourierTaskDTO,
  ) {
    console.log(body);
    const task = await this.courierTaskService.createCourierTask(body);
    return reply.send(task);
  }
}
