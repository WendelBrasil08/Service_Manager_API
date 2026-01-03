import { UsuarioUseCase } from "../../../UseCase/usuario_use_case";
import { FastifyRequest, FastifyReply } from "fastify";
import { Usuario } from "../../../domain/entities/Usuario.ts";
import { usuarioSchema } from "../schemas/usuario_schemas.ts";

export class UsuarioController {
  constructor(private usuarioUseCase: UsuarioUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const usuarioData = usuarioSchema.parse(request.body);
    const usuario = await this.usuarioUseCase.criarUsuario(
      usuarioData as Usuario
    );
    reply.status(201).send(usuario);
  }
  async handleUpdate(request: FastifyRequest, reply: FastifyReply) {
    const usuarioData = usuarioSchema.parse(request.body);
    const usuario = await this.usuarioUseCase.atualizarUsuario(
      usuarioData as Usuario
    );
    reply.status(200).send(usuario);
  }
  async handleDelete(request: FastifyRequest, reply: FastifyReply) {
    const id = usuarioSchema.parse(request.params).id;
    await this.usuarioUseCase.deletarUsuario(String(id));
    reply.status(204).send();
  }
}
