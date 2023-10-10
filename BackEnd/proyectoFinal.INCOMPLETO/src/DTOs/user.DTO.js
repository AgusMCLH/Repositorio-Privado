import { encriptPassword } from '../utils/tools/encript.tool.js';

export default class UserDTO {
  constructor(userList) {
    let response = [];
    userList.forEach((user) => {
      let obj = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      };
      response.push(obj);
    });
    return response;
  }
}
