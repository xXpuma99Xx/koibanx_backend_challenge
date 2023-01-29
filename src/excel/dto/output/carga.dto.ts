import { Expose } from 'class-transformer';

export class CargaOutputDto {
  @Expose()
  id_tarea: number;

  @Expose()
  message: string;
}
