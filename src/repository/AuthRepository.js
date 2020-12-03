import { Repository } from "./Repository";
export class AuthRepository extends Repository {
  constructor() {
    super("auth");
  }
  async login(payload) {
    await this.setPath("login");
    return await this.post(payload);
  }
  async register(payload) {
    await this.setPath("register");
    return await this.post(payload);
  }
}
