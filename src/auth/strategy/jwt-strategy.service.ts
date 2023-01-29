import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // Configuración de JWT
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Esto indica de donde debe obtener el token a validar
      secretOrKey: configService.get<string>('AUTH_SECRETKEY'), // Key para validar el token
    });
  }

  /*
    Función que se ejecuta después de recibir un token válido. Payload es
    la data que se mando dentro del token
  */
  async validate(payload: JwtPayload) {
    /*
      Lo que regrese esta función se puede extraer de Request en el controller.
      En este caso se extrae de req.payload
    */
    return payload;
  }
}
