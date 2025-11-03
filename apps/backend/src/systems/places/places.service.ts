import { Injectable } from '@nestjs/common';
import { PlacesRepository } from './places.repository';

@Injectable()
export class PlacesService {
  constructor(private readonly placesRepository: PlacesRepository) {}

  async getAllPlaces() {
    return this.placesRepository.getAllPlaces();
  }

  async add(name: string) {
    return await this.placesRepository.add(name);
  }

  async delete(placeId: number) {
    return await this.placesRepository.delete(placeId);
  }
}
