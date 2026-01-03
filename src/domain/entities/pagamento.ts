import { MetodoPagamento } from "../enum/metodo_pagamento.ts";
import { PagamentoStatus } from "../enum/pagamento_status.ts";

export class Pagamento {
  constructor(
    public readonly id: string,
    public agendamento_id: string,
    public metodo_pagamento: MetodoPagamento,
    public valor: string,
    public data_pagamento: Date,
    public status: PagamentoStatus
  ) {}
}
