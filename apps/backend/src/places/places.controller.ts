import { Controller, Get, Res } from '@nestjs/common';
import { PlacesService } from './places.service';
import { FastifyReply } from 'fastify';

@Controller('places')
export class PlacesContoller {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  async getAllPlacesHandler(@Res() reply: FastifyReply) {
    const places = await this.placesService.getAllPlaces();
    return reply.send(places);
  }
}
