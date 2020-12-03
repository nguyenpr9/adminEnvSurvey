export class User {
  constructor({ name = ``, username = ``, email = `` } = {}) {
    this.email = email;
    this.name = name;
    this.username = username;
    this.userRole = `User`;
    this.status = 1;
    this.password = `123456`;
  }
}

export function CreateUser(data) {
  return Object.freeze(new User(data.user));
}
