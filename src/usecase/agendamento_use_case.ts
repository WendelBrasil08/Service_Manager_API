import { AgendamentoRepository } from "../repositories/agendamento_repository.ts";
import { Agendamento } from "../domain/entities/agendamento.ts";

export class AgendamentoUseCase {
  constructor(private agendamentoRepository: AgendamentoRepository) {}
  async criarAgendamento(agendamento: Agendamento): Promise<Agendamento> {
    return await this.agendamentoRepository.criar(agendamento);
  }
  async buscarAgendamentoPorDataEHorario(
    data: Date,
    hora: Date
  ): Promise<Agendamento | null> {
    return await this.agendamentoRepository.buscarPorDataEHorario(data, hora);
  }
  async atualizarAgendamento(agendamento: Agendamento): Promise<Agendamento> {
    return await this.agendamentoRepository.atualizar(agendamento);
  }
  async deletarAgendamento(id: number): Promise<void> {
    return await this.agendamentoRepository.deletar(id);
  }
}
