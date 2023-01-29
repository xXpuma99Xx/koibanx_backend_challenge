import { IsNumberString } from 'class-validator';

export class StatusDto {
  @IsNumberString()
  id_excel: string;
}
