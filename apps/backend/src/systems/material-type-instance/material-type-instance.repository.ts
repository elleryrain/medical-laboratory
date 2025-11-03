import { Inject, Injectable } from '@nestjs/common';
import { DB_PROVIDER } from '../db/db.provider';
import { DB_TYPE } from '../db/db.type';
import { materialTypeInstancesTable } from '../../drizzle/schemas/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class MaterialTypesInstancesRepository {
  constructor(@Inject(DB_PROVIDER) private readonly db: DB_TYPE) {}

  async create(data: {
    materialTypeId: number;
    name?: string;
    strength: number;
    currentStrength: number;
  }) {
    return await this.db
      .insert(materialTypeInstancesTable)
      .values({
        currentStrenth: data.currentStrength,
        strenth: data.strength,
        materialTypeId: data.materialTypeId,
        name: data.name,
      })
      .returning();
  }
  async findByMaterialType(materialTypeId: number) {
    return await this.db
      .select()
      .from(materialTypeInstancesTable)
      .where(eq(materialTypeInstancesTable.materialTypeId, materialTypeId));
  }
}
