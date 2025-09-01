# Quiz de Ergonomia – Belz Conecta Saúde

Interface responsiva e acessível para avaliar conhecimentos em ergonomia. Construído com React + TypeScript + Vite + Tailwind + shadcn-ui e Supabase.

Logo: `public/logo-conecta-saude.png`

## Demo / Projeto

[Projeto no Lovable](https://lovable.dev/projects/2f5f1806-e425-43e5-a443-facfb5d147d1)

## How can I edit this code?

There are several ways of editing your application.

### Use Lovable

Simply visit the [Lovable Project](https://lovable.dev/projects/2f5f1806-e425-43e5-a443-facfb5d147d1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

### Use seu IDE local

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Editar direto no GitHub

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

### GitHub Codespaces

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Tecnologias

- React 18 (SPA com React Router)
- TypeScript
- Vite
- Tailwind CSS + design tokens customizados
- shadcn-ui (subset mínimo de componentes: botão, card, dialog, toast, progresso, tabela, badge, input, label)
- Supabase (Banco / API)

## Responsividade & UI/UX

Princípios aplicados:

- Layout fluido mobile-first (breakpoints sm / md usados de modo progressivo)
- Cabeçalho adaptativo (empilha no mobile, separa no desktop)
- Botões grandes, área de toque ≥44px
- Contraste de cores baseado em tokens HSL configurados em `index.css`
- Gradientes leves e sombras suaves para profundidade sem poluição
- Componente de progresso claro durante o quiz
- Feedback imediato (cores + ícones) para respostas
- Acessibilidade básica: link "Pular para o conteúdo", uso de `alt` em logo, hierarquia textual semântica

Próximas melhorias sugeridas (não implementadas ainda):

- Aria roles para grupo de alternativas (`radiogroup`)
- Anúncio de mudança de questão via `aria-live`
- Modo alto contraste opcional

## Deploy

1. Produção via Lovable: Project > Share > Publish.
2. Deploy manual (exemplo Netlify / Vercel):
	- `npm run build`
	- Publicar pasta `dist/`.
3. Variáveis de ambiente recomendadas (mover futuramente):
	- `VITE_SUPABASE_URL`
	- `VITE_SUPABASE_ANON_KEY`

## Contribuição assistida (Copilot)

Orientações para uso consistente do GitHub Copilot / agente:

1. Sempre descrever claramente o objetivo (ex: "Adicionar ranking de usuários com top 10").
2. Solicitar diffs atômicos (pequenos passos) para facilitar revisão.
3. Após cada mudança, pedir: "rodar lint e build" para garantir integridade.
4. Para novas funcionalidades:
	- Definir contrato (inputs, outputs, estados de erro)
	- Criar util/teste antes da implementação final quando possível
5. Padrões de código:
	- Imports absolutos usando alias `@/`
	- Funções puras em `/src/lib` ou `/src/domain/<context>` (quando criado)
	- Componentes UI sem lógica de negócio pesada
6. Acessibilidade: sempre avaliar foco, leitura de tela e contraste.

Prompt base recomendado:

> Implementar [feature], criando [arquivos], adicionando testes para [casos], garantindo que lint e build passam. Descrever mudanças no README se necessário.

## Próximos Passos Recomendados

- (Opcional) Introduzir camada de cache para questões (React Query ou fetch simples com memo)
- Extrair cálculo de pontuação para util + testes
- Mover chaves Supabase para `.env`
- Adicionar leaderboard / ranking
- Testes e2e (Playwright)

---

Qualquer dúvida ou melhoria: abrir issue ou pedir ajuda ao agente.
