# Clínica Saúde - Sistema de Gestão de Filas 🏥

**Aplicação Next.js (App Router) para gerenciamento de atendimentos, totens, painéis de TV e administração de setores/usuários.**

---

## Sumário

- ✅ Visão geral
- 🔀 Rotas e páginas
- ⚙️ Funcionalidades
- 🔌 API utilizada
- 🧭 Autenticação
- 🛠 Tecnologias e dependências
- 🚀 Como executar localmente
- 💡 Observações e melhorias sugeridas

---

## ✅ Visão geral

Este projeto implementa um painel administrativo e interfaces para os diferentes pontos de atendimento de uma clínica: triagem, guichê, resultados, totem para pacientes e um painel de TV para exibição de pacientes chamados e anúncios.

O frontend consome uma API externa (https://fabrica-kqdb.onrender.com) para operações como login, gerenciamento de atendentes, setores, pacientes, atendimentos e anúncios.

---

## 🔀 Rotas e páginas (resumo)

- `/` — Tela de login (autenticação) 👤
- `/admin/home` — Dashboard do administrador (gerenciar usuários, setores, anúncios) ⚙️
- `/admin/createAnuncioPage` — Formulário para criar anúncios (YouTube) 📢
- `/token` — Totem para pacientes: gerar senha/ticket 🧾
- `/tv` — Tela de exibição (TV) com paciente atual e últimos chamados 📺
- `/triagem` — Painel de triagem (fila + paciente) 🩺
- `/guiche` — Painel de guichê (fila, stand-by, paciente) 🪧
- `/resultados` — Painel resultados (fila + paciente) 📑

Observação: existe uma rota comentada para detalhar/reproduzir um anúncio em `/tv/anuncio/[id]` (arquivo comentado em `src/app/(pages)/tv/anuncio/[id]/anuncioID.tsx`).

---

## ⚙️ Funcionalidades principais

- Login via `POST /api/login` — token salvo no `localStorage` (`authToken`).
- Diferenciação de perfis: **ADMIN** redireciona para `/admin/home`, demais usuários vão para `/guiche`.
- Administração:
  - Listar, criar e excluir **atendentes** (usuários).
  - Criar **setores** (com flag "primeiro contato").
  - Listar e criar **anúncios** (YouTube). Há botões para deletar/modificar/reproduzir (algumas ações ainda sem implementação completa).
- Totem (/token): formulário para gerar senha/ticket — cria paciente e cria atendimento associado a um setor. Mostra a senha gerada na tela.
- Painéis de atendimento (/triagem, /guiche, /resultados): listagem de atendimentos e paciente atual, com abas para fila principal e stand-by, e botão para "Chamar o Próximo" (UI pronta; integração com backend para avançar fila deve ser revisada conforme regras de negócio).
- TV (/tv): componente de exibição com logo, paciente atual, últimos chamados e banner de boas-vindas.

---

## 🔌 API (endpoints utilizados)

O front usa chamadas diretas para a API hospedada em `https://fabrica-kqdb.onrender.com/api/`:

- `POST /api/login` — autenticação (retorna token, id, login, role)
- `GET /api/atendente` — listar atendentes
- `POST /api/atendente` — criar atendente
- `DELETE /api/atendente/:id` — deletar atendente
- `GET /api/setor` — listar setores
- `POST /api/setor` — criar setor
- `POST /api/paciente` — criar paciente
- `GET /api/setor/:id/atendimento` — listar atendimentos do setor
- `POST /api/setor/:id/atendimento` — criar atendimento (gera senha)
- `GET /api/ad` e `POST /api/ad` — listar/criar anúncios

> Nota: as URLs da API estão escritas diretamente no código. Recomenda-se mover para uma variável de ambiente, p.ex. `NEXT_PUBLIC_API_URL`, para facilitar deploys e testes locais.

---

## 🧭 Autenticação & armazenamento

- O fluxo de login salva em `localStorage`: `authToken`, `userId`, `userLogin`.
- Várias rotas de frontend usam esse token para chamadas autenticadas (por exemplo: criar atendimento, criar anúncio, buscar atendentes protegidos).

---

## 🛠 Tecnologias e dependências

- Framework: **Next.js (App Router)**
- Linguagem: **TypeScript / React 19**
- Estilização: **Tailwind CSS**
- Animações: **Framer Motion**
- Player (dependência, usado em código comentado): **react-player**
- Notificações: **sonner**
- UI primitives: @radix-ui + componentes personalizados em `src/components/ui`

Principais scripts (package.json):

- `npm run dev` — desenvolvimento
- `npm run build` — build
- `npm start` — start

---

## 🚀 Como rodar localmente

1. Clone o repositório:

```
git clone <repo-url>
cd fabricadesoftware
```

2. Instale dependências:

```
npm install
```

3. Configure variáveis (recomendado):

- `NEXT_PUBLIC_API_URL` = `https://fabrica-kqdb.onrender.com` (opcional, não implementado no projeto atual)

4. Inicie em modo de desenvolvimento:

```
npm run dev
```

5. Abra `http://localhost:3000` no navegador.

---

## 💡 Observações, pontos pendentes e melhorias sugeridas

- Centralizar URL da API em variável de ambiente (`NEXT_PUBLIC_API_URL`) e substituir strings hardcoded.
- Implementar tratamentos de erro e UX para as ações administrativas faltantes (deletar/edit/ativar anúncios, avançar fila via API).
- A rota `tv/anuncio/[id]` tem código comentado usando `react-player` — revisar e ativar se for necessário reproduzir vídeos na TV.
- Adicionar testes (E2E / unitários) e CI para builds e lint.
- Melhorar mensagens de erro exibidas ao usuário (uso consistente de toasts / alerts).

---

© Projeto Clínico - Disciplina Fábrica de Software / Tópicos Avançados em SI - UNINASSAU 2025.2
