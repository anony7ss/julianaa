# Juu News

Portal de noticias romantico e divertido dedicado a Juliana, com capa publica, paginas de noticia, categorias, linha do tempo, rankings, declaracao especial e painel admin protegido por Supabase Auth/RLS.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase Auth, Postgres e Storage
- React Hook Form + Zod
- Framer Motion pronto para evolucao
- Rotas API server-side para mutacoes admin
- Busca global, arquivo, favoritos, mural, quiz, galeria de gatos e pagina diaria
- Admin com filtros, autosave, biblioteca de midia, agendamento, auditoria e exportacao

## Rodar local

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Sem variaveis Supabase, o site usa o seed local para preview publico, mas o admin permanece bloqueado. Para uma demo local temporaria do painel, defina `NEXT_PUBLIC_ENABLE_DEMO_ADMIN=true`; em producao mantenha sempre `false`.

## Variaveis

Copie `.env.example` para `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_DEMO_ADMIN=false
```

Nao exponha `SUPABASE_SERVICE_ROLE_KEY` no frontend. Ela fica apenas para operacoes administrativas locais/scripts futuros, nao e usada pelo cliente. Se uma chave real ja foi colocada em arquivo compartilhado, rotacione a chave no Supabase.

## Supabase

1. Crie um projeto Supabase.
2. Rode `supabase/schema.sql` no SQL Editor.
3. Rode `supabase/seed.sql`.
4. Crie um usuario admin em Authentication.
5. Copie o `auth.users.id` do usuario criado.
6. Rode o insert comentado no topo de `supabase/seed.sql`, trocando o UUID.
7. Configure as variaveis `.env.local`.

Use `https://seu-projeto.supabase.co` em `NEXT_PUBLIC_SUPABASE_URL`. O app tambem normaliza o host `seu-projeto.supabase.co`, mas manter a URL completa evita confusao.

O schema cria:

- `profiles`
- `posts`
- `categories`
- `authors`
- `love_quotes`
- `timeline_events`
- `rankings`
- `ranking_items`
- `admin_audit_logs`
- bucket publico `post-covers` com policies de escrita apenas para admin

Se o banco ja existia antes desta versao, rode `supabase/schema.sql` novamente para adicionar `posts.scheduled_at`, os indices novos e a tabela `admin_audit_logs`.

## Seguranca

- RLS esta ativado em todas as tabelas.
- Leitura publica de posts retorna apenas `status = 'published'`.
- Mutacoes exigem usuario autenticado com `profiles.role = 'admin'`.
- `proxy.ts` protege navegacao em `/admin` e tambem verifica `profiles.role = 'admin'`; paginas e APIs revalidam permissao no servidor.
- APIs validam payloads com Zod e retornam erros genericos.
- Inputs de texto removem HTML antes de persistir conteudo de noticia.
- Upload usa Supabase Storage com MIME allowlist e limite de 5 MB.
- Upload de imagem no admin tenta comprimir para WebP antes de enviar.
- Headers de seguranca e CSP estao em `next.config.ts`.
- Exportacao em `/api/admin/export` exige sessao admin.
- Logs de auditoria registram mutacoes admin quando o Supabase esta configurado.

## Validacao

```bash
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

## Design

Conceitos visuais salvos em:

- `public/design/concept-public-home.png`
- `public/design/concept-admin.png`

Assets gerados para a interface:

- `public/images/cat-news-editor.png`
- `public/images/cat-love-letters.png`
- `public/images/cat-breaking-news.png`
- `public/images/cat-rose-nap.png`
