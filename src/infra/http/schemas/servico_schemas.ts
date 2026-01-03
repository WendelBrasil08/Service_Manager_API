import { z } from "zod";

export const servicoSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(3),
  descricao: z.string().min(5),
  preco: z.number().nonnegative(),
  duracao_minutos: z.number().positive(),
});
