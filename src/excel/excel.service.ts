import readXlsxFile from 'read-excel-file/node';
import { Injectable } from '@nestjs/common';
import { MongoConnectionService } from '../mongo-connection/mongo-connection.service';
import { ExelSchema } from './schema/excel.schema';

@Injectable()
export class ExcelService {
  constructor(private mongoConnectionService: MongoConnectionService) {}

  cargarExcel(path: string): { message: string; id_tarea: number } {
    readXlsxFile(path, { schema: ExelSchema }).then(({ rows, errors }) => {
      console.log(rows);
      console.log(errors);
    });
    return { message: 'Se subió tu archivo correctamente.', id_tarea: null };
  }

  findAllErroresByIdTarea(id_tarea: number, pagina: number) {}

  findByIdTarea(id_tarea: number) {}
}
