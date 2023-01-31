import { ConflictException, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';
import { MongoConnectionService } from '../mongo-connection/mongo-connection.service';
import { ExcelInterface } from './interfaces/excel.interface';
import { ExcelSchema } from './schemas/excel.schema';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
      fileFilter: (req, file, cb) => {
        // Validamos que el archivo cargado sea de una extención de archivos de excel
        if (
          !file.originalname.match(/\.(xls|xlsx|xlsm|xlsb|xltm|xlam|xlr|xlw)/)
        )
          return cb(
            new ConflictException('Extención de archivo no valida.'),
            false,
          );
        return cb(null, true);
      },
    }),
  ],
  controllers: [ExcelController],
  providers: [
    ExcelService,
    {
      provide: 'EXCEL_MODEL',
      inject: [MongoConnectionService],
      useFactory: (db: MongoConnectionService) =>
        db.getConnection().model<ExcelInterface>('Excel', ExcelSchema, 'excel'),
    },
  ],
})
export class ExcelModule {}
