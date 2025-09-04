import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('profile/daily-task')
export class DailyTaskController {
  @Get()
  getDailyTasksHandler(@Req() req: FastifyRequest, @Res() reply: FastifyReply) {
    
  }

  @Post()
  createDailyTaskHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    //
  }

  @Post('toggle-status')
  toggleDailyTaskStatus(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    //
  }
}
