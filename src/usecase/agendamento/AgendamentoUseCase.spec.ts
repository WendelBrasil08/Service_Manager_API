import { randomUUID } from "crypto";
import { describe, it, expect } from "vitest";
import { AgendamentoUseCase } from "./agendamento_use_case";
import { InMemoryAgendamentoRepository } from "../../infra/InMemory/in_memory_agendamento_repository";
import { AgendamentoStatus } from "../../domain/enum/agendamento_status";
import { Agendamento } from "../../domain/entities/agendamento";

describe("AgendamentoUseCase", () => {
  it("deve criar um agendamento com sucesso", async () => {
    const agendamentoRepository = new InMemoryAgendamentoRepository();
    const agendamentoUseCase = new AgendamentoUseCase(agendamentoRepository);

    const agendamento = await agendamentoUseCase.criarAgendamento({
      id: "",
      horario_inicio: new Date("2026-01-01T10:00:00Z"),
      horario_termino: new Date("2026-01-01T11:00:00Z"),
      cliente_id: "cliente1",
      servico_id: "servico1",
      data_agendamento: new Date("2026-01-01"),
      status: AgendamentoStatus.AGENDADO,
    });

    expect(agendamento.id).toBeDefined();
    expect(agendamento.cliente_id).toBe("cliente1");
    expect(agendamento.servico_id).toBe("servico1");
    expect(agendamento.status).toBe(AgendamentoStatus.AGENDADO);
    expect(agendamento.data_agendamento).toEqual(new Date("2026-01-01"));
    expect(agendamento.horario_inicio).toEqual(
      new Date("2026-01-01T10:00:00Z"),
    );
    expect(agendamento.horario_termino).toEqual(
      new Date("2026-01-01T11:00:00Z"),
    );
  });

  it("não deve permitir conflito de horários", async () => {
    const repository = new InMemoryAgendamentoRepository();
    const useCase = new AgendamentoUseCase(repository);

    await useCase.criarAgendamento({
      id: "",
      horario_inicio: new Date("2026-01-01T10:00:00Z"),
      horario_termino: new Date("2026-01-01T11:00:00Z"),
      cliente_id: "1",
      servico_id: "1",
      data_agendamento: new Date(),
      status: AgendamentoStatus.AGENDADO,
    });

    await expect(
      useCase.criarAgendamento({
        id: "",
        horario_inicio: new Date("2026-01-01T10:30:00Z"),
        horario_termino: new Date("2026-01-01T11:30:00Z"),
        cliente_id: "2",
        servico_id: "2",
        data_agendamento: new Date(),
        status: AgendamentoStatus.AGENDADO,
      }),
    ).rejects.toThrow(
      "Regra de negócio violada: Horário conflita com agendamento existente",
    );
  });

  it("não deve permitir fim antes do início", async () => {
    const repository = new InMemoryAgendamentoRepository();
    const useCase = new AgendamentoUseCase(repository);

    await expect(
      useCase.criarAgendamento({
        id: "",
        horario_inicio: new Date("2026-01-01T11:00:00Z"),
        horario_termino: new Date("2026-01-01T10:00:00Z"),
        cliente_id: "1",
        servico_id: "1",
        data_agendamento: new Date(),
        status: AgendamentoStatus.AGENDADO,
      }),
    ).rejects.toThrow(
      "Regra de negócio violada: O horário de término deve ser após o horário de início",
    );
  });
  it("deve buscar agendamento por ID com sucesso", async () => {
    const repository = new InMemoryAgendamentoRepository();
    const useCase = new AgendamentoUseCase(repository);
    const agendamentoCriado = await useCase.criarAgendamento(
      new Agendamento({
        id: randomUUID(),
        horario_inicio: new Date("2026-01-01T10:00:00Z"),
        horario_termino: new Date("2026-01-01T11:00:00Z"),
        cliente_id: "cliente1",
        servico_id: "servico1",
        data_agendamento: new Date("2026-01-01"),
        status: AgendamentoStatus.AGENDADO,
      }),
    );
    const agendamentoBuscado = await useCase.buscarAgendamentoPorId(
      agendamentoCriado.id,
    );
    expect(agendamentoBuscado).toEqual(agendamentoCriado);
    expect(agendamentoBuscado).not.toBeNull();
    expect(agendamentoBuscado?.id).toBe(agendamentoCriado.id);
    expect(agendamentoBuscado?.horario_inicio).toEqual(
      agendamentoCriado.horario_inicio,
    );
  });
  it("não deve permitir buscar agendamento inexistente", async () => {
    const repository = new InMemoryAgendamentoRepository();
    const useCase = new AgendamentoUseCase(repository);
    await expect(
      useCase.buscarAgendamentoPorId("non-existent-id"),
    ).rejects.toThrow("Agendamento não encontrado");
  });
  it("deve atualizar agendamento com sucesso", async () => {
    const repository = new InMemoryAgendamentoRepository();
    const useCase = new AgendamentoUseCase(repository);
    const agendamentoCriado = await useCase.criarAgendamento(
      new Agendamento({
        id: randomUUID(),
        horario_inicio: new Date("2026-01-01T10:00:00Z"),
        horario_termino: new Date("2026-01-01T11:00:00Z"),
        cliente_id: "cliente1",
        servico_id: "servico1",
        data_agendamento: new Date("2026-01-01"),
        status: AgendamentoStatus.AGENDADO,
      }),
    );
    const agendamentoAtualizado = new Agendamento({
      id: agendamentoCriado.id,
      horario_inicio: new Date("2026-01-01T12:00:00Z"),
      horario_termino: new Date("2026-01-01T13:00:00Z"),
      cliente_id: agendamentoCriado.cliente_id,
      servico_id: agendamentoCriado.servico_id,
      data_agendamento: agendamentoCriado.data_agendamento,
      status: agendamentoCriado.status,
    });
    const resultado = await useCase.atualizarAgendamento(agendamentoAtualizado);
    expect(resultado.horario_inicio).toEqual(new Date("2026-01-01T12:00:00Z"));
    expect(resultado.horario_termino).toEqual(new Date("2026-01-01T13:00:00Z"));
  });
  it("não deve permitir atualizar agendamento causando conflito de horários", async () => {
    const repository = new InMemoryAgendamentoRepository();
    const useCase = new AgendamentoUseCase(repository);

    const agendamento1 = await useCase.criarAgendamento(
      new Agendamento({
        id: randomUUID(),
        horario_inicio: new Date("2026-01-01T10:00:00Z"),
        horario_termino: new Date("2026-01-01T11:00:00Z"),
        cliente_id: "cliente1",
        servico_id: "servico1",
        data_agendamento: new Date("2026-01-01"),
        status: AgendamentoStatus.AGENDADO,
      }),
    );
    const agendamento2 = await useCase.criarAgendamento(
      new Agendamento({
        id: randomUUID(),
        horario_inicio: new Date("2026-01-01T11:30:00Z"),
        horario_termino: new Date("2026-01-01T12:30:00Z"),
        cliente_id: "cliente2",
        servico_id: "servico2",
        data_agendamento: new Date("2026-01-01"),
        status: AgendamentoStatus.AGENDADO,
      }),
    );
    const agendamentoAtualizado = new Agendamento({
      id: agendamento2.id,
      horario_inicio: new Date("2026-01-01T10:30:00Z"),
      horario_termino: new Date("2026-01-01T11:30:00Z"),
      cliente_id: agendamento2.cliente_id,
      servico_id: agendamento2.servico_id,
      data_agendamento: agendamento2.data_agendamento,
      status: agendamento2.status,
    });
    await expect(
      useCase.atualizarAgendamento(agendamentoAtualizado),
    ).rejects.toThrow(
      "Regra de negócio violada: Horário conflita com agendamento existente",
    );
  });
  it("não deve permitir atualizar agendamento inexistente", async () => {
    const repository = new InMemoryAgendamentoRepository();
    const useCase = new AgendamentoUseCase(repository);
    await expect(
      useCase.atualizarAgendamento({
        id: "non-existent-id",
        horario_inicio: new Date("2026-01-01T10:00:00Z"),
        horario_termino: new Date("2026-01-01T11:00:00Z"),
        cliente_id: "cliente1",
        servico_id: "servico1",
        data_agendamento: new Date("2026-01-01"),
        status: AgendamentoStatus.AGENDADO,
      }),
    ).rejects.toThrow("Agendamento não encontrado");
  });
  it("deve deletar agendamento com sucesso", async () => {
    const repository = new InMemoryAgendamentoRepository();
    const useCase = new AgendamentoUseCase(repository);
    const agendamentoCriado = await useCase.criarAgendamento(
      new Agendamento({
        id: randomUUID(),
        horario_inicio: new Date("2026-01-01T10:00:00Z"),
        horario_termino: new Date("2026-01-01T11:00:00Z"),
        cliente_id: "cliente1",
        servico_id: "servico1",
        data_agendamento: new Date("2026-01-01"),
        status: AgendamentoStatus.AGENDADO,
      }),
    );
    await useCase.deletarAgendamento(agendamentoCriado.id);
    await expect(
      useCase.buscarAgendamentoPorId(agendamentoCriado.id),
    ).rejects.toThrow("Agendamento não encontrado");
  });
  it("não deve permitir deletar agendamento inexistente", async () => {
    const repository = new InMemoryAgendamentoRepository();
    const useCase = new AgendamentoUseCase(repository);
    await expect(useCase.deletarAgendamento("non-existent-id")).rejects.toThrow(
      "Agendamento não encontrado",
    );
  });
});
