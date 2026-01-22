import { ClienteRepository } from "../../repositories/cliente_repository";
import { Cliente } from "../../domain/entities/Cliente";
import { randomUUID } from "crypto";
import { NotFoundError } from "../../domain/errors/NotFoundError";
export class ClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) {}
  async criarCliente(cliente: Cliente): Promise<Cliente> {
    const emailExists = await this.clienteRepository.buscarClientePorEmail(
      cliente.email,
    );
    if (emailExists) {
      throw new Error("Email ja cadastrado");
    }
    if (!cliente.email.includes("@")) {
      throw new Error("Email inválido");
    }
    const c = new Cliente({
      id: randomUUID(),
      nome_completo: cliente.nome_completo,
      email: cliente.email,
      telefone: cliente.telefone,
    });
    return await this.clienteRepository.criarCliente(c);
  }
  async buscarClientePorEmail(email: string): Promise<Cliente | null> {
    if (!email.includes("@")) {
      throw new Error("Adicione um email válido");
    }
    const existingCliente =
      await this.clienteRepository.buscarClientePorEmail(email);
    if (!existingCliente) {
      throw new NotFoundError("Cliente não encontrado");
    }
    return await this.clienteRepository.buscarClientePorEmail(email);
  }
  async buscarClientePorId(id: string): Promise<Cliente | null> {
    if (!id) {
      throw new Error("ID é obrigatório");
    }
    return await this.clienteRepository.buscarClientePorId(id);
  }
  async atualizarCliente(cliente: Cliente): Promise<Cliente> {
    const existingCliente = await this.clienteRepository.buscarClientePorId(
      cliente.id,
    );
    if (!existingCliente) {
      throw new NotFoundError("Cliente não encontrado");
    }
    return await this.clienteRepository.atualizarCliente(cliente);
  }
  async deletarCliente(id: string): Promise<void> {
    const existingCliente = await this.clienteRepository.buscarClientePorId(id);
    if (!existingCliente) {
      throw new NotFoundError("Cliente não encontrado");
    }
    return await this.clienteRepository.deletarCliente(id);
  }
}
