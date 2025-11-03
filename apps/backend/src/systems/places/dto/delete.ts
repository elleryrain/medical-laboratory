import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeleteQueryPlace {
  @Type(() => Number)
  @IsNumber()
  placeId: number;
}
