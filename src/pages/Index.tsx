import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import Quiz from "@/components/Quiz";
import IntroHero from "@/components/IntroHero";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  sector: string;
  role: string;
}

interface UserFormInput {
  firstName: string;
  lastName: string;
  sector: string;
  role: string;
}

const Index = () => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [showIntro, setShowIntro] = useState(true); // manter para controle de exibição do herói
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const { toast } = useToast();

  const handleUserSubmit = async (formData: UserFormInput) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          sector: formData.sector,
          role: formData.role,
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentUser({
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        sector: data.sector,
        role: data.role,
      });
      setIsQuizStarted(true);

      toast({
        title: "Sucesso!",
        description: "Dados salvos. Iniciando o quiz...",
      });
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar seus dados. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleQuizComplete = (score: number) => {
    setFinalScore(score);
  };

  if (finalScore !== null) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <div className="w-20 h-20 bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🏆</span>
            </div>
            <h1 className="text-3xl font-bold text-corporate-blue mb-4">
              Parabéns, {currentUser?.firstName}!
            </h1>
            <div className="text-5xl font-bold text-primary mb-4">
              {finalScore} pontos
            </div>
            <p className="text-muted-foreground mb-6">
              Você completou o Quiz de Ergonomia da Belz Conecta Saúde.
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Setor:</strong> {currentUser?.sector}</p>
              <p><strong>Cargo:</strong> {currentUser?.role}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isQuizStarted && currentUser) {
    return (
      <Layout>
        <Quiz userId={currentUser.id} onComplete={handleQuizComplete} />
      </Layout>
    );
  }

  if (showIntro) {
    return (
      <Layout hideHeader>
        <IntroHero onStart={async (data) => {
          // Submete diretamente e inicia quiz
          await handleUserSubmit(data);
          setShowIntro(false);
        }} />
      </Layout>
    );
  }

  // Caso raro: se sair do intro mas ainda sem quiz (fallback)
  return <Layout><div className="container mx-auto px-6 py-12" /></Layout>;
};

export default Index;
