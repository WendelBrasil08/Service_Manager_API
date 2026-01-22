import { InMemoryAgendamentoRepository } from "../../InMemory/in_memory_agendamento_repository";
import { AgendamentoUseCase } from "../../../usecase/agendamento/agendamento_use_case";
import { AgendamentoController } from "./../controllers/agendamento_controller";
import { FastifyInstance } from "fastify";

export async function agendamentoRoutes(app: FastifyInstance) {
  const agendamentoRepository = new InMemoryAgendamentoRepository();
  const agendamentoUsecase = new AgendamentoUseCase(agendamentoRepository);
  const agendamentoController = new AgendamentoController(agendamentoUsecase);
  app.post("/agendamentos", (request, reply) =>
    agendamentoController.handle(request, reply)
  );
  app.get("/agendamentos/:id", (request, reply) =>
    agendamentoController.handleGetById(request, reply)
  );
  app.put("/agendamentos", (request, reply) =>
    agendamentoController.handleUpdate(request, reply)
  );
  app.delete("/agendamentos/:id", (request, reply) =>
    agendamentoController.handleDelete(request, reply)
  );
}
