import { Global, Module } from '@nestjs/common';
import { MongoConnectionService } from './mongo-connection.service';

@Global()
@Module({
  providers: [MongoConnectionService],
  exports: [MongoConnectionService],
})
export class MongoConnectionModule {}
