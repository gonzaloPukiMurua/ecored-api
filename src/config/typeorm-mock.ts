/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// 👇 Esto carga las variables del .env antes de usarlas
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.development', override: true });

console.log('DB_PASSWORD length:', process.env.DB_PASSWORD?.length);
console.log('DB_USER:', process.env.DB_USER);

const caPath = process.env.SSL_CA_CERT
  ? path.resolve(process.env.SSL_CA_CERT)
  : null;

const sslCa = caPath && fs.existsSync(caPath)
  ? fs.readFileSync(caPath).toString()
  : undefined;

console.log(sslCa);

  export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: sslCa
    ? {
        rejectUnauthorized: true,
        ca: sslCa,
      }
    : undefined, // si no hay certificado, no usa SSL
  autoLoadEntities: true,
  synchronize: false,
};