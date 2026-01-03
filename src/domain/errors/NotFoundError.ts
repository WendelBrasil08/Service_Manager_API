import { DomainError } from "./domain_error";

export class NotFoundError extends DomainError {
  statusCode = 404;
  constructor(resource: string = "Recurso") {
    super(`Recurso ${resource} não encontrado`);
    this.name = "NotFoundError";
  }
}
