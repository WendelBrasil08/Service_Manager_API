import { Cliente } from "../domain/entities/Cliente";

export interface ClienteRepository {
  criarCliente(cliente: Cliente): Promise<Cliente>;
  buscarClientePorEmail(email: string): Promise<Cliente | null>;
  buscarClientePorId(id: string): Promise<Cliente | null>;
  buscarTodosClientes(): Promise<Cliente[]>;
  atualizarCliente(cliente: Cliente): Promise<Cliente>;
  deletarCliente(id: string): Promise<void>;
}
