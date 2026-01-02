import { ServicoRepository } from "../servico_repository.ts";
import { Servico } from "../../entity/servico.ts";

export class InMemoryServicoRepository implements ServicoRepository {
  private servicos: Servico[] = [];
  private currentId: number = 1;

  async criar(servico: Servico): Promise<Servico> {
    const novoServico = { ...servico, id: this.currentId++ };
    this.servicos.push(novoServico);
    return novoServico;
  }

  async buscarPorNome(nome: string): Promise<Servico | null> {
    const servico = this.servicos.find((s) => s.nome === nome);
    return servico || null;
  }

  async atualizar(servico: Servico): Promise<Servico> {
    const index = this.servicos.findIndex((s) => s.id === servico.id);
    if (index === -1) {
      throw new Error("Serviço não encontrado");
    }
    this.servicos[index] = servico;
    return servico;
  }

  async deletar(id: number): Promise<void> {
    this.servicos = this.servicos.filter((s) => s.id !== id);
  }
}
