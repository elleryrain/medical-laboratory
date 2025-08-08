import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';

@Module({
  imports: [DatabaseModule],
  providers: [],
  exports: [],
  controllers: [],
})
export class UserModule {}
