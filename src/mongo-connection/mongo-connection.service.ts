import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Connection, createConnection } from 'mongoose';

@Injectable()
export class MongoConnectionService {
  private dbConnection: Connection;

  constructor(private configService: ConfigService) {
    this.createConnection();
  }

  async createConnection() {
    const URI = `mongodb://${this.configService.get<string>(
      'DB_USER',
    )}:${this.configService.get<string>(
      'DB_PASSWORD',
    )}@${this.configService.get<string>(
      'DB_HOST',
    )}:${this.configService.get<string>(
      'DB_PORT',
    )}/${this.configService.get<string>('DB')}?authSorce=admin`;

    this.dbConnection = await createConnection(URI);
    this.dbConnection.once('open', () => {
      console.log('Se conecto correctamente a la base de datos.');
    });
    this.dbConnection.once('error', () => {
      console.log('Hubo un problema con la conexión a la base de datos.');
    });
  }
}
