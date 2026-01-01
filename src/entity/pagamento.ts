interface Pagamento {
  id: number;
  agendamento_id: number;
  forma_pagamento:
    | "cartao_credito"
    | "cartao_debito"
    | "boleto"
    | "pix"
    | "dinheiro";
  valor: number;
  data_pagamento: Date;
  status: "pendente" | "pago" | "cancelado";
}
