import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, ArrowLeft, Timer, Award } from "lucide-react";

interface QuizMeta {
  id: string;
  title: string;
  description: string;
  path: string; // rota do quiz
  icon: React.ReactNode;
  estTime?: string;
  highlight?: string;
}

// Futuro: poder carregar essa lista de uma tabela 'quizzes'
const quizzes: QuizMeta[] = [
  {
    id: 'ergonomia',
    title: 'Quiz de Ergonomia',
    description: 'Teste seus conhecimentos sobre boas práticas posturais e prevenção de lesões.',
    path: '/quiz',
    icon: <Brain className="w-6 h-6 text-corporate-blue" />,
    estTime: '≈ 3-5 min',
    highlight: 'Pontuação com bônus de velocidade'
  },
];

const Quizzes = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-5xl">
        <div className="mb-8 flex items-center gap-3">
          <Link to="/" className="group inline-flex items-center text-sm text-corporate-blue hover:underline font-medium">
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-corporate-blue ml-2">Quizzes Disponíveis</h1>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {quizzes.map(q => (
            <Card key={q.id} className="relative overflow-hidden border-corporate-blue-light/30 hover:shadow-lg transition-shadow group">
              <div className="absolute inset-0 bg-gradient-to-br from-corporate-blue-light/5 to-corporate-blue-lighter/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative z-10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-corporate-blue-lighter/40 border border-corporate-blue-light/30">
                    {q.icon}
                  </div>
                  <CardTitle className="text-base sm:text-lg font-semibold text-corporate-blue">{q.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed text-left">{q.description}</p>
                <div className="flex flex-wrap gap-3 text-[11px] font-medium text-gray-500">
                  {q.estTime && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 border border-gray-200">
                      <Timer className="w-3 h-3" /> {q.estTime}
                    </span>
                  )}
                  {q.highlight && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 border border-blue-100 text-corporate-blue">
                      <Award className="w-3 h-3" /> {q.highlight}
                    </span>
                  )}
                </div>
                <div className="pt-2">
                  <Link to={q.path} aria-label={`Iniciar ${q.title}`}>
                    <Button className="w-full">Iniciar</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {quizzes.length === 0 && (
          <div className="mt-20 text-center text-sm text-gray-500">
            Nenhum quiz disponível no momento.
          </div>
        )}

        <p className="mt-10 text-center text-[10px] text-gray-400">
          Em breve novos quizzes temáticos serão adicionados.
        </p>
      </div>
    </Layout>
  );
};

export default Quizzes;
