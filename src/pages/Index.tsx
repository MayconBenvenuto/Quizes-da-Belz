import { useState, lazy, Suspense } from "react";
import { supabase, SUPABASE_CONFIG_OK } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
// IntroHero faz parte da experiência inicial e pode ficar no bundle da rota
import IntroHero from "@/components/IntroHero";
// Quiz é pesado (animações, lógica e ícones) -> lazy load somente quando iniciar
const Quiz = lazy(() => import("@/components/Quiz"));

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  sector: string;
  role: string;
  email?: string;
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
        title: 'Sucesso!',
        description: 'Dados salvos. Iniciando o quiz...',
      });
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar seus dados. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  if (!SUPABASE_CONFIG_OK) {
    return (
      <Layout>
        <div className="max-w-md mx-auto mt-16 p-6 bg-red-50 border border-red-200 rounded-lg text-red-700 space-y-3">
          <h2 className="text-lg font-semibold">Configuração ausente</h2>
          <p>As variáveis de ambiente do Supabase não estão configuradas no build.</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Defina VITE_SUPABASE_URL</li>
            <li>Defina VITE_SUPABASE_ANON_KEY</li>
            <li>Republique a aplicação</li>
          </ul>
        </div>
      </Layout>
    );
  }

  if (isQuizStarted && currentUser) {
    return (
      <Layout>
        <Suspense fallback={<div className="py-24 text-center text-sm text-gray-500">Carregando quiz...</div>}>
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
        </Suspense>
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
