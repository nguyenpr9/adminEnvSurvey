export class Response {
  constructor(success, message, data) {
    this.data = data;
    this.message = message;
    this.status = success;
  }
}

export class APIError extends Error {
  constructor(response) {
    super();
    this.response = response;
  }
}
