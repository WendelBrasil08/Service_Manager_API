interface Agendamento {
  id: number;
  horario_inicio: Date;
  horario_termino: Date;
  cliente_id: number;
  servico_id: number;
  data_agendamento: Date;
  status: "agendado" | "realizado" | "cancelado";
}
