import { describe, it, expect } from "vitest";
import { InMemoryUsuarioRepository } from "../../infra/InMemory/in_memory_Repository_usuario";
import { UsuarioUseCase } from "./usuario_use_case";
import { NotFoundError } from "../../domain/errors/NotFoundError";

describe("Testes para o UsuarioUseCase", async () => {
  it("Deve criar um usuário com sucesso", async () => {
    const usuarioRepository = new InMemoryUsuarioRepository();
    const usuarioUseCase = new UsuarioUseCase(usuarioRepository);
    const usuario = await usuarioUseCase.criarUsuario({
      id: "",
      nome: "João Silva",
      email: "joao.silva@example.com",
      senha: "123456",
      data_criacao: new Date(),
    });
    expect(usuario.id).toBeDefined();
    expect(usuario.nome).toBe("João Silva");
    expect(usuario.email).toBe("joao.silva@example.com");
    expect(usuario.senha).toBe("123456");
    expect(usuario.data_criacao).toBeDefined();
  });
  it("Nao deve criar um usuario com email duplicado", async () => {
    const usuarioRepository = new InMemoryUsuarioRepository();
    const usuarioUseCase = new UsuarioUseCase(usuarioRepository);
    await usuarioUseCase.criarUsuario({
      id: "",
      nome: "Maria Souza",
      email: "maria.souza@example.com",
      senha: "123456",
      data_criacao: new Date(),
    });
    await expect(
      usuarioUseCase.criarUsuario({
        id: "",
        nome: "João Silva",
        email: "maria.souza@example.com",
        senha: "123456",
        data_criacao: new Date(),
      }),
    ).rejects.toThrow("Email ja cadastrado");
  });
  it("Deve buscar um usuario por ID", async () => {
    const usuarioRepository = new InMemoryUsuarioRepository();
    const usuarioUseCase = new UsuarioUseCase(usuarioRepository);
    const usuarioCriado = await usuarioUseCase.criarUsuario({
      id: "",
      nome: "Ana Pereira",
      email: "ana.pereira@example.com",
      senha: "123456",
      data_criacao: new Date(),
    });
    const usuarioBuscado = await usuarioUseCase.buscarUsuarioPorId(
      usuarioCriado.id,
    );
    expect(usuarioBuscado).not.toBeNull();
    expect(usuarioBuscado?.id).toBe(usuarioCriado.id);
    expect(usuarioBuscado?.email).toBe(usuarioCriado.email);
    expect(usuarioBuscado?.senha).toBe(usuarioCriado.senha);
    expect(usuarioBuscado?.data_criacao).toBe(usuarioCriado.data_criacao);
  });
  it("nao deve buscar um usuario inexistente", async () => {
    const usuarioRepository = new InMemoryUsuarioRepository();
    const usuarioUseCase = new UsuarioUseCase(usuarioRepository);
    await expect(
      usuarioUseCase.buscarUsuarioPorId("usuario-inexistente"),
    ).rejects.toThrow("Usuario nao encontrado");
  });
  it("deve atualizar um usuario com sucesso", async () => {
    const usuarioRepository = new InMemoryUsuarioRepository();
    const usuarioUseCase = new UsuarioUseCase(usuarioRepository);
    const usuarioCriado = await usuarioUseCase.criarUsuario({
      id: "",
      nome: "Ana Pereira",
      email: "ana.pereira@example.com",
      senha: "123456",
      data_criacao: new Date(),
    });
    const usuarioAtualizado = await usuarioUseCase.atualizarUsuario({
      id: usuarioCriado.id,
      nome: "Ana Pereira",
      email: "ana.pereira@example.com",
      senha: "123456",
      data_criacao: new Date(),
    });

    expect(usuarioAtualizado).not.toBeNull();
    expect(usuarioAtualizado?.id).toEqual(usuarioCriado.id);
    expect(usuarioAtualizado?.email).toEqual(usuarioCriado.email);
    expect(usuarioAtualizado?.senha).toEqual(usuarioCriado.senha);
    expect(usuarioAtualizado?.data_criacao).toEqual(usuarioCriado.data_criacao);
  });
  it("nao deve atualizar um usuario inexistente", async () => {
    const usuarioRepository = new InMemoryUsuarioRepository();
    const usuarioUseCase = new UsuarioUseCase(usuarioRepository);
    await expect(
      usuarioUseCase.atualizarUsuario({
        id: "123",
        nome: "Ana Pereira",
        email: "ana.pereira@example.com",
        senha: "123456",
        data_criacao: new Date(),
      }),
    ).rejects.toThrow("Usuario nao encontrado");
  });
  it("deve deletar um usuario com sucesso", async () => {
    const usuarioRepository = new InMemoryUsuarioRepository();
    const usuarioUseCase = new UsuarioUseCase(usuarioRepository);
    const usuarioCriado = await usuarioUseCase.criarUsuario({
      id: "",
      nome: "Ana Pereira",
      email: "ana.pereira@example.com",
      senha: "123456",
      data_criacao: new Date(),
    });
    await usuarioUseCase.deletarUsuario(usuarioCriado.id);
    await expect(
      usuarioUseCase.buscarUsuarioPorId(usuarioCriado.id),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
  it("nao deve deletar um usuario inexistente", async () => {
    const usuarioRepository = new InMemoryUsuarioRepository();
    const usuarioUseCase = new UsuarioUseCase(usuarioRepository);
    await expect(
      usuarioUseCase.deletarUsuario("usuario-inexistente"),
    ).rejects.toThrow("Usuario nao encontrado");
  });
});
