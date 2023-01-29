import { Expose } from 'class-transformer';

export class StatusOutputDto {
  @Expose()
  status;
}
