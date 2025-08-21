import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateCourierTaskDTO } from './dto/create';
import { CourierTaskService } from './courier-task.service';
import { GetDeliveryTasksQueryDTO } from './dto/get';
import { parse } from 'date-fns';
import { TogglePaidStateBodyDTO } from './dto/update';

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

  @Get()
  async getCouriersTasksHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Query() query: GetDeliveryTasksQueryDTO,
  ) {
    const { type, startDate, finishDate } = query;
    const convertedStartDate = parse(startDate, 'dd-MM-yyyy:HH:mm', new Date());
    const convertedFinishDate = finishDate
      ? parse(finishDate, 'dd-MM-yyyy:HH:mm', new Date())
      : undefined;

    console.log('convertedStartDate', convertedStartDate);
    console.log('convertedFinishDate', convertedFinishDate);
    const tasks = await this.courierTaskService.getCourierTasksByDateAndType(
      type,
      convertedStartDate,
      convertedFinishDate,
    );

    return reply.send(tasks);
  }

  @Put('togglePaid')
  async togglePaidHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() body: TogglePaidStateBodyDTO,
  ) {
    const { id } = body;
    const newDeliveryTask =
      await this.courierTaskService.togglePaidStateDeliveryTask(id);
    return reply.send(newDeliveryTask);
  }
}
