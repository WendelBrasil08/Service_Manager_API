import { Usuario } from "../domain/entities/Usuario.ts";

export interface UsuarioRepository {
  criarUsuario(usuario: Usuario): Promise<Usuario>;
  atualizarUsuario(usuario: Usuario): Promise<Usuario>;
  deletarUsuario(id: string): Promise<void>;
}
