import { ServicoRepository } from "../repositories/servico_repository.ts";
import { Servico } from "../domain/entities/servico.ts";
import { randomUUID } from "crypto";

export class ServicoUseCase {
  constructor(private servicoRepository: ServicoRepository) {}
  async criarServico(servico: Servico): Promise<Servico> {
    const s = new Servico(
      randomUUID(),
      servico.nome,
      servico.descricao,
      servico.preco,
      servico.duracao_minutos
    );
    return await this.servicoRepository.criarServico(s);
  }
  async buscarServicoPorNome(nome: string): Promise<Servico | null> {
    return await this.servicoRepository.buscarServicoPorNome(nome);
  }
  async atualizarServico(servico: Servico): Promise<Servico> {
    return await this.servicoRepository.atualizarServico(servico);
  }
  async deletarServico(nome: string): Promise<void> {
    return await this.servicoRepository.deletarServico(nome);
  }
}
