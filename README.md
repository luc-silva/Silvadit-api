# Silvadit API

> API desenvolvida em [NestJS](https://nestjs.com/) para gerenciamento de usuários, fóruns e feeds. Parte do Projeto [Silvadit](#), um fórum moderno e escalável.

## Índice

- [Silvadit API](#silvadit-api)
  - [Índice](#índice)
  - [Sobre o Projeto](#sobre-o-projeto)
  - [Tecnologias](#tecnologias)
  - [Instalação](#instalação)
  - [Como rodar a API](#como-rodar-a-api)
  - [Scripts](#scripts)
  - [Testes](#testes)

## Sobre o Projeto

A **Silvadit API** é uma aplicação backend construída com NestJS e TypeScript, focada em performance, escalabilidade e boas práticas de arquitetura. Ela oferece endpoints para autenticação, cadastro de usuários, gerenciamento de fóruns e feeds.  
Esta API faz parte do Projeto **Silvadit**, um fórum moderno para discussões e compartilhamento de conhecimento.

## Tecnologias

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [OracleDB](https://www.oracle.com/database/)
- [Jest](https://jestjs.io/) (testes)
- [Prettier](https://prettier.io/) (formatação de código)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/silvadit-api.git
cd silvadit-api

# Instale as dependências com pnpm
pnpm install
```

## Como rodar a API

1. **Configure as variáveis de ambiente**  
   Crie um arquivo `.env` na raiz do projeto com as configurações necessárias (exemplo: conexão com o banco Oracle).

2. **Inicie a API em modo desenvolvimento**
   ```bash
   pnpm run start:dev
   ```

3. **Acesse a API**  
   Por padrão, estará disponível em [http://localhost:3001](http://localhost:3001)

## Scripts

```bash
# Iniciar em modo desenvolvimento
pnpm run start:dev

# Rodar lint
pnpm run lint

# Rodar formatação
pnpm run format
```

## Testes

```bash
# Testes unitários
pnpm run test

# Testes unitários
pnpm run test:watch

# Cobertura de testes
pnpm run test:cov
```
