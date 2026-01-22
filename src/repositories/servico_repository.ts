import { Servico } from "../domain/entities/servico";

export interface ServicoRepository {
  criarServico(servico: Servico): Promise<Servico>;
  buscarServicoPorNome(nome: string): Promise<Servico | null>;
  bucarServicoPorId(id: string): Promise<Servico | null>;
  atualizarServico(servico: Servico): Promise<Servico>;
  deletarServico(id: string): Promise<void>;
}
