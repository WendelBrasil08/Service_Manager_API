import { DomainError } from "./domain_error";

export class AppointmentConflictError extends DomainError {
  statusCode = 409;
  constructor(message: string) {
    super("Há um conflito de agendamento");
    this.name = "AppointmentConflictError";
  }
}
