import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateQueryToggleTaskState {
  @Type(() => Number)
  @IsNumber()
  taskId: number;
}
