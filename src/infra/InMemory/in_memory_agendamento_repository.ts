import { AgendamentoRepository } from "../../repositories/agendamento_repository.ts";
import { Agendamento } from "../../domain/entities/agendamento.ts";

export class InMemoryAgendamentoRepository implements AgendamentoRepository {
  private agendamentos: Agendamento[] = [];

  async criarAgendamento(agendamento: Agendamento): Promise<Agendamento> {
    this.agendamentos.push(agendamento);
    return agendamento;
  }

  async buscarAgendamentoPorId(id: string): Promise<Agendamento | null> {
    const agendamento = this.agendamentos.find((a) => a.id === id);
    return agendamento || null;
  }

  async atualizarAgendamento(agendamento: Agendamento): Promise<Agendamento> {
    const index = this.agendamentos.findIndex((a) => a.id === agendamento.id);
    if (index === -1) {
      throw new Error("Agendamento não encontrado");
    }
    this.agendamentos[index] = agendamento;
    return agendamento;
  }

  async deletarAgendamento(id: string): Promise<void> {
    this.agendamentos = this.agendamentos.filter((a) => a.id !== id);
  }
}
