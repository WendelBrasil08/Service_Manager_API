interface AgendamentoRepository {
  criar(agendamento: Agendamento): Promise<Agendamento>;
  buscarPorDataEHorario(data: Date, hora: Date): Promise<Agendamento | null>;
  atualizar(agendamento: Agendamento): Promise<Agendamento>;
  deletar(id: number): Promise<void>;
}
