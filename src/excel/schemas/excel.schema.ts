import { Schema, Types } from 'mongoose';
import { ExcelInterface } from '../interfaces/excel.interface';

export const ExcelSchema = new Schema<ExcelInterface>({
  id_excel: { type: String, required: true },
  status: { type: String, required: true, default: 'processing' },
  data: { type: [Types.ObjectId], ref: 'Data' },
  errores: { type: [Types.ObjectId], ref: 'Error' },
});
