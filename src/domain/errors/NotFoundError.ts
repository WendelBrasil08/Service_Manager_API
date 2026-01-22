import { DomainError } from "./domain_error";

export class NotFoundError extends DomainError {
  statusCode = 404;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
