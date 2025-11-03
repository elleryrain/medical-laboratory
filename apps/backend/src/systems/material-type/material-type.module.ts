import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { MaterialTypesRepository } from './material-type.repository';
import { MaterialTypesService } from './material-type.service';
import { MaterialTypesController } from './material-type.controller';

@Module({
  imports: [DatabaseModule],
  providers: [MaterialTypesRepository, MaterialTypesService],
  controllers: [MaterialTypesController],
  exports: [MaterialTypesService],
})
export class MaterialTypeModule {}
