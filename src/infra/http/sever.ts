import { errorHandler } from "./middlewares/errorHandler";
import fastify from "fastify";

export const server = fastify();
server.setErrorHandler(errorHandler);
