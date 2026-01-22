import { ServicoUseCase } from "../../../usecase/servico/servico_use_case";
import { FastifyRequest, FastifyReply } from "fastify";
import { servicoSchema } from "../schemas/servico_schemas";

export class ServicoController {
  constructor(private servicoUseCase: ServicoUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const servicoData = servicoSchema.parse(request.body);
    const servico = await this.servicoUseCase.criarServico(servicoData);
    reply.status(201).send(servico);
  }
  async handleGetByName(request: FastifyRequest, reply: FastifyReply) {
    const nome = servicoSchema.parse(request.params).nome;
    const servico = await this.servicoUseCase.buscarServicoPorNome(
      String(nome)
    );
    if (servico) {
      reply.status(200).send(servico);
    } else {
      reply.status(404).send({ error: "Serviço não encontrado" });
    }
  }
  async handleUpdate(request: FastifyRequest, reply: FastifyReply) {
    const servicoData = servicoSchema.parse(request.body);
    const servico = await this.servicoUseCase.atualizarServico(servicoData);
    reply.status(200).send(servico);
  }
  async handleDelete(request: FastifyRequest, reply: FastifyReply) {
    const id = servicoSchema.parse(request.params).id;
    await this.servicoUseCase.deletarServico(String(id));
    reply.status(204).send();
  }
}
