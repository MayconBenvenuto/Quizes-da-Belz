# Instruções para Adicionar Favicon Personalizado

## Passos para substituir o favicon:

### 1. Preparar as imagens
Você deve ter as seguintes versões da sua imagem:
- **favicon.ico** - 16x16, 32x32, 48x48 pixels (formato ICO)
- **favicon-16x16.png** - 16x16 pixels
- **favicon-32x32.png** - 32x32 pixels  
- **apple-touch-icon.png** - 180x180 pixels
- **android-chrome-192x192.png** - 192x192 pixels
- **android-chrome-512x512.png** - 512x512 pixels

### 2. Substituir os arquivos
Substitua os seguintes arquivos na pasta `public/`:
```
public/
├── favicon.ico                    (substitua pelo seu arquivo .ico)
├── vetor_belz_conecta.png        (substitua pela sua imagem)
└── site.webmanifest             (já configurado)
```

### 3. Ferramentas recomendadas
Para gerar todos os tamanhos de favicon, use:
- **Favicon.io** (https://favicon.io/)
- **RealFaviconGenerator** (https://realfavicongenerator.net/)

### 4. Como usar suas imagens
1. Acesse uma dessas ferramentas online
2. Faça upload da imagem que você anexou
3. Baixe o pacote completo de favicons
4. Substitua os arquivos na pasta `public/`

### 5. Configuração atual
O HTML já está configurado para usar:
- `/favicon.ico` para navegadores antigos
- `/vetor_belz_conecta.png` para ícones em várias resoluções
- `/site.webmanifest` para PWA (Progressive Web App)

### 6. Verificar funcionamento
Após substituir os arquivos:
1. Execute `npm run build`
2. Teste no navegador 
3. Verifique se o favicon aparece na aba do navegador
4. Teste em dispositivos móveis (ícone da tela inicial)

### 7. Cache do navegador
Se o favicon não aparecer imediatamente:
- Limpe o cache do navegador (Ctrl+F5)
- Ou teste em modo anônimo/privado
- O favicon pode levar alguns minutos para atualizar

## Estrutura final esperada:
```
public/
├── favicon.ico                 ← Sua imagem em formato ICO
├── vetor_belz_conecta.png     ← Sua imagem em PNG (substitua)
├── site.webmanifest          ← Configuração PWA (já feito)
└── _redirects                 ← Configuração Vercel (já feito)
```
