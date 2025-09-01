# Atualização do Quiz - Material Thaís Carvalho

## 📚 **Base do Conteúdo:**
Material: "Postura e movimentos repetitivos no trabalho"
Autora: Thaís Carvalho (Fisioterapeuta do trabalho e ergonomista)

## 🔄 **Mudanças Implementadas:**

### **Perguntas Anteriores:** 10 questões básicas
### **Perguntas Novas:** 15 questões baseadas no material específico

## 📋 **Temas das Novas Perguntas:**

### **1. Conceitos Fundamentais:**
- Definição de Ergonomia
- Diferença entre LER e DORT
- Estatísticas de afastamento no trabalho

### **2. Identificação de Problemas:**
- O que é má postura
- Movimentos repetitivos
- Sinais de alerta

### **3. Posturas Corretas:**
- Posição dos pés
- Ângulo dos braços (90°)
- Altura do monitor
- Forma de sentar

### **4. Prevenção e Cuidados:**
- Pausas ativas (60-90 minutos)
- Uso correto de computador/celular
- Atividades durante pausas

### **5. Impactos na Saúde:**
- Doenças musculoesqueléticas
- Síndrome do túnel do carpo
- Hérnias de disco
- Tensão muscular

## 🎯 **Arquivo de Migração Principal:**
`20250901_update_questions_thais_carvalho.sql`

**Contém:** 15 perguntas principais baseadas no material

## 📈 **Arquivo de Perguntas Extras:**
`20250901_additional_questions.sql`

**Contém:** 5 perguntas adicionais sobre a autora e aplicação prática

## 🚀 **Para Aplicar as Mudanças:**

### **Opção 1 - Via Supabase Dashboard:**
1. Acesse o Supabase Dashboard
2. Vá em SQL Editor
3. Execute o arquivo `20250901_update_questions_thais_carvalho.sql`
4. (Opcional) Execute também `20250901_additional_questions.sql`

### **Opção 2 - Via Linha de Comando:**
```bash
# Se estiver usando Supabase CLI
supabase migration up
```

### **Opção 3 - Manual:**
1. Delete as perguntas existentes
2. Insira as novas perguntas usando os arquivos SQL

## ✅ **Verificação:**
Após aplicar, o quiz terá:
- ✅ 15 ou 20 perguntas (dependendo se usar arquivo adicional)
- ✅ Conteúdo baseado no material da Thaís Carvalho
- ✅ Questões educativas e práticas
- ✅ Foco em prevenção e conscientização

## 📊 **Estrutura das Perguntas:**

### **Nível de Dificuldade:**
- **Básico:** Conceitos fundamentais (40%)
- **Intermediário:** Aplicação prática (40%)
- **Avançado:** Análise e prevenção (20%)

### **Tipos de Questões:**
- Conceituais: Definições e teorias
- Práticas: Aplicação no dia a dia
- Identificação: Reconhecer problemas
- Preventivas: Medidas de prevenção

## 🎖️ **Qualidade do Conteúdo:**
- ✅ Baseado em material profissional
- ✅ Autora especialista (Crefito: 287600-F)
- ✅ Conteúdo atualizado (2024)
- ✅ Foco educativo e preventivo
- ✅ Aplicação prática no trabalho

## 📝 **Próximos Passos:**
1. Executar migration no banco de dados
2. Testar o quiz com as novas perguntas
3. Verificar se todas as questões funcionam
4. Ajustar pontuação se necessário
