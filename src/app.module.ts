import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongoConnectionModule } from './mongo-connection/mongo-connection.module';
import { ExcelModule } from './excel/excel.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongoConnectionModule, ExcelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
