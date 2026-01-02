import { MetodoPagamento } from "../enum/metodo_pagamento.ts";
import { PagamentoStatus } from "../enum/pagamento_status.ts";

export interface Pagamento {
  id: number;
  agendamento_id: number;
  metodo_pagamento: MetodoPagamento;
  valor: number;
  data_pagamento: Date;
  status: PagamentoStatus;
}
