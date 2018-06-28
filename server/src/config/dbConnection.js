import { Pool } from 'pg';
import dbConfig from './databaseConfig';

const dbPool = (process.NODE_ENV === 'production') ? new Pool(dbConfig.database) : new Pool(dbConfig.test);

export default dbPool;
