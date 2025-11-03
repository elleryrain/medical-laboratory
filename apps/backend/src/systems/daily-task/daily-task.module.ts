import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { AuthMiddleware } from '../auth/auth.middleware';
import { DailyTaskController } from './daily-task.controller';
import { DailyTaskService } from './daily-task.service';
import { DailyTaskRepository } from './daily-task.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [DailyTaskController],
  providers: [DailyTaskService, DailyTaskRepository],
  exports: [DailyTaskService],
})
export class DailyTaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(DailyTaskController);
  }
}
