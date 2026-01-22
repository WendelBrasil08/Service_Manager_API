import { ServicoRepository } from "../../repositories/servico_repository";
import { Servico } from "../../domain/entities/servico";
import { randomUUID } from "crypto";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { BusinessRuleError } from "../../domain/errors/BusinessRuleError";

export class ServicoUseCase {
  constructor(private servicoRepository: ServicoRepository) {}
  async criarServico(servico: Servico): Promise<Servico> {
    if (servico.nome === "") throw new Error("Nome nao pode ser vazio");
    const encontrarServiço = await this.servicoRepository.buscarServicoPorNome(
      servico.nome,
    );
    if (encontrarServiço) throw new BusinessRuleError("Serviço ja cadastrado");
    const s = new Servico({
      id: randomUUID(),
      nome: servico.nome,
      descricao: servico.descricao,
      preco: servico.preco,
      duracao_minutos: servico.duracao_minutos,
    });
    return await this.servicoRepository.criarServico(s);
  }
  async buscarServicoPorNome(nome: string): Promise<Servico | null> {
    if (!nome) return null;
    return await this.servicoRepository.buscarServicoPorNome(nome);
  }
  async atualizarServico(servico: Servico): Promise<Servico> {
    const encontrarServiço = await this.servicoRepository.bucarServicoPorId(
      servico.id,
    );
    if (!encontrarServiço) throw new NotFoundError("Serviço nao encontrado");
    return await this.servicoRepository.atualizarServico(servico);
  }
  async deletarServico(id: string): Promise<void> {
    const encontrarServiço = await this.servicoRepository.bucarServicoPorId(id);
    if (!encontrarServiço) throw new NotFoundError("Serviço nao encontrado");
    return await this.servicoRepository.deletarServico(id);
  }
}
