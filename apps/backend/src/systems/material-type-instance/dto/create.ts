import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PostBodyCreateMaterialTypeInstance {
  @IsInt()
  @Type(() => Number)
  materialTypeId: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsInt()
  @Min(0)
  strength: number;

  @IsInt()
  @Min(0)
  currentStrength: number;
}
