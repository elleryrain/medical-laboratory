import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CourierTaskModule } from '../courier-task/courier-task.module';

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
        secret: configService.get<string>('JWT_SECRET') || 'secret-nahui',
      }),
      inject: [ConfigService],
    }),
    CourierTaskModule,
  ],
})
export class AppModule {}
