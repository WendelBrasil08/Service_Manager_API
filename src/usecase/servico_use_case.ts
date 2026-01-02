import { ServicoRepository } from "../repository/servico_repository.ts";
import { Servico } from "../entity/servico.ts";

export class ServicoUseCase {
  constructor(private servicoRepository: ServicoRepository) {}
  async criarServico(servico: Servico): Promise<Servico> {
    return await this.servicoRepository.criar(servico);
  }
  async buscarServicoPorNome(nome: string): Promise<Servico | null> {
    return await this.servicoRepository.buscarPorNome(nome);
  }
  async atualizarServico(servico: Servico): Promise<Servico> {
    return await this.servicoRepository.atualizar(servico);
  }
  async deletarServico(id: number): Promise<void> {
    return await this.servicoRepository.deletar(id);
  }
}
