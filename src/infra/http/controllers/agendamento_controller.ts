import { AgendamentoUseCase } from "../../../UseCase/agendamento_use_case";
import { FastifyRequest, FastifyReply } from "fastify";
import { Agendamento } from "../../../domain/entities/agendamento.ts";
import { agendamentoSchema } from "../schemas/agendamento_schemas.ts";

export class AgendamentoController {
  constructor(private agendamentoUseCase: AgendamentoUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const agendamentoData = agendamentoSchema.parse(request.body);
    const agendamento = await this.agendamentoUseCase.criarAgendamento(
      agendamentoData as unknown as Agendamento
    );
    reply.status(201).send(agendamento);
  }
  async handleGetById(request: FastifyRequest, reply: FastifyReply) {
    const id = agendamentoSchema.parse(request.params).id;
    const agendamento = await this.agendamentoUseCase.buscarAgendamentoPorId(
      String(id)
    );
    if (agendamento) {
      reply.status(200).send(agendamento);
    } else {
      reply.status(404).send({ error: "Agendamento não encontrado" });
    }
  }
  async handleUpdate(request: FastifyRequest, reply: FastifyReply) {
    const agendamentoData = agendamentoSchema.parse(request.body);
    const agendamento = await this.agendamentoUseCase.atualizarAgendamento(
      agendamentoData as unknown as Agendamento
    );
    reply.status(200).send(agendamento);
  }
  async handleDelete(request: FastifyRequest, reply: FastifyReply) {
    const id = agendamentoSchema.parse(request.params).id;
    await this.agendamentoUseCase.deletarAgendamento(String(id));
    reply.status(204).send();
  }
}
