import { AgendamentoRepository } from "../../repositories/agendamento_repository";
import { Agendamento } from "../../domain/entities/agendamento";

export class InMemoryAgendamentoRepository implements AgendamentoRepository {
  private agendamentos: Agendamento[] = [];

  async criarAgendamento(agendamento: Agendamento): Promise<Agendamento> {
    this.agendamentos.push(agendamento);
    return agendamento;
  }
  async buscarTodosAgendamentos(): Promise<Agendamento[]> {
    return this.agendamentos; 
  }

  async buscarAgendamentoPorId(id: string): Promise<Agendamento | null> {
    const agendamento = this.agendamentos.find((a) => a.id === id);
    return agendamento || null;
  }

  async atualizarAgendamento(agendamento: Agendamento): Promise<Agendamento> {
    const index = this.agendamentos.findIndex((a) => a.id === agendamento.id);
    this.agendamentos[index] = agendamento;
    return agendamento;
  }

  async deletarAgendamento(id: string): Promise<void> {
    this.agendamentos = this.agendamentos.filter((a) => a.id !== id);
  }
}
