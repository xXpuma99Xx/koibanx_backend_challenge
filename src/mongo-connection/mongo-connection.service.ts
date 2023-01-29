import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { Connection, createConnection } from 'mongoose';

@Injectable()
export class MongoConnectionService {
  private dbConnection: Connection;
  private readonly logger = new Logger(MongoConnectionService.name);

  constructor(private configService: ConfigService) {
    this.createConnection();
  }

  async createConnection() {
    const URI = `mongodb://${this.configService.get<string>(
      'DB_USER',
    )}:${this.configService.get<string>('DB_PASSWORD')}@${
      this.configService.get<string>('DB_HOST') || 'localhost'
    }:${
      this.configService.get<string>('DB_PORT') || 27017
    }/${this.configService.get<string>('DB')}?authSource=admin`;

    this.dbConnection = await createConnection(URI);
    this.dbConnection.once('open', () => {
      this.logger.log('Se conectó correctamente a la base de datos.');
    });
    this.dbConnection.once('error', () => {
      this.logger.error('Hubo un problema con la conexión a la base de datos.');
    });
  }
}
