import { Pagamento } from "../domain/entities/pagamento";

export interface PagamentoRepository {
  criarPagamento(pagamento: Pagamento): Promise<Pagamento>;
  getById(id: string): Promise<Pagamento | null>;
  atualizarPagamento(pagamento: Pagamento): Promise<Pagamento>;
  deletarPagamento(id: string): Promise<void>;
}
