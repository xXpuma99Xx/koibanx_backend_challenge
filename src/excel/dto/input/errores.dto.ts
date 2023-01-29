import { IsNumberString } from 'class-validator';

export class ErroresDto {
  @IsNumberString()
  id_excel: string;

  @IsNumberString()
  pagina: string;
}
