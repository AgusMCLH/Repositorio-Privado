import dotenv from 'dotenv';
import program from './commander.js';

dotenv.config({ path: './config/.env' });

console.log('thx ', process.env.MongoURL);

export default {
  PORT: program.opts().port,
  MONGOURL: process.env.MongoURL,
  SECRET: process.env.SECRET,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  GitHSSecret: process.env.GHSSecret,
  GitHSID: process.env.GHSID,
};
