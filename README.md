# Gestão de Pequenos Alvarás

Aplicação web para cadastro e gerenciamento de pedidos de alvará de reforma.

O projeto foi desenvolvido com foco em um fluxo simples de CRUD:
- cadastrar pedidos
- listar pedidos
- alterar status
- excluir pedidos

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma ORM
- SQLite

## Pré-requisitos

- Node.js 20 ou superior
- npm

## Instalação

Instale as dependências:

```bash
npm install
```

## Configuração do ambiente

Crie o arquivo `.env` com base no `.env.example`:

```bash
cp .env.example .env
```

Se estiver no Windows PowerShell, pode usar:

```powershell
Copy-Item .env.example .env
```

## Banco de dados

O projeto usa SQLite com Prisma.

Gerar o Prisma Client:

```bash
npx prisma generate
```

Aplicar a migration inicial:

```bash
npx prisma migrate deploy
```

Se quiser conferir o status das migrations:

```bash
npx prisma migrate status
```

## Rodando o projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Depois acesse:

```txt
http://localhost:3000
```

## Scripts principais

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npx prisma generate
npx prisma migrate deploy
npx prisma migrate status
```

## Estrutura resumida

```txt
app/
  api/requests/         rotas do CRUD
  page.tsx              tela principal

components/
  request-form.tsx      formulário de cadastro
  request-list.tsx      listagem de pedidos
  ui/                   componentes base

lib/
  prisma.ts             instância do Prisma Client

prisma/
  schema.prisma         schema do banco
  migrations/           migration inicial
```

## Observação

O banco SQLite é local e os dados ficam no arquivo `dev.db`.
