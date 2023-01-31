import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DataInterface } from './interfaces/data.interface';

@Injectable()
export class DataService {
  constructor(
    @Inject('DATA_MODEL')
    private dataModel: Model<DataInterface>,
  ) {}
}
