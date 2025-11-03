import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { UserModule } from '../user/user.module';
import { KnowledgeController } from './knowledge.controller';

@Module({
  imports: [DatabaseModule, UserModule],
  exports: [],
  providers: [],
  controllers: [KnowledgeController],
})
export class KnowledgeModule {}
