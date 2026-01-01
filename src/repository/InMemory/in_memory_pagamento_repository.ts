export class InMemoryPagamentoRepository implements PagamentoRepository {
  private pagamentos: Pagamento[] = [];

  async criar(pagamento: Pagamento): Promise<Pagamento> {
    this.pagamentos.push(pagamento);
    return pagamento;
  }
  async atualizar(pagamento: Pagamento): Promise<Pagamento> {
    const index = this.pagamentos.findIndex((p) => p.id === pagamento.id);
    if (index === -1) {
      throw new Error("Pagamento não encontrado");
    }
    this.pagamentos[index] = pagamento;
    return pagamento;
  }

  async deletar(id: number): Promise<void> {
    this.pagamentos = this.pagamentos.filter((p) => p.id !== id);
  }
}
