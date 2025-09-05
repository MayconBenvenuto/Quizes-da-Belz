import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Página que incorpora o app externo mantendo a URL local com otimizações de percepção de performance
const Diagnostico = () => {
  const [loaded, setLoaded] = useState(false);
  const [timeoutHit, setTimeoutHit] = useState(false);
  const [loadMs, setLoadMs] = useState<number | null>(null);
  const startRef = useRef<number>(performance.now());
  const [reloadKey, setReloadKey] = useState(0);

  const location = useLocation();
  // Subrota após /diagnostico, incluindo barras
  const subPath = location.pathname.replace(/^\/diagnostico/, "") || "/";
  const normalized = subPath.startsWith("/") ? subPath.slice(1) : subPath;
  const isAdminSubroute = normalized.startsWith("admin");
  const iframeUrl = `https://diagnostico-conecta.vercel.app${subPath}${location.search}${location.hash}`;

  useEffect(() => {
    // Para subrotas de admin, redireciona para o app externo (evita comportamento incorreto no iframe)
    if (isAdminSubroute) {
      const target = `https://diagnostico-conecta.vercel.app/admin${location.search}${location.hash}`;
      window.location.replace(target);
      return;
    }
    // Timeout de fallback (12s) caso onLoad não dispare (bloqueio de X-Frame / CSP)
    const t = setTimeout(() => setTimeoutHit(true), 12000);
    // Pré-aquecer conexão adicionalmente (no-cors leve)
    try {
      fetch(iframeUrl, { mode: "no-cors", cache: "no-store" }).catch(() => {});
    } catch {
      // ignore erros silenciosamente (no-cors fetch pode falhar sem impacto)
    }
    return () => clearTimeout(t);
  }, [iframeUrl, isAdminSubroute, location.search, location.hash]);

  const handleLoad = () => {
    setLoaded(true);
    setLoadMs(Math.round(performance.now() - startRef.current));
  };

  if (isAdminSubroute) {
    // Mensagem breve enquanto o navegador redireciona (não deve aparecer por muito tempo)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-3 text-center px-6 bg-white">
        <p className="text-sm text-corporate-blue">Redirecionando para o Administrador do Diagnóstico…</p>
      </div>
    );
  }

  if (timeoutHit && !loaded) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-5 text-center px-6 bg-gradient-to-b from-corporate-blue/5 to-corporate-blue-light/10">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold text-corporate-blue">Carregando diagnóstico...</h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Está demorando mais que o esperado. Pode haver bloqueio de iframe ou conexão lenta.
          </p>
        </div>
        <div className="flex gap-3 text-sm">
          <button
            onClick={() => {
              setTimeoutHit(false);
              setLoaded(false);
              startRef.current = performance.now();
              setReloadKey((k) => k + 1);
            }}
            className="px-4 py-2 rounded bg-corporate-blue text-white hover:bg-corporate-blue-light transition"
          >
            Tentar novamente
          </button>
          <a
            href={isAdminSubroute ? `https://diagnostico-conecta.vercel.app/#/${normalized}${location.search}${location.hash}` : iframeUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded border border-corporate-blue text-corporate-blue hover:bg-corporate-blue hover:text-white transition"
          >
            Abrir em nova aba
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/70 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-full border-4 border-corporate-blue/20 border-t-corporate-blue animate-spin" />
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium text-corporate-blue">Carregando diagnóstico...</p>
            <p className="text-[11px] text-gray-500 tracking-wide">Otimizando conexão segura</p>
          </div>
        </div>
      )}
      <iframe
        key={reloadKey}
        title="Diagnóstico Conecta Saúde"
        src={iframeUrl}
        className="w-full h-full border-0 bg-white"
        allow="clipboard-read; clipboard-write; fullscreen"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
        onLoad={handleLoad}
      />
      {loaded && loadMs !== null && (
        <div className="pointer-events-none select-none absolute bottom-1 right-2 text-[10px] text-gray-400 font-mono">
          {loadMs}ms
        </div>
      )}
    </div>
  );
};

export default Diagnostico;
