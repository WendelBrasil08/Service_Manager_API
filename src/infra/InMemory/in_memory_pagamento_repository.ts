import { PagamentoRepository } from "../../repositories/pagamento_repository.ts";
import { Pagamento } from "../../domain/entities/pagamento.ts";

export class InMemoryPagamentoRepository implements PagamentoRepository {
  private pagamentos: Pagamento[] = [];

  async criarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    this.pagamentos.push(pagamento);
    return pagamento;
  }
  async getByClienteId(clienteId: string): Promise<Pagamento[]> {
    const pagamentos = this.pagamentos.filter(
      (p) => p.agendamento_id === clienteId
    );
    return pagamentos;
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
