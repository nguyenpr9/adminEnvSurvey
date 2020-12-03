import { Repository } from "./Repository";
export class UserRepository extends Repository {
  constructor() {
    super("user");
  }
  async getAll() {
    await this.setPath("");
    return await this.get();
  }
  async getOne(id) {
    await this.setPath(`${id}`);
    return await this.get();
  }
  async delete(id) {
    await this.setPath(``);
    return await this.del(id);
  }
}
