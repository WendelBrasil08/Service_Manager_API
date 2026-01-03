import { Pagamento } from "../domain/entities/pagamento.ts";

export interface PagamentoRepository {
  criarPagamento(pagamento: Pagamento): Promise<Pagamento>;
  getByClienteId(clienteId: string): Promise<Pagamento[]>;
  atualizarPagamento(pagamento: Pagamento): Promise<Pagamento>;
  deletarPagamento(id: string): Promise<void>;
}
