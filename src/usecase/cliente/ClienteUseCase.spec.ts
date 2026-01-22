import { describe, it, expect } from "vitest";
import { ClienteUseCase } from "./cliente_use_case";
import { InMemoryClienteRepository } from "../../infra/InMemory/in_memory_cliente_repository";
import { Cliente } from "../../domain/entities/Cliente";
describe("ClienteUseCase", () => {
  it("deve criar um cliente com sucesso", async () => {
    const clienteRepository = new InMemoryClienteRepository();
    const clienteUseCase = new ClienteUseCase(clienteRepository);
    const cliente = await clienteUseCase.criarCliente({
      id: "",
      nome_completo: "João Silva",
      email: "joao.silva@example.com",
      telefone: "123456789",
    });
    expect(cliente.id).toBeDefined();
    expect(cliente.nome_completo).toBe("João Silva");
    expect(cliente.email).toBe("joao.silva@example.com");
  });
  it("não deve criar um cliente com email duplicado", async () => {
    const clienteRepository = new InMemoryClienteRepository();
    const clienteUseCase = new ClienteUseCase(clienteRepository);
    await clienteUseCase.criarCliente({
      id: "",
      nome_completo: "Maria Souza",
      email: "maria.souza@example.com",
      telefone: "987654321",
    });
    await expect(
      clienteUseCase.criarCliente({
        id: "",
        nome_completo: "João Silva",
        email: "maria.souza@example.com",
        telefone: "123456789",
      }),
    ).rejects.toThrow("Email ja cadastrado");
  });
  it("não deve criar um cliente com email inválido", async () => {
    const clienteRepository = new InMemoryClienteRepository();
    const clienteUseCase = new ClienteUseCase(clienteRepository);

    await expect(
      clienteUseCase.criarCliente({
        id: "",
        nome_completo: "Maria Souza",
        email: "maria.souzaexample.com",
        telefone: "987654321",
      }),
    ).rejects.toThrow("Email inválido");
  });
  it("deve buscar um cliente por email", async () => {
    const clienteRepository = new InMemoryClienteRepository();
    const clienteUseCase = new ClienteUseCase(clienteRepository);
    const clienteCriado = await clienteUseCase.criarCliente({
      id: "",
      nome_completo: "Ana Pereira",
      email: "ana.pereira@example.com",
      telefone: "555555555",
    });
    const clienteBuscado = await clienteUseCase.buscarClientePorEmail(
      "ana.pereira@example.com",
    );
    expect(clienteBuscado).not.toBeNull();
    expect(clienteBuscado?.id).toBe(clienteCriado.id);
    expect(clienteBuscado?.email).toBe(clienteCriado.email);
    expect(clienteBuscado?.telefone).toBe(clienteCriado.telefone);
    expect(clienteBuscado?.nome_completo).toBe(clienteCriado.nome_completo);
  });
  it("deve lançar erro ao buscar cliente com email inválido", async () => {
    const clienteRepository = new InMemoryClienteRepository();
    const clienteUseCase = new ClienteUseCase(clienteRepository);
    await expect(
      clienteUseCase.buscarClientePorEmail("invalid-email"),
    ).rejects.toThrow("Adicione um email válido");
  });
  it("deve lançar erro ao buscar cliente com email não existente", async () => {
    const clienteRepository = new InMemoryClienteRepository();
    const clienteUseCase = new ClienteUseCase(clienteRepository);
    await expect(
      clienteUseCase.buscarClientePorEmail("ana.pereira@example.com"),
    ).rejects.toThrow("Cliente não encontrado");
  });
  it("deve buscar um cliente por ID", async () => {
    const clienteRepository = new InMemoryClienteRepository();
    const clienteUseCase = new ClienteUseCase(clienteRepository);
    const clienteCriado = await clienteUseCase.criarCliente({
      id: "123",
      nome_completo: "Carlos Mendes",
      email: "carlos.mendes@example.com",
      telefone: "111111111",
    });
    const clienteBuscado = await clienteUseCase.buscarClientePorId(
      clienteCriado.id,
    );
    expect(clienteBuscado).not.toBeNull();
    expect(clienteBuscado?.id).toBe(clienteCriado.id);
    expect(clienteBuscado?.email).toBe(clienteCriado.email);
    expect(clienteBuscado?.telefone).toBe(clienteCriado.telefone);
    expect(clienteBuscado?.nome_completo).toBe(clienteCriado.nome_completo);
  });
  it("deve lançar erro ao buscar cliente com ID vazio", async () => {
    const clienteRepository = new InMemoryClienteRepository();
    const clienteUseCase = new ClienteUseCase(clienteRepository);
    await expect(clienteUseCase.buscarClientePorId("")).rejects.toThrow(
      "ID é obrigatório",
    );
  });
  it("deve atualizar um cliente com sucesso", async () => {
    const clienteRepository = new InMemoryClienteRepository();
    const clienteUseCase = new ClienteUseCase(clienteRepository);
    const clienteCriado = await clienteUseCase.criarCliente({
      id: "",
      nome_completo: "Mariana Lima",
      email: "mariana.lima@example.com",
      telefone: "222222222",
    });
    clienteCriado.nome_completo = "Mariana Lima Silva";
    const clienteAtualizado =
      await clienteUseCase.atualizarCliente(clienteCriado);
    expect(clienteAtualizado.nome_completo).toBe("Mariana Lima Silva");
  });
  it("deve lançar erro ao atualizar cliente inexistente", async () => {
    const clienteRepository = new InMemoryClienteRepository();
    const clienteUseCase = new ClienteUseCase(clienteRepository);
    await expect(
      clienteUseCase.atualizarCliente({
        id: "non-existent-id",
        nome_completo: "Lucas Rocha",
        email: "edna@gmail.com",
        telefone: "333333333",
      }),
    ).rejects.toThrow("Cliente não encontrado");
  });
  it("deve deletar um cliente com sucesso", async () => {
    const clienteRepository = new InMemoryClienteRepository();
    const clienteUseCase = new ClienteUseCase(clienteRepository);
    const clienteCriado = await clienteUseCase.criarCliente({
      id: "",
      nome_completo: "Fernanda Costa",
      email: "fernanda.costa@example.com",
      telefone: "444444444",
    });
    await clienteUseCase.deletarCliente(clienteCriado.id);
    const clienteBuscado = await clienteUseCase.buscarClientePorId(
      clienteCriado.id,
    );
    expect(clienteBuscado).toBeNull();
  });
  it("deve lançar erro ao deletar cliente inexistente", async () => {
    const clienteRepository = new InMemoryClienteRepository();
    const clienteUseCase = new ClienteUseCase(clienteRepository);
    await expect(
      clienteUseCase.deletarCliente("non-existent-id"),
    ).rejects.toThrow("Cliente não encontrado");
  });
});
