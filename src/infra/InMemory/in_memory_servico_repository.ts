import { ServicoRepository } from "../../repositories/servico_repository";
import { Servico } from "../../domain/entities/servico";

export class InMemoryServicoRepository implements ServicoRepository {
  async listarServicos(): Promise<Servico[]> {
    return this.servicos;
  }
  private servicos: Servico[] = [];

  async criarServico(servico: Servico): Promise<Servico> {
    this.servicos.push(servico);
    return servico;
  }

  async buscarServicoPorNome(nome: string): Promise<Servico | null> {
    const servico = this.servicos.find((s) => s.nome === nome);
    return servico || null;
  }

  async bucarServicoPorId(id: string): Promise<Servico | null> {
    const servico = this.servicos.find((s) => s.id === id);
    return servico || null;
  }
  async atualizarServico(servico: Servico): Promise<Servico> {
    const index = this.servicos.findIndex((s) => s.id === servico.id);
    if (index === -1) {
      throw new Error("Serviço não encontrado");
    }
    this.servicos[index] = servico;
    return servico;
  }

  async deletarServico(id: string): Promise<void> {
    this.servicos = this.servicos.filter((s) => s.id !== id);
  }
}
