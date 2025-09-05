import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Brain, Smile, ShieldCheck } from "lucide-react";

const Home = () => {
  return (
    <Layout hideHeader>
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Imagens responsivas como no padrão do projeto */}
        <img
          src="/quiz-background-4.png"
            alt="Fundo ergonomia"
            className="absolute inset-0 w-full h-full object-cover opacity-30 sm:hidden"
            loading="lazy"
        />
        <img
          src="/quiz-background.png"
          alt="Fundo ergonomia desktop"
          className="absolute inset-0 w-full h-full object-cover opacity-20 hidden sm:block"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-corporate-blue/70 via-corporate-blue/60 to-corporate-blue-light/70 mix-blend-multiply" />

        <div className="relative z-10 container mx-auto px-6 max-w-3xl text-center space-y-10">
          <div className="space-y-4">
            <img
              src="/Conecta-Saude.png"
              alt="Belz Conecta Saúde"
              className="h-20 mx-auto drop-shadow-lg"
              loading="eager"
              decoding="async"
            />
            <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              Central Quiz - Belz
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto">Explore nossos quizzes e avalie nosso empenho.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Botão Quizzes */}
            <Link to="/quizzes" className="group focus:outline-none focus:ring-2 focus:ring-white/60 rounded-lg">
              <Button
                variant="default"
                className="w-full h-full flex flex-col items-center justify-center gap-3 py-8 text-center bg-corporate-blue-light hover:bg-corporate-blue-dark transition-colors"
              >
                <Brain className="w-8 h-8" />
                <span className="text-lg font-semibold">Quizzes</span>
                <span className="text-xs opacity-80">Avalie seus conhecimentos</span>
              </Button>
            </Link>

            {/* Botão Pesquisa de Satisfação (link externo) */}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfDWisIu8dqclpJ7Lg9QgvyMCFEfIFf963b_3RCBqGdMGQIbA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="group focus:outline-none focus:ring-2 focus:ring-white/60 rounded-lg"
            >
              <Button
                type="button"
                variant="secondary"
                className="w-full h-full flex flex-col items-center justify-center gap-3 py-8 text-center bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                <Smile className="w-8 h-8" />
                <span className="text-lg font-semibold">Pesquisa de Satisfação</span>
                <span className="text-xs opacity-80">Abrir formulário externo</span>
              </Button>
            </a>

            {/* Botão Administrador */}
            <Link to="/admin" className="group focus:outline-none focus:ring-2 focus:ring-white/60 rounded-lg">
              <Button
                variant="outline"
                className="w-full h-full flex flex-col items-center justify-center gap-3 py-8 text-center bg-white/5 hover:bg-white/15 text-white border border-white/30"
              >
                <ShieldCheck className="w-8 h-8" />
                <span className="text-lg font-semibold">Administrador</span>
                <span className="text-xs opacity-80">Gerenciar conteúdo</span>
              </Button>
            </Link>
          </div>

          <p className="text-[10px] sm:text-xs text-white/60">
            © 2025 Belz Conecta Saúde – Promovendo saúde e ergonomia no ambiente de trabalho.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
