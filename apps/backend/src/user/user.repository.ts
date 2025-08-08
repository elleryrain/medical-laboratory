import { Inject, Injectable } from '@nestjs/common';
import { DB_PROVIDER } from '../db/db.provider';
import { DB_TYPE } from '../db/db.type';
import { usersTable } from '../drizzle/schemas/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserRepository {
  constructor(@Inject(DB_PROVIDER) private readonly db: DB_TYPE) {}

  async findAll() {
    return this.db.select().from(usersTable);
  }

  async findOne(id: number) {
    return [
      this.db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1),
    ];
  }

  async findByEmail(email: string) {
    return [
      this.db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1),
    ];
  }
}
