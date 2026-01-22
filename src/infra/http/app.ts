import fastify from "fastify";
import { errorHandler } from "./middlewares/errorHandler";
import {
  agendamentoRoutes,
  clienteRoutes,
  usuarioRoutes,
  servicoRoutes,
  pagamentoRoutes,
} from "./routes/index.ts";
export const app = fastify();
app.setErrorHandler(errorHandler);

app.register(agendamentoRoutes, { prefix: "/agendamentos" });
app.register(clienteRoutes, { prefix: "/clientes" });
app.register(pagamentoRoutes, { prefix: "/pagamentos" });
app.register(servicoRoutes, { prefix: "/servicos" });
app.register(usuarioRoutes, { prefix: "/usuarios" });
