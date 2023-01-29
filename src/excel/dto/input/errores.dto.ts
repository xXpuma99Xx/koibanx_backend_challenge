import { IsNumberString } from 'class-validator';

export class ErroresDto {
  @IsNumberString()
  id_tarea: string;

  @IsNumberString()
  pagina: string;
}
