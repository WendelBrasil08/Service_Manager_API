# Service Manager API

## Contexto
>  Durante uma primeira reunião com o cliente identificamos a necessidade de organizar de forma aprimorada a gestão de clientes, agendamentos, pagamentos e serviços.

>Atualmente, esta sendo controlado manualmente, oque esta gerando conflitos de horários, perda de informações e dificuldade para acompanhar os serviços.


## Objetivo 
> Criar uma API REST que permita o gerenciamento de clientes, serviços, pagamentos e agendamentos, garantindo uma melhor organização e evitando os conflitos de horários.


## Dados
- Usuário: [id, nome, email, senha, data_criação]
- Cliente: [id, nome_completo, email, telefone]
- Serviço: [id, nome, descrição, preço, duração]
- Agendamento: [id, data, horário_inicio, horário_término, cliente_id, serviço_id, status]
- Pagamento: [id, valor, forma_pagamento, status, agendamento_id, data_pagamento]


## Regras de Negócio
[] Cadastrar um Usuário
[] - Email deve ser único

[] Cadastrar um Cliente
[] - Email deve ser único

[] Buscar Cliente por id ou email
[] Retornar o cliente ou NULL

[] Cadastrar um Serviço
[] - Preço deve ser fixo para cada serviço podendo ser alterado

[] Buscar um Serviço por nome
[] - Retornar o serviço ou NULL


[] Criar um agendamento
[] - Um agendamento não pode ser marcado no mesmo horário de outro agendamento já existente.
[] - Todo agendamento deve estar vinculado a um cliente e a um serviço.
[] - Um cliente pode ter vários agendamentos
[] - O horário de inicio deve ser menor que o horário de término

[] Buscar um agendamento por id
[] - Retornar o agendamento ou NULL

[] Criar um Pagamento
[] - O pagamento deve estar associado a um agendamento específico
