import { UsuarioRepository } from "../usuario_repository";

export class InMemoryUsuarioRepository implements UsuarioRepository {
  private usuarios: Usuario[] = [];
  private currentId: number = 1;

  async criar(usuario: Usuario): Promise<Usuario> {
    const novoUsuario = { ...usuario, id: this.currentId++ };
    this.usuarios.push(novoUsuario);
    return novoUsuario;
  }
  async atualizar(usuario: Usuario): Promise<Usuario> {
    const index = this.usuarios.findIndex((u) => u.id === usuario.id);
    if (index === -1) {
      throw new Error("Usuário não encontrado");
    }
    this.usuarios[index] = usuario;
    return usuario;
  }
  async deletar(id: number): Promise<void> {
    this.usuarios = this.usuarios.filter((u) => u.id !== id);
  }
}
