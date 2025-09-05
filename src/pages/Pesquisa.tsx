import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Pesquisa = () => {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: futuramente salvar em tabela supabase (ex: satisfaction)
    setEnviado(true);
    toast({
      title: "Obrigado!",
      description: "Sua resposta foi registrada.",
    });
    setFeedback("");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Pesquisa de Satisfação</CardTitle>
            <p className="text-xs text-gray-500">Conte pra gente como foi sua experiência.</p>
          </CardHeader>
          <CardContent>
            {enviado && (
              <div className="mb-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded p-3">
                Resposta enviada! Obrigado por contribuir.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="feedback" className="text-sm font-medium text-gray-700">Qual seu feedback sobre o quiz?</label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full min-h-[120px] rounded-md border border-gray-300 bg-white/50 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-corporate-blue focus:border-corporate-blue resize-vertical"
                  placeholder="Escreva aqui..."
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Enviar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Pesquisa;
