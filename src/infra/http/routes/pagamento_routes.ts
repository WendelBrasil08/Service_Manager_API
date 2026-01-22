import { PagamentoUseCase } from "./../../../usecase/pagamento/pagamento_use_case";
import { PagamentoController } from "../controllers/pagamento_controller";
import { FastifyInstance } from "fastify";
import { InMemoryPagamentoRepository } from "../../InMemory/in_memory_pagamento_repository";

export async function pagamentoRoutes(app: FastifyInstance) {
  const pagamentoRepository = new InMemoryPagamentoRepository();
  const pagamentoUseCase = new PagamentoUseCase(pagamentoRepository);
  const pagamentoController = new PagamentoController(pagamentoUseCase);
  app.post("/pagamentos", (request, reply) =>
    pagamentoController.handle(request, reply)
  );
  app.get("/pagamentos/cliente/:clienteId", (request, reply) =>
    pagamentoController.handleGetById(request, reply)
  );
  app.put("/pagamentos", (request, reply) =>
    pagamentoController.handleUpdate(request, reply)
  );
  app.delete("/pagamentos/:id", (request, reply) =>
    pagamentoController.handleDelete(request, reply)
  );
}
