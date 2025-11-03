import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { PostBodyCreateMaterialTypeInstance } from './dto/create';
import { MaterialTypesInstancesService } from './material-type-instance.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GetQueryMaterialTypeInstancesByMaterialID } from './dto/get';

@Controller('material-types-instance')
export class MaterialTypesInstancesController {
  constructor(
    private readonly materialTypeInstanceService: MaterialTypesInstancesService,
  ) {}

  @Post()
  async createMaterialTypeInstanceHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() body: PostBodyCreateMaterialTypeInstance,
  ) {
    const materialTypeInstance =
      await this.materialTypeInstanceService.create(body);
    return reply.send(materialTypeInstance);
  }

  @Get()
  async getMaterialTypeInstancesByMaterialTypeId(
    @Query() query: GetQueryMaterialTypeInstancesByMaterialID,
    @Res() reply: FastifyReply,
  ) {
    const { materialTypeId } = query;
    const materialTypeInstances =
      await this.materialTypeInstanceService.findByMaterialTypeId(
        materialTypeId,
      );
    return reply.send(materialTypeInstances);
  }
}
