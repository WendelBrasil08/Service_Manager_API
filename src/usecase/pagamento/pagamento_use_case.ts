import { PagamentoRepository } from "../../repositories/pagamento_repository";
import { Pagamento } from "../../domain/entities/pagamento";
import { randomUUID } from "crypto";
import { BusinessRuleError } from "../../domain/errors/BusinessRuleError";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import id from "zod/v4/locales/id.js";

export class PagamentoUseCase {
  constructor(private pagamentoRepository: PagamentoRepository) {}
  async criarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    if (pagamento.valor <= 0) {
      throw new BusinessRuleError(
        "O valor do pagamento deve ser maior que zero",
      );
    }
    if (!pagamento.agendamento_id) {
      throw new NotFoundError("Agendamento ID é obrigatório");
    }
    const p = new Pagamento({
      id: randomUUID(),
      agendamento_id: pagamento.agendamento_id,
      metodo_pagamento: pagamento.metodo_pagamento,
      valor: pagamento.valor,
      data_pagamento: pagamento.data_pagamento,
      status: pagamento.status,
    });
    return await this.pagamentoRepository.criarPagamento(p);
  }
  async getById(id: string): Promise<Pagamento | null> {
    if (!id) {
      throw new NotFoundError("Pagamento não encontrado");
    }
    return await this.pagamentoRepository.getById(id);
  }
  async atualizarPagamento(pagamento: Pagamento): Promise<Pagamento | null> {
    const existingPagamento = await this.pagamentoRepository.getById(
      pagamento.id,
    );
    if (!existingPagamento) {
      throw new NotFoundError("Pagamento não encontrado");
    }
    return await this.pagamentoRepository.atualizarPagamento(pagamento);
  }
  async deletarPagamento(id: string): Promise<void> {
    const existingPagamento = await this.pagamentoRepository.getById(id);
    if (!existingPagamento) {
      throw new NotFoundError("Pagamento não encontrado");
    }
    return await this.pagamentoRepository.deletarPagamento(id);
  }
}
