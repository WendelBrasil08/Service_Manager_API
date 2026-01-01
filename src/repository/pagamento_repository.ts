interface PagamentoRepository {
  criar(pagamento: Pagamento): Promise<Pagamento>;
  atualizar(pagamento: Pagamento): Promise<Pagamento>;
  deletar(id: number): Promise<void>;
}
