import { Injectable } from '@nestjs/common';
import { CreateCourierTaskDTO } from './dto/create';
import { CourierTaskRepository } from './courier-task.repository';
import { parse } from 'date-fns';
import { ECourierDeliveryType } from './courier-tast.types';

@Injectable()
export class CourierTaskService {
  constructor(private readonly courierTaskRepository: CourierTaskRepository) {}
  async createCourierTask(data: CreateCourierTaskDTO) {
    try {
      const {
        courierName,
        finishDate,
        finishPlaceId,
        startPlaceId,
        serviceId,
      } = data;
      const formattedFinishData = parse(
        finishDate,
        'dd-MM-yyyy:HH:mm',
        new Date(),
      );
      console.log(formattedFinishData);
      const task = await this.courierTaskRepository.createCourierDeliveryTask(
        startPlaceId,
        finishPlaceId,
        courierName,
        formattedFinishData,
        serviceId,
      );
      return task;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCourierTasksByDateAndType(
    type: ECourierDeliveryType,
    startDate: Date,
    finishDate?: Date,
  ) {
    const tasks = await this.courierTaskRepository.getCourierDeliveryTasks(
      type,
      startDate,
      finishDate,
    );
    return tasks;
  }

  async togglePaidStateDeliveryTask(id: number) {
    const newDeliveryTask =
      await this.courierTaskRepository.togglePaidStateDeliveryTask(id);
    return newDeliveryTask;
  }
}
