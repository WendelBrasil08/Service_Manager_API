interface ServicoRepository {
  criar(servico: Servico): Promise<Servico>;
  buscarPorNome(nome: string): Promise<Servico | null>;
  atualizar(servico: Servico): Promise<Servico>;
  deletar(id: number): Promise<void>;
}
