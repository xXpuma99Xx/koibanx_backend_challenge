import { IsNotEmpty, IsString } from 'class-validator';

export class IdExcelDto {
  @IsString()
  @IsNotEmpty()
  id_excel: string;
}
