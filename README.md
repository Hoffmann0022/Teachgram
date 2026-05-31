# Teachgram — Frontend

Interface web da rede social **Teachgram**, desenvolvida com React, TypeScript e Tailwind CSS como desafio final do curso **3035Teach**.

---

## 🛠️ Tecnologias

- [React 19](https://react.dev/)
- [TypeScript 6](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Vite 8](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [React Router DOM v7](https://reactrouter.com/)

---

## 📁 Estrutura do projeto

```
src/
├── assets/
│   └── img/               # Imagens estáticas (logo, banner, detalhes)
├── components/
│   ├── modals/
│   │   ├── createPostModal.tsx   # Modal de criação de post (3 etapas)
│   │   ├── deletePostModal.tsx   # Modal de confirmação de exclusão de post
│   │   ├── deleteUserModal.tsx   # Modal de confirmação de exclusão de conta
│   │   └── friendsModal.tsx      # Modal de amigos com paginação
│   ├── navbars/
│   │   ├── navbar.tsx            # Sidebar desktop
│   │   └── bottomNav.tsx         # Navbar mobile (bottom)
│   └── post/
│       ├── postFeed.tsx          # Card de post no feed
│       ├── postProfile.tsx       # Post em grade no perfil próprio
│       └── postUser.tsx          # Post em grade no perfil de outro usuário
├── context/
│   └── authContext.tsx           # Contexto de autenticação global
├── pages/
│   ├── Login.tsx                 # Tela de login
│   ├── SignUp.tsx                # Tela de cadastro
│   ├── Loading.tsx               # Tela de carregamento (splash)
│   ├── Profile.tsx               # Perfil do usuário logado
│   ├── UserProfile.tsx           # Perfil de outro usuário
│   ├── Feed.tsx                  # Feed de publicações
│   ├── Settings.tsx              # Configurações da conta
│   ├── ConfigAccount.tsx         # Configurações detalhadas
│   └── EditProfile.tsx           # Edição de perfil
├── services/
│   ├── api.ts                    # Instância do axios com interceptors
│   └── authService.ts            # Serviços de autenticação e usuário
├── types/
│   ├── user.ts                   # Tipos do usuário
│   └── post.ts                   # Tipos do post
├── index.css                     # Estilos globais (Tailwind)
└── main.tsx                      # Entrada da aplicação e rotas
```

---

## 🚀 Como rodar

### Pré-requisitos

- Node.js 18+
- Backend rodando em `http://localhost:8080`

### Instalação

```bash
# Clone o repositório
git clone <url-do-repo>
cd frontend/Teachgram

# Instale as dependências
npm install

# Rode em desenvolvimento
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

### Build para produção

```bash
npm run build
npm run preview
```

---

## 🔗 Rotas

| Rota | Página |
|------|--------|
| `/` | Cadastro |
| `/login` | Login |
| `/perfil` | Perfil do usuário logado |
| `/usuario/:id` | Perfil de outro usuário |
| `/feed` | Feed de publicações |
| `/configuracoes` | Configurações |
| `/configuracoes_da_conta` | Configurações da conta |
| `/editar_perfil` | Editar perfil |

---

## 🔐 Autenticação

A autenticação é feita via **JWT**. Após o login, o token é salvo no `localStorage` e injetado automaticamente em todas as requisições pelo interceptor do axios.

```typescript
// src/services/api.ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

Se o token expirar (401), o usuário é redirecionado automaticamente para o login e o `localStorage` é limpo.

---

## 📡 Conexão com o backend

A URL base da API está configurada em `src/services/api.ts`:

```typescript
const api = axios.create({
  baseURL: "http://localhost:8080/api",
})
```

Para apontar para outro ambiente, basta alterar o `baseURL`.

---

## ✨ Funcionalidades

- ✅ Cadastro de usuário com validação
- ✅ Login com JWT
- ✅ Visualização e edição de perfil
- ✅ Exclusão lógica de conta
- ✅ Criação de posts com foto e privacidade
- ✅ Exclusão de posts
- ✅ Feed de publicações em ordem cronológica
- ✅ Curtir posts com animação
- ✅ Adicionar e remover amigos
- ✅ Visualizar perfil de outros usuários
- ✅ Navbar responsiva (sidebar desktop / bottom nav mobile)