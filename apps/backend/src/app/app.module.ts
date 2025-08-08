import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, ConfigModule, AuthModule],
})
export class AppModule {}
