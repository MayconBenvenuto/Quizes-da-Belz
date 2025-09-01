-- Create users table for quiz participants
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  sector TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create questions table for ergonomics quiz
CREATE TABLE public.questions (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_option INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create results table to store quiz scores
CREATE TABLE public.results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public quiz)
CREATE POLICY "Anyone can insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read questions" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Anyone can insert results" ON public.results FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read results for admin" ON public.results FOR SELECT USING (true);
CREATE POLICY "Anyone can read users for admin" ON public.users FOR SELECT USING (true);

-- Insert sample ergonomics questions
INSERT INTO public.questions (question, options, correct_option) VALUES
('Qual é a altura ideal do monitor em relação aos olhos?', 
 '["Na mesma altura dos olhos", "10-20cm abaixo dos olhos", "10-20cm acima dos olhos", "Não importa a altura"]', 
 1),

('Qual é o ângulo ideal dos cotovelos ao digitar?', 
 '["45 graus", "90 graus", "120 graus", "180 graus"]', 
 1),

('Com que frequência você deve fazer pausas durante o trabalho no computador?', 
 '["A cada 2 horas", "A cada hora", "A cada 30 minutos", "Apenas no almoço"]', 
 2),

('Qual é a distância ideal entre os olhos e o monitor?', 
 '["30-40 cm", "50-70 cm", "80-100 cm", "Mais de 100 cm"]', 
 1),

('Como devem estar os pés durante o trabalho sentado?', 
 '["Cruzados", "Apoiados no chão ou apoio", "Pendurados", "Em qualquer posição"]', 
 1),

('Qual é a posição correta da cabeça ao trabalhar?', 
 '["Inclinada para frente", "Inclinada para trás", "Ereta e alinhada", "Inclinada para o lado"]', 
 2),

('O que caracteriza uma cadeira ergonomicamente adequada?', 
 '["Apenas altura regulável", "Altura e encosto reguláveis", "Altura, encosto e apoio lombar", "Apenas apoio lombar"]', 
 2),

('Qual é a iluminação ideal para o ambiente de trabalho?', 
 '["Apenas luz natural", "Apenas luz artificial", "Combinação equilibrada", "Luz forte direita"]', 
 2),

('Como deve ser posicionado o teclado?', 
 '["Acima da altura dos cotovelos", "Na altura dos cotovelos", "Abaixo da altura dos cotovelos", "Em qualquer altura"]', 
 1),

('Qual exercício é recomendado durante pausas no trabalho?', 
 '["Apenas alongamento de braços", "Apenas caminhada", "Alongamento geral e movimentação", "Nenhum exercício"]', 
 2);