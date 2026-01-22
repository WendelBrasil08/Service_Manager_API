import { Usuario } from "../domain/entities/usuario";

export interface UsuarioRepository {
  criarUsuario(usuario: Usuario): Promise<Usuario>;
  atualizarUsuario(usuario: Usuario): Promise<Usuario>;
  deletarUsuario(id: string): Promise<void>;
  buscarUsuarioPorEmail(id: string): Promise<Usuario | null>;
  buscarUsuarioPorId(id: string): Promise<Usuario | null>;
}
