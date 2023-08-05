import { encriptPassword } from '../../tools/encript.tool.js';

export default class UserDTO {
  constructor({
    firstName = null,
    lastName = null,
    email = null,
    password = null,
    cartId = null,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = encriptPassword(password);
    this.cartId = cartId;
  }
}
