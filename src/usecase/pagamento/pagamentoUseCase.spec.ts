import { describe, it, expect } from "vitest";
import { PagamentoUseCase } from "./pagamento_use_case";
import { InMemoryPagamentoRepository } from "../../infra/InMemory/in_memory_pagamento_repository";
import { PagamentoStatus } from "../../domain/enum/pagamento_status";
import { MetodoPagamento } from "../../domain/enum/metodo_pagamento";
describe("PagamentoUseCase", () => {
  it("deve criar um pagamento com sucesso", async () => {
    const pagamentoRepository = new InMemoryPagamentoRepository();
    const pagamentoUseCase = new PagamentoUseCase(pagamentoRepository);
    const pagamento = await pagamentoUseCase.criarPagamento({
      id: "",
      agendamento_id: "agendamento-123",
      metodo_pagamento: MetodoPagamento.CARTAO_CREDITO,
      valor: 150.0,
      data_pagamento: new Date(),
      status: PagamentoStatus.PENDENTE,
    });
    expect(pagamento.id).toBeDefined();
    expect(pagamento.agendamento_id).toBe("agendamento-123");
    expect(pagamento.metodo_pagamento).toBe(MetodoPagamento.CARTAO_CREDITO);
    expect(pagamento.valor).toBe(150.0);
    expect(pagamento.data_pagamento).toBeInstanceOf(Date);
    expect(pagamento.status).toBe(PagamentoStatus.PENDENTE);
  });
  it("não deve criar um pagamento com valor inválido", async () => {
    const pagamentoRepository = new InMemoryPagamentoRepository();
    const pagamentoUseCase = new PagamentoUseCase(pagamentoRepository);
    await expect(
      pagamentoUseCase.criarPagamento({
        id: "",
        agendamento_id: "agendamento-123",
        metodo_pagamento: MetodoPagamento.CARTAO_CREDITO,
        valor: -50.0,
        data_pagamento: new Date(),
        status: PagamentoStatus.PENDENTE,
      }),
    ).rejects.toThrow(
      "Regra de negócio violada: O valor do pagamento deve ser maior que zero",
    );
  });
  it("não deve criar um pagamento sem agendamento ID", async () => {
    const pagamentoRepository = new InMemoryPagamentoRepository();
    const pagamentoUseCase = new PagamentoUseCase(pagamentoRepository);
    await expect(
      pagamentoUseCase.criarPagamento({
        id: "",
        agendamento_id: "",
        metodo_pagamento: MetodoPagamento.BOLETO,
        valor: 100.0,
        data_pagamento: new Date(),
        status: PagamentoStatus.PENDENTE,
      }),
    ).rejects.toThrow("Agendamento ID é obrigatório");
  });
  it("deve buscar pagamentos por ID do cliente", async () => {
    const pagamentoRepository = new InMemoryPagamentoRepository();
    const pagamentoUseCase = new PagamentoUseCase(pagamentoRepository);
    const pagamentoCriado = await pagamentoUseCase.criarPagamento({
      id: "",
      agendamento_id: "agendamento-456",
      metodo_pagamento: MetodoPagamento.PIX,
      valor: 200.0,
      data_pagamento: new Date(),
      status: PagamentoStatus.PAGO,
    });
    const pagamentoBuscado = await pagamentoUseCase.getById(pagamentoCriado.id);
    expect(pagamentoBuscado?.id).toBe(pagamentoCriado.id);
    expect(pagamentoBuscado?.agendamento_id).toBe(
      pagamentoCriado.agendamento_id,
    );
    expect(pagamentoBuscado?.metodo_pagamento).toBe(
      pagamentoCriado.metodo_pagamento,
    );
    expect(pagamentoBuscado?.valor).toBe(pagamentoCriado.valor);
    expect(pagamentoBuscado?.data_pagamento).toBe(
      pagamentoCriado.data_pagamento,
    );
    expect(pagamentoBuscado?.status).toBe(pagamentoCriado.status);
  });
  it("deve buscar pagamentos por ID do cliente", async () => {
    const pagamentoRepository = new InMemoryPagamentoRepository();
    const pagamentoUseCase = new PagamentoUseCase(pagamentoRepository);
    await expect(pagamentoUseCase.getById("")).rejects.toThrow(
      "Pagamento não encontrado",
    );
  });
  it("deve atualizar um pagamento", async () => {
    const pagamentoRepository = new InMemoryPagamentoRepository();
    const pagamentoUseCase = new PagamentoUseCase(pagamentoRepository);
    const pagamentoCriado = await pagamentoUseCase.criarPagamento({
      id: "",
      agendamento_id: "agendamento-789",
      metodo_pagamento: MetodoPagamento.PIX,
      valor: 300.0,
      data_pagamento: new Date(),
      status: PagamentoStatus.PENDENTE,
    });
    pagamentoCriado.status = PagamentoStatus.PAGO;
    const pagamentoAtualizado =
      await pagamentoUseCase.atualizarPagamento(pagamentoCriado);
    expect(pagamentoAtualizado).not.toBeNull();
    expect(pagamentoAtualizado?.status).toBe(PagamentoStatus.PAGO);
    expect(pagamentoAtualizado?.id).toBe(pagamentoCriado.id);
    expect(pagamentoAtualizado?.agendamento_id).toBe(
      pagamentoCriado.agendamento_id,
    );
    expect(pagamentoAtualizado?.metodo_pagamento).toBe(
      pagamentoCriado.metodo_pagamento,
    );
    expect(pagamentoAtualizado?.valor).toBe(pagamentoCriado.valor);
    expect(pagamentoAtualizado?.data_pagamento).toBe(
      pagamentoCriado.data_pagamento,
    );
    expect(pagamentoAtualizado?.status).toBe(pagamentoCriado.status);
  });
  it("não deve atualizar um pagamento inexistente", async () => {
    const pagamentoRepository = new InMemoryPagamentoRepository();
    const pagamentoUseCase = new PagamentoUseCase(pagamentoRepository);
    await expect(
      pagamentoUseCase.atualizarPagamento({
        id: "pagamento-inexistente",
        agendamento_id: "agendamento-789",
        metodo_pagamento: MetodoPagamento.PIX,
        valor: 300.0,
        data_pagamento: new Date(),
        status: PagamentoStatus.PENDENTE,
      }),
    ).rejects.toThrow("Pagamento não encontrado");
  });
  it("deve deletar um pagamento", async () => {
    const pagamentoRepository = new InMemoryPagamentoRepository();
    const pagamentoUseCase = new PagamentoUseCase(pagamentoRepository);
    const pagamentoCriado = await pagamentoUseCase.criarPagamento({
      id: "",
      agendamento_id: "agendamento-101",
      metodo_pagamento: MetodoPagamento.CARTAO_DEBITO,
      valor: 400.0,
      data_pagamento: new Date(),
      status: PagamentoStatus.PENDENTE,
    });
    await pagamentoUseCase.deletarPagamento(pagamentoCriado.id);
    const pagamentoBuscado = await pagamentoUseCase.getById(pagamentoCriado.id);
    expect(pagamentoBuscado).toBeNull();
  });
  it("não deve deletar um pagamento inexistente", async () => {
    const pagamentoRepository = new InMemoryPagamentoRepository();
    const pagamentoUseCase = new PagamentoUseCase(pagamentoRepository);
    await expect(
      pagamentoUseCase.deletarPagamento("pagamento-inexistente"),
    ).rejects.toThrow("Pagamento não encontrado");
  });
});
