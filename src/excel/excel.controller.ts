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
  @Post('carga-masiva-equipos')
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('csv'))
  @ApiBearerAuth('jwt')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { csv: { type: 'string', format: 'binary' } },
    },
  })
  cargaMasivaEquipos(@UploadedFile() file: Express.Multer.File) {
    const path = file ? `${file.destination}/${file.filename}` : null;

    if (!file) throw new BadRequestException('No se mandó ningún archivo.');
    // return this.excelService.createEquipos(path);
  }
}
