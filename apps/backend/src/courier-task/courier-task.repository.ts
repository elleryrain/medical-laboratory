import { Inject, Injectable } from '@nestjs/common';
import { DB_PROVIDER } from '../db/db.provider';
import { DB_TYPE } from '../db/db.type';
import { courierDeliveryTasksTable } from '../drizzle/schemas/schema';

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
}
