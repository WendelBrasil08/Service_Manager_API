export class InMemoryClienteRepository implements ClienteRepository {
  private clientes: Cliente[] = [];
  private currentId: number = 1;

  async criar(cliente: Cliente): Promise<Cliente> {
    const novoCliente = { ...cliente, id: this.currentId++ };
    this.clientes.push(novoCliente);
    return novoCliente;
  }
  async buscarPorEmail(email: string): Promise<Cliente | null> {
    const cliente = this.clientes.find((c) => c.email === email);
    return cliente || null;
  }
  async buscarPorId(id: number): Promise<Cliente | null> {
    const cliente = this.clientes.find((c) => c.id === id);
    return cliente || null;
  }

  async atualizar(cliente: Cliente): Promise<Cliente> {
    const index = this.clientes.findIndex((c) => c.id === cliente.id);
    if (index === -1) {
      throw new Error("Cliente não encontrado");
    }
    this.clientes[index] = cliente;
    return cliente;
  }

  async deletar(id: number): Promise<void> {
    this.clientes = this.clientes.filter((c) => c.id !== id);
  }
}
