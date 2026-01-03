import { AgendamentoRepository } from "../repositories/agendamento_repository.ts";
import { Agendamento } from "../domain/entities/agendamento.ts";
import { randomUUID } from "crypto";

export class AgendamentoUseCase {
  constructor(private agendamentoRepository: AgendamentoRepository) {}
  async criarAgendamento(agendamento: Agendamento): Promise<Agendamento> {
    const a = new Agendamento(
      randomUUID(),
      new Date(),
      new Date(),
      agendamento.cliente_id,
      agendamento.servico_id,
      new Date(),
      agendamento.status
    );
    return await this.agendamentoRepository.criarAgendamento(a);
  }
  async buscarAgendamentoPorId(id: string): Promise<Agendamento | null> {
    return await this.agendamentoRepository.buscarAgendamentoPorId(id);
  }
  async atualizarAgendamento(agendamento: Agendamento): Promise<Agendamento> {
    return await this.agendamentoRepository.atualizarAgendamento(agendamento);
  }
  async deletarAgendamento(id: string): Promise<void> {
    return await this.agendamentoRepository.deletarAgendamento(id);
  }
}
