interface ClienteProps {
  id?: string;
  nome_completo: string;
  email: string;
  telefone?: string;
}
export class Cliente {
  public readonly id: string;
  public nome_completo: string;
  public readonly email: string;
  public readonly telefone?: string;
  constructor(props: ClienteProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.nome_completo = props.nome_completo;
    this.email = props.email;
    this.telefone = props.telefone;
  }
}
