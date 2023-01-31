import { Expose } from 'class-transformer';

export class ErroresOutputDto {
  @Expose()
  column;

  @Expose()
  error;

  @Expose()
  reason;

  @Expose()
  row;

  @Expose()
  value;
}
