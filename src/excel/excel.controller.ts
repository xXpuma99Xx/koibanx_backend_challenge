import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Serealize } from '../interceptors/serialize.interceptor';
import { ExcelService } from './excel.service';
import { StatusDto } from './dto/input/status.dto';
import { ErroresDto } from './dto/input/errores.dto';
import { CargaOutputDto } from './dto/output/carga.dto';
import { StatusOutputDto } from './dto/output/status.dto';

@Controller('excel')
@ApiTags('excel')
export class ExcelController {
  constructor(private excelService: ExcelService) {}

  // @Serealize()
  @Get('errores')
  @ApiOperation({
    description:
      'Enpoint que sirve para consultar los errores que tuvo un archivo de excel.',
  })
  @ApiBearerAuth('jwt')
  @ApiQuery({
    description: 'Página en la que se encuentra el operador.',
    name: 'pagina',
    type: 'string',
  })
  @ApiQuery({
    description: 'Id de la tarea a consultar.',
    name: 'id_tarea',
    type: 'string',
  })
  errores(@Query() query: ErroresDto) {
    return this.excelService.findAllErroresByIdTarea(
      +query.id_tarea,
      +query.pagina,
    );
  }

  @Serealize(StatusOutputDto)
  @Get('status')
  @ApiOperation({
    description:
      'Enpoint que sirve para consultar el estado de una tarea de procesamiento de un archivo de excel.',
  })
  @ApiBearerAuth('jwt')
  @ApiQuery({
    description: 'Id de la tarea a consultar.',
    name: 'id_tarea',
    type: 'string',
  })
  status(@Query() query: StatusDto) {
    return this.excelService.findByIdTarea(+query.id_tarea);
  }

  @Serealize(CargaOutputDto)
  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('archivoExcel'))
  @ApiOperation({
    description: 'Endpoint que sube al servidor un archivo.',
  })
  @ApiBearerAuth('jwt')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'La variable que debe portar el archivo se debe llamar archivoExcel. El archivo debe ser una extención de excel válida.',
    schema: {
      type: 'object',
      properties: { archivoExcel: { type: 'string', format: 'binary' } },
    },
  })
  upload(@Request() req, @UploadedFile() file: Express.Multer.File) {
    const path = file ? `${file.destination}/${file.filename}` : null;

    console.log(req.user);
    if (!file) throw new BadRequestException('No se mandó ningún archivo.');
    return this.excelService.cargarExcel(path);
  }
}
