import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
}

const Layout = ({ children, hideHeader = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary-lighter/20 to-accent-light/10">
      {/* Link de pular para conteúdo para acessibilidade */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-corporate-blue text-white px-4 py-2 rounded-md z-50"
      >
        Pular para o conteúdo
      </a>
      {!hideHeader && (
        <header className="bg-corporate-blue border-b border-corporate-blue-dark/40">
          <div className="container mx-auto px-4 sm:px-6 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <a href="/" aria-label="Página inicial Belz Conecta Saúde" className="flex items-center">
                <img
                  src="/logo-conecta-saude.png"
                  alt="Belz Conecta Saúde"
                  className="h-10 sm:h-12 w-auto object-contain transition-all duration-300"
                  loading="eager"
                  decoding="async"
                />
              </a>
              <div className="hidden md:block h-10 w-px bg-white/25" aria-hidden="true" />
              <div className="hidden md:flex flex-col text-white">
                <h1 className="text-xl font-bold leading-tight">Quiz de Ergonomia</h1>
                <p className="text-white/70 text-xs">Avalie seus conhecimentos</p>
              </div>
            </div>
            <div className="flex md:hidden flex-col text-white">
              <h1 className="text-lg font-semibold leading-tight">Quiz de Ergonomia</h1>
              <p className="text-white/70 text-xs">Avalie seus conhecimentos</p>
            </div>
          </div>
        </header>
      )}

      {/* Conteúdo principal */}
      <main id="main-content" className="flex-1 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-corporate-blue-dark text-white/70 py-6 text-center text-xs sm:text-sm">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col gap-2 sm:flex-row items-center justify-between">
          <p>© 2025 Belz Conecta Saúde - Quiz de Ergonomia</p>
          <p className="text-white/50">Versão MVP • UI responsiva</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;