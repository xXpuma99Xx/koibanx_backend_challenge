import { Module } from '@nestjs/common';
import { ErrorService } from './error.service';
import { MongoConnectionService } from '../mongo-connection/mongo-connection.service';
import { ErrorInterface } from './interfaces/error.interface';
import { ErrorSchema } from './schemas/error.schema';

@Module({
  providers: [
    ErrorService,
    {
      provide: 'ERROR_MODEL',
      inject: [MongoConnectionService],
      useFactory: (db: MongoConnectionService) =>
        db.getConnection().model<ErrorInterface>('Error', ErrorSchema, 'error'),
    },
  ],
})
export class ErrorModule {}
