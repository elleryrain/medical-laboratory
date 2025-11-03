import { IsNumber } from 'class-validator';

export class TogglePaidStateBodyDTO {
  @IsNumber()
  id: number;
}
