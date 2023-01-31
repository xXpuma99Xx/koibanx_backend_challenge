import { Expose } from 'class-transformer';

export class DataOutputDto {
  @Expose()
  age;

  @Expose()
  name;
}
