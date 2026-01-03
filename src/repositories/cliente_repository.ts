import { Cliente } from "../domain/entities/Cliente.ts";

export interface ClienteRepository {
  criarCliente(cliente: Cliente): Promise<Cliente>;
  buscarClientePorEmail(email: string): Promise<Cliente | null>;
  buscarClientePorId(id: string): Promise<Cliente | null>;
  atualizarCliente(cliente: Cliente): Promise<Cliente>;
  deletarCliente(id: string): Promise<void>;
}
