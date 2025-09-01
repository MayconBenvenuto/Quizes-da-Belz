import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield, Trophy, Users, BarChart3, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

interface UserResult {
  id: string;
  first_name: string;
  last_name: string;
  sector: string;
  role: string;
  score: number;
  total_points?: number; // Opcional para dados antigos
  completion_time?: number; // Tempo em segundos para completar o quiz
  created_at: string;
}

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [results, setResults] = useState<UserResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    averageScore: 0,
    topScore: 0,
  });
  const { toast } = useToast();

  const handleLogin = () => {
    // Senha simples para demonstração
    if (password === "admin123") {
      setIsAuthenticated(true);
      loadResults();
    } else {
      toast({
        title: "Acesso Negado",
        description: "Senha incorreta. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const loadResults = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('results')
        .select(`
          *,
          users (
            first_name,
            last_name,
            sector,
            role
          )
        `)
        .order('total_points', { ascending: false, nullsFirst: false }); // Ordenar por pontuação total, nulls no final

      if (error) throw error;

      const formattedResults = data?.map(result => ({
        id: result.id,
        first_name: result.users?.first_name || '',
        last_name: result.users?.last_name || '',
        sector: result.users?.sector || '',
        role: result.users?.role || '',
        score: result.score,
        total_points: result.total_points || 0, // Incluir pontuação total
        completion_time: result.completion_time || 0, // Incluir tempo de conclusão
        created_at: result.created_at,
      })) || [];

      setResults(formattedResults);

      // Calcular estatísticas baseadas na pontuação total
      const totalUsers = formattedResults.length;
      const averageScore = totalUsers > 0 
        ? Math.round(formattedResults.reduce((sum, r) => sum + r.total_points, 0) / totalUsers)
        : 0;
      const topScore = totalUsers > 0 
        ? Math.max(...formattedResults.map(r => r.total_points))
        : 0;

      setStats({ totalUsers, averageScore, topScore });

    } catch (error) {
      console.error('Erro ao carregar resultados:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os resultados.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (seconds: number) => {
    if (seconds === 0) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}min ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  const getScoreColor = (totalPoints: number) => {
    if (totalPoints >= 1200) return "bg-success text-success-foreground"; // 80%+ das respostas corretas com boa velocidade
    if (totalPoints >= 900) return "bg-warning text-warning-foreground"; // 60%+ das respostas corretas
    return "bg-destructive text-destructive-foreground";
  };

  const getPositionIcon = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `${index + 1}º`;
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-corporate-blue">
                  Acesso Administrativo
                </CardTitle>
                <p className="text-muted-foreground">
                  Digite a senha para acessar o painel administrativo
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Digite a senha"
                      className="border-2 border-border focus:ring-primary pr-10"
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Dica: não é admin123
                  </p>
                </div>
                
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-semibold py-3"
                >
                  Acessar Painel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-corporate-blue flex items-center gap-2">
                <BarChart3 className="w-8 h-8" />
                Painel Administrativo
              </h1>
              <p className="text-muted-foreground mt-2">
                Ranking e estatísticas do Quiz de Ergonomia
              </p>
            </div>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Sair
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary to-primary-light text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Total de Participantes</p>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>
                <Users className="w-10 h-10 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success to-accent text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Pontuação Média</p>
                  <p className="text-3xl font-bold">{stats.averageScore}</p>
                  <p className="text-white/70 text-xs">pontos</p>
                </div>
                <BarChart3 className="w-10 h-10 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning to-accent text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Maior Pontuação</p>
                  <p className="text-3xl font-bold">{stats.topScore}</p>
                  <p className="text-white/70 text-xs">pontos</p>
                </div>
                <Trophy className="w-10 h-10 text-white/80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ranking */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-corporate-blue flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              Ranking dos Participantes
            </CardTitle>
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                Ordenado pela maior pontuação
              </p>
              <Button 
                onClick={loadResults}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                {isLoading ? "Carregando..." : "Atualizar"}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Carregando resultados...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum resultado encontrado</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Posição</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Setor</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead className="text-center">Acertos</TableHead>
                      <TableHead className="text-center">Pontuação</TableHead>
                      <TableHead className="text-center">Tempo</TableHead>
                      <TableHead className="text-center">Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result, index) => (
                      <TableRow key={result.id} className="hover:bg-primary-lighter/30">
                        <TableCell className="font-medium text-center">
                          <span className="text-lg">
                            {getPositionIcon(index)}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">
                          {result.first_name} {result.last_name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {result.sector}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {result.role}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm font-medium">
                            {result.score}/15
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={getScoreColor(result.total_points || 0)}>
                            {result.total_points || 0} pts
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm text-muted-foreground">
                            {formatTime(result.completion_time || 0)}
                          </span>
                        </TableCell>
                        <TableCell className="text-center text-sm text-muted-foreground">
                          {formatDate(result.created_at)}
                        </TableCell>
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

export default Admin;