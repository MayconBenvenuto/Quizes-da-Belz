-- Migration to update quiz questions based on Thaís Carvalho's material
-- "Postura e movimentos repetitivos no trabalho"

-- Delete existing questions
DELETE FROM public.questions;

-- Insert new questions based on the ergonomics material
INSERT INTO public.questions (question, options, correct_option) VALUES

-- Pergunta 1: Conceito de Ergonomia
('Segundo o material apresentado, qual é a definição correta de Ergonomia?',
 '["Ciência que estuda apenas a postura no trabalho", "Ciência que estuda a relação do homem com o trabalho para identificar e prevenir riscos", "Técnica para aumentar a produtividade dos funcionários", "Método para organizar o ambiente de trabalho"]',
 1),

-- Pergunta 2: Principal causa de afastamento
('De acordo com os dados de 2024, qual é a 1ª maior causa de afastamento no trabalho?',
 '["Acidentes de trabalho", "Doenças respiratórias", "Doenças musculoesqueléticas (dor de coluna)", "Estresse e ansiedade"]',
 2),

-- Pergunta 3: Má postura - identificação
('Qual das alternativas NÃO é considerada uma má postura segundo o material?',
 '["Cruzar as pernas por muito tempo", "Usar celular com pescoço abaixado", "Sentar com os pés apoiados no chão", "Trabalhar com ombros tensionados"]',
 2),

-- Pergunta 4: Movimentos repetitivos
('Os movimentos repetitivos são caracterizados por:',
 '["Realização contínua dos mesmos gestos afetando mãos, punhos, ombros, pescoço e coluna", "Movimentos realizados apenas com as mãos", "Atividades físicas intensas no trabalho", "Mudanças constantes de posição"]',
 0),

-- Pergunta 5: LER/DORT
('Qual a diferença entre LER e DORT?',
 '["LER e DORT são exatamente a mesma coisa", "LER implica lesão direta por repetição, DORT é mais amplo incluindo sobrecarga e postura inadequada", "LER é mais grave que DORT", "DORT afeta apenas os ossos, LER apenas músculos"]',
 1),

-- Pergunta 6: Postura correta - posição dos braços
('Qual é a posição correta dos braços ao trabalhar no computador?',
 '["Esticados totalmente", "Apoiados em ângulo de 90 graus", "Apoiados em ângulo de 45 graus", "Pendurados ao lado do corpo"]',
 1),

-- Pergunta 7: Altura do monitor
('Como deve estar posicionado o monitor do computador?',
 '["Acima da altura dos olhos", "Abaixo da altura dos olhos", "Na altura dos olhos", "A altura não importa"]',
 2),

-- Pergunta 8: Posição dos pés
('A posição correta dos pés ao sentar para trabalhar é:',
 '["Cruzados sob a cadeira", "Apoiados no chão ou em apoio para os pés", "Esticados para frente", "Uma perna cruzada sobre a outra"]',
 1),

-- Pergunta 9: Pausas ativas
('Com que frequência devemos fazer pausas ativas durante o trabalho?',
 '["A cada 30 minutos", "A cada 60-90 minutos", "A cada 2 horas", "Apenas no horário do almoço"]',
 1),

-- Pergunta 10: Uso de celular e computador
('Para usar computador e celular de forma ergonômica, devemos:',
 '["Inclinar sempre a cabeça para baixo", "Evitar inclinar a cabeça para baixo, apoiar os braços e fazer pausas regulares", "Usar apenas uma das mãos", "Trabalhar por longos períodos sem parar"]',
 1),

-- Pergunta 11: Sinais de alerta
('Quais são os principais sinais de alerta relacionados aos problemas ergonômicos?',
 '["Apenas dor nas costas", "Somente cansaço no final do dia", "Dor persistente, formigamento, cansaço excessivo e perda de força muscular", "Apenas dor de cabeça"]',
 2),

-- Pergunta 12: Impactos na saúde
('Entre os impactos na saúde causados por má postura e movimentos repetitivos, encontramos:',
 '["Apenas dores leves e temporárias", "Dores crônicas, tensão muscular, síndrome do túnel do carpo e hérnias de disco", "Somente problemas visuais", "Apenas fadiga mental"]',
 1),

-- Pergunta 13: Atividades durante as pausas
('Durante as pausas ativas, é recomendado:',
 '["Permanecer sentado e descansar", "Levantar-se, alongar-se, beber água e respirar profundamente", "Apenas beber água", "Continuar trabalhando em outra atividade"]',
 1),

-- Pergunta 14: Posição na cadeira
('A forma correta de sentar na cadeira inclui:',
 '["Sentar apenas na borda da cadeira", "Sentar corretamente na cadeira com as costas apoiadas no encosto", "Sentar de qualquer forma desde que seja confortável", "Sentar inclinado para frente"]',
 1),

-- Pergunta 15: Conceito preventivo
('Qual é a mensagem principal sobre prevenção apresentada no material?',
 '["Tratar os problemas apenas quando aparecem", "Cuidar da saúde de forma preventiva, observando a postura e respeitando os limites do corpo", "Ignorar pequenos desconfortos", "Trabalhar até o limite máximo sempre"]',
 1);
