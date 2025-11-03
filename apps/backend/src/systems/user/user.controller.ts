import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../auth/dto/user.dto';
import { UserService } from './user.service';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('short')
  async getShortUser(@Req() req: FastifyRequest, @Res() reply: FastifyReply) {
    const user = req.raw.user;
    const userData = await this.userService.getShortUserById(user.id);
    return reply.send(userData);
  }
}
