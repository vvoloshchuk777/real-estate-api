export class ClientError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.statusCode = code;
  }
}

export class NotFoundError extends Error {
  constructor(message, data) {
    super(message);
    this.statusCode = 404;
    this.data = data;
  }
}
