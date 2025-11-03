import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { CourierTaskController } from './courier-task.controller';
import { CourierTaskService } from './courier-task.service';
import { CourierTaskRepository } from './courier-task.repository';

@Module({
  imports: [DatabaseModule],
  exports: [CourierTaskService],
  providers: [CourierTaskService, CourierTaskRepository],
  controllers: [CourierTaskController],
})
export class CourierTaskModule {}
