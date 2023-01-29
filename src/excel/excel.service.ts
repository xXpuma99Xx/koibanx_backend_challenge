import { Injectable } from '@nestjs/common';
import { MongoConnectionService } from '../mongo-connection/mongo-connection.service';

@Injectable()
export class ExcelService {
  constructor(private mongoConnectionService: MongoConnectionService) {}

  findAllErroresByIdTarea(id_tarea: number, pagina: number) {}

  findByIdTarea(id_tarea: number) {}
}
