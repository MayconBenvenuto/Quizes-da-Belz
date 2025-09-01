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
  const [timeLeft, setTimeLeft] = useState(30);
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

  const finishQuiz = useCallback(async (finalAnswers: string[]) => {
    setIsCompleted(true);
    
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
          }
        ]);

      if (error) throw error;
      
      if (onQuizComplete) {
        onQuizComplete();
      }
    } catch (error) {
      console.error('Erro ao salvar resultado:', error);
    }
  }, [userId, questions, onQuizComplete]);

  const handleAnswer = useCallback((answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion?.options[currentQuestion.correct_option];
    if (answer === correctAnswer) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        finishQuiz(newAnswers);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
        setTimeLeft(30);
        setShowExplanation(false);
      }
    }, 3000);
  }, [answers, currentQuestionIndex, questions, score, finishQuiz]);

  useEffect(() => {
    fetchQuestions();
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
          <div>
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(score, questions.length)}`}>
              {score}/{questions.length}
            </div>
            <div className="text-lg text-gray-600">
              {percentage.toFixed(0)}% de acertos
            </div>
          </div>
          
          <Progress value={percentage} className="w-full" />
          
          <div className="space-y-2">
            {percentage >= 80 && (
              <Badge variant="default" className="bg-green-500">
                Excelente! Você é um campeão da ergonomia! 🏆
              </Badge>
            )}
            {percentage >= 60 && percentage < 80 && (
              <Badge variant="secondary">
                Bom trabalho! Continue praticando ergonomia! 👍
              </Badge>
            )}
            {percentage < 60 && (
              <Badge variant="destructive">
                Continue estudando sobre ergonomia! 📚
              </Badge>
            )}
          </div>
          
          <div className="text-sm text-gray-600 mt-4">
            <p><strong>Participante:</strong> {userName}</p>
            <p><strong>Departamento:</strong> {userDepartment}</p>
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
        <Progress value={progress} className="w-full mb-4" />
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
