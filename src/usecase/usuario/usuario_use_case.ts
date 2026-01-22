import { UsuarioRepository } from "../../repositories/usuario_repository";
import { Usuario } from "../../domain/entities/usuario";
import { randomUUID } from "crypto";
import { BusinessRuleError } from "../../domain/errors/BusinessRuleError";
import { NotFoundError } from "../../domain/errors/NotFoundError";
export class UsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}
  async criarUsuario(usuario: Usuario): Promise<Usuario> {
    const emailExists = await this.usuarioRepository.buscarUsuarioPorEmail(
      usuario.email,
    );
    if (emailExists) {
      throw new BusinessRuleError("Email ja cadastrado");
    }
    const u = new Usuario({
      id: randomUUID(),
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      data_criacao: new Date(),
    });
    return await this.usuarioRepository.criarUsuario(u);
  }
  async buscarUsuarioPorId(id: string): Promise<Usuario | null> {
    const encontrarUsuario =
      await this.usuarioRepository.buscarUsuarioPorId(id);
    if (!encontrarUsuario) {
      throw new NotFoundError("Usuario nao encontrado");
    }
    return await this.usuarioRepository.buscarUsuarioPorId(id);
  }
  async atualizarUsuario(usuario: Usuario): Promise<Usuario> {
    const encontrarUsuario = await this.usuarioRepository.buscarUsuarioPorId(
      usuario.id,
    );
    if (!encontrarUsuario) {
      throw new NotFoundError("Usuario nao encontrado");
    }
    return await this.usuarioRepository.atualizarUsuario(usuario);
  }
  async deletarUsuario(id: string): Promise<void> {
    const encontrarUsuario =
      await this.usuarioRepository.buscarUsuarioPorId(id);
    if (!encontrarUsuario) {
      throw new NotFoundError("Usuario nao encontrado");
    }
    return await this.usuarioRepository.deletarUsuario(id);
  }
}
