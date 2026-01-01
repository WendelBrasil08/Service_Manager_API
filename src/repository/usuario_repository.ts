export interface UsuarioRepository {
  criar(usuario: Usuario): Promise<Usuario>;
  atualizar(usuario: Usuario): Promise<Usuario>;
  deletar(id: number): Promise<void>;
}
