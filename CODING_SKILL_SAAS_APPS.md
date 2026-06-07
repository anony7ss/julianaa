---
name: coding-skill-saas-premium
description: Use esta skill ao criar, evoluir ou revisar um SaaS premium moderno com Next.js App Router, TypeScript, MongoDB/Mongoose, Stripe, autenticação segura, SEO, acessibilidade e interface de alto nível inspirada em padrões modernos de UI.
metadata:
  short-description: SaaS premium moderno e escalável
---

# CODING SKILL - SaaS Premium

Skill mestre para gerar projetos SaaS completos, modernos, seguros, responsivos e prontos para produção.

Não assumir domínio específico do produto. O sistema deve ser flexível para qualquer tipo de SaaS.

---

# 🎯 Objetivo

Construir um sistema SaaS completo que seja:

- escalável
- seguro
- bem estruturado
- com backend funcional
- com interface premium
- pronto para produção
- com boa experiência de usuário
- com base sólida para evolução

---

# 🧱 Stack obrigatória

Use:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- MongoDB
- Mongoose
- NextAuth ou solução equivalente segura
- Zod
- React Hook Form
- Stripe (quando houver pagamento)
- API Routes / Route Handlers
- estrutura compatível com deploy (ex: Vercel)

---

# 🧠 Boas práticas obrigatórias

- tipagem forte
- separação clara entre camadas
- componentes reutilizáveis
- organização por domínio
- uso correto de variáveis de ambiente
- código limpo e consistente
- evitar lógica duplicada
- manter previsibilidade

---

# 🎨 Direção visual

Criar um design moderno, consistente e de alto nível.

Pode variar conforme o produto, mas deve:

- ter hierarquia clara
- ter boa legibilidade
- ser responsivo
- ter consistência visual
- evitar aparência de template genérico
- evitar excesso de efeitos

Elementos opcionais (usar com critério):

- animações suaves
- profundidade visual
- microinterações
- gradientes
- transições bem feitas

---

# 🧩 Componentização

Criar componentes reutilizáveis sempre que possível.

Evitar:

- código duplicado
- componentes gigantes
- lógica acoplada na UI

---

# 🧠 UX

Priorizar:

- clareza
- previsibilidade
- navegação simples
- feedback visual
- estados de loading, erro e vazio
- fluxo intuitivo

---

# 🗄️ Backend e dados

Usar MongoDB com Mongoose.

Boas práticas:

- schemas bem definidos
- validações
- timestamps
- estrutura clara
- evitar dados redundantes
- nunca expor dados sensíveis

---

# 🔐 Segurança (obrigatório)

Aplicar:

- validação server-side em tudo
- proteção de rotas privadas
- autenticação segura
- controle de acesso
- sanitização de inputs
- proteção contra XSS e injection
- rate limiting em endpoints críticos
- não confiar no frontend

Nunca:

- expor tokens ou segredos
- confiar em dados do cliente
- processar input sem validação

---

# 💳 Pagamentos (quando aplicável)

- usar Stripe
- lógica no backend
- validar webhooks
- não confiar no frontend
- sincronizar estado com eventos confiáveis

---

# ⚠️ Erros e logs

- não expor erros internos
- mensagens seguras no frontend
- logs no backend
- não logar dados sensíveis

---

# 🔑 Variáveis de ambiente

- usar `.env`
- fornecer `.env.example`
- nunca commitar segredos

---

# ⚡ Performance

- evitar bundle grande
- lazy load quando necessário
- evitar dependências desnecessárias
- otimizar renderização
- garantir boa experiência mobile

---

# 🔍 SEO (quando aplicável)

- metadata adequada
- estrutura semântica
- Open Graph
- sitemap
- URLs limpas

---

# ♿ Acessibilidade

- contraste adequado
- navegação por teclado
- labels em formulários
- foco visível
- uso de aria quando necessário

---

# 🧱 Estrutura sugerida
/src
/app
/components
/lib
/models
/services
/actions
/hooks
/types
/utils
/public


---

# 🔄 Workflow recomendado

1. Analisar o projeto atual (ou criar base)
2. Definir estrutura e arquitetura
3. Configurar banco e conexão
4. Implementar autenticação
5. Criar APIs com validação
6. Implementar UI e páginas
7. Conectar frontend ao backend
8. Adicionar estados e feedbacks
9. Revisar segurança
10. Validar build e execução

---

# ✅ Critério de qualidade

O projeto deve:

- funcionar de ponta a ponta
- ter backend real
- não depender de mocks
- ter estrutura clara
- ser fácil de manter
- estar pronto para evolução

---

# 🧠 Regra final

Se houver dúvida entre:

- rapidez
- qualidade

Escolher qualidade.

Se houver dúvida entre:

- facilidade
- segurança

Escolher segurança.