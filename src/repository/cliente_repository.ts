interface ClienteRepository {
  criar(cliente: Cliente): Promise<Cliente>;
  buscarPorEmail(email: string): Promise<Cliente | null>;
  buscarPorId(id: number): Promise<Cliente | null>;
  atualizar(cliente: Cliente): Promise<Cliente>;
  deletar(id: number): Promise<void>;
}
