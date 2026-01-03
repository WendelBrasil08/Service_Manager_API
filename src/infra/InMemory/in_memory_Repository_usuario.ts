import { UsuarioRepository } from "../../repositories/usuario_repository.ts";
import { Usuario } from "../../domain/entities/Usuario.ts";

export class InMemoryUsuarioRepository implements UsuarioRepository {
  private usuarios: Usuario[] = [];

  async criarUsuario(usuario: Usuario): Promise<Usuario> {
    this.usuarios.push(usuario);
    return usuario;
  }
  async atualizarUsuario(usuario: Usuario): Promise<Usuario> {
    const index = this.usuarios.findIndex((u) => u.id === usuario.id);
    if (index === -1) {
      throw new Error("Usuário não encontrado");
    }
    this.usuarios[index] = usuario;
    return usuario;
  }
  async deletarUsuario(id: string): Promise<void> {
    this.usuarios = this.usuarios.filter((u) => u.id !== id);
  }
}
