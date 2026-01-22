import { randomUUID } from "crypto";
import { BusinessRuleError } from "./../../domain/errors/BusinessRuleError";
import { AgendamentoRepository } from "../../repositories/agendamento_repository";
import { Agendamento } from "../../domain/entities/agendamento";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { existeConflitoHorario } from "../../domain/regras/existeConflitoHorario";

export class AgendamentoUseCase {
  constructor(private agendamentoRepository: AgendamentoRepository) {}

  async criarAgendamento(agendamento: Agendamento): Promise<Agendamento> {
    if (agendamento.horario_termino <= agendamento.horario_inicio) {
      throw new BusinessRuleError(
        "O horário de término deve ser após o horário de início",
      );
    }
    const agendamentosExistentes =
      await this.agendamentoRepository.buscarTodosAgendamentos();
    const conflito = agendamentosExistentes.some((a) => {
      const iniciaAntesDoFim = agendamento.horario_inicio < a.horario_termino;
      const terminaDepoisDoInicio =
        agendamento.horario_termino > a.horario_inicio;
      return iniciaAntesDoFim && terminaDepoisDoInicio;
    });
    if (conflito) {
      throw new BusinessRuleError("Horário conflita com agendamento existente");
    }

    const a = new Agendamento({
      id: randomUUID(),
      horario_inicio: agendamento.horario_inicio,
      horario_termino: agendamento.horario_termino,
      cliente_id: agendamento.cliente_id,
      servico_id: agendamento.servico_id,
      data_agendamento: agendamento.data_agendamento,
      status: agendamento.status,
    });

    return await this.agendamentoRepository.criarAgendamento(a);
  }
  async buscarAgendamentoPorId(id: string): Promise<Agendamento | null> {
    const agendamento =
      await this.agendamentoRepository.buscarAgendamentoPorId(id);
    if (!agendamento) {
      throw new NotFoundError("Agendamento não encontrado");
    }
    return agendamento;
  }
  async atualizarAgendamento(agendamento: Agendamento): Promise<Agendamento> {
    const existente = await this.agendamentoRepository.buscarAgendamentoPorId(
      agendamento.id,
    );
    if (!existente) {
      throw new NotFoundError("Agendamento não encontrado");
    }
    const todosAgendamentos =
      await this.agendamentoRepository.buscarTodosAgendamentos();

    const outrosAgendamentos = todosAgendamentos.filter(
      (a) => a.id !== agendamento.id,
    );

    for (const a of outrosAgendamentos) {
      if (existeConflitoHorario(a, agendamento)) {
        throw new BusinessRuleError(
          "Horário conflita com agendamento existente",
        );
      }
    }
    return await this.agendamentoRepository.atualizarAgendamento(agendamento);
  }

  async deletarAgendamento(id: string): Promise<void> {
    const existente =
      await this.agendamentoRepository.buscarAgendamentoPorId(id);
    if (!existente) {
      throw new NotFoundError("Agendamento não encontrado");
    }
    return await this.agendamentoRepository.deletarAgendamento(id);
  }
}
