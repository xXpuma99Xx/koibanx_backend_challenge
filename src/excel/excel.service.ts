import { Document, Model, Types } from 'mongoose';
import readXlsxFile from 'read-excel-file/node';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataInterface } from '../data/interfaces/data.interface';
import { ErrorInterface } from '../error/interfaces/error.interface';
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
    const path = file ? `${file.destination}/${file.filename}` : null;
    const excel = new this.excelModel({ id_excel: file.filename });
    const data: Types.ObjectId[] = [];
    const errores: Types.ObjectId[] = [];

    await excel.save();
    readXlsxFile(path, { schema: ExelFileSchema }).then(
      async ({ rows, errors }) => {
        for (let i = 0; i < rows.length; i++) {
          // @ts-expect-error
          if (rows[i].age && rows[i].name)
            data.push(
              // @ts-expect-error
              (await this.dataService.create(rows[i].age, rows[i].name))._id,
            );
        }
        for (let i = 0; i < errors.length; i++)
          errores.push(
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

        excel.data = data;
        excel.errores = errores;
        excel.status = 'done';
        await excel.save();
      },
    );
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
