import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { MaterialTypesInstancesRepository } from './material-type-instance.repository';
import { MaterialTypesInstancesService } from './material-type-instance.service';
import { MaterialTypesInstancesController } from './material-type-instance.controller';

@Module({
  imports: [DatabaseModule],
  providers: [MaterialTypesInstancesRepository, MaterialTypesInstancesService],
  exports: [MaterialTypesInstancesService],
  controllers: [MaterialTypesInstancesController],
})
export class MaterialTypesInstanceModule {}
