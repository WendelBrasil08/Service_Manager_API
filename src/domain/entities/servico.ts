export class Servico {
  constructor(
    public readonly id: string,
    public nome: string,
    public descricao: string,
    public preco: number,
    public duracao_minutos: number
  ) {}
}
