import { Model } from 'mongoose';
import readXlsxFile from 'read-excel-file/node';
import { Inject, Injectable } from '@nestjs/common';
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

  async findAllErroresByIdTarea(id_excel: number, pagina: number) {
    const filter = {};

    filter['name'] = {};
    return this.excelModel.find().then((excel) => {
      console.log(excel);
    });
  }

  async findByIdTarea(id_excel: number) {
    return this.excelModel.findOne().then((excel) => {
      console.log(excel);
    });
  }
}
