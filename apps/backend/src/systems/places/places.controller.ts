import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PostBodyAddPlace } from './dto/create';
import { DeleteQueryPlace } from './dto/delete';

@Controller('places')
export class PlacesContoller {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  async getAllPlacesHandler(@Res() reply: FastifyReply) {
    const places = await this.placesService.getAllPlaces();
    return reply.send(places);
  }

  @Post()
  async addPlaceHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() body: PostBodyAddPlace,
  ) {
    const { name } = body;
    const newPlace = await this.placesService.add(name);
    return reply.send(newPlace);
  }

  @Delete()
  async deletePlaceHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Query() query: DeleteQueryPlace,
  ) {
    const { placeId } = query;
    await this.placesService.delete(placeId);
    return reply.send({
      message: 'OK',
    });
  }
}
