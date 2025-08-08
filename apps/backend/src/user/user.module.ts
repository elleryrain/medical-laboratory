import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserRepository, UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
