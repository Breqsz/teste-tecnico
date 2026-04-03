# Gestão de Pequenos Alvarás

Aplicação web para cadastro e gerenciamento de pedidos de alvará de reforma.

## Tecnologias

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma
- SQLite

## Pré-requisitos

- Node.js 20 ou superior
- npm

## Como rodar o projeto

1. Clone o repositório.
2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo `.env` com base no exemplo:

```bash
cp .env.example .env
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

4. Gere o cliente do Prisma:

```bash
npm run prisma:generate
```

5. Aplique as migrations do banco:

```bash
npx prisma migrate deploy
```

6. Inicie o projeto:

```bash
npm run dev
```

7. Acesse no navegador:

```txt
http://localhost:3000
```

## Teste visual

Versão publicada para visualização:

[https://testesmul.netlify.app](https://testesmul.netlify.app)

## Scripts úteis

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run prisma:generate
npm run prisma:status
```

## Banco de dados

- O projeto usa SQLite.
- O arquivo do banco é criado localmente como `dev.db`.
- A variável de ambiente usada é:

```env
DATABASE_URL="file:./dev.db"
```

## Observação sobre o deploy

- O projeto foi estruturado para rodar localmente.
- A persistência atual usa SQLite com arquivo local.
- Isso funciona bem no ambiente local, mas não é a melhor abordagem para produção em plataformas como Netlify.
- Por isso, a versão publicada pode exibir erro ao carregar os pedidos, mesmo com a interface disponível para teste visual.
- Esse ponto não foi corrigido porque o escopo pedido até aqui foi deixar o projeto pronto para execução local por qualquer pessoa que baixar o repositório.
- Para produção real, o ideal é migrar o banco para uma solução externa, como PostgreSQL.

## Estrutura principal

```txt
app/
  api/requests/         rotas da aplicação
  page.tsx              página principal

components/
  ui/                   componentes base reutilizáveis

features/
  requests/             domínio de alvarás

lib/
  prisma.ts             configuração do Prisma Client

prisma/
  schema.prisma         schema do banco
```

## Autor

Guilherme Rocha Bianchini
