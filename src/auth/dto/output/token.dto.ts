import { Expose } from 'class-transformer';

export class AuthTokenOutputDto {
  @Expose()
  token;
}
