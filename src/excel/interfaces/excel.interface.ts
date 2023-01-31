import { Types } from 'mongoose';

export interface ExcelInterface {
  id_excel: string;
  status: string;
  data?: Types.ObjectId[];
  errores?: Types.ObjectId[];
}
