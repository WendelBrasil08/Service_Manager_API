export class Usuario {
  constructor(
    public readonly id: string,
    public nome: string,
    public senha: string,
    public email: string,
    public data_criacao: Date
  ) {}
}
