import dotEnv from 'dotenv';

dotEnv.config();

const dbConfig = {};

dbConfig.test = {
  user: process.env.TEST_DB_USER,
  host: process.env.TEST_DB_HOST,
  database: process.env.TEST_DB_NAME,
  password: process.env.TEST_DB_PASSWORD,
  port: process.env.TEST_DB_PORT,
};

dbConfig.database = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

dbConfig.secret = 'iloveprogramming';

export default dbConfig;
