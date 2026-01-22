import { ClienteRepository } from "../../repositories/cliente_repository";
import { Cliente } from "../../domain/entities/Cliente";
export class InMemoryClienteRepository implements ClienteRepository {
  private clientes: Cliente[] = [];

  async criarCliente(cliente: Cliente): Promise<Cliente> {
    this.clientes.push(cliente);
    return cliente;
  }

  async buscarClientePorEmail(email: string): Promise<Cliente | null> {
    const cliente = this.clientes.find((c) => c.email === email);
    return cliente || null;
  }
  async buscarClientePorId(id: string): Promise<Cliente | null> {
    const cliente = this.clientes.find((c) => c.id === id);
    return cliente || null;
  }
  async buscarTodosClientes(): Promise<Cliente[]> {
    return this.clientes;
  }

  async atualizarCliente(cliente: Cliente): Promise<Cliente> {
    const index = this.clientes.findIndex((c) => c.id === cliente.id);
    if (index === -1) {
      throw new Error("Cliente não encontrado");
    }
    this.clientes[index] = cliente;
    return cliente;
  }

  async deletarCliente(id: string): Promise<void> {
    this.clientes = this.clientes.filter((c) => c.id !== id);
  }
}
