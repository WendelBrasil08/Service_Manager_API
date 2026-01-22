import { MetodoPagamento } from "../enum/metodo_pagamento";
import { PagamentoStatus } from "../enum/pagamento_status";

interface PagamentoProps {
  id?: string;
  agendamento_id: string;
  metodo_pagamento: MetodoPagamento;
  valor: number;
  data_pagamento: Date;
  status: PagamentoStatus;
}

export class Pagamento {
  public readonly id: string;
  public readonly agendamento_id: string;
  public readonly metodo_pagamento: MetodoPagamento;
  public readonly valor: number;
  public readonly data_pagamento: Date;
  public status: PagamentoStatus;
  constructor(props: PagamentoProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.agendamento_id = props.agendamento_id;
    this.metodo_pagamento = props.metodo_pagamento;
    this.valor = props.valor;
    this.data_pagamento = props.data_pagamento;
    this.status = props.status;
  }
}
