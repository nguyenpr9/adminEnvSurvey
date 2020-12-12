import moment from "moment";
export class User {
  constructor({
    name = ``,
    username = ``,
    email = ``,
    _class = ``,
    rollNumber = ``,
    section = ``,
    specification = ``
  } = {}) {
    this.email = email;
    this.name = name;
    this.username = username;
    this.userRole = `User`;
    this.status = 1;
    this.password = `123456`;
    this.dateOfJoining = moment().format("YYYY-MM-DD");
    this._class = _class;
    this.class = _class;
    this.rollNumber = rollNumber;
    this.section = section;
    this.specification = specification;
  }
}

export function CreateUser(data) {
  return Object.freeze(new User(data.user));
}
