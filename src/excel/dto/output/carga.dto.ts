import { Expose } from 'class-transformer';

export class CargaOutputDto {
  @Expose()
  id_excel;

  @Expose()
  message;
}
