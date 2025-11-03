import { Inject, Injectable } from '@nestjs/common';
import { DB_PROVIDER } from '../db/db.provider';
import { DB_TYPE } from '../db/db.type';
import { usersTable } from '../../drizzle/schemas/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserRepository {
  constructor(@Inject(DB_PROVIDER) private readonly db: DB_TYPE) {}

  async findAll() {
    return this.db.select().from(usersTable);
  }

  async findOne(id: number) {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);
    return user;
  }

  async findByEmail(email: string) {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    return user;
  }

  async create(newUser: typeof usersTable.$inferInsert) {
    const [user] = await this.db.insert(usersTable).values(newUser).returning();
    return user;
  }

  async getAllTechnicals() {
    const technicians = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.role, 'technician'));
    return technicians;
  }
}
