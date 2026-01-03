export class Cliente {
  constructor(
    public readonly id: string,
    public nome_completo: string,
    public email: string,
    public telefone?: string
  ) {}
}
