import { Document, Model, Types } from 'mongoose';
import readXlsxFile from 'read-excel-file/node';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ExelFileSchema } from './schemas/excel-file.schema';
import { ExcelInterface } from './interfaces/excel.interface';

@Injectable()
export class ExcelService {
  constructor(
    @Inject('EXCEL_MODEL')
    private excelModel: Model<ExcelInterface>,
  ) {}

  async cargarExcel(file: Express.Multer.File): Promise<{
    message: string;
    id_excel: string;
  }> {
    const excel = new this.excelModel({ id_excel: file.filename });
    const path = file ? `${file.destination}/${file.filename}` : null;

    await excel.save();
    readXlsxFile(path, { schema: ExelFileSchema }).then(({ rows, errors }) => {
      console.log(rows);
      console.log(errors);
    });
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
