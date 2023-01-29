import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('generar-token')
  @ApiOperation({
    description:
      'Endpoint que genera un token. Este token se usará para poder usar el resto de los endpoints.',
  })
  generarToken() {
    return this.authService.generarToken();
  }
}
