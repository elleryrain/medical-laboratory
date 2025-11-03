import { IsString } from 'class-validator';

export class PostBodyAddPlace {
  @IsString()
  name: string;
}
