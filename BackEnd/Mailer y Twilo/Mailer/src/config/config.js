import dotenv from 'dotenv';

dotenv.config({ path: './src/config/.env' });

export default {
  Hola: process.env.hola,
  PASSWORD: process.env.PASSWORD,
  USER: process.env.USER,
  Port: process.env.PORT,
};
