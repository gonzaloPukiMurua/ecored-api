/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs'; // <-- AGREGAR: Importar 'fs'

const caPath = process.env.SSL_CA_CERT
  ? path.resolve(process.env.SSL_CA_CERT)
  : undefined;

// Lógica de lectura de certificado
const sslCa = caPath && fs.existsSync(caPath) 
    ? fs.readFileSync(caPath).toString() 
    : undefined;

// Lógica de configuración SSL unificada
const sslConfig = sslCa
    ? { rejectUnauthorized: true, ca: sslCa }
    : process.env.DB_SSL === 'true' // Si no hay CA, pero DB_SSL está activo
    ? { rejectUnauthorized: false }
    : undefined; // Si no hay SSL

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: sslConfig, // <-- USAR LA CONFIGURACIÓN UNIFICADA
  entities: [path.join(__dirname, '../**/*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '../migrations/*.{ts,js}')],
  synchronize: false,
});