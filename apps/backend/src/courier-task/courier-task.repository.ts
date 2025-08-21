import { Inject, Injectable } from '@nestjs/common';
import { DB_PROVIDER } from '../db/db.provider';
import { DB_TYPE } from '../db/db.type';
import {
  courierDeliveryTasksTable,
  deliveryPlacesTable,
} from '../drizzle/schemas/schema';
import { ECourierDeliveryType } from './courier-tast.types';
import { and, eq, gte, lte, or } from 'drizzle-orm';
import { LABORATORY_PLACE_ID } from '../consts/consts';
import { endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class CourierTaskRepository {
  constructor(@Inject(DB_PROVIDER) private readonly db: DB_TYPE) {}

  async createCourierDeliveryTask(
    startPlaceId: number,
    finishPlaceId: number,
    courierName: string,
    finishDate: Date,
    serviceId?: number,
  ) {
    console.log('courierName', typeof courierName);
    try {
      const [courierDelivery] = await this.db
        .insert(courierDeliveryTasksTable)
        .values({
          startPlaceId,
          finishPlaceId,
          finishDate,
          paid: false,
          courierName,
          serviceId,
        })
        .returning();
      return courierDelivery;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async getCourierDeliveryTasks(
    type: ECourierDeliveryType,
    startDate: Date,
    finishDate?: Date,
  ) {
    const conditionDeliveryToLab = eq(
      courierDeliveryTasksTable.finishPlaceId,
      LABORATORY_PLACE_ID,
    );
    const conditionDeliveryForLab = eq(
      courierDeliveryTasksTable.startPlaceId,
      LABORATORY_PLACE_ID,
    );
    const conditionDeliveryType =
      type === ECourierDeliveryType.DELIVERY
        ? conditionDeliveryForLab
        : conditionDeliveryToLab;

    const dateCondition = finishDate
      ? and(
          gte(courierDeliveryTasksTable.finishDate, startDate),
          lte(courierDeliveryTasksTable.finishDate, finishDate),
        )
      : and(
          gte(courierDeliveryTasksTable.finishDate, startOfDay(startDate)),
          lte(courierDeliveryTasksTable.finishDate, endOfDay(startDate)),
        );

    const deliveryTasks = await this.db
      .select()
      .from(courierDeliveryTasksTable)
      .where(and(dateCondition, conditionDeliveryType));

    return deliveryTasks;
  }

  async togglePaidStateDeliveryTask(id: number) {
    const [deliveryTask] = await this.db
      .select()
      .from(courierDeliveryTasksTable)
      .where(eq(courierDeliveryTasksTable.id, id));
    console.log(deliveryTask);

    const [updatedDeliveryTask] = await this.db
      .update(courierDeliveryTasksTable)
      .set({ paid: !deliveryTask.paid })
      .where(eq(courierDeliveryTasksTable.id, id))
      .returning();

    return updatedDeliveryTask;
  }
}
