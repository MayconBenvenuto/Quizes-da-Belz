import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Timer, Trophy, Medal, Award } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct_option: number;
  explanation?: string;
}

interface QuizProps {
  userId: string;
  userName: string;
  userDepartment: string;
  onQuizComplete?: () => void;
}

const Quiz = ({ userId, userName, userDepartment, onQuizComplete }: QuizProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0); // Pontuação total considerando tempo
  const [timeLeft, setTimeLeft] = useState(30);
  const [questionStartTime, setQuestionStartTime] = useState(30); // Tempo inicial da pergunta
  const [quizStartTime, setQuizStartTime] = useState<number>(Date.now()); // Tempo de início do quiz
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('id');

      if (error) throw error;

      // Transform the data to match our interface
      const transformedQuestions: QuizQuestion[] = (data || []).map(question => ({
        id: question.id,
        question: question.question,
        options: Array.isArray(question.options) ? question.options as string[] : [],
        correct_option: question.correct_option,
        explanation: undefined // Add explanation field if available in DB
      }));

      setQuestions(transformedQuestions);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar perguntas:', error);
      setLoading(false);
    }
  };

  // Função para calcular pontos baseado no tempo de resposta
  const calculatePoints = useCallback((isCorrect: boolean, timeRemaining: number) => {
    if (!isCorrect) return 0;
    
    const maxPoints = 100;
    const timeBonus = Math.floor((timeRemaining / 30) * 50); // Até 50 pontos de bônus por velocidade
    const basePoints = 50; // 50 pontos base por acerto
    
    return basePoints + timeBonus;
  }, []);

  const finishQuiz = useCallback(async (finalAnswers: string[]) => {
    setIsCompleted(true);
    
    // Calcular tempo total de conclusão em segundos
    const completionTime = Math.floor((Date.now() - quizStartTime) / 1000);
    
    let finalScore = 0;
    questions.forEach((question, index) => {
      const correctAnswer = question.options[question.correct_option];
      if (finalAnswers[index] === correctAnswer) {
        finalScore++;
      }
    });
    
    setScore(finalScore);
    
    try {
      const { error } = await supabase
        .from('results')
        .insert([
          {
            user_id: userId,
            score: finalScore,
            total_points: totalPoints, // Salvar também a pontuação total
            completion_time: completionTime, // Salvar tempo de conclusão
          }
        ]);

      if (error) throw error;
      
      if (onQuizComplete) {
        onQuizComplete();
      }
    } catch (error) {
      console.error('Erro ao salvar resultado:', error);
    }
  }, [userId, questions, onQuizComplete, totalPoints, quizStartTime]);

  const handleAnswer = useCallback((answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion?.options[currentQuestion.correct_option];
    const isCorrect = answer === correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Calcular pontos baseado no acerto e tempo restante
    const questionPoints = calculatePoints(isCorrect, timeLeft);
    setTotalPoints(prevPoints => prevPoints + questionPoints);
    
    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        finishQuiz(newAnswers);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
        setTimeLeft(30);
        setQuestionStartTime(30);
        setShowExplanation(false);
      }
    }, 3000);
  }, [answers, currentQuestionIndex, questions, score, timeLeft, calculatePoints, finishQuiz]);

  useEffect(() => {
    fetchQuestions();
    setQuizStartTime(Date.now()); // Registrar o tempo de início quando as perguntas carregam
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleAnswer('');
    }
  }, [timeLeft, isCompleted, showExplanation, handleAnswer]);

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return <Trophy className="w-8 h-8 text-yellow-500" />;
    if (percentage >= 80) return <Medal className="w-8 h-8 text-gray-400" />;
    if (percentage >= 60) return <Award className="w-8 h-8 text-orange-500" />;
    return null;
  };

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Carregando perguntas...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="text-center p-8">
          <p>Nenhuma pergunta encontrada.</p>
        </CardContent>
      </Card>
    );
  }

  if (isCompleted) {
    const percentage = (score / questions.length) * 100;
    const maxPossiblePoints = questions.length * 100; // Máximo possível se acertar tudo rapidamente
    
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getScoreIcon(score, questions.length)}
          </div>
          <CardTitle className="text-2xl">Quiz Finalizado!</CardTitle>
          <CardDescription>Parabéns por completar o quiz de ergonomia!</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Sua Pontuação</h3>
            <div className={`text-6xl font-bold mb-3 ${getScoreColor(score, questions.length)}`}>
              {totalPoints}
            </div>
            <div className="text-lg font-semibold text-gray-600 mb-2">
              pontos
            </div>
            <div className="text-sm text-gray-600 mb-3">
              Você conquistou <strong>{totalPoints}</strong> de <strong>{maxPossiblePoints}</strong> pontos possíveis
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p><strong>{score}</strong> acertos de <strong>{questions.length}</strong> perguntas</p>
              <p>Pontuação baseada em acertos + velocidade de resposta</p>
              <p className="text-xs text-gray-400 mt-1">
                (50 pontos base + até 50 pontos de bônus por velocidade)
              </p>
            </div>
          </div>
          
          <Progress value={percentage} className="w-full h-3" />
          
          <div className="space-y-3">
            {percentage >= 80 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <Badge variant="default" className="bg-green-500 text-white mb-2">
                  🏆 Excelente Performance!
                </Badge>
                <p className="text-sm text-green-700">
                  Você demonstrou excelente conhecimento sobre ergonomia! Continue aplicando essas práticas no seu dia a dia.
                </p>
              </div>
            )}
            {percentage >= 60 && percentage < 80 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Badge variant="secondary" className="bg-blue-500 text-white mb-2">
                  👍 Bom Trabalho!
                </Badge>
                <p className="text-sm text-blue-700">
                  Você tem um bom conhecimento sobre ergonomia! Continue estudando para aprimorar ainda mais.
                </p>
              </div>
            )}
            {percentage < 60 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <Badge variant="destructive" className="bg-orange-500 text-white mb-2">
                  📚 Continue Aprendendo!
                </Badge>
                <p className="text-sm text-orange-700">
                  Recomendamos revisar o material sobre ergonomia e práticas saudáveis no trabalho.
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">Informações do Participante</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Nome:</strong> {userName}</p>
              <p><strong>Departamento:</strong> {userDepartment}</p>
              <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion?.options[currentQuestion.correct_option];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <Badge variant="outline">
            Pergunta {currentQuestionIndex + 1} de {questions.length}
          </Badge>
          <div className="flex items-center space-x-2">
            <Timer className="w-4 h-4" />
            <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-600'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
        <div className="mb-4">
          <Progress value={progress} className="w-full mb-2" />
          <div className="text-xs text-gray-500 text-center">
            💡 Responda rápido para ganhar mais pontos! (50 base + até 50 de bônus por velocidade)
          </div>
        </div>
        <CardTitle className="text-xl">{currentQuestion?.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {currentQuestion?.options.map((option, index) => (
            <Button
              key={index}
              variant={
                showExplanation
                  ? option === correctAnswer
                    ? "default"
                    : option === selectedAnswer
                    ? "destructive"
                    : "outline"
                  : selectedAnswer === option
                  ? "secondary"
                  : "outline"
              }
              className="w-full justify-start h-auto p-4 text-left"
              onClick={() => !showExplanation && handleAnswer(option)}
              disabled={showExplanation}
            >
              <div className="flex items-center space-x-3">
                {showExplanation && (
                  <>
                    {option === correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {option === selectedAnswer && option !== correctAnswer && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </>
                )}
                <span>{option}</span>
              </div>
            </Button>
          ))}
        </div>
        
        {showExplanation && currentQuestion?.explanation && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-blue-800 mb-2">Explicação:</h4>
            <p className="text-blue-700">{currentQuestion.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Quiz;
