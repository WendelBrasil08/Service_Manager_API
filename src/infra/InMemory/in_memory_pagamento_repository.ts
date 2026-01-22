import { PagamentoRepository } from "../../repositories/pagamento_repository";
import { Pagamento } from "../../domain/entities/pagamento";

export class InMemoryPagamentoRepository implements PagamentoRepository {
  private pagamentos: Pagamento[] = [];

  async criarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    this.pagamentos.push(pagamento);
    return pagamento;
  }
  async getById(id: string): Promise<Pagamento | null> {
    const pagamento = this.pagamentos.find((p) => p.id === id);
    return pagamento || null;
  }
  async atualizarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    const index = this.pagamentos.findIndex((p) => p.id === pagamento.id);
    if (index === -1) {
      throw new Error("Pagamento não encontrado");
    }
    this.pagamentos[index] = pagamento;
    return pagamento;
  }

  async deletarPagamento(id: string): Promise<void> {
    this.pagamentos = this.pagamentos.filter((p) => p.id !== id);
  }
}
