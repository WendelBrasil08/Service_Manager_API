import { PagamentoRepository } from "../repository/pagamento_repository.ts";
import { Pagamento } from "../entity/pagamento.ts";

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
