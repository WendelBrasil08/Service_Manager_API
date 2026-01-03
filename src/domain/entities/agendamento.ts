import { AgendamentoStatus } from "../enum/agendamento_status.ts";

export class Agendamento {
  constructor(
    public readonly id: string,
    public horario_inicio: Date,
    public horario_termino: Date,
    public cliente_id: string,
    public servico_id: string,
    public data_agendamento: Date,
    public status: AgendamentoStatus
  ) {}
}
