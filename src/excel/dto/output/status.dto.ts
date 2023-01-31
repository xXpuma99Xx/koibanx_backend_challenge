import { Expose } from 'class-transformer';

export class StatusOutputDto {
  @Expose()
  id_excel;

  @Expose()
  status;
}
