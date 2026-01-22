import { z } from "zod";
import { Agendamento } from "../../../domain/entities/agendamento";
import { AgendamentoStatus } from "../../../domain/enum/agendamento_status";

export const agendamentoSchema = z.object({
  id: z.string(),
  cliente_id: z.string(),
  servico_id: z.string(),
  horario_inicio: z.date(),
  horario_termino: z.date(),
  data_agendamento: z.date(),
  status: z.enum([
    AgendamentoStatus.AGENDADO,
    AgendamentoStatus.REALIZADO,
    AgendamentoStatus.CANCELADO,
  ]),
});
