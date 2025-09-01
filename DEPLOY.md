# Deploy Instructions for Vercel

## Configuração para Rotas SPA

Este projeto usa React Router e precisa de configuração específica para funcionar corretamente no Vercel.

### Arquivos de Configuração

1. **vercel.json** - Configuração principal do Vercel
2. **public/_redirects** - Fallback para outras plataformas

### Passos para Deploy

1. Faça commit dos arquivos de configuração:
   ```bash
   git add vercel.json public/_redirects
   git commit -m "Add Vercel configuration for SPA routing"
   ```

2. Deploy no Vercel:
   - Conecte o repositório no Vercel Dashboard
   - O build command deve ser: `npm run build`
   - O output directory deve ser: `dist`

### Verificação

Após o deploy, teste as rotas:
- `/` - Página inicial
- `/admin` - Painel administrativo (senha: admin123)

### Solução de Problemas

Se as rotas ainda não funcionarem:

1. Verifique se o `vercel.json` está na raiz do projeto
2. Confirme se o build está gerando o `dist` folder corretamente
3. Verifique se o `_redirects` está em `public/` e sendo copiado para `dist/`

### Estrutura de Arquivos

```
projeto/
├── vercel.json          # Configuração do Vercel
├── public/
│   └── _redirects       # Fallback redirects
├── src/
│   ├── App.tsx         # React Router setup
│   └── pages/
│       ├── Index.tsx   # Página inicial
│       └── Admin.tsx   # Painel admin
└── dist/               # Build output
    ├── index.html
    └── _redirects      # Copiado automaticamente
```
