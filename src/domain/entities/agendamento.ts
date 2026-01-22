import { AgendamentoStatus } from "../enum/agendamento_status";

interface AgendamentoProps {
  id?: string;
  horario_inicio: Date;
  horario_termino: Date;
  cliente_id: string;
  servico_id: string;
  data_agendamento: Date;
  status: AgendamentoStatus;
}
export class Agendamento {
  public readonly id: string;
  public readonly horario_inicio: Date;
  public readonly horario_termino: Date;
  public readonly cliente_id: string;
  public readonly servico_id: string;
  public readonly data_agendamento: Date;
  public status: AgendamentoStatus;

  constructor(props: AgendamentoProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.horario_inicio = props.horario_inicio;
    this.horario_termino = props.horario_termino;
    this.cliente_id = props.cliente_id;
    this.servico_id = props.servico_id;
    this.data_agendamento = props.data_agendamento;
    this.status = props.status;
  }
}
