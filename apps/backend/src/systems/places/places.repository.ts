import { Inject, Injectable } from '@nestjs/common';
import { DB_PROVIDER } from '../db/db.provider';
import { DB_TYPE } from '../db/db.type';
import { placesTable } from '../../drizzle/schemas/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PlacesRepository {
  constructor(@Inject(DB_PROVIDER) private readonly db: DB_TYPE) {}
  async getAllPlaces() {
    return await this.db.select().from(placesTable);
  }

  async add(name: string) {
    const [newPlace] = await this.db
      .insert(placesTable)
      .values({
        name,
      })
      .returning();
    return newPlace;
  }

  async delete(placeId: number) {
    await this.db.delete(placesTable).where(eq(placesTable.id, placeId));
  }
}
