import { Injectable } from '@nestjs/common';
import { PlacesRepository } from './places.repository';

@Injectable()
export class PlacesService {
  constructor(private readonly placesRepository: PlacesRepository) {}

  async getAllPlaces() {
    return this.placesRepository.getAllPlaces();
  }
}
