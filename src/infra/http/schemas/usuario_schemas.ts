import { z } from "zod";

export const usuarioSchema = z.object({
  id: z.string(),
  nome: z.string().min(3),
  email: z.string(),
  senha: z.string().min(6),
  data_criacao: z.date(),
});
