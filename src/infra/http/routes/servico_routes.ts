import { ServicoController } from "../controllers/servico_controller";
import { FastifyInstance } from "fastify";
import { InMemoryServicoRepository } from "../../InMemory/in_memory_servico_repository";
import { ServicoUseCase } from "../../../usecase/servico/servico_use_case";

export async function servicoRoutes(app: FastifyInstance) {
  const servicoRepository = new InMemoryServicoRepository();
  const servicoUseCase = new ServicoUseCase(servicoRepository);
  const servicoController = new ServicoController(servicoUseCase);
  app.post("/servicos", (request, reply) =>
    servicoController.handle(request, reply)
  );
  app.get("/servicos/:nome", (request, reply) =>
    servicoController.handleGetByName(request, reply)
  );

  app.put("/servicos", (request, reply) =>
    servicoController.handleUpdate(request, reply)
  );
  app.delete("/servicos/:id", (request, reply) =>
    servicoController.handleDelete(request, reply)
  );
}
