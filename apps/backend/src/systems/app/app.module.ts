import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CourierTaskModule } from '../courier-task/courier-task.module';
import { PlacesModule } from '../places/places.module';
import { KnowledgeModule } from '../knowledge/knowledge.module';
import { DailyTaskModule } from '../daily-task/daily-task.module';
import { MaterialTypeModule } from '../material-type/material-type.module';
import { MaterialTypesInstanceModule } from '../material-type-instance/material-type-instance.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret:
          configService.get<string>('JWT_SECRET') ||
          'secret-keyqweqweeqwdwfegtgtrjnaksdk',
      }),
      inject: [ConfigService],
    }),
    CourierTaskModule,
    PlacesModule,
    KnowledgeModule,
    DailyTaskModule,
    MaterialTypeModule,
    MaterialTypesInstanceModule,
  ],
})
export class AppModule {}
