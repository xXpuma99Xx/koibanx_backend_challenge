import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongoConnectionModule } from './mongo-connection/mongo-connection.module';
import { ExcelModule } from './excel/excel.module';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';
import { ErrorModule } from './error/error.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongoConnectionModule, ExcelModule, AuthModule, DataModule, ErrorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
