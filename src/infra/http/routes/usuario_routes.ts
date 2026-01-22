import { UsuarioController } from "../controllers/usuario_controller";
import { FastifyInstance } from "fastify";
import { InMemoryUsuarioRepository } from "../../InMemory/in_memory_Repository_usuario";
import { UsuarioUseCase } from "../../../usecase/usuario/usuario_use_case";

export async function usuarioRoutes(app: FastifyInstance) {
  const usuarioRepository = new InMemoryUsuarioRepository();
  const usuarioUseCase = new UsuarioUseCase(usuarioRepository);
  const usuarioController = new UsuarioController(usuarioUseCase);
  app.post("/usuarios", (request, reply) =>
    usuarioController.handle(request, reply)
  );
  app.put("/usuarios", (request, reply) =>
    usuarioController.handleUpdate(request, reply)
  );
  app.delete("/usuarios/:id", (request, reply) =>
    usuarioController.handleDelete(request, reply)
  );
}
