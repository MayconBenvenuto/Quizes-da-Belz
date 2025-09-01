import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct_option: number;
}

interface QuizProps {
  userId: string;
  onComplete: (score: number) => void;
}

const Quiz = ({ userId, onComplete }: QuizProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const { toast } = useToast();

  // Carrega as questões do Supabase
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const { data, error } = await supabase
          .from('questions')
          .select('*')
          .order('id');
          
        if (error) throw error;
        
        const formattedQuestions = data?.map(q => ({
          id: q.id,
          question: q.question,
          options: Array.isArray(q.options) ? q.options : JSON.parse((q.options as string) || '[]'),
          correct_option: q.correct_option
        })) || [];
        
        setQuestions(formattedQuestions);
        setQuestionStartTime(Date.now());
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar questões:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as questões do quiz.",
          variant: "destructive",
        });
      }
    };

    loadQuestions();
  }, [toast]);

  // Timer da questão
  useEffect(() => {
    if (isLoading || answered || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Tempo esgotado - resposta automática incorreta
          handleAnswer(-1, true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, answered, isLoading, showResult]);

  const handleAnswer = async (answerIndex: number, timeUp: boolean = false) => {
    if (answered) return;
    
    setAnswered(true);
    setSelectedAnswer(answerIndex);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correct_option;
    const responseTime = Date.now() - questionStartTime;
    
    // Cálculo da pontuação: acerto vale pontos base + bônus por velocidade
    let points = 0;
    if (isCorrect) {
      const basePoints = 100;
      const timeBonus = Math.max(0, 30 - Math.floor(responseTime / 1000)) * 3;
      points = basePoints + timeBonus;
    }
    
    setScore(prev => prev + points);

    // Espera 2 segundos para mostrar resultado da questão
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        // Próxima questão
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(30);
        setQuestionStartTime(Date.now());
        setAnswered(false);
      } else {
        // Quiz finalizado
        finishQuiz();
      }
    }, 2000);
  };

  const finishQuiz = async () => {
    try {
      // Salva o resultado no banco
      const { error } = await supabase
        .from('results')
        .insert({
          user_id: userId,
          score: score,
        });

      if (error) throw error;

      setShowResult(true);
      onComplete(score);
    } catch (error) {
      console.error('Erro ao salvar resultado:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar seu resultado.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando questões...</p>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm text-center">
            <CardHeader>
              <div className="w-20 h-20 bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-corporate-blue">
                Quiz Finalizado!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold text-primary mb-2">
                {score} pontos
              </div>
              <p className="text-muted-foreground">
                Parabéns! Você completou o quiz de ergonomia.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header do Quiz */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="text-primary border-primary">
              Questão {currentQuestionIndex + 1} de {questions.length}
            </Badge>
            <div className="flex items-center gap-2 text-corporate-blue">
              <Clock className="w-5 h-5" />
              <span className={`font-mono text-lg font-bold ${timeLeft <= 10 ? 'text-destructive' : ''}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Questão */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-corporate-blue leading-relaxed">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ";
              
              if (answered) {
                if (index === currentQuestion.correct_option) {
                  buttonClass += "bg-success-light border-success text-success-foreground";
                } else if (index === selectedAnswer && selectedAnswer !== currentQuestion.correct_option) {
                  buttonClass += "bg-destructive/10 border-destructive text-destructive";
                } else {
                  buttonClass += "bg-muted border-border text-muted-foreground";
                }
              } else {
                buttonClass += "bg-background border-border hover:bg-primary-lighter hover:border-primary text-foreground hover:text-primary";
              }

              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={buttonClass}
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-base">{option}</span>
                    {answered && index === currentQuestion.correct_option && (
                      <CheckCircle className="w-5 h-5 text-success" />
                    )}
                    {answered && index === selectedAnswer && selectedAnswer !== currentQuestion.correct_option && (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Pontuação atual */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-lighter px-4 py-2 rounded-full">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">
              Pontuação: {score} pontos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;