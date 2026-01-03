import { PagamentoRepository } from "../repositories/pagamento_repository.ts";
import { Pagamento } from "../domain/entities/pagamento.ts";
import { randomUUID } from "crypto";

export class PagamentoUseCase {
  constructor(private pagamentoRepository: PagamentoRepository) {}
  async criarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    const p = new Pagamento(
      randomUUID(),
      pagamento.agendamento_id,
      pagamento.metodo_pagamento,
      pagamento.valor,
      new Date(),
      pagamento.status
    );
    return await this.pagamentoRepository.criarPagamento(p);
  }
  async getByClienteId(clienteId: string): Promise<Pagamento[]> {
    return await this.pagamentoRepository.getByClienteId(clienteId);
  }
  async atualizarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    return await this.pagamentoRepository.atualizarPagamento(pagamento);
  }
  async deletarPagamento(id: string): Promise<void> {
    return await this.pagamentoRepository.deletarPagamento(id);
  }
}
