export class UnAuthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnAuthorizedError";
  }
}
