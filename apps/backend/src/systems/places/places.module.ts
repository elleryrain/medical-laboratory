import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { PlacesService } from './places.service';
import { PlacesRepository } from './places.repository';
import { PlacesContoller } from './places.controller';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [PlacesService, PlacesRepository],
  controllers: [PlacesContoller],
})
export class PlacesModule {}
