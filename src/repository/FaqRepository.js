import { Repository } from "./Repository";
export class FaqRepository extends Repository {
  constructor() {
    super("faq");
  }
  async getAll() {
    await this.setPath("");
    return await this.get();
  }
  async getOne(id) {
    await this.setPath(`${id}`);
    return await this.get();
  }
  async create(payload) {
    await this.setPath("");
    return await this.post(payload);
  }
  async update(payload) {
    await this.setPath(`${payload.id}`);
    return await this.put(payload);
  }
  async delete(id) {
    await this.setPath(``);
    return await this.del(id);
  }
}
