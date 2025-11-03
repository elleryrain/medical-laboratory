import { IsOptional, IsString, Matches } from 'class-validator';

export class PostBodyCreateDailyTask {
  @IsString()
  @IsOptional()
  @Matches(
    new RegExp(
      '^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-(19|20)[0-9]{2}:(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])$',
    ),
    {
      message: 'finish date must bu in format dd-mm-yyyy:HH:MM',
    },
  )
  startTaskDateTime?: string;

  @IsString()
  name: string;
}
