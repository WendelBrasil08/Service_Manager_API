import { z } from "zod";

export const agendamentoSchema = z.object({
  id: z.string().optional(),
  data: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), { message: "Data inválida" }),
  horario_inicio: z
    .string()
    .refine((time) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(time), {
      message: "Horário de início inválido",
    }),
  horario_termino: z
    .string()
    .refine((time) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(time), {
      message: "Horário de término inválido",
    }),
  duracao: z.number().positive(),
  servico_id: z.string(),
  cliente_id: z.string(),
});
