import { InMemoryClienteRepository } from "./../../InMemory/in_memory_cliente_repository";
import { ClienteUseCase } from "./../../../usecase/cliente/cliente_use_case";
import { ClienteController } from "../controllers/cliente_controller";
import { FastifyInstance } from "fastify";

export async function clienteRoutes(app: FastifyInstance) {
  const clienteRepository = new InMemoryClienteRepository();
  const clienteUseCase = new ClienteUseCase(clienteRepository);
  const clienteController = new ClienteController(clienteUseCase);
  app.post("/clientes", (request, reply) =>
    clienteController.handle(request, reply)
  );
  app.get("/clientes/:email", (request, reply) =>
    clienteController.handleGetByEmail(request, reply)
  );
  app.put("/clientes", (request, reply) =>
    clienteController.handleUpdate(request, reply)
  );
  app.delete("/clientes/:id", (request, reply) =>
    clienteController.handleDelete(request, reply)
  );
}
