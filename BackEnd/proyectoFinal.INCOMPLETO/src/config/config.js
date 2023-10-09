import dotenv from 'dotenv';
import program from './commander.js';

dotenv.config({ path: './src/config/.env' });
console.log(
  '<<MongoURL>>: ',
  process.env.MongoURL,
  '\n',
  '<<Options>>: ',
  program.opts()
);

export default {
  DevMode: program.opts().dev,
  PORT: program.opts().port,
  MONGOURL: process.env.MongoURL,
  SECRET: process.env.SECRET,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  GitHSSecret: process.env.GHSSecret,
  GitHSID: process.env.GHSID,
  PERSISTANCEMODULE: process.env.persistenceModule,
  Mail_USR: process.env.MAIL_USER,
  Mail_PWD: process.env.MAIL_PASSWORD,
  HomeURL: process.env.homeURL,
};
