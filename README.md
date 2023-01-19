# S5-19 | 🏁 Entrega: Projeto Backend - API WorkMatch

---

# Vamos falar de Backend !?

A API WorkMatch foi desenvolvida para armazenar e combinar dados necessários para uma aplicação que conecta ideias para desenvolvimento e a equipe mais compatível para a realização. Ela permite que possamos ter acesso aos dados de usuários, suas tecnologias e projetos - idealizados por si e de que faz parte. Através dessa API, podemos interagir criando esses projetos colaborativos onde outras pessoas que possuem interesse possam participar. Isso ocorre por meio da avaliação da compatibilidade de cada candidato a participante pelo idealizador (podendo aprovar ou não essa ação). Essa escolha pode ser feita com base na descrição do projeto e das tecnologias setadas como necessárias para a aplicação, verificando se existe um MATCH entre desenvolvedor e proposta. Assim que o projeto estiver com o seu time pronto vamos para o WORK, com a equipe mais qualificada para atingir nossos objetivos

---

# Documentação da API

## Indice

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
  - [Instalando Dependências](#31-instalando-dependências)
  - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)
- [Endpoints](#4-endpoints)
- [Considerações Finais](#5-considerações-finais)

---

## 1. Visão Geral

A URL base da aplicação:
https://backend-workmatch.onrender.com

Visão geral do projeto, um pouco das tecnologias usadas e os integrantes da equipe.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)

Integrantes:

- [Davidson Quaresma](https://github.com/davidsonq)
- [Ana Duarte](https://github.com/anaadx)
- [Felipe Siqueira](https://github.com/FelipeSiqueiraDev)
- [Julio Mello](https://github.com/juliomello93)
- [Rafael Soares](https://github.com/zRafael012)
- [Dreic Leal](https://github.com/DreicLeal)
- [Thiago Rodrigues](https://github.com/ThiagoKalac)

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
  - [GET - /users/:id](#13-listar-usuário-por-id)
  - [POST - /users/forgotpassword](#14-recuperação-de-senha)
  - [GET - /users/resetpassword/:token](#15-mostrar-o-token-ao-usuário)
  - [GET - /users/profile](#16-informações-do-perfil-do-usuário-logado)
  - [PATCH - /users/:id](#17-atualizar-os-dados-do-usuário)
  - [DELETE - /users/:id](#18-deletando-usuário)

- [Login](#2-login)

  - [POST /login](#21-realizando-o-login)

- [Projects](#3-projects)

  - [POST - /projects](#31-criação-de-projeto)
  - [GET - /projects](#32-listagem-de-projetos)
  - [GET - /projects/user/:id](#33-listagem-de-projetos-criados-pelo-usuário)
  - [GET - /projects/:id/queue](#34-listagem-da-lista-de-espera-de-um-projeto)
  - [PATCH - /projects/:id](#34-atualização-dos-dados-de-um-projeto)
  - [POST - /projects/joinqueue/:id](#35-rota-para-o-usuários-entrar-para-a-fila-de-espera-de-um-projeto)
  - [PATCH - /projects/confirmuser/:id](#36-fazer-alteração-de-usuários-na-fila-do-projetoconfirmar-ou-recusar)
  - [DELETE /projects/:id](#37-deleção-de-um-projeto)

- [Technologies](#4-technologies)
  - [POST - /technologies](#41-criação-de-uma-tecnologia)
  - [GET - /technologies](#42-listagem-de-todas-as-tecnologias)
  - [PATCH - /technologies/:id](#43-atualização-de-dados-da-tecnologia)
  - [DELETE - /technologies/:id](#44-deleção-da-technologia)

---

## 1. **Users**

[ Voltar para os Endpoints ](#4-endpoints)

O objeto User é definido como:

| Campo     | Tipo    | Descrição                                     |
| --------- | ------- | --------------------------------------------- |
| id        | string  | Identificador único do usuário                |
| name      | string  | O nome do usuário.                            |
| username  | string  | Apelidodo usuário                             |
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

| Método | Rota                        | Descrição                                     |
| ------ | --------------------------- | --------------------------------------------- |
| POST   | /users                      | Criação de um usuário.                        |
| GET    | /users                      | Lista todos os usuários                       |
| GET    | /users/:user_id             | Lista um usuário usando seu ID como parâmetro |
| POST   | /users/forgotpassword       | Recuperação de senha                          |
| GET    | /users/resetpassword/:token | Mostra ao usuário seu token                   |
| GET    | /users/profile              | Informações do perfil                         |
| PATCH  | /users/:id                  | Atualização dos dados do usuário              |
| DELETE | /users/:id                  | Deleta o usuário passando o ID                |

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
| 403 Forbidden    | Missing admin permissions. |
| 401 Unauthorized | Invalid signature          |

---

### 1.3. **Listar Usuário por ID**

[ Voltar aos Endpoints ](#4-endpoints)

### `GET /users/:id`

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição            |
| --------- | ------ | -------------------- |
| id        | string | ID do usuário (User) |

|

### Body para a Requisição:

```json
No-Body
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

### 1.4 **Recuperação de senha**

[ Voltar aos Endpoints ](#4-endpoints)

### `POST /users/forgotpassword`

### Body para a Requisição:

```json
{
  "email": "usuario@email.com"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "message": "password recovery email sent"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição         |
| ---------------- | ----------------- |
| 404 Not Found    | User not found.   |
| 401 Unauthorized | Invalid signature |

---

### 1.5 **Mostrar o token ao usuário**

[ Voltar aos Endpoints ](#4-endpoints)

### `GET /users/resetpassword/:token`

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição        |
| --------- | ------ | ---------------- |
| token     | string | Token do usuário |

### Body para a Requisição:

```json
No-Body
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "token": "eYOUBFuuojngsgUBDUIYjhrIkpXVCJ9eyJpc0FjdGl2ZSI6dHJ1ZSwiaXNBZG0iOmZhbHNlLCJpYXQiOjE2NzM4Nzg1NzgsImV4cCI6MTY3Mzk2NDk3OCwic3ViIjoiNIUWASHDUIBH0IHNF9UQEWHUYGBf2Zi00YTY4LWJkYmQtOWI4ZGM4N2EzZDE5In0CdBo9mk-ZpJwgJX4hNEIXqXo_VLMe6XXZRy2f4W4JEs"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição         |
| ---------------- | ----------------- |
| 404 Not Found    | User not found.   |
| 401 Unauthorized | Invalid signature |

---

### 1.6 **Informações do perfil do usuário logado**

[ Voltar aos Endpoints ](#4-endpoints)

### `GET /users/profile`

### Body para a Requisição:

```json
No-Body
```

### Exemplo de Response:

```
200 OK
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

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not Found  | User not found. |

---

### 1.7 **Atualizar os dados do usuário**

[ Voltar aos Endpoints ](#4-endpoints)

### `PATCH /users/:id`

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição     |
| --------- | ------ | ------------- |
| id        | string | ID do usuário |

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
| 403 Forbidden    | Missing admin permissions. |
| 401 Unauthorized | invalid signature          |

---

### 1.8 **Deletando usuário**

[ Voltar aos Endpoints ](#4-endpoints)

### `DELETE /users/:id`

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição     |
| --------- | ------ | ------------- |
| id        | string | ID do usuário |

### Body para a requisição:

```json
No-Body
```

### Exemplo de Response:

```
STATUS: 204 - No Content
```

### Possíveis Erros:

| Código do Erro   | Descrição                  |
| ---------------- | -------------------------- |
| 403 Forbidden    | Missing admin permissions. |
| 401 Unauthorized | Invalid signature          |

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

## 3. **Projects**

[ Voltar para os Endpoints ](#4-endpoints)

O objeto Projects é definido como:

| Campo       | Tipo    | Descrição                      |
| ----------- | ------- | ------------------------------ |
| id          | string  | Identificador único            |
| name        | string  | O nome                         |
| imgUrl      | string  | Imagem                         |
| description | string  | Um breve resumo                |
| maxTeamSize | number  | Numero maximo de participantes |
| ownerId     | string  | Id do usuário que criou        |
| isActive    | boolean | Define se está ativo ou não    |
| createdAt   | string  | Data de criação                |
| updatedAt   | string  | Data de atualização            |
| deletedAt   | string  | Data em que foi deletado       |

### Endpoints

| Método | Rota                | Descrição                                   |
| ------ | ------------------- | ------------------------------------------- |
| POST   | /projects           | Criação de um projeto.                      |
| GET    | /projects           | Lista todos os projetos                     |
| GET    | projects/user/:id   | Lista um projeto usando o ID como parâmetro |
| PATCH  | /projects/:id/queue | Usuário solicita a entrada na fila          |
| GET    | /projects/:id/queue | Lista todos os usuários na fila             |
| PATCH  | /projects           | Atualização dos dados                       |
| DELETE | /projects/:id       | Deleta o projeto passando o ID              |

---

### 3.1. **Criação de Projeto**

[ Voltar para os Endpoints ](#4-endpoints)

### `POST /projects`

### Body para a requisição:

```json
{
  "name": "Project Name",
  "imgUrl": "https://projectimage.com",
  "description": "Something about the Project",
  "maxTeamSize": "7",
  "technologies": [
    "c2b5ee31-8e30-403c-8acf-5731695b64b2",
    "260042bd-b7ce-45e3-bd68-f119554fb674"
  ]
}
```

### Exemplo de Response:

```
STATUS: 201 Created
```

```json
{
  "name": "Project Name",
  "imgUrl": "https://projectimage.com",
  "description": "Something about the Project",
  "maxTeamSize": 7,
  "deletedAt": null,
  "id": "d94a4326-acd8-4d77-9d7f-561799e771da",
  "isActive": true,
  "createdAt": "2023-01-16T15:09:29.917Z",
  "updatedAt": "2023-01-16T15:09:29.917Z",
  "ownerId": "9bec60b8-dcaf-482d-94a3-0b4c598c06fe",
  "technologies": [
    {
      "id": "c2b5ee31-8e30-403c-8acf-5731695b64b2",
      "name": "CSS",
      "icon": "https://cdn.jsdelivr.net/gh/devicons",
      "createdAt": "2023-01-16T15:09:04.647Z",
      "updatedAt": "2023-01-16T15:09:04.647Z",
      "deletedAt": null
    },
    {
      "id": "260042bd-b7ce-45e3-bd68-f119554fb674",
      "name": "JS",
      "icon": "https://cdn.jsdelivr.net/gh/devicons",
      "createdAt": "2023-01-16T15:09:07.629Z",
      "updatedAt": "2023-01-16T15:09:07.629Z",
      "deletedAt": null
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 401 Unauthorized | Invalid token                      |
| 400 Bad request  | "name" is a required field         |
| 400 Bad request  | "maxTeamSize" is a required field  |
| 400 Bad request  | "technologies" is a required field |

---

### 3.2. **Listagem de projetos**

[ Voltar para os Endpoints ](#4-endpoints)

### `GET /projects`

### Body para a requisição:

```json
No-Body
```

### Exemplo de Response:

```
STATUS: 200 Ok
```

```json
{
  "nextPage": null,
  "previousPage": null,
  "totalPages": 1,
  "projects": [
    {
      "id": "f56487d8-c302-4369-96d3-36876edea67f",
      "name": "Project Test",
      "imgUrl": "https://projectimage.com",
      "description": "Another Project",
      "maxTeamSize": 7,
      "isActive": true,
      "createdAt": "2023-01-16T15:11:09.198Z",
      "updatedAt": "2023-01-16T15:11:09.213Z",
      "deletedAt": null,
      "owner": {
        "id": "9bec60b8-dcaf-482d-94a3-0b4c598c06fe",
        "email": "felps@mail.com",
        "name": "Felipe",
        "avatarUrl": null,
        "level": null,
        "contact": null
      },
      "projectTechs": [
        {
          "technologies": {
            "name": "NodeJS",
            "icon": "https://cdn.jsdelivr.net/gh/devicons"
          }
        },
        {
          "technologies": {
            "name": "React",
            "icon": "https://cdn.jsdelivr.net/gh/devicons"
          }
        }
      ]
    },
    {
      "id": "d94a4326-acd8-4d77-9d7f-561799e771da",
      "name": "Project Name",
      "imgUrl": "https://projectimage.com",
      "description": "Something about the Project",
      "maxTeamSize": 7,
      "isActive": true,
      "createdAt": "2023-01-16T15:09:29.917Z",
      "updatedAt": "2023-01-16T15:09:30.017Z",
      "deletedAt": null,
      "owner": {
        "id": "9bec60b8-dcaf-482d-94a3-0b4c598c06fe",
        "email": "felps@mail.com",
        "name": "Felipe",
        "avatarUrl": null,
        "level": null,
        "contact": null
      },
      "projectTechs": [
        {
          "technologies": {
            "name": "CSS",
            "icon": "https://cdn.jsdelivr.net/gh/devicons"
          }
        },
        {
          "technologies": {
            "name": "JS",
            "icon": "https://cdn.jsdelivr.net/gh/devicons"
          }
        }
      ]
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro   | Descrição     |
| ---------------- | ------------- |
| 401 Unauthorized | Invalid token |

---

### 3.3. **Listagem de projetos criados pelo usuário**

[ Voltar para os Endpoints ](#4-endpoints)

### `GET /projects/user/:id`

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição     |
| --------- | ------ | ------------- |
| id        | string | ID do usuário |

### Body para a requisição:

```json
No-Body
```

### Exemplo de Response:

```
STATUS: 200 Ok
```

```json
{
  "nextPage": null,
  "previousPage": null,
  "totalPages": 1,
  "projects": [
    {
      "id": "f56487d8-c302-4369-96d3-36876edea67f",
      "name": "Project Test",
      "imgUrl": "https://projectimage.com",
      "description": "Another Project",
      "maxTeamSize": 7,
      "isActive": true,
      "createdAt": "2023-01-16T15:11:09.198Z",
      "updatedAt": "2023-01-16T15:11:09.213Z",
      "deletedAt": null,
      "owner": {
        "id": "9bec60b8-dcaf-482d-94a3-0b4c598c06fe",
        "email": "felps@mail.com",
        "name": "Felipe",
        "avatarUrl": null,
        "level": null,
        "contact": null
      },
      "projectTechs": [
        {
          "technologies": {
            "name": "NodeJS",
            "icon": "https://cdn.jsdelivr.net/gh/devicons"
          }
        },
        {
          "technologies": {
            "name": "React",
            "icon": "https://cdn.jsdelivr.net/gh/devicons"
          }
        }
      ]
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro   | Descrição               |
| ---------------- | ----------------------- |
| 401 Unauthorized | Invalid token           |
| 400 Bad request  | This must be valid uuid |

---

### 3.4. **Listagem da lista de espera de um projeto**

[ Voltar para os Endpoints ](#4-endpoints)

### `GET /projects/:id/queue`

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição     |
| --------- | ------ | ------------- |
| id        | string | ID do projeto |

### Body para a requisição:

```json
No-Body
```

### Exemplo de Response:

```
STATUS: 200 Ok
```

```json
{
  ///Retorno da fila de um projeto - AGUARDADO DAVIDSON
}
```

### Possíveis Erros:

| Código do Erro   | Descrição               |
| ---------------- | ----------------------- |
| 401 Unauthorized | Invalid token           |
| 400 Bad request  | This must be valid uuid |

---

### 3.4. **Atualização dos dados de um projeto**

[ Voltar para os Endpoints ](#4-endpoints)

### `PATCH /projects/:id`

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição     |
| --------- | ------ | ------------- |
| id        | string | ID do projeto |

### Body para a requisição:

```json
{
  "name": "New Project Name",
  "imgUrl": "https://newprojectimage.com",
  "description": "Change the description",
  "maxTeamSize": "7"
}
```

### Exemplo de Response:

```
STATUS: 200 Ok
```

```json
{
  "id": "f56487d8-c302-4369-96d3-36876edea67f",
  "name": "New Project Name",
  "imgUrl": "https://newprojectimage.com",
  "description": "Change the description",
  "maxTeamSize": 7,
  "isActive": true,
  "createdAt": "2023-01-16T15:11:09.198Z",
  "updatedAt": "2023-01-16T15:19:36.854Z",
  "deletedAt": null
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                        |
| ---------------- | -------------------------------- |
| 401 Unauthorized | Invalid token                    |
| 401 Unauthorized | User must have admin permissions |
| 400 Bad request  | This must be valid uuid          |

---

### 3.5. **Rota para o usuários entrar para a fila de espera de um projeto**

[ Voltar para os Endpoints ](#4-endpoints)

### `POST /projects/joinqueue/:id`

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição     |
| --------- | ------ | ------------- |
| id        | string | ID do projeto |

### Body para a requisição:

```json
{
  "No-Body"
}
```

### Exemplo de Response:

```
STATUS: 200 Ok
```

```json
{
  "message:You joined in this project waiting list"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                              |
| ---------------- | -------------------------------------- |
| 401 Unauthorized | Invalid token                          |
| 401 Unauthorized | You confirmed this user on the project |
| 400 Bad request  | Id does not exists                     |
| 409 Forbidden    | You already confirmed on this project  |

---

### 3.6. **Fazer alteração de usuários na fila do projeto(confirmar ou recusar)**

[ Voltar para os Endpoints ](#4-endpoints)

### `PATCH /projects/confirmuser/:id`

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição             |
| --------- | ------ | --------------------- |
| id        | string | ID da fila do projeto |

### Body para a requisição:

```json
{
  "No-Body"
}
```

### Exemplo de Response:

```
STATUS: 200 Ok
```

```json
{
  "message:You confirmed this user in this project"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                              |
| ---------------- | -------------------------------------- |
| 401 Unauthorized | Invalid token                          |
| 401 Unauthorized | You confirmed this user on the project |
| 400 Bad request  | Id does not exists                     |
| 409 Forbidden    | You already confirmed on this project  |

---

### 3.7. **Deleção de um projeto**

[ Voltar para os Endpoints ](#4-endpoints)

### `DELETE /projects/:id`

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição     |
| --------- | ------ | ------------- |
| id        | string | ID do projeto |

### Body para a requisição:

```json
{
  "name": "New Project Name",
  "imgUrl": "https://newprojectimage.com",
  "description": "Change the description",
  "maxTeamSize": "7"
}
```

### Exemplo de Response:

```
STATUS: 204 No content
```

### Possíveis Erros:

| Código do Erro   | Descrição                        |
| ---------------- | -------------------------------- |
| 401 Unauthorized | Invalid token                    |
| 400 Bad request  | This must be valid uuid          |
| 403 Forbidden    | This project already was deleted |

---

## 4. **Technologies**

[ Voltar para os Endpoints ](#4-endpoints)

O objeto Technologies é definido como:

| Campo     | Tipo   | Descrição                |
| --------- | ------ | ------------------------ |
| id        | string | Identificador único      |
| name      | string | O nome                   |
| icon      | string | Icone da tecnologia      |
| createdAt | string | Data de criação          |
| updatedAt | string | Data de atualização      |
| deletedAt | string | Data em que foi deletado |

### Endpoints

| Método | Rota              | Descrição                                      |
| ------ | ----------------- | ---------------------------------------------- |
| POST   | /technologies     | Criação                                        |
| GET    | /technologies     | Listagem de todas tecnologias                  |
| PATCH  | /technologies/:id | Alteração da tecnologia passada como parâmetro |
| DELETE | /technologies/:id | Deleção                                        |

---

### 4.1. **Criação de uma Tecnologia**

[ Voltar para os Endpoints ](#4-endpoints)

### `POST /technologies`

### Body para a requisição:

```json
{
  "name": "CSS",
  "icon": "https://cdn.jsdelivr.net/gh/devicons"
}
```

### Exemplo de Response:

```
STATUS: 201 Created
```

```json
{
  "name": "CSS",
  "icon": "https://cdn.jsdelivr.net/gh/devicons",
  "deletedAt": null,
  "id": "49eece28-8710-43da-8aab-b952fdc81374",
  "createdAt": "2023-01-16T18:50:45.147Z",
  "updatedAt": "2023-01-16T18:50:45.147Z"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                        |
| ---------------- | -------------------------------- |
| 401 Unauthorized | Invalid token                    |
| 401 Unauthorized | User must have admin permissions |
| 400 Bad request  | "name" is a required field       |
| 400 Bad request  | "icon" is a required field       |
| 409 Conflict     | Technologies already exists      |

---

### 4.2. **Listagem de todas as tecnologias**

[ Voltar para os Endpoints ](#4-endpoints)

### `GET /technologies`

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
    "id": "c2b5ee31-8e30-403c-8acf-5731695b64b2",
    "name": "CSS",
    "icon": "https://cdn.jsdelivr.net/gh/devicons",
    "createdAt": "2023-01-16T15:09:04.647Z",
    "updatedAt": "2023-01-16T15:09:04.647Z",
    "deletedAt": null
  },
  {
    "id": "260042bd-b7ce-45e3-bd68-f119554fb674",
    "name": "JS",
    "icon": "https://cdn.jsdelivr.net/gh/devicons",
    "createdAt": "2023-01-16T15:09:07.629Z",
    "updatedAt": "2023-01-16T15:09:07.629Z",
    "deletedAt": null
  }
]
```

### Possíveis Erros:

| Código do Erro   | Descrição     |
| ---------------- | ------------- |
| 401 Unauthorized | Invalid token |

---

### 4.3. **Atualização de dados da tecnologia**

[ Voltar para os Endpoints ](#4-endpoints)

### `PATCH /technologies/:id`

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição        |
| --------- | ------ | ---------------- |
| id        | string | ID da tecnologia |

### Body para a requisição:

```json
{
  "name": "JS",
  "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg"
}
```

### Exemplo de Response:

```
STATUS: 200 OK
```

```json
{
  "id": "260042bd-b7ce-45e3-bd68-f119554fb674",
  "name": "JS",
  "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  "createdAt": "2023-01-16T15:09:07.629Z",
  "updatedAt": "2023-01-16T18:52:59.803Z",
  "deletedAt": null
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                        |
| ---------------- | -------------------------------- |
| 401 Unauthorized | Invalid token                    |
| 401 Unauthorized | User must have admin permissions |
| 400 Bad request  | This must be a valid UUID        |
| 404 Not Found    | Id does not exists               |
| 409 Conflict     | Technologies already exists      |

---

### 4.4. **Deleção da technologia**

[ Voltar para os Endpoints ](#4-endpoints)

### `DELETE /technologies/:id`

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição        |
| --------- | ------ | ---------------- |
| id        | string | ID da tecnologia |

### Body para a requisição:

```json
{
  "No-Body"
}
```

### Exemplo de Response:

```
STATUS: 204 No Content
```

### Possíveis Erros:

| Código do Erro   | Descrição                        |
| ---------------- | -------------------------------- |
| 401 Unauthorized | Invalid token                    |
| 401 Unauthorized | User must have admin permissions |
| 400 Bad request  | This must be a valid UUID        |
| 404 Not Found    | Id does not exists               |

---

## 5. Considerações finais!

Percebemos que o desenvolvimento de uma API dinâmica que possa fazer a conexão entre dados que se inter-relacionam em diferentes situações era essencial para a proposta WorkMatch. Através desse desenvolvimento facilitamos as interações pelo usuário, que consegue utilizar esses dados numa diversidade de contextos. Além disso, todas essas interações foram pensadas com foco na segurança desses dados e na praticidade da utilização da aplicação. Essa segurança acontece através da validação dos dados em cada rota para certificar que as transferências de informação ocorram de maneira correta e organizada.
Esperamos que a utilização dessas funcionalidades possam ampliar possibilidades e garantir o sucesso na realização desse objetivo!
