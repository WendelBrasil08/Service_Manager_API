import { ClienteRepository } from "../repository/cliente_repository.ts";
import { Cliente } from "../entity/Cliente.ts";

export class ClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) {}
  async criarCliente(cliente: Cliente): Promise<Cliente> {
    return await this.clienteRepository.criar(cliente);
  }
  async buscarClientePorEmail(email: string): Promise<Cliente | null> {
    return await this.clienteRepository.buscarPorEmail(email);
  }
  async buscarClientePorId(id: number): Promise<Cliente | null> {
    return await this.clienteRepository.buscarPorId(id);
  }
  async atualizarCliente(cliente: Cliente): Promise<Cliente> {
    return await this.clienteRepository.atualizar(cliente);
  }
  async deletarCliente(id: number): Promise<void> {
    return await this.clienteRepository.deletar(id);
  }
}
