import { Inject, Injectable } from '@nestjs/common';
import { Document, Model, Types } from 'mongoose';
import { DataInterface } from './interfaces/data.interface';

@Injectable()
export class DataService {
  constructor(
    @Inject('DATA_MODEL')
    private dataModel: Model<DataInterface>,
  ) {}

  create(
    age: number,
    name: string,
  ): Promise<
    Document<unknown, any, DataInterface> &
      DataInterface & {
        _id: Types.ObjectId;
      }
  > {
    const data = new this.dataModel({ age, name });

    return data.save();
  }
}
