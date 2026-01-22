interface UsuarioProps {
  id?: string;
  nome: string;
  senha: string;
  email: string;
  data_criacao: Date;
}
export class Usuario {
  public readonly id: string;
  public nome: string;
  public senha: string;
  public email: string;
  public readonly data_criacao: Date;
  constructor(props: UsuarioProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.nome = props.nome;
    this.senha = props.senha;
    this.email = props.email;
    this.data_criacao = props.data_criacao;
  }
}
