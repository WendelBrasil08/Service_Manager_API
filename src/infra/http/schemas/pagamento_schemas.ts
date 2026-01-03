import { z } from "zod";

export const pagamentoSchema = z.object({
  id: z.string().optional(),
  agendamento_id: z.string(),
  metodo_pagamento: z.enum([
    "CARTAO_CREDITO",
    "CARTAO_DEBITO",
    "DINHEIRO",
    "PIX",
  ]),
  valor: z.number().nonnegative(),
  data_pagamento: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Data de pagamento inválida",
    }),
  status: z.enum(["PENDENTE", "COMPLETO", "CANCELADO"]),
});
