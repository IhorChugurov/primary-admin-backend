export class InvalidatedRefreshTokenError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InvalidatedRefreshTokenError";
    Object.setPrototypeOf(this, InvalidatedRefreshTokenError.prototype);
  }
}
