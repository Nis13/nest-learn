import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../../env-config/.env' });

const config = {
  port: process.env.PORT,
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
  jwt: {
    secret: process.env.SECRET,
  },
};

export default config;
