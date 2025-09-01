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

  if (isQuizStarted && currentUser) {
    return (
      <Layout>
        <Quiz 
          userId={currentUser.id} 
          userName={`${currentUser.firstName} ${currentUser.lastName}`}
          userDepartment={currentUser.sector}
          onQuizComplete={() => {
            toast({
              title: "Quiz Concluído!",
              description: "Obrigado por participar do Quiz de Ergonomia!",
            });
          }} 
        />
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
