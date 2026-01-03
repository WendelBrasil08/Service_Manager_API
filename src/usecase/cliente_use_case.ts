import { ClienteRepository } from "../repositories/cliente_repository.ts";
import { Cliente } from "../domain/entities/Cliente.ts";
import { randomUUID } from "crypto";
export class ClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) {}
  async criarCliente(cliente: Cliente): Promise<Cliente> {
    const c = new Cliente(
      randomUUID(),
      cliente.nome_completo,
      cliente.email,
      cliente.telefone
    );
    return await this.clienteRepository.criarCliente(c);
  }
  async buscarClientePorEmail(email: string): Promise<Cliente | null> {
    return await this.clienteRepository.buscarClientePorEmail(email);
  }
  async buscarClientePorId(id: string): Promise<Cliente | null> {
    return await this.clienteRepository.buscarClientePorId(id);
  }
  async atualizarCliente(cliente: Cliente): Promise<Cliente> {
    return await this.clienteRepository.atualizarCliente(cliente);
  }
  async deletarCliente(id: string): Promise<void> {
    return await this.clienteRepository.deletarCliente(id);
  }
}
