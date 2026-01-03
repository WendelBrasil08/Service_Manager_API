import { UsuarioRepository } from "../repositories/usuario_repository.ts";
import { Usuario } from "../domain/entities/Usuario.ts";

export class UsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}
  async criarUsuario(usuario: Usuario): Promise<Usuario> {
    return await this.usuarioRepository.criar(usuario);
  }
  async atualizarUsuario(usuario: Usuario): Promise<Usuario> {
    return await this.usuarioRepository.atualizar(usuario);
  }
  async deletarUsuario(id: number): Promise<void> {
    return await this.usuarioRepository.deletar(id);
  }
}
