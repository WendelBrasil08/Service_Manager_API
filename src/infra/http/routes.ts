import { ClienteController } from "./controllers/cliente_controller";
import { UsuarioController } from "./controllers/usuario_controller";
import { ServicoController } from "./controllers/servico_controller";
import { AgendamentoController } from "./controllers/agendamento_controller";
import { PagamentoController } from "./controllers/pagamento_controller";
import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    usuarioUseCase: any;
    clienteUseCase: any;
    servicoUseCase: any;
    agendamentoUseCase: any;
    pagamentoUseCase: any;
  }
}

export async function appRoutes(app: FastifyInstance) {
    const usuarioController = new UsuarioController(app.usuarioUseCase);
    const clienteController = new ClienteController(app.clienteUseCase);
    const servicoController = new ServicoController(app.servicoUseCase);
    const agendamentoController = new AgendamentoController(app.agendamentoUseCase);
    const pagamentoController = new PagamentoController(app.pagamentoUseCase);
    app.post("/usuarios", (request, reply) => usuarioController.handle(request, reply));
    app.put("/usuarios", (request, reply) => usuarioController.handleUpdate(request, reply));
    app.delete("/usuarios/:id", (request, reply) => usuarioController.handleDelete(request, reply));
    app.post("/clientes", (request, reply) => clienteController.handle(request, reply));
    app.get("/clientes/:email", (request, reply) => clienteController.handleGetByEmail(request, reply));
    app.put("/clientes", (request, reply) => clienteController.handleUpdate(request, reply));
    app.delete("/clientes/:id", (request, reply) => clienteController.handleDelete(request, reply));
    app.post("/servicos", (request, reply) => servicoController.handle(request, reply));
    app.get("/servicos/:nome", (request, reply) => servicoController.handleGetByName(request, reply));
    app.put("/servicos", (request, reply) => servicoController.handleUpdate(request, reply));
    app.delete("/servicos/:id", (request, reply) => servicoController.handleDelete(request, reply));
    app.post("/agendamentos", (request, reply) => agendamentoController.handle(request, reply));
    app.get("/agendamentos/:id", (request, reply) => agendamentoController.handleGetById(request, reply));
    app.put("/agendamentos", (request, reply) => agendamentoController.handleUpdate(request, reply));
    app.delete("/agendamentos/:id", (request, reply) => agendamentoController.handleDelete(request, reply));
    app.post("/pagamentos", (request, reply) => pagamentoController.handle(request, reply));
    app.get("/pagamentos/cliente/:clienteId", (request, reply) => pagamentoController.handleGetById(request, reply));
    app.put("/pagamentos", (request, reply) => pagamentoController.handleUpdate(request, reply));
    app.delete("/pagamentos/:id", (request, reply) => pagamentoController.handleDelete(request, reply));
}