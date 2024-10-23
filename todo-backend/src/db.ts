import * as dotenv from 'dotenv';
import pgPromise from 'pg-promise';

dotenv.config();

const pgp = pgPromise();

const username: string = process.env.DB_USERNAME as string;
const password: string = process.env.DB_PASSWORD as string;
const host: string = process.env.DB_HOST as string;
const dbName: string = process.env.DB_NAME as string;
const dbPort: string = process.env.DB_PORT as string;

const connectionString: string = `postgresql://${username}:${encodeURIComponent(password)}@${host}:${dbPort}/${dbName}`;
const db = pgp(connectionString);


export default db;