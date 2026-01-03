import { z } from "zod";

export const usuarioSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(3),
  email: z.string().email(),
  senha: z.string().min(6),
});
