import { z } from "zod";
import { MetodoPagamento } from "../../../domain/enum/metodo_pagamento";
import { PagamentoStatus } from "../../../domain/enum/pagamento_status";

export const pagamentoSchema = z.object({
  id: z.string(),
  agendamento_id: z.string(),
  metodo_pagamento: z.enum([
    MetodoPagamento.CARTAO_CREDITO,
    MetodoPagamento.CARTAO_DEBITO,
    MetodoPagamento.DINHEIRO,
    MetodoPagamento.PIX,
  ]),
  valor: z.number().nonnegative(),
  data_pagamento: z.date(),
  status: z.enum([
    PagamentoStatus.PENDENTE,
    PagamentoStatus.CONFIRMADO,
    PagamentoStatus.CANCELADO,
  ]),
});
