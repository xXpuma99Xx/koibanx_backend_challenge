import { ConflictException, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';

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
  providers: [ExcelService],
})
export class ExcelModule {}
