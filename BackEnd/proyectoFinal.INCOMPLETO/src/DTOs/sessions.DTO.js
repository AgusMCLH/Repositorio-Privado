export default class SessionsDTO {
  constructor({
    firstName = null,
    lastName = null,
    email = null,
    role = null,
  }) {
    this.name = firstName + ' ' + lastName;
    this.email = email;
    this.role = role;
  }
}
