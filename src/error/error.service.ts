import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ErrorInterface } from './interfaces/error.interface';

@Injectable()
export class ErrorService {
  constructor(
    @Inject('ERROR_MODEL')
    private errorModel: Model<ErrorInterface>,
  ) {}
}
