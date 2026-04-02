# Teste Técnico - Estágio SMUL 🏛️

## 📅 Prazo
**Data limite:** 06/04/2026

---

## 📝 Contexto
A Secretaria Municipal de Urbanismo e Licenciamento (SMUL) de São Paulo tem o objetivo de regular e facilitar processos complexos de regularização imobiliária e territorial. 

Para este teste, você deverá desenvolver um **protótipo de um sistema para gestão de pequenos alvarás de reforma**. Vale ressaltar que este sistema é fictício e servirá exclusivamente para o processo seletivo.

O objetivo é criar uma aplicação web que permita o gerenciamento completo (CRUD) de pedidos de alvará, focando em organização de código, lógica de manipulação de dados e integração entre front-end e back-end.

---

## 🛠️ Requisitos Funcionais

1.  **Cadastro de Pedidos:** Um formulário para registrar novos pedidos com os seguintes campos (todos com validação):
    * Nome do Proprietário.
    * CPF do Responsável.
    * Endereço do Imóvel.
    * **SQL (Setor-Quadra-Lote):** Código do imóvel no cadastro da prefeitura (ex: 000.000.0000-0).
    * **Tipo de Obra:** (Ex: Reforma de telhado, construção de muro, pintura externa).
2.  **Visualização:** Uma tabela que liste todos os pedidos já cadastrados.
3.  **Edição de Status:** Possibilidade de alterar o status de um pedido (Ex: Pendente, Aprovado ou Negado).
4.  **Exclusão:** Possibilidade de remover um registro da lista.

---

## 💻 Requisitos Técnicos

* **Linguagem/Ambiente:** Node.js
* **Framework:** Next.js
* **UI/Componentes:** shadcn/ui
* **Estilização:** Tailwind CSS
* **Banco de Dados & Persistência:** Uso de API Routes do Next.js com banco de dados **SQLite** através do **Prisma ORM**.

---

## 🔍 O que vamos avaliar

* **Organização e Boas Práticas:** Estrutura de pastas, legibilidade e componentização.
* **Uso do Git:** Frequência de commits e clareza nas mensagens.
* **Interface:** Fluidez e uso correto dos componentes de UI.
* **Lógica de Programação:** Tratamento de dados e validações.

---

## 🚀 Instruções de Entrega

1.  Utilize o seguinte repositório como template: [teste-tecnico-2026](https://github.com/smdu-sp/teste-tecnico-2026).
2.  Desenvolva o projeto em um **repositório privado**.
3.  Adicione o usuário do GitHub `aalevictor` como colaborador para a avaliação.
4.  Crie um novo arquivo .md e insira as instruções claras de como rodar o projeto localmente.