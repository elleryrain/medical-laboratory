import { Inject, Injectable } from '@nestjs/common';
import { DB_PROVIDER } from '../db/db.provider';
import { DB_TYPE } from '../db/db.type';
import { placesTable } from '../drizzle/schemas/schema';

@Injectable()
export class PlacesRepository {
  constructor(@Inject(DB_PROVIDER) private readonly db: DB_TYPE) {}
  async getAllPlaces() {
    return await this.db.select().from(placesTable);
  }
}
