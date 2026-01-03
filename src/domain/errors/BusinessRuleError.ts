import { DomainError } from "./domain_error";

export class BusinessRuleError extends DomainError {
  statusCode = 400;

  constructor(message: string) {
    super("Regra de negócio violada");
    this.name = "BusinessRuleError";
  }
}
