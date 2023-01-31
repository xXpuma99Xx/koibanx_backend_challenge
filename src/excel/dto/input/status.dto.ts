import { IsNotEmpty, IsString } from 'class-validator';

export class StatusDto {
  @IsString()
  @IsNotEmpty()
  id_excel: string;
}
