import { Inject, Injectable } from '@nestjs/common';
import { Document, Model, Types } from 'mongoose';
import { ErrorInterface } from './interfaces/error.interface';

@Injectable()
export class ErrorService {
  constructor(
    @Inject('ERROR_MODEL')
    private errorModel: Model<ErrorInterface>,
  ) {}

  create(
    column: string,
    error: string,
    row: number,
    value: string,
    reason?: string,
  ): Promise<
    Document<unknown, any, ErrorInterface> &
      ErrorInterface & {
        _id: Types.ObjectId;
      }
  > {
    const e = new this.errorModel({ column, error, row, value, reason });

    return e.save();
  }
}
