---
name: security-skill-saas-web-application
description: Use esta skill ao implementar, revisar ou auditar segurança em uma aplicação SaaS web com autenticação, autorização, APIs, MongoDB, Stripe, formulários, cookies, headers, logs, variáveis de ambiente e rotas privadas. Priorize segurança antes de conveniência em todas as decisões de código.
metadata:
  short-description: Segurança para SaaS web
---

# SECURITY SKILL - SaaS Web Application

Esta skill define padrões obrigatórios de segurança para aplicações SaaS web. Todas as decisões de arquitetura e código devem priorizar segurança antes de conveniência.

## Princípios fundamentais

- Nunca confiar no cliente/frontend.
- Validar absolutamente tudo no backend.
- Aplicar menor privilégio possível.
- Construir com segurança por padrão.
- Falhar com segurança.
- Evitar exposição de dados internos.
- Manter código previsível, simples de auditar e fácil de revisar.

## Autenticação

Regras obrigatórias:

- Use autenticação segura, como NextAuth/Auth.js ou solução equivalente.
- Quando houver senha local, use hash com `bcrypt` ou `argon2`.
- Nunca armazene senha em texto puro.
- Nunca retorne senha em respostas de API.
- Nunca exponha tokens sensíveis ao frontend.

Sessões:

- Use cookies `httpOnly`.
- Configure `secure` em produção.
- Configure `sameSite` como `strict` ou `lax`, conforme o fluxo.
- Defina expiração de sessão.
- Implemente logout real, invalidando a sessão quando aplicável.

## Autorização

Controle de acesso:

- Verifique autenticação em toda rota protegida.
- Aplique autorização por usuário, role e ownership.
- Retorne `401` quando não autenticado.
- Retorne `403` quando autenticado, mas sem permissão.

Regra crítica:

- Nunca confie em `userId` vindo do frontend.
- Nunca confie em `role` vindo do frontend.
- Sempre derive identidade e permissões da sessão ou de fonte confiável no backend.

## Validação de dados

Valide todas as entradas com Zod ou equivalente:

- `body`;
- `params`;
- `query`;
- payloads de actions;
- webhooks;
- formulários.

Regras:

- Rejeite dados inválidos.
- Valide tipo, tamanho, formato e limites.
- Não permita campos extras inesperados.
- Nunca processe dados sem validação server-side.
- Mesmo que exista validação no frontend, valide novamente no backend.

## Sanitização e inputs

Previna:

- XSS;
- NoSQL injection;
- script injection;
- HTML dinâmico inseguro.

Regras:

- Nunca use input diretamente em queries.
- Nunca confie em strings do usuário.
- Evite `dangerouslySetInnerHTML`.
- Se HTML rico for inevitável, sanitize com biblioteca confiável e allowlist estrita.
- Evite `eval`, `new Function` e execução dinâmica de código.

## MongoDB e Mongoose

Segurança:

- Nunca retorne campos sensíveis como `password`, `tokens`, `secrets` ou chaves internas.
- Use `.select()` para limitar retornos.
- Defina `select: false` em campos sensíveis quando fizer sentido.

Queries:

- Nunca construa queries manualmente com strings.
- Use Mongoose corretamente.
- Valide e normalize dados antes de salvar.
- Garanta ownership no filtro da query quando o recurso pertence a um usuário.

Schemas:

- Use validações no schema.
- Defina tipos claros.
- Use enums quando houver conjunto fechado de valores.
- Use timestamps.
- Crie índices para campos críticos sem expor dados desnecessários.

## API security

Toda API deve:

- validar entrada;
- verificar autenticação quando necessário;
- verificar autorização quando necessário;
- tratar erro;
- retornar status HTTP correto;
- nunca expor stack trace;
- nunca vazar detalhes internos de infraestrutura.

Rate limiting:

- Aplique rate limit em login, cadastro, formulários e endpoints críticos.
- Use limites mais rígidos em endpoints sensíveis.
- Retorne erros genéricos para evitar enumeração de usuários.

## Headers de segurança

Configure headers adequados no framework ou na plataforma:

- `Content-Security-Policy`;
- `X-Frame-Options`;
- `X-Content-Type-Options`;
- `Referrer-Policy`;
- `Strict-Transport-Security`;
- `Permissions-Policy` quando aplicável.

Ao configurar CSP, prefira allowlists explícitas e revise fontes externas de scripts, imagens, frames e conexões.

## Stripe e pagamentos

Regras críticas:

- Nunca confie no frontend para status de pagamento.
- Toda lógica crítica de pagamento deve ser server-side.
- Crie checkout, portal e alterações de assinatura no servidor.
- Não aceite preço, plano ou valor final apenas do cliente sem validação no backend.

Webhooks:

- Valide assinatura do webhook.
- Rejeite eventos inválidos.
- Atualize estado de assinatura apenas com eventos confiáveis.
- Faça idempotência para evitar processamento duplicado.
- Não exponha segredo do webhook.

## Formulários

Segurança obrigatória:

- Valide todos os campos no backend.
- Implemente anti-spam com rate limit, honeypot ou captcha.
- Normalize campos como email antes de salvar.
- Retorne mensagens seguras, sem revelar detalhes internos.

Nunca:

- aceite envio direto sem validação;
- confie apenas no frontend;
- salve payload bruto sem filtro.

## Proteção contra ataques

XSS:

- Escape conteúdo dinâmico.
- Evite `dangerouslySetInnerHTML`.
- Sanitize conteúdo gerado por usuário.

CSRF:

- Use proteção nativa do provedor de auth quando disponível.
- Valide origem de requisições sensíveis.
- Prefira métodos HTTP corretos e tokens quando necessário.

Injection:

- Nunca use input diretamente em queries.
- Rejeite operadores inesperados em payloads.
- Evite execução dinâmica de código.

## Cookies e tokens

- Use cookies `httpOnly` para tokens sensíveis.
- Use `secure = true` em produção.
- Use `sameSite = strict` ou `lax`.
- Nunca armazene tokens sensíveis em `localStorage`.
- Defina expiração e rotação quando aplicável.

## Erros e logs

Erros:

- Não exponha detalhes internos.
- Use mensagens genéricas no frontend.
- Retorne códigos HTTP coerentes.

Logs:

- Registre erros, eventos de autenticação e eventos importantes de negócio.
- Nunca registre senha, token, segredo, dados de cartão ou informações sensíveis.
- Evite logs com payload bruto de usuário.

## Variáveis de ambiente

Regras:

- Nunca commite `.env`.
- Crie e mantenha `.env.example`.
- Use variáveis para banco, auth, Stripe, email e integrações externas.
- Separe variáveis públicas de segredos privados.
- Exponha ao cliente apenas variáveis explicitamente públicas.

## Proteção de rotas

Rotas privadas:

- Verifique sessão antes de executar lógica.
- Retorne `401` se não autenticado.
- Retorne `403` se não autorizado.
- Confirme ownership antes de ler, alterar ou excluir recursos.

Rotas administrativas:

- Exija role adequada.
- Nunca aceite role enviada pelo cliente.
- Audite ações críticas quando possível.

## Dependências

- Evite bibliotecas desnecessárias.
- Mantenha dependências atualizadas.
- Não use bibliotecas abandonadas.
- Prefira libs conhecidas para auth, criptografia, sanitização, validação e rate limit.
- Não implemente criptografia própria.

## Workflow de revisão de segurança

Ao usar esta skill:

1. Identifique rotas públicas, privadas e administrativas.
2. Liste entradas de usuário: forms, APIs, params, query, actions e webhooks.
3. Confirme validação server-side em cada entrada.
4. Confirme autenticação e autorização em cada rota protegida.
5. Revise queries MongoDB para ownership e ausência de injection.
6. Revise respostas de API para garantir que campos sensíveis não vazam.
7. Revise cookies, sessões, tokens e variáveis de ambiente.
8. Revise Stripe para garantir lógica server-side e webhooks verificados.
9. Revise logs para evitar vazamento de segredos.
10. Valide headers, rate limit e checklist de produção.

## Checklist de produção

Antes de liberar:

- HTTPS ativo.
- Cookies seguros.
- Rate limit ativo em endpoints sensíveis.
- Webhooks Stripe validados.
- Rotas privadas protegidas.
- Autorização por role/ownership implementada.
- Nenhum dado sensível exposto em APIs.
- `.env.example` atualizado.
- `.env` fora do repositório.
- Logs funcionando sem segredos.
- Headers de segurança configurados.
- Validação server-side em todas as entradas.
- Nenhum token sensível em `localStorage`.
- Dependências revisadas.

## Regra final

Se houver dúvida entre facilidade e segurança, escolha segurança.

O sistema deve estar preparado para usuários reais, dados sensíveis, pagamentos reais e ataques reais sem exigir reescrita posterior.
