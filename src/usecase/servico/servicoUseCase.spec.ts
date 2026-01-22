import { InMemoryServicoRepository } from "./../../infra/InMemory/in_memory_servico_repository";
import { ServicoUseCase } from "./servico_use_case";
import { describe, it, expect } from "vitest";

describe("Serviço UseCase", async () => {
  it("deve criar servico com sucesso", async () => {
    const servicoRepository = new InMemoryServicoRepository();
    const servicoUseCase = new ServicoUseCase(servicoRepository);
    const servico = await servicoUseCase.criarServico({
      id: "",
      nome: "Corte",
      descricao: "Corte de Cabelo",
      preco: 35.0,
      duracao_minutos: 30,
    });
    expect(servico.id).toBeDefined();
    expect(servico.nome).toBe("Corte");
  });
  it("nao deve criar servico com nome duplicado", async () => {
    const servicoRepository = new InMemoryServicoRepository();
    const servicoUseCase = new ServicoUseCase(servicoRepository);
    await servicoUseCase.criarServico({
      id: "",
      nome: "Corte",
      descricao: "Corte de Cabelo",
      preco: 35.0,
      duracao_minutos: 30,
    });
    await expect(
      servicoUseCase.criarServico({
        id: "",
        nome: "Corte",
        descricao: "Corte de Cabelo",
        preco: 35.0,
        duracao_minutos: 30,
      }),
    ).rejects.toThrow();
  });
  it("nao deve criar servico sem nome", async () => {
    const servicoRepository = new InMemoryServicoRepository();
    const servicoUseCase = new ServicoUseCase(servicoRepository);
    await expect(
      servicoUseCase.criarServico({
        id: "",
        nome: "",
        descricao: "Corte de Cabelo",
        preco: 35.0,
        duracao_minutos: 30,
      }),
    ).rejects.toThrow();
  });
  it("deve buscar servico por nome com sucesso", async () => {
    const servicoRepository = new InMemoryServicoRepository();
    const servicoUseCase = new ServicoUseCase(servicoRepository);
    await servicoUseCase.criarServico({
      id: "",
      nome: "Corte",
      descricao: "Corte de Cabelo",
      preco: 35.0,
      duracao_minutos: 30,
    });
    const servico = await servicoUseCase.buscarServicoPorNome("Corte");
    expect(servico?.id).toBeDefined();
    expect(servico?.nome).toBe("Corte");
  });
  it("deve atualizar um servico com sucesso", async () => {
    const servicoRepository = new InMemoryServicoRepository();
    const servicoUseCase = new ServicoUseCase(servicoRepository);
    const servico = await servicoUseCase.criarServico({
      id: "",
      nome: "Corte",
      descricao: "Corte de Cabelo",
      preco: 35.0,
      duracao_minutos: 30,
    });
    expect(servico.id).toBeDefined();
    expect(servico.nome).toBe("Corte");
    const servicoAtualizado = await servicoUseCase.atualizarServico(servico);
    expect(servicoAtualizado.id).toBeDefined();
    expect(servicoAtualizado.nome).toBe("Corte");
  });
  it("nao deve atualizar um servico inexistente", async () => {
    const servicoRepository = new InMemoryServicoRepository();
    const servicoUseCase = new ServicoUseCase(servicoRepository);
    const servico = await servicoUseCase.criarServico({
      id: "",
      nome: "Corte",
      descricao: "Corte de Cabelo",
      preco: 35.0,
      duracao_minutos: 30,
    });
    expect(servico.id).toBeDefined();
    expect(servico.nome).toBe("Corte");
    const servicoAtualizado = await servicoUseCase.atualizarServico(servico);
    expect(servicoAtualizado.id).toBeDefined();
    expect(servicoAtualizado.nome).toBe("Corte");
  });
  it("deve deletar um servico com sucesso", async () => {
    const servicoRepository = new InMemoryServicoRepository();
    const servicoUseCase = new ServicoUseCase(servicoRepository);
    const servico = await servicoUseCase.criarServico({
      id: "",
      nome: "Corte",
      descricao: "Corte de Cabelo",
      preco: 35.0,
      duracao_minutos: 30,
    });
    expect(servico.id).toBeDefined();
    expect(servico.nome).toBe("Corte");
    await servicoUseCase.deletarServico(servico.id);
    const servicoDeletado = await servicoUseCase.buscarServicoPorNome("Corte");
    expect(servicoDeletado).toBeNull();
  });
  it("nao deve deletar um servico inexistente", async () => {
    const servicoRepository = new InMemoryServicoRepository();
    const servicoUseCase = new ServicoUseCase(servicoRepository);
    const servico = await servicoUseCase.criarServico({
      id: "",
      nome: "Corte",
      descricao: "Corte de Cabelo",
      preco: 35.0,
      duracao_minutos: 30,
    });
    expect(servico.id).toBeDefined();
    expect(servico.nome).toBe("Corte");
    await servicoUseCase.deletarServico(servico.id);
    const servicoDeletado = await servicoUseCase.buscarServicoPorNome("Corte");
    expect(servicoDeletado).toBeNull();
  });
});
