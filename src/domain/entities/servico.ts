interface ServicoProps {
  id?: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao_minutos: number;
}
export class Servico {
  public readonly id: string;
  public nome: string;
  public descricao: string;
  public preco: number;
  public duracao_minutos: number;

  constructor(props: ServicoProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.nome = props.nome;
    this.descricao = props.descricao;
    this.preco = props.preco;
    this.duracao_minutos = props.duracao_minutos;
  }
}
