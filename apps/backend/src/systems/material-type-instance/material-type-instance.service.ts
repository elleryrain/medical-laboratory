import { Inject, Injectable } from '@nestjs/common';
import { MaterialTypesInstancesRepository } from './material-type-instance.repository';

@Injectable()
export class MaterialTypesInstancesService {
  constructor(
    @Inject()
    private readonly materialTypesInstancesRepository: MaterialTypesInstancesRepository,
  ) {}

  async create(data: {
    materialTypeId: number;
    name?: string;
    strength: number;
    currentStrength: number;
  }) {
    return await this.materialTypesInstancesRepository.create(data);
  }

  async findByMaterialTypeId(materialTypeId: number) {
    return await this.materialTypesInstancesRepository.findByMaterialType(
      materialTypeId,
    );
  }
}
