import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongoConnectionModule } from './mongo-connection/mongo-connection.module';
import { ExcelModule } from './excel/excel.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongoConnectionModule, ExcelModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
