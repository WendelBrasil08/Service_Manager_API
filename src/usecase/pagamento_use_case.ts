import { PagamentoRepository } from "../repositories/pagamento_repository.ts";
import { Pagamento } from "../domain/entities/pagamento.ts";

export class PagamentoUseCase {
  constructor(private pagamentoRepository: PagamentoRepository) {}
  async criarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    return await this.pagamentoRepository.criar(pagamento);
  }
  async atualizarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    return await this.pagamentoRepository.atualizar(pagamento);
  }
  async deletarPagamento(id: number): Promise<void> {
    return await this.pagamentoRepository.deletar(id);
  }
}
