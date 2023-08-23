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
}

export const userController = new UserController();
