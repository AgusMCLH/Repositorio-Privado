import { userService } from '../repository/users/instance.js';
import { logger } from './../middleware/logger.middleware.js';
import nodemailer from 'nodemailer';
import config from '../config/config.js';

class UserController {
  async switchPremium(id) {
    const response = await userService.switchPremium(id);
    logger.debug(`response: ${response}`);
    switch (response) {
      case true:
        return 'A entrado en modo premium';
        break;
      case false:
        return 'A salido del modo premium';
        break;

      default:
        return response;
        break;
    }
    return;
  }
  async updateLastConnection(id) {
    const user = await userService.getById(id);
    user.lastConnection = Date.now();
    const response = await userService.updateUser(user);
  }

  async uploadDocument(id, files) {
    const user = await userService.getById(id);

    files.forEach((file) => {
      let duplicated = false;
      user.documents.forEach((document) => {
        if (document.name === file.originalname.split('.')[0]) {
          duplicated = true;
          return;
        }
      });
      if (duplicated) {
        return;
      } else {
        user.documents.push({
          name: file.originalname.split('.')[0],
          reference: file.path,
        });
      }
    });

    await userService.updateUser(user);
    return user;
  }
  async getAllUsers() {
    return await userService.getAllUsers();
  }

  async deleteIncativeUsers() {
    const users = await userService.getAllUsers();
    const todayDate = new Date();
    const todayYear = todayDate.getFullYear();
    const todayMonth = todayDate.getMonth() + 1;
    const todayDay = todayDate.getDate();
    let inactiveUsers = [];

    logger.debug(`todayDate: ${todayDay}/${todayMonth}/${todayYear}`);
    users.forEach(async (user) => {
      const UserDate = new Date(user.lastConnection.toString());
      const userYear = UserDate.getFullYear();
      const userMonth = UserDate.getMonth() + 1;
      const userDay = UserDate.getDate();
      logger.debug(`User date: ${userDay}/${userMonth}/${userYear}`);
      if (todayYear > userYear) {
        this.#sendDeletionMail(user);
        inactiveUsers.push(user._id);
      } else if (todayMonth > userMonth) {
        this.#sendDeletionMail(user);
        inactiveUsers.push(user._id);
      } else if (todayDay - 2 >= userDay) {
        this.#sendDeletionMail(user);
        inactiveUsers.push(user._id);
      }
    });
    logger.debug(`inactiveUsers: ${inactiveUsers}`);
  }

  async #sendDeletionMail(user) {
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
      subject: 'Male Fashion - Your account has been deleted',
      to: `${user.email}`,
    };
    mailOptions.html = `<h1>Hi ${user.firstName} ${user.lastName}!</h1><p>We are sorry to inform you that your account has been deleted due inactivity.</p> (TEST MESSAGE)`;
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        logger.error(err);
      }
      logger.info('Enviado!');
    });
    return;
  }
}

export const userController = new UserController();
