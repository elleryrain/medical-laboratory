import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule), UserModule],
  providers: [AuthService, AuthMiddleware],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
