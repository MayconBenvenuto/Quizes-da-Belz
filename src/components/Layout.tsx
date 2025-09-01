import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-lighter/20 to-accent-light/10">
      {/* Header com espaço para logo */}
      <header className="bg-corporate-blue shadow-lg border-b-4 border-accent">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Espaço reservado para logo da Belz Conecta Saúde */}
              <div className="w-48 h-12 bg-white/10 rounded-lg flex items-center justify-center border-2 border-white/20">
                <span className="text-white/60 text-sm font-medium">
                  Logo Belz Conecta Saúde
                </span>
              </div>
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">Quiz de Ergonomia</h1>
              <p className="text-white/80 text-sm">Avalie seus conhecimentos</p>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer simples */}
      <footer className="bg-corporate-blue-dark text-white/60 py-4 text-center text-sm">
        <div className="container mx-auto px-6">
          © 2025 Belz Conecta Saúde - Quiz de Ergonomia
        </div>
      </footer>
    </div>
  );
};

export default Layout;