import repo from "../libs/axios";
import { Response } from "../utils/Response";

export class Repository {
  constructor(resource) {
    if (this.constructor === Repository) {
      throw new Error("FYI: Instance of Abstract class cannot be instantiated");
    }
    this.resource = resource;
    this.path = "";
    this.data = "";
  }
  get() {
    let response = repo.get(`${this.resource}/${this.path}`);
    return response.then(result => this.formatResponse(result.data));
  }
  post(body) {
    let response = repo.post(`${this.resource}/${this.path}`, body);
    return response.then(result => this.formatResponse(result.data));
  }
  put(body) {
    let response = repo.put(`${this.resource}/${this.path}`, body);
    return response.then(result => this.formatResponse(result.data));
  }
  del(id) {
    let response = repo.delete(`${this.resource}/${this.path}/${id}`);
    return response.then(result => this.formatResponse(result.data));
  }
  formatResponse(response) {
    return Promise.resolve(
      new Response(response.status, response.message, response.data)
    );
  }
  setPath(path) {
    this.path = path;
  }
}
