import { Agendamento } from "../domain/entities/agendamento.ts";

export interface AgendamentoRepository {
  criarAgendamento(agendamento: Agendamento): Promise<Agendamento>;
  buscarAgendamentoPorId(id: string): Promise<Agendamento | null>;
  atualizarAgendamento(agendamento: Agendamento): Promise<Agendamento>;
  deletarAgendamento(id: string): Promise<void>;
}
