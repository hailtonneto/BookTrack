# 📚 BookTrack API

API RESTful para gerenciamento de leituras de livros. Permite que usuários cadastrem, atualizem e acompanhem os livros que desejam ler, estão lendo ou já leram.

---

## 🚀 Funcionalidades

### 📌 Funcionalidades obrigatórias:
- Cadastro, listagem e exclusão de usuários
- Cadastro, edição, listagem e exclusão de livros
- Validações de regras de negócio
- Controle de versão com Git (branch por feature)

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Sequelize
- JWT + bcrypt
- Insomnia (para testes de API)

---

## 🧰 Como rodar o projeto localmente

### 1. Clone o repositório:
```bash
git clone https://github.com/hailtonneto/booktrack.git
cd booktrack
````

### 2. Instale as dependências:

```bash
npm install
```

### 3. Configure o `.env`:

Crie um arquivo `.env` com base no `.env.example` e preencha com as variáveis necessárias (ex: DB, JWT\_SECRET, etc).

### 4. Execute as migrations/seeds (caso esteja usando um ORM):

```bash
npx knex migrate:latest
npx knex seed:run
```

### 5. Inicie o servidor:

```bash
npm start
```

Servidor disponível em: `http://localhost:3000`

---

## ✅ Regras de Negócio

* Apenas o dono de um livro pode editá-lo ou excluí-lo
* Livros com status **"Lido"** não podem ser editados
* Avaliação (1 a 5) só é permitida se o status for "Lido"
* Ao marcar como "Lido", a `data_conclusao` é preenchida automaticamente

---

## 📌 Exemplos de Rotas

| Método | Rota          | Descrição                                        |
| ------ | ------------- | ------------------------------------------------ |
| POST   | `/usuarios`   | Cadastrar novo usuário                           |
| POST   | `/login`      | Realizar login                                   |
| GET    | `/livros`     | Listar livros do usuário autenticado             |
| POST   | `/livros`     | Cadastrar um novo livro                          |
| PUT  | `/livros/:id` | Atualizar um livro (exceto se status for "Lido") |
| DELETE | `/livros/:id` | Excluir um livro                                 |
