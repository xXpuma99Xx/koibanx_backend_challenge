import { Schema } from 'mongoose';
import { ErrorInterface } from '../interfaces/error.interface';

export const ErrorSchema = new Schema<ErrorInterface>({
  column: { type: String, required: true },
  error: { type: String, required: true },
  reason: { type: String, required: false },
  row: { type: Number, required: true },
  value: { type: String, required: true },
});
