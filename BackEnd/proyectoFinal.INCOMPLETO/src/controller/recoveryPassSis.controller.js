import { recoveryService } from '../repository/recovery/instance.js';
import { userService } from '../repository/users/instance.js';
import { logger } from './../middleware/logger.middleware.js';
import config from '../config/config.js';
import nodemailer from 'nodemailer';
import {
  comparePassword,
  encriptPassword,
} from '../utils/tools/encript.tool.js';

class RecoveryController {
  async sendRecoveryLink(email) {
    const user = await userService.getUserByEmail(email);
    if (user) {
      //Si hay un codigo para ese usuario lo borro
      const duplicated = await recoveryService.getByUserId(user._id);
      if (duplicated) {
        recoveryService.deleteById(duplicated._id);
      }
      //Creo el codigo y lo envio por mail
      const res = await recoveryService.createCode(user._id);
      logger.debug(`Codigo creado \n ${res}`);
      this.#sendMail(email, res._id);
      return;
    }
    logger.debug('Usuario no encontrado');
    return null;
  }

  async getById(id) {
    const code = await recoveryService.getById(id);
    if (code) {
      return code;
    }
    return 0;
  }

  async #sendMail(email, code) {
    const hoy = new Date();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: `${config.Mail_USR}`,
        pass: `${config.Mail_PWD}`,
      },
    });

    let mailOptions = {
      from: `Male Fashion <${config.USER}>`,
      subject: 'Male Fashion - Did you forget your password? ',
      to: `${email}`,
    };

    mailOptions.html = `<a href="${config.HomeURL}/users/passwordrecovery/${code}">CLICK AQUI PARA RECUPERAR</a>`;

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        logger.error(err);
      }
      logger.info('Enviado!');
    });
  }

  async updatePassword(code, password) {
    const codeFound = await recoveryService.getById(code);
    const user = await userService.getById(codeFound.user);
    if (codeFound) {
      let compareResult = comparePassword(password, user.password);
      if (compareResult) {
        return 'AUTH_PASS';
      }
      logger.debug(`Aqui se actualiza la pass ${compareResult}`);
      password = encriptPassword(password);
      let actualizationR = await userService.updatePassword(user._id, password);
      logger.debug(`Resultado de la actualizacion ${actualizationR}`);
      await recoveryService.deleteById(codeFound._id);
      return true;
    } else {
      return false;
    }
  }
}

export const recoveryController = new RecoveryController();
