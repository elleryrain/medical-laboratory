import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { ECourierDeliveryType } from '../courier-tast.types';

export class GetDeliveryTasksQueryDTO {
  @IsString()
  @Matches(
    new RegExp(
      '^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-(19|20)[0-9]{2}:(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])$',
    ),
    {
      message: 'finish date must bu in format dd-mm-yyyy:HH:MM',
    },
  )
  startDate: string;

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
  finishDate?: string;

  @IsEnum(ECourierDeliveryType)
  type: ECourierDeliveryType;
}
