import { userService } from '../repository/users/instance.js';
import { logger } from './../middleware/logger.middleware.js';

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
}

export const userController = new UserController();
