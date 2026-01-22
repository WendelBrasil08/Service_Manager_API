import { z } from "zod";

export const clienteSchema = z.object({
  id: z.string(),
  nome_completo: z.string().min(3),
  email: z.string(),
  telefone: z.string().optional(),
});
export type ClienteSchema = z.infer<typeof clienteSchema>;
