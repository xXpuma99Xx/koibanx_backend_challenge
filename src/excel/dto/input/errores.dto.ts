import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class ErroresDto {
  @IsString()
  @IsNotEmpty()
  id_excel: string;

  @IsNumberString()
  pagina: string;

  @IsNumberString()
  perPage: string;
}
