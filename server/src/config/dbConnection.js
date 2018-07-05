import { Pool } from 'pg';
import dbConfig from './databaseConfig';

const dbPool = (process.env.NODE_ENV === 'test') ? new Pool(dbConfig.test) : new Pool(dbConfig.database);

export default dbPool;
