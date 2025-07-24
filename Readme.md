# Delivery API

API RESTful para gerenciamento de usuários, produtos, pedidos e autenticação de um sistema de Delivery.

---

## **Tecnologias Utilizadas**

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Zod](https://github.com/colinhacks/zod) (validação)
- [Docker](https://www.docker.com/) (opcional)

---

## **Como rodar o projeto**

### **Pré-requisitos**

- Node.js 18+ e npm
- PostgreSQL (local ou remoto)
- Docker (opcional)

### **Instalação**

```bash
git clone https://github.com/seu-usuario/seu-repo-delivery.git
cd seu-repo-delivery
cp .env.example .env
# Edite o .env para apontar para seu banco de dados PostgreSQL
npm install
npx prisma migrate deploy
```

### **Executando**

```bash
npm run dev
# ou usando Docker
docker compose up --build
```

A API estará disponível em `http://localhost:3333`

---

## **Principais Endpoints**

### **Autenticação**

| Método | Endpoint  | Descrição           |
| ------ | --------- | ------------------- |
| POST   | /users    | Cadastro de usuário |
| POST   | /sessions | Login, retorna JWT  |

#### Exemplo cadastro:

```json
POST /users
{
  "name": "Maria",
  "email": "maria@email.com",
  "password": "senha123"
}
```

#### Exemplo login:

```json
POST /sessions
{
  "email": "maria@email.com",
  "password": "senha123"
}
```

Resposta:

```json
{
  "token": "jwt_token_aqui"
}
```

---

### **Produtos**

| Método | Endpoint       | Descrição          | Auth |
| ------ | -------------- | ------------------ | ---- |
| GET    | /products      | Lista produtos     | Não  |
| POST   | /products      | Cria produto       | Sim  |
| GET    | /products/\:id | Detalhe de produto | Não  |

#### Exemplo criar produto:

```json
POST /products
Headers: Authorization: Bearer {token}

{
  "name": "Pizza Calabresa",
  "description": "Pizza deliciosa",
  "price": 49.90,
  "imageUrl": "https://imagem.jpg"
}
```

---

### **Pedidos**

| Método | Endpoint     | Descrição              | Auth |
| ------ | ------------ | ---------------------- | ---- |
| POST   | /orders      | Criar pedido           | Sim  |
| GET    | /orders      | Listar pedidos do user | Sim  |
| GET    | /orders/\:id | Detalhes do pedido     | Sim  |

#### Exemplo criar pedido:

```json
POST /orders
Headers: Authorization: Bearer {token}

{
  "items": [
    {"productId": "uuid-produto", "quantity": 2},
    {"productId": "uuid-produto2", "quantity": 1}
  ],
  "totalValue": 120.00
}
```

---

## **Autenticação**

- Após login, use o token JWT nos headers das rotas protegidas:

```
Authorization: Bearer seu_token_jwt
```

---

## **Variáveis de ambiente**

Exemplo `.env`:

```
DATABASE_URL=postgresql://usuario:senha@localhost:5432/delivery
JWT_SECRET=sua_chave_jwt
PORT=3333
```

---

## **Scripts úteis**

```bash
npm run dev       # Iniciar em modo desenvolvimento
npm run build     # Build de produção
npm run start     # Iniciar em produção
npx prisma studio # Acessar interface web do banco
```

---