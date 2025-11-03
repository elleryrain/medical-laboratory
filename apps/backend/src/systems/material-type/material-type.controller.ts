import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PostBodyCreate } from './dto/create';
import { MaterialTypesService } from './material-type.service';

@Controller('material-type')
export class MaterialTypesController {
  constructor(private readonly materialTypesService: MaterialTypesService) {}

  @Post()
  async createMaterialTypeHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() body: PostBodyCreate,
  ) {
    const { name } = body;
    const materialType = await this.materialTypesService.create(name);
    return reply.send(materialType);
  }

  @Get()
  async getMaterialTypesWithCountHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    const materialTypes = await this.materialTypesService.findAllWithCount();
    return reply.send(materialTypes);
  }
}
