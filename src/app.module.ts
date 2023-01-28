import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongoConnectionModule } from './mongo-connection/mongo-connection.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongoConnectionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
