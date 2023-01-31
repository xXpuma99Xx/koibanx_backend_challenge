import { Schema } from 'mongoose';
import { DataInterface } from '../interfaces/data.interface';

export const DataSchema = new Schema<DataInterface>({
  age: { type: Number, required: true },
  name: { type: String, required: true },
});
