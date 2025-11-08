# E-commerce TDD Lab (TypeScript + Vitest)

Aprenda TDD construindo um e-commerce passo a passo, com exemplos de testes bons, ruins e ótimos — e explicações do porquê. A cada módulo você terá exercícios para praticar.

## Stack e convenções

- Stack: Node.js 18+, TypeScript, Vitest, fast-check.
- Estilo: Red → Green → Refactor, ciclos pequenos, feedback rápido.
- Estrutura: código em `src/`, testes em `tests/`, com subpastas por domínio.
- Três tipos de exemplos:
  - Bons: claros, focados, isolados.
  - Ruins: anti-padrões didáticos (para reconhecer e evitar).
  - Ótimos: property-based testing, parametrização, builders, fakes robustos.

## Rodando localmente

1) Instale dependências

```bash
npm install
```

2) Rode os testes

```bash
npm test
```

3) Opcional: modo watch e checagem de tipos

```bash
npm run test:watch
npm run typecheck
```

## Módulos do domínio

Começamos com o módulo de Usuário pronto para estudo. Depois, avançamos para Produto/Catálogo, Carrinho e Pagamento/Pedido.

Estrutura inicial:

```
src/
  domain/
    user.ts

tests/
  users/
    user.good.test.ts
    user.bad.test.ts
    user.great.test.ts
```

## Por que cada exemplo é bom ou ruim (módulo Usuário)

- user.good.test.ts
  - Foco único por teste (uma regra, uma asserção principal)
  - Nomes descritivos: “deve_...” explicam a intenção
  - Isolamento via fakes simples e fixtures pequenas
  - Arrange/Act/Assert explícito

- user.bad.test.ts
  - Vários comportamentos testados no mesmo teste (fragilidade e má leitura)
  - Dependência de ordem entre testes e estado global compartilhado
  - Valores mágicos e cenários pouco claros

- user.great.test.ts
  - Parametrização para cobrir mais casos com pouco código
  - Property-based testing (fast-check) para explorar entradas variadas automaticamente
  - Builders/helpers para expressividade

## Exercícios (pratique agora!)

1) Usuário
   - Implemente recuperação de senha com token expirável. Escreva testes bons, um ruim e um ótimo.
   - Adicione validação de força de senha (mínimo 8 chars, 1 dígito, 1 letra). Faça TDD.
   - Crie uma regra de bloqueio após 5 tentativas de login falhas em 15 minutos. Teste janelamento de tempo.

2) Produto & Catálogo
   - Crie `product.ts` com `Product(id, name, price)` e um `CatalogRepository` in-memory.
   - Testes: listagem ordenada, busca por termo, tratamento de preços inválidos.
   - Um teste ótimo usando fast-check para preço e nomes aleatórios.

3) Carrinho
   - Modele `Cart` com `add(product, qty)`, `remove(productId)`, `total()`.
   - Regras: não permitir qty <= 0; mesclar itens do mesmo produto.
   - Teste cálculos com arredondamento e grandes quantidades.

4) Pagamento & Pedido
   - Abstraia um `PaymentGateway` com `charge(amount, card)`.
   - `Order` deve ser criada apenas após pagamento confirmado.
   - Testes: sucesso, falha, idempotência (segundo submit não duplica cobrança), timeouts.

5) Refatoração
   - Extraia interfaces para repositórios e serviços.
   - Documente regras de domínio em comentários JSDoc.

Sugestões: comece cada exercício pelo teste (Red), implemente o mínimo (Green) e, só então, refatore a API (Refactor).

## Dicas de TDD

- Um teste = um motivo para falhar.
- Torne falhas legíveis; mensagens ajudam a encontrar o problema.
- Prefira fakes simples em vez de mocks profundos quando testar lógica de domínio.
- Dobre a aposta em nomes de testes que contam uma história.

Bom estudo e boas iterações!

## Melhorias Futuras (Qualidade e Confiança)

1) Cobertura de Testes
  - Rodar: `npm run coverage` (usa V8 para métricas rápidas).
  - Meta: foco em linhas de domínio críticas, não perseguir 100% cega. Verifique ramos de validação e exceções.

2) Mutation Testing (Stryker)
  - Configurado via `stryker.conf.json`. Em ambientes Node < 20 algumas versões mais novas do Stryker exigem upgrade; use a versão compatível ou rode a job de mutação apenas em Node 20 (ver CI).
  - Rodar localmente: `npm run mutate` (se sua versão de Node for suportada). Caso falhe por runner, consulte troubleshooting em https://stryker-mutator.io.
  - Interprete: se mutantes sobrevivem em regra de negócio, escreva um teste que capture explicitamente o cenário (ex.: faltar validação, falta de branch negativo).
  - Foque em matar mutantes de lógica de domínio; ignore helpers triviais para reduzir tempo.

3) Lint e Formatação
  - `npm run lint` (ESLint + regras de imports e remoção de código morto).
  - `npm run format` (Prettier) para consistência.
  - Políticas sugeridas: falha de CI se houver imports não utilizados.

4) Tipos Avançados / Value Objects
  - `Money` já introduzido (`src/domain/money.ts`): armazena valor em centavos, garantindo arredondamento estável (casos como 1.005).
  - Métodos: `fromNumber`, `add`, `multiply`, `equals`, `format`. Use em novas regras financeiras para evitar duplicação de lógica.
  - Próximo passo: aplicar `Money` em todas as áreas onde há manipulação monetária (descontos, frete, cupons) mantendo API externa simples (número decimal para consumidores).
  - `readonly` em entidades reforça imutabilidade e previne efeitos colaterais silenciosos.

5) Observabilidade de Testes
  - Adicionar logger fake para capturar eventos (ex.: checkout, tentativa de pagamento, retry) e afirmar sequência esperada.

6) Testes de Performance (Micro)
  - Benchmarkar `CatalogService.search` com listas grandes (ex.: 10k produtos) e garantir tempo aceitável (<50ms local).
  - Se necessário, refatorar para índices por lowercased name.

7) Testes de Contrato (Ports & Adapters)
  - Definir interface de gateway real e garantir que o fake siga o contrato (ex.: status, tempo de resposta, erros).
  - Use pact ou contrato manual com asserts de forma.

8) Redução de Flakiness
  - Injetar `clock` em todos os domínios que dependem de tempo (tokens, bloqueios, retries) para eliminar dependência de tempo real.

9) CI/CD
  - Pipeline (ver `.github/workflows/ci.yml`): typecheck → lint → test → coverage (Node 18 e 20). Job de mutação roda somente em Node 20 e não falha o PR (`continue-on-error`).
  - Estratégia rápida: mutação parcial em PRs (arquivos alterados) e execução completa em agendamentos diários.
  - Sugestão: adicionar limiar de cobertura (ex.: mínimo 80%) usando `vitest --coverage` e falhar build se abaixo.

10) Documentação das Regras
  - Adicionar comentários JSDoc em cada serviço descrevendo invariantes.
  - Gerar docs automatizadas (TypeDoc) se desejar explorar tipos.


## Exercícios (trilha progressiva) 🧪

Siga em ordem. Cada exercício deve ser feito em TDD (Red → Green → Refactor) e conter: um conjunto de testes bons, um teste ruim (anti‑padrão educativo) e, quando fizer sentido, um teste ótimo com property‑based (fast-check) e/ou parametrização.

1) Usuário (src/domain/user.ts)
  - Validação de força de senha: mínimo 8 chars, ao menos 1 dígito e 1 letra.
  - Recuperação de senha: gerar token com expiração (injete um “clock”/now() para testabilidade).
  - Bloqueio de conta: 5 tentativas de login falhas em 15 minutos bloqueiam por 30 minutos.
  - Normalização de e-mail: salvar lowercased; garantir unicidade independente de caixa.
  - Exercício ótimo: property‑based gerando emails válidos/limítrofes e senhas com diversos padrões.

2) Produto & Catálogo (src/domain/product.ts)
  - Paginação em `CatalogService`: `listProducts({ by, direction }, { page, pageSize })`.
  - Filtros combinados: faixa de preço [min, max], prefixo de nome, múltiplas palavras.
  - Produto descontinuado: flag `discontinued`; `search` e `list` podem (ou não) incluí‑los via parâmetro.
  - Exercício ótimo: property‑based garantindo ordenação estável e que filtros são idempotentes (aplicar de novo não muda o resultado).

3) Carrinho (src/domain/cart.ts)
  - Política de desconto percentual e fixa: aplique políticas componíveis (ex.: 10% + R$5).
  - Política de mínimo de pedido: total mínimo (ex.: R$20) para permitir checkout; exponha método `canCheckout()`.
  - Limite de quantidade por item (ex.: máx. 10 por SKU) e de itens distintos (ex.: máx. 50 linhas).
  - Frete: regra de frete fixo ou por faixas, retornando `totalComFrete()` sem alterar `total()`.
  - Exercício ótimo: property‑based garantindo associatividade/commutatividade das políticas (ordem de aplicação não altera resultado quando regras forem comutativas) e que total nunca é negativo.

4) Pagamento & Pedido (src/domain/payment.ts, src/domain/order.ts)
  - Timeout e retry: em `OrderService`, em caso de `timeout pagamento`, reintente até N vezes com backoff (injete scheduler/clock).
  - Idempotência por (key, items hash): se itens mudarem, rejeitar reuse de key; se iguais, retornar mesmo pedido.
  - Cupons em pedido: aplicar lista de cupons ao total do carrinho antes do pagamento; rejeitar cupom inválido/expirado.
  - Reembolso: modelar `refund(transactionId, amount)` no gateway; permitir `cancelOrder` apenas se pago e sem reembolso anterior.
  - Exercício ótimo: property‑based para somatório em centavos e invariantes de idempotência (mesma key + mesmos itens ⇒ mesmo id; key diferente ⇒ ids diferentes).

5) Integração entre módulos
  - Checkout completo: de `Cart` → gerar `OrderItem[]` → `OrderService.placeOrder`.
  - Regras: não permitir checkout se `canCheckout()` falso; limpar carrinho apenas após sucesso.
  - Logs/auditoria (em memória): registrar todos os eventos de checkout; adicione asserts nos testes.

6) Refatorações guiadas por testes
  - Extrair interfaces para repositórios/serviços e mover fakes para `tests/_support`.
  - Introduzir “ports & adapters” (hexagonal): domínios sem dependência direta de infraestrutura.
  - Trocar o cálculo de centavos por um `Money` value object (inteiros ou decimal bem comportado): garanta que testes continuam verdes.
    - (Já feito no lab) Use os exercícios de cupons/frete para ampliar a cobertura de `Money`.

7) Cobertura e mutação
  - Adicione relatório de cobertura (Vitest coverage). Mantenha cobertura alta, mas não persiga 100% antes de qualidade.
  - Configure Stryker (mutation testing). Faça os testes “matarem” mutantes relevantes no domínio.

8) Qualidade de testes
  - Escreva um teste “flaky” proposital e depois corrija. Documente a causa e a mitigação (injeção de clock, ids determinísticos, etc.).
  - Crie uma tabela de “smells” de teste do projeto: testes lerdos, acoplados, genéricos; proponha e aplique refactors.

Sugestões gerais
  - Prefira injeções (idGen, clock, gateway, repos) para tornar cenários determinísticos.
  - Use parametrização (`it.each`) para variações simples; use property‑based para leis/invariantes.
  - Um teste ruim no repositório é intencional: mantenha‑o para referência, mas não o use como modelo.