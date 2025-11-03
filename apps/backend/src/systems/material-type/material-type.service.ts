import { Injectable } from '@nestjs/common';
import { MaterialTypesRepository } from './material-type.repository';

@Injectable()
export class MaterialTypesService {
  constructor(
    private readonly materialTypesRepository: MaterialTypesRepository,
  ) {}

  async create(name: string) {
    return await this.materialTypesRepository.create(name);
  }

  async findAllWithCount() {
    return await this.materialTypesRepository.getMaterialTypesWithCount();
  }
}
