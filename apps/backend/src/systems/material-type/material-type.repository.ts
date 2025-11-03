import { Inject, Injectable } from '@nestjs/common';
import { DB_PROVIDER } from '../db/db.provider';
import { DB_TYPE } from '../db/db.type';
import {
  materialTypeInstancesTable,
  materialTypesTable,
} from '../../drizzle/schemas/schema';
import { sql, eq } from 'drizzle-orm';

@Injectable()
export class MaterialTypesRepository {
  constructor(@Inject(DB_PROVIDER) private readonly db: DB_TYPE) {}

  async create(name: string) {
    const [materialType] = await this.db
      .insert(materialTypesTable)
      .values({ name })
      .returning();
    return materialType;
  }

  async getMaterialTypesWithCount() {
    const materialTypes = await this.db
      .select({
        id: materialTypesTable.id,
        name: materialTypesTable.name,
        instancesCount: sql`COUNT(${materialTypeInstancesTable.id})`,
      })
      .from(materialTypesTable)
      .leftJoin(
        materialTypeInstancesTable,
        eq(materialTypeInstancesTable.materialTypeId, materialTypesTable.id),
      )
      .groupBy(materialTypesTable.id, materialTypesTable.name)
      .orderBy(materialTypesTable.name);
    return materialTypes;
  }
}
