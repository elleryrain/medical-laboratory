import { Module } from '@nestjs/common';
import { DB_PROVIDER, dbProvider } from './db.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [...dbProvider],
  exports: [DB_PROVIDER],
})
export class DatabaseModule {}
