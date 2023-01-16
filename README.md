# S5-19 | 🏁 Entrega: Projeto Backend - API WorkMatch

---

# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
  - [Instalando Dependências](#31-instalando-dependências)
  - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas e os integrantes da equipe.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)

A URL base da aplicação:
https://backend-workmatch.onrender.com

Integrantes:

- [Davison](https://github.com/davidsonq)
- [Ana](https://github.com/anaadx)
- [Felipe](https://github.com/FelipeSiqueiraDev)
- [Julio](https://github.com/juliomello93)
- [Rafael](https://github.com/zRafael012)
- [Dreic](https://github.com/DreicLeal)
- [Thiago](https://github.com/ThiagoKalac)

---

## 2. Diagrama ER

Diagrama ER
![DER](DiagramaER-ApiWorkmatch.png)

---

## 3. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn install
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**, seu arquivo deve ficar parecido com este:

```
PGHOST="localhost"
PGPORT="3000"
PGUSER="seuUsuario"
PGPASSWORD="suasenha"
PGDATABASE="umaNovaDatabase"
SECRET_KEY="chavesecreta"

```

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts

```

---

## 4. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Rotas e Endpoints

- [Users](#1-users)
  - [POST - /users](#11-criação-de-usuário)
  - [GET - /users](#12-listando-usuários)
  - [GET - /users/:user_id](#13-listar-usuário-por-id)
  - [PATCH - /users/:id](#12-atualizar-os-dados-do-usuário)
  - [DELETE - /users/:id](#12-deletando-usuário)

-[Login](#2-login)

- [POST /login]()

---

## 1. **Users**

[ Voltar para os Endpoints ](#4-endpoints)

O objeto User é definido como:

| Campo     | Tipo    | Descrição                                     |
| --------- | ------- | --------------------------------------------- |
| id        | string  | Identificador único do usuário                |
| name      | string  | O nome do usuário.                            |
| username  | string  |                                               |
| email     | string  | O e-mail do usuário.                          |
| password  | string  | A senha de acesso do usuário                  |
| avatarUrl | string  | Imagem do perfil do usuário                   |
| bio       | string  | Descrição do usuário                          |
| level     | string  | Nível de habilidade do usuário                |
| contact   | string  | Contatos do usuário                           |
| isAdm     | boolean | Define se um usuário é Administrador ou não   |
| isActive  | boolean | Define se o usuário está ativo ou não         |
| createdAt | string  | Data de criação do usuário                    |
| updatedAt | string  | Data que o usuário atualizou seu perfil       |
| deletedAt | string  | Data que o usuário foi deletado ou desativado |

### Endpoints

| Método | Rota            | Descrição                                     |
| ------ | --------------- | --------------------------------------------- |
| POST   | /users          | Criação de um usuário.                        |
| GET    | /users          | Lista todos os usuários                       |
| GET    | /users/:user_id | Lista um usuário usando seu ID como parâmetro |
| PATCH  | /users/:id      | Atualização dos dados do usuário              |
| DELETE | /users/:id      | Deleta o usuário passando o ID                |

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#4-endpoints)

### `POST /users`

### Body para a requisição:

```json
{
  "email": "usuario@mail.com",
  "password": "user123",
  "username": "user",
  "name": "Usuario"
}
```

### Exemplo de Response:

```
STATUS: 201 Created
```

```json
{
  "deletedAt": null,
  "updatedAt": "2023-01-11T18:06:27.778Z",
  "createdAt": "2023-01-11T18:06:27.778Z",
  "isAdm": false,
  "isActive": true,
  "contact": null,
  "level": null,
  "bio": null,
  "avatarUrl": null,
  "name": "Usuario",
  "username": "user",
  "email": "user@mail.com",
  "id": "021ab19f-f2e1-453a-8c6f-f438769c67f"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                                             |
| -------------- | ----------------------------------------------------- |
| 409 Conflict   | User already exists, try again with new informations. |

---

### 1.2. **Listando Usuários**

[ Voltar aos Endpoints ](#4-endpoints)

### `GET /users`

### Body para a requisição:

```json
No-Body
```

### Exemplo de Response:

```
STATUS: 200 OK
```

```json
[
  {
    "deletedAt": null,
    "updatedAt": "2023-01-11T18:06:27.778Z",
    "createdAt": "2023-01-11T18:06:27.778Z",
    "isAdm": false,
    "isActive": true,
    "contact": null,
    "level": null,
    "bio": null,
    "avatarUrl": null,
    "name": "Maykel",
    "username": "Maykel",
    "email": "maykel@mail.com",
    "id": "021ab19f-f2e1-453a-8c6f-f438769c67ff"
  },
  {
    "deletedAt": null,
    "updatedAt": "2023-01-11T21:50:25.853Z",
    "createdAt": "2023-01-11T21:50:25.853Z",
    "isAdm": false,
    "isActive": true,
    "contact": null,
    "level": null,
    "bio": null,
    "avatarUrl": null,
    "name": "Pablo",
    "username": "Pablo",
    "email": "pablo@mail.com",
    "id": "31558a57-b0dd-464a-a1af-a76f8a2df905"
  }
]
```

### Possíveis Erros:

| Código do Erro   | Descrição                  |
| ---------------- | -------------------------- |
| 409 Forbidden    | Missing admin permissions. |
| 401 Unauthorized | invalid signature          |

---

### 1.3. **Listar Usuário por ID**

[ Voltar aos Endpoints ](#4-endpoints)

### `GET /users/:id`

### Exemplo de Request:

```
GET /users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://suaapi.com/v1
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| id        | string | Identificador único do usuário (User) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "deletedAt": null,
  "updatedAt": "2023-01-13T11:10:23.097Z",
  "createdAt": "2023-01-13T11:10:23.097Z",
  "isAdm": false,
  "isActive": true,
  "contact": null,
  "level": null,
  "bio": null,
  "avatarUrl": null,
  "name": "Usuario",
  "username": "user",
  "email": "usuario@mail.com",
  "id": "7db3a88e-cc6f-4a68-bdbd-9b8dc87a3d19"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição         |
| ---------------- | ----------------- |
| 404 Not Found    | User not found.   |
| 401 Unauthorized | Invalid signature |

---

### 1.2. **Atualizar os dados do usuário**

[ Voltar aos Endpoints ](#4-endpoints)

### `PATCH /users/:id`

### Body para a requisição:

```json
{
  "email": "teste@mail.com",
  "password": "12345",
  "username": "Alteração do username",
  "name": "Ateração"
}
```

### Exemplo de Response:

```
STATUS: 200 OK
```

```json
{
  "deletedAt": null,
  "updatedAt": "2023-01-12T07:15:03.238Z",
  "createdAt": "2023-01-11T18:06:27.778Z",
  "isAdm": false,
  "isActive": true,
  "contact": null,
  "level": null,
  "bio": null,
  "avatarUrl": null,
  "name": "Ateração",
  "username": "Alteração do username",
  "email": "teste@mail.com",
  "id": "021ab19f-f2e1-453a-8c6f-f438769c67ff"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                  |
| ---------------- | -------------------------- |
| 409 Forbidden    | Missing admin permissions. |
| 401 Unauthorized | invalid signature          |

---

### 1.2. **Deletando usuário**

[ Voltar aos Endpoints ](#4-endpoints)

### `DELETE /users/:id`

### Body para a requisição:

```json
No-Body
```

### Exemplo de Response:

```
STATUS: 204 - No Content
```

```json
{}
```

### Possíveis Erros:

| Código do Erro   | Descrição                  |
| ---------------- | -------------------------- |
| 409 Forbidden    | Missing admin permissions. |
| 401 Unauthorized | invalid signature          |

---

### 2. **Login**

### Endpoints

| Método | Rota   | Descrição             |
| ------ | ------ | --------------------- |
| POST   | /login | Usuário realiza login |

[ Voltar aos Endpoints ](#4-endpoints)

### 2.1. **Realizando o Login**

### `POST /login`

### Body para a requisição:

```json
{
  "email": "usuario@mail.com",
  "password": "user123"
}
```

### Exemplo de Response:

```
STATUS: 200 OK
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FjdGl2ZSI6dHJ1ZSwiaXNBZG0iOmZhbHNlLCJpYXQiOjE2NzM4Nzg1NzgsImV4cCI6MTY3Mzk2NDk3OCwic3ViIjoiN2RiM2E4OGUtY2M2Zi00YTY4LWJkYmQtOWI4ZGM4N2EzZDE5In0.CdBo9mk-ZpJwgJX4hNEIXqXo_VLMe6XXZRy2f4W4JEs"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                 |
| ---------------- | ------------------------- |
| 401 Unauthorized | User or password invalid. |

---

[ Voltar para o topo ](#tabela-de-conteúdos)
