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
import { IdExcelDto } from './dto/input/id-excel';
import { ErroresDto } from './dto/input/errores.dto';
import { CargaOutputDto } from './dto/output/carga.dto';
import { DataOutputDto } from './dto/output/data.dto';
import { ErroresOutputDto } from './dto/output/errores.dto';
import { StatusOutputDto } from './dto/output/status.dto';

@Controller('excel')
@ApiTags('excel')
export class ExcelController {
  constructor(private excelService: ExcelService) {}

  @Serealize(DataOutputDto)
  @Get('data')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description:
      'Enpoint que sirve para consultar la información válida que se mando en el excel.',
  })
  @ApiBearerAuth('jwt')
  @ApiQuery({
    description: 'Id del archivo excel a consultar.',
    name: 'id_excel',
    type: 'string',
  })
  data(@Query() query: IdExcelDto) {
    return this.excelService.findAllData(query.id_excel);
  }

  @Serealize(ErroresOutputDto)
  @Get('errores')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description:
      'Enpoint que sirve para consultar los errores que tuvo un archivo de excel.',
  })
  @ApiBearerAuth('jwt')
  @ApiQuery({
    description: 'Id del archivo excel a consultar.',
    name: 'id_excel',
    type: 'string',
  })
  @ApiQuery({
    description: 'Página en la que se encuentra el operador.',
    name: 'pagina',
    type: 'string',
  })
  @ApiQuery({
    description: 'Número de elementos por página.',
    name: 'perPage',
    type: 'string',
  })
  errores(@Query() query: ErroresDto) {
    return this.excelService.findAllErrores(
      query.id_excel,
      parseInt(query.pagina),
      parseInt(query.perPage),
    );
  }

  @Serealize(StatusOutputDto)
  @Get('status')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description:
      'Enpoint que sirve para consultar el estado del procesamiento de un archivo de excel.',
  })
  @ApiBearerAuth('jwt')
  @ApiQuery({
    description: 'Id del archivo excel a consultar.',
    name: 'id_excel',
    type: 'string',
  })
  status(@Query() query: IdExcelDto) {
    return this.excelService.findByIdExcel(query.id_excel);
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
    if (!file) throw new BadRequestException('No se mandó ningún archivo.');
    console.log(req.user);
    return this.excelService.cargarExcel(file);
  }
}
