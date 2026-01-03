import { ClienteUseCase } from "../../../UseCase/cliente_use_case";
import { FastifyRequest, FastifyReply } from "fastify";
import { Cliente } from "../../../domain/entities/Cliente.ts";
import { clienteSchema } from "../schemas/cliente-schemas.ts";

export class ClienteController {
  constructor(private clienteUseCase: ClienteUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const clienteData = clienteSchema.parse(request.body);
    const cliente = await this.clienteUseCase.criarCliente(
      clienteData as Cliente
    );
    reply.status(201).send(cliente);
  }
  async handleGetByEmail(request: FastifyRequest, reply: FastifyReply) {
    const email = clienteSchema.parse(request.params).email;
    const cliente = await this.clienteUseCase.buscarClientePorEmail(email);
    if (cliente) {
      reply.status(200).send(cliente);
    } else {
      reply.status(404).send({ error: "Cliente não encontrado" });
    }
  }
  async handleUpdate(request: FastifyRequest, reply: FastifyReply) {
    const clienteData = clienteSchema.parse(request.body);
    const cliente = await this.clienteUseCase.atualizarCliente(
      clienteData as Cliente
    );
    reply.status(200).send(cliente);
  }
  async handleDelete(request: FastifyRequest, reply: FastifyReply) {
    const id = clienteSchema.parse(request.params).id;
    await this.clienteUseCase.deletarCliente(String(id));
    reply.status(204).send();
  }
}
