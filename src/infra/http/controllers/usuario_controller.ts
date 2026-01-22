import { UsuarioUseCase } from "../../../usecase/usuario/usuario_use_case";
import { FastifyRequest, FastifyReply } from "fastify";

import { usuarioSchema } from "../schemas/usuario_schemas";

export class UsuarioController {
  constructor(private usuarioUseCase: UsuarioUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const usuarioData = usuarioSchema.parse(request.body);
    const usuario = await this.usuarioUseCase.criarUsuario(usuarioData);
    reply.status(201).send(usuario);
  }
  async handleUpdate(request: FastifyRequest, reply: FastifyReply) {
    const usuarioData = usuarioSchema.parse(request.body);
    const usuario = await this.usuarioUseCase.atualizarUsuario(usuarioData);
    reply.status(200).send(usuario);
  }
  async handleDelete(request: FastifyRequest, reply: FastifyReply) {
    const id = usuarioSchema.parse(request.params).id;
    await this.usuarioUseCase.deletarUsuario(String(id));
    reply.status(204).send();
  }
}
