import { createPool } from 'mysql2';
import * as dotenv from 'dotenv';

dotenv.config();

export const conn = createPool({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!, 10),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});