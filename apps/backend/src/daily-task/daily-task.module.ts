import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { AuthMiddleware } from '../auth/auth.middleware';
import { DailyTaskController } from './daily-task.controller';

@Module({
  imports: [DatabaseModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class DailyTaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(DailyTaskController);
  }
}
