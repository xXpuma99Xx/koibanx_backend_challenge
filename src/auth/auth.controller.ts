import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Serealize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { AuthTokenOutputDto } from './dto/output/token.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Serealize(AuthTokenOutputDto)
  @Post('generar-token')
  @ApiOperation({
    description:
      'Endpoint que genera un token. Este token es necesario para poder usar el resto de los endpoints.',
  })
  generarToken() {
    return this.authService.generarToken();
  }
}
