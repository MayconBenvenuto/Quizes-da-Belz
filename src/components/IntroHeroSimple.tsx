import { useState } from 'react';

interface IntroHeroProps {
  onStart: (data: { firstName: string; lastName: string; sector: string; role: string }) => void | Promise<void>;
}

const IntroHero = ({ onStart }: IntroHeroProps) => {
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      await onStart({
        firstName: "Teste",
        lastName: "Usuario",
        sector: "TI",
        role: "Desenvolvedor"
      });
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0f9ff', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          color: '#1f2937'
        }}>
          Quiz de Ergonomia BELZ
        </h1>
        <p style={{ 
          fontSize: '1.125rem', 
          marginBottom: '2rem',
          color: '#6b7280'
        }}>
          Teste seus conhecimentos sobre ergonomia e práticas saudáveis no trabalho.
        </p>
        <button 
          onClick={handleStart}
          disabled={loading}
          style={{
            backgroundColor: '#011147',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? "Carregando..." : "Iniciar Quiz"}
        </button>
      </div>
    </div>
  );
};

export default IntroHero;
