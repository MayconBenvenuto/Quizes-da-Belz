import { useEffect, useState } from "react";

// Página que incorpora o app externo mantendo a URL local
const Diagnostico = () => {
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    // Opcionalmente poderíamos fazer um HEAD request via fetch para detectar bloqueio de X-Frame-Options
    // Mas navegadores bloqueiam de qualquer forma se houver frame-ancestors. Mantemos simples.
    setAllowed(true);
  }, []);

  if (!allowed) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <h1 className="text-xl font-semibold text-corporate-blue">Diagnóstico</h1>
        <p className="text-sm max-w-md text-gray-600">
          Não foi possível carregar o diagnóstico incorporado. Abra diretamente em&nbsp;
          <a href="https://diagnostico-conecta.vercel.app" className="text-corporate-blue underline" rel="noreferrer" target="_blank">diagnostico-conecta.vercel.app</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="p-3 bg-gradient-to-r from-corporate-blue-dark/80 via-corporate-blue/70 to-corporate-blue-light/80 text-white text-sm font-medium shadow">
        Diagnóstico Corporativo (incorporado)
      </div>
      <iframe
        title="Diagnóstico Conecta Saúde"
        src="https://diagnostico-conecta.vercel.app"
        className="flex-1 w-full border-0 bg-white"
        allow="clipboard-read; clipboard-write; fullscreen"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
      />
    </div>
  );
};

export default Diagnostico;
