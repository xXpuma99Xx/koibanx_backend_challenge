import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { MongoConnectionService } from '../mongo-connection/mongo-connection.service';
import { DataInterface } from './interfaces/data.interface';
import { DataSchema } from './schemas/data.schema';

@Module({
  providers: [
    DataService,
    {
      provide: 'DATA_MODEL',
      inject: [MongoConnectionService],
      useFactory: (db: MongoConnectionService) =>
        db.getConnection().model<DataInterface>('Data', DataSchema, 'data'),
    },
  ],
  exports: [DataService],
})
export class DataModule {}
