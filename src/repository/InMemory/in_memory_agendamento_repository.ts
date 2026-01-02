import { AgendamentoRepository } from "../agendamento_repository.ts";
import { Agendamento } from "../../entity/agendamento.ts";

export class InMemoryAgendamentoRepository implements AgendamentoRepository {
  private agendamentos: Agendamento[] = [];

  async criar(agendamento: Agendamento): Promise<Agendamento> {
    this.agendamentos.push(agendamento);
    return agendamento;
  }

  async buscarPorDataEHorario(
    data: Date,
    hora: Date
  ): Promise<Agendamento | null> {
    const agendamento = this.agendamentos.find(
      (a) => a.data_agendamento === data && a.horario_inicio === hora
    );
    return agendamento || null;
  }

  async atualizar(agendamento: Agendamento): Promise<Agendamento> {
    const index = this.agendamentos.findIndex((a) => a.id === agendamento.id);
    if (index === -1) {
      throw new Error("Agendamento não encontrado");
    }
    this.agendamentos[index] = agendamento;
    return agendamento;
  }

  async deletar(id: number): Promise<void> {
    this.agendamentos = this.agendamentos.filter((a) => a.id !== id);
  }
}
