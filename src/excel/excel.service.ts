import { Document, Model, Types } from 'mongoose';
import readXlsxFile from 'read-excel-file/node';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ExelFileSchema } from './schemas/excel-file.schema';
import { ExcelInterface } from './interfaces/excel.interface';
import { DataService } from '../data/data.service';
import { ErrorService } from '../error/error.service';

@Injectable()
export class ExcelService {
  constructor(
    @Inject('EXCEL_MODEL')
    private excelModel: Model<ExcelInterface>,
    private dataService: DataService,
    private errorService: ErrorService,
  ) {}

  async cargarExcel(file: Express.Multer.File): Promise<{
    message: string;
    id_excel: string;
  }> {
    // Generamos un registro. El id_excel es el generado por el multer
    const excel = new this.excelModel({ id_excel: file.filename });
    const data: Types.ObjectId[] = [];
    const errores: Types.ObjectId[] = [];

    await excel.save(); // Guardamos registro
    // asincronamente leemos el archivo de excel
    readXlsxFile(`${file.destination}/${file.filename}`, {
      schema: ExelFileSchema,
    }).then(async ({ rows, errors }) => {
      // Recorremos el array de filas que si cumplieron con los criterios
      for (let i = 0; i < rows.length; i++) {
        /*
          Ya que una celda pudo haber pasado los criterios necesario y la otra no, 
          validamos que ambas celdas de la fila sean válidas para poder generar un registro.
        */
        // @ts-expect-error
        if (rows[i].age && rows[i].name)
          data.push(
            // Generamos el registro
            // @ts-expect-error
            (await this.dataService.create(rows[i].age, rows[i].name))._id,
          );
      }
      // Recorremos el array de celdas que no cumplieron con los criterios
      for (let i = 0; i < errors.length; i++)
        errores.push(
          // Generamos el registro
          (
            await this.errorService.create(
              errors[i].column,
              errors[i].error,
              errors[i].row,
              `${errors[i].value}`,
              errors[i].reason,
            )
          )._id,
        );
      // Asignamos registros al objeto excel
      excel.data = data;
      excel.errores = errores;
      // Una vez concluido el proceso cambiamos el status a "done"
      excel.status = 'done';
      // Guardamos cambios
      await excel.save();
    });
    // Retornamos el id del registro del archivo de excel
    return {
      message: 'Se subió tu archivo correctamente.',
      id_excel: excel.id_excel,
    };
  }

  // async findAllErroresByIdExcel(
  //   id_excel: string,
  //   pagina: number,
  // ): Promise<
  //   (Document<unknown, any, ExcelInterface> &
  //     ExcelInterface & {
  //       _id: Types.ObjectId;
  //     })[]
  // > {
  //   const filter = {};

  //   filter['name'] = {};
  //   return this.excelModel.find().then((excels) => {
  //     console.log(excels);
  //     return excels;
  //   });
  // }

  async findByIdExcel(id_excel: string): Promise<
    Document<unknown, any, ExcelInterface> &
      ExcelInterface & {
        _id: Types.ObjectId;
      }
  > {
    return this.excelModel.findOne({ id_excel }).then((excel) => {
      if (!excel)
        throw new NotFoundException('No existe un registro con este id.');
      return excel;
    });
  }
}
