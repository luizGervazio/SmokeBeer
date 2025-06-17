# Projeto API - Documentação

Este documento lista e explica as principais rotas e funcionalidades implementadas na API até o momento.

---

## 1. Autenticação (Auth)

### `POST /login`

Realiza o login do usuário autenticando pelo documento e senha.

- **Request Body:**

```json
{
  "document": "12345678911",
  "password": "admin123"
}
```

- **Response:**

```json
{
  "access_token": "JWT_TOKEN_AQUI"
}
```

- **Observações:**  
  - Rota pública, não exige autenticação nem roles.  
  - Senha é comparada utilizando bcrypt.

---

## 2. Usuários (Users)

### `GET /users/:id`

Busca usuário pelo ID.

- **Response:**

```json
{
  "id": 1,
  "name": "Administrador",
  "document": "12345678911",
  "roles": ["admin"],
  "createdAt": "2025-06-14T18:07:21.505Z"
}
```


### `POST /users`

Cria um novo usuário.

- **Request Body:**

- **Para criar um usuario com permissoes padroes** 
```json
{
  "name": "Usuário Teste",
  "document": "12345678999",
  "password": "senha123"
}
```

- **Para criar um usuario com permissoes administrativas** 
```json
{
  "name": "Usuário Teste",
  "document": "12345678999",
  "password": "senha123",
  "roles": ["admin"]
}
```

- **Observações:**  
  - Senha é criptografada antes de salvar no banco.  
  - Roles padrão atribuída é `[USER]`.

### `PUT /users/:id`

Atualiza os dados do usuário (incluindo possibilidade de atualizar senha, que será criptografada).

### `DELETE /users/:id`

Remove o usuário com o ID informado.

---

## 3. Vinhos (Wines)

### `GET /wines`

Retorna todos os vinhos cadastrados.

### `GET /wines/:id`

Busca vinho pelo ID.

### `POST /wines`

Cria um novo vinho.

- **Request Body:**

```json
{
  "name": "Vinho Exemplo",
  "productor": "Vinícola XPTO",
  "country": "Brasil",
  "region": "Vale dos Vinhedos",
  "year": 2020,
  "alcoholContent": 13.5,
  "typeGrape": "Cabernet Sauvignon",
  "description": "Vinho encorpado e aromático.",
  "price": 120.50
}
```

### `PUT /wines/:id`

Atualiza os dados do vinho.

### `DELETE /wines/:id`

Remove o vinho com o ID informado.

---

## 4. Segurança e Autorização

- **JWT Guard:** Protege as rotas para garantir que somente usuários autenticados acessem.  
- **Roles Guard:** Controla o acesso por roles (ex: ADMIN, USER).  
- **Decorator `@Public()`:** Marca rotas que são públicas e não exigem autenticação, como `/login`.  
- **Bypass para Admin:** Usuários com role `ADMIN` possuem acesso liberado a todas as rotas.

---

## 5. Observações Técnicas

- Senhas são armazenadas de forma segura utilizando `bcrypt`.  
- JWT é assinado com segredo forte definido em `jwtConstants`.  
- Utiliza `class-validator` para validar DTOs nas rotas POST/PUT.  
- Utiliza TypeORM para manipulação das entidades.

---

