import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetQueryMaterialTypeInstancesByMaterialID {
  @Type(() => Number)
  @IsNumber()
  materialTypeId: number;
}
