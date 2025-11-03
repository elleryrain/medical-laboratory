import { IsString } from 'class-validator';

export class PostBodyCreate {
  @IsString()
  name: string;
}
