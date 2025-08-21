import { Controller, Get, Res } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { FastifyReply } from 'fastify';

@Controller('knowledge')
export class KnowledgeController {
  constructor(private readonly userService: UserService) {}

  @Get('technicals')
  async getAllTechnicalsHandler(@Res() reply: FastifyReply) {
    const technicals = await this.userService.getAllTechnicals();
    return reply.send(technicals);
  }
}
