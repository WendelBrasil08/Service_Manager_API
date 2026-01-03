import { UsuarioRepository } from "../repositories/usuario_repository.ts";
import { Usuario } from "../domain/entities/Usuario.ts";
import { randomUUID } from "crypto";
export class UsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}
  async criarUsuario(usuario: Usuario): Promise<Usuario> {
    const u = new Usuario(
      randomUUID(),
      usuario.nome,
      usuario.email,
      usuario.senha,
      new Date()
    );
    return await this.usuarioRepository.criarUsuario(u);
  }
  async atualizarUsuario(usuario: Usuario): Promise<Usuario> {
    return await this.usuarioRepository.atualizarUsuario(usuario);
  }
  async deletarUsuario(id: string): Promise<void> {
    return await this.usuarioRepository.deletarUsuario(id);
  }
}
