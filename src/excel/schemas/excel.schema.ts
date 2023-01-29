import { Schema } from 'mongoose';
import { ExcelInterface } from '../interfaces/excel.interface';

export const ExcelSchema = new Schema<ExcelInterface>({
  id_excel: { type: String, required: true },
  status: { type: String, required: true, default: 'processing' },
});
