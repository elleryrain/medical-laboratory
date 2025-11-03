import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ITokenData } from '../../types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(
    req: FastifyRequest['raw'],
    reply: FastifyReply['raw'],
    next: () => void,
  ) {
    const forbiddenReplyMessage = JSON.stringify({ message: 'access denied' });

    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        reply.setHeader('Content-Type', 'application/json');

        return reply.writeHead(403).end(forbiddenReplyMessage);
      }
      const token = authHeader.split(' ')[1];

      const data = this.jwtService.verify(token) as ITokenData;
      req.user = {
        id: data.id,
      };
      next();
    } catch (err) {
      return reply.writeHead(403).end(forbiddenReplyMessage);
    }
  }
}
