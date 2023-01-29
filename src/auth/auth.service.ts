import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generarToken(): { token: string } {
    const jwtPayload: JwtPayload = {
      data: moment().toString(),
    };

    return { token: this.jwtService.sign(jwtPayload) }; // "Firmamos"/creamos el token
  }
}
