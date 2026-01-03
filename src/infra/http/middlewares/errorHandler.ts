import { ZodError } from "./../../../node_modules/zod/src/v4/classic/errors";
import { DomainError } from "../../../domain/errors/domain_error.ts";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof DomainError) {
    return reply.status(error.statusCode).send({
      error: error.name,
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    const zodError = error as ZodError;
    return reply.status(400).send({
      error: "ZodError",
      message: "Validation failed",
      details: zodError.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      })),
    });
  }

  console.error(error);

  return reply.status(500).send({
    error: "InternalServerError",
    message: "Internal server error",
  });
}
