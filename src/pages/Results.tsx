import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy } from "lucide-react";

interface ResultRow {
  id: string;
  user_name: string;
  sector: string;
  score: number;
  total_points: number | null;
  completion_time: number | null;
}

const Results = () => {
  const [results, setResults] = useState<ResultRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        type RawResult = {
          id: string;
          score: number;
          total_points: number | null;
          completion_time: number | null;
          users: { id: string; first_name: string; last_name: string; sector: string | null } | null;
        };
        const { data, error } = await supabase
          .from('results')
          .select('id, score, total_points, completion_time, users:users(id, first_name, last_name, sector)') as unknown as { data: RawResult[] | null; error: Error | null };

        if (error) throw error;

  const transformed: ResultRow[] = (data || []).map((r: RawResult) => ({
          id: r.id,
            score: r.score,
            total_points: r.total_points,
            completion_time: r.completion_time,
            user_name: r.users ? `${r.users.first_name} ${r.users.last_name}` : '—',
            sector: r.users?.sector || '—'
        }));

        transformed.sort((a, b) => {
          const pointsA = a.total_points ?? 0;
          const pointsB = b.total_points ?? 0;
          if (pointsB !== pointsA) return pointsB - pointsA; // maior pontuação primeiro
          const timeA = a.completion_time ?? Number.MAX_SAFE_INTEGER;
          const timeB = b.completion_time ?? Number.MAX_SAFE_INTEGER;
          return timeA - timeB; // menor tempo primeiro
        });

        setResults(transformed);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <CardTitle className="text-xl">Ranking de Pontuação</CardTitle>
            </div>
            <p className="text-xs text-gray-500 mt-1">Ordenado por pontos (desempate: menor tempo)</p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center text-sm text-gray-500 py-12">Carregando resultados...</div>
            ) : results.length === 0 ? (
              <div className="text-center text-sm text-gray-500 py-12">Nenhum resultado ainda.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Setor</TableHead>
                      <TableHead className="text-center">Acertos</TableHead>
                      <TableHead className="text-center">Pontos</TableHead>
                      <TableHead className="text-center">Tempo (s)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((r, idx) => (
                      <TableRow key={r.id} className={idx < 3 ? 'bg-yellow-50/40' : ''}>
                        <TableCell className="font-semibold">{idx + 1}</TableCell>
                        <TableCell>{r.user_name}</TableCell>
                        <TableCell>{r.sector}</TableCell>
                        <TableCell className="text-center">{r.score}</TableCell>
                        <TableCell className="text-center font-medium">{r.total_points ?? '—'}</TableCell>
                        <TableCell className="text-center text-xs">{r.completion_time ?? '—'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Results;
