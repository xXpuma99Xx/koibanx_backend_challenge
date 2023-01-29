import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Serealize } from '../interceptors/serialize.interceptor';
import { ExcelService } from './excel.service';

@Controller('excel')
@ApiTags('excel')
export class ExcelController {
  constructor(private excelService: ExcelService) {}

  // @Serealize(MessageOutputDto)
  @Post('upload')
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('archivoExcel'))
  // @ApiBearerAuth('jwt')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Endpoint que sube al servidor un archivo. El archivo debe ser una extención de excel válida.',
    schema: {
      type: 'object',
      properties: { archivoExcel: { type: 'string', format: 'binary' } },
    },
  })
  upload(@UploadedFile() file: Express.Multer.File) {
    const path = file ? `${file.destination}/${file.filename}` : null;

    if (!file) throw new BadRequestException('No se mandó ningún archivo.');
    // return this.excelService.createEquipos(path);
  }
}
