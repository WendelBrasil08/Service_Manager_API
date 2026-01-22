import { FastifyReply, FastifyRequest } from "fastify";
import { PagamentoUseCase } from "../../../usecase/pagamento/pagamento_use_case";
import { Pagamento } from "../../../domain/entities/pagamento";
import { pagamentoSchema } from "../schemas/pagamento_schemas";

export class PagamentoController {
  constructor(private pagamentoUseCase: PagamentoUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const pagamentoData = pagamentoSchema.parse(request.body);
    const pagamento = await this.pagamentoUseCase.criarPagamento(pagamentoData);
    reply.status(201).send(pagamento);
  }
  async handleGetById(request: FastifyRequest, reply: FastifyReply) {
    const id = pagamentoSchema.parse(request.params).id;
    const pagamento = await this.pagamentoUseCase.getByClienteId(String(id));
    if (pagamento) {
      reply.status(200).send(pagamento);
    } else {
      reply.status(404).send({ error: "Pagamento não encontrado" });
    }
  }

  async handleUpdate(request: FastifyRequest, reply: FastifyReply) {
    const pagamentoData = pagamentoSchema.parse(request.body);
    const pagamento = await this.pagamentoUseCase.atualizarPagamento(
      pagamentoData as unknown as Pagamento
    );
    reply.status(200).send(pagamento);
  }
  async handleDelete(request: FastifyRequest, reply: FastifyReply) {
    const id = pagamentoSchema.parse(request.params).id;
    await this.pagamentoUseCase.deletarPagamento(String(id));
    reply.status(204).send();
  }
}
