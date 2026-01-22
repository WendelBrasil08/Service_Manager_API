import { Agendamento } from "../entities/agendamento";

export function existeConflitoHorario(
  Existente: Agendamento,
  Novo: Agendamento
): boolean {
  return (
    Novo.horario_inicio < Existente.horario_termino &&
    Novo.horario_termino > Existente.horario_inicio
  );
}
