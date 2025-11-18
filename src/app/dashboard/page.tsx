"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Cigarette,
  Wine,
  Gamepad2,
  Smartphone,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  DollarSign,
  Clock,
  Award,
  CheckCircle2,
  Star,
  Sparkles,
  Flame,
  Zap,
  BookOpen,
  ListTodo,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface QuizData {
  vicios: string[];
  frequencia_perda: string;
  cigarros_por_dia?: number;
  preco_maco?: number;
  gasto_semanal_alcool?: number;
  gasto_mensal_jogos?: number;
  horas_por_dia_celular?: number;
}

interface Meta {
  id: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
  tipo: "diaria" | "semanal";
  pontos: number;
}

interface Recompensa {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  desbloqueada: boolean;
}

interface ProgressoVicio {
  vicio: string;
  metasConcluidas: number;
  totalMetas: number;
  diasSemRecaida: number;
  economizado?: number;
  tempoRecuperado?: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [metas, setMetas] = useState<Meta[]>([]);
  const [recompensas, setRecompensas] = useState<Recompensa[]>([]);
  const [progressos, setProgressos] = useState<ProgressoVicio[]>([]);
  const [mensagemMotivacional, setMensagemMotivacional] = useState("");
  const [nivelUsuario, setNivelUsuario] = useState(1);
  const [xpAtual, setXpAtual] = useState(0);
  const [xpProximoNivel, setXpProximoNivel] = useState(100);
  const [streak, setStreak] = useState(0);
  const [erroConexao, setErroConexao] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      // Verificar se Supabase está configurado
      if (!isSupabaseConfigured() || !supabase) {
        console.error("Supabase não está configurado");
        setErroConexao(true);
        setLoading(false);
        return;
      }

      try {
        // Verificar sessão primeiro (mais leve que getUser)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          console.log("Nenhuma sessão ativa, redirecionando para login");
          router.push("/login");
          return;
        }

        const userId = session.user.id;
        console.log("✅ Sessão ativa para usuário:", userId);

        // Buscar dados do quiz
        const { data: quizArray, error: quizError } = await supabase
          .from('quiz_responses')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(1);

        console.log("Resultado da busca do quiz:", { quizArray, quizError });

        // Verificar se encontrou dados
        if (quizError) {
          console.error("❌ Erro ao buscar quiz:", quizError);
          router.push("/questionario");
          return;
        }

        if (!quizArray || quizArray.length === 0) {
          console.log("⚠️ Nenhum quiz encontrado, redirecionando para questionário");
          router.push("/questionario");
          return;
        }

        const quiz = quizArray[0];
        console.log("✅ Quiz encontrado:", quiz);

        // Carregar dados do quiz
        setQuizData({
          vicios: quiz.vicios || [],
          frequencia_perda: quiz.frequencia_perda || "",
          cigarros_por_dia: quiz.cigarros_por_dia,
          preco_maco: quiz.preco_maco,
          gasto_semanal_alcool: quiz.gasto_semanal_alcool,
          gasto_mensal_jogos: quiz.gasto_mensal_jogos,
          horas_por_dia_celular: quiz.horas_por_dia_celular,
        });

        // Definir mensagem motivacional
        const mensagens = [
          "Você está construindo uma nova história. Um passo de cada vez.",
          "Cada pequena vitória te aproxima da liberdade.",
          "O progresso não é linear, mas você está avançando.",
          "Você é mais forte do que seus hábitos.",
          "Hoje é um novo dia para fazer escolhas melhores.",
        ];
        setMensagemMotivacional(mensagens[Math.floor(Math.random() * mensagens.length)]);

        setLoading(false);
      } catch (error: any) {
        console.error("❌ Erro ao carregar dashboard:", error);
        
        // Verificar se é erro de rede/conexão
        if (error.message?.includes('fetch') || error.message?.includes('network')) {
          setErroConexao(true);
        } else {
          // Outros erros, redirecionar para login
          router.push("/login");
        }
        
        setLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  // Gerar metas personalizadas baseadas no quiz
  useEffect(() => {
    if (!quizData) return;

    const metasGeradas: Meta[] = [];
    const recompensasGeradas: Recompensa[] = [];
    const progressosGerados: ProgressoVicio[] = [];

    quizData.vicios.forEach((vicio) => {
      // Gerar metas por vício
      if (vicio === "fumar") {
        metasGeradas.push(
          {
            id: "fumar-1",
            titulo: "Substitua um cigarro por uma caminhada",
            descricao: "Quando sentir vontade de fumar, caminhe por 5 minutos",
            concluida: false,
            tipo: "diaria",
            pontos: 15,
          },
          {
            id: "fumar-2",
            titulo: "Reduza 2 cigarros hoje",
            descricao: "Tente fumar 2 cigarros a menos que o habitual",
            concluida: false,
            tipo: "diaria",
            pontos: 20,
          },
          {
            id: "fumar-3",
            titulo: "Identifique seus gatilhos",
            descricao: "Anote 3 situações que te fazem querer fumar",
            concluida: false,
            tipo: "semanal",
            pontos: 50,
          }
        );

        recompensasGeradas.push(
          {
            id: "fumar-r1",
            titulo: "Primeiro Passo",
            descricao: "Completou sua primeira meta de redução",
            icone: "🥉",
            desbloqueada: false,
          },
          {
            id: "fumar-r2",
            titulo: "3 Dias Seguidos",
            descricao: "Manteve o progresso por 3 dias consecutivos",
            icone: "🥈",
            desbloqueada: false,
          }
        );

        const cigarrosPorDia = quizData.cigarros_por_dia || 0;
        const precoMaco = quizData.preco_maco || 0;
        const macosPorDia = cigarrosPorDia / 20;
        const gastoMensal = macosPorDia * precoMaco * 30;

        progressosGerados.push({
          vicio: "fumar",
          metasConcluidas: 0,
          totalMetas: 3,
          diasSemRecaida: 0,
          economizado: gastoMensal * 0.1,
        });
      }

      if (vicio === "alcool") {
        metasGeradas.push(
          {
            id: "alcool-1",
            titulo: "Substitua uma bebida por água",
            descricao: "Quando sentir vontade, beba um copo de água primeiro",
            concluida: false,
            tipo: "diaria",
            pontos: 15,
          },
          {
            id: "alcool-2",
            titulo: "Evite beber sozinho hoje",
            descricao: "Se for beber, faça em contexto social controlado",
            concluida: false,
            tipo: "diaria",
            pontos: 20,
          },
          {
            id: "alcool-3",
            titulo: "Identifique momentos de risco",
            descricao: "Liste 3 situações que te levam a beber",
            concluida: false,
            tipo: "semanal",
            pontos: 50,
          }
        );

        recompensasGeradas.push({
          id: "alcool-r1",
          titulo: "Controle Conquistado",
          descricao: "Primeira semana com consumo reduzido",
          icone: "🏆",
          desbloqueada: false,
        });

        const gastoSemanal = quizData.gasto_semanal_alcool || 0;
        const gastoMensal = gastoSemanal * 4.3;

        progressosGerados.push({
          vicio: "alcool",
          metasConcluidas: 0,
          totalMetas: 3,
          diasSemRecaida: 0,
          economizado: gastoMensal * 0.15,
        });
      }

      if (vicio === "jogos") {
        metasGeradas.push(
          {
            id: "jogos-1",
            titulo: "Não aposte hoje",
            descricao: "Passe o dia inteiro sem fazer apostas",
            concluida: false,
            tipo: "diaria",
            pontos: 25,
          },
          {
            id: "jogos-2",
            titulo: "Bloqueie sites de apostas",
            descricao: "Use extensões do navegador para bloquear acesso",
            concluida: false,
            tipo: "diaria",
            pontos: 20,
          },
          {
            id: "jogos-3",
            titulo: "Anote seus sentimentos",
            descricao: "Escreva como se sentiu nos momentos de impulso",
            concluida: false,
            tipo: "semanal",
            pontos: 50,
          }
        );

        recompensasGeradas.push({
          id: "jogos-r1",
          titulo: "Impulso Vencido",
          descricao: "Resistiu ao impulso de apostar por 24h",
          icone: "💪",
          desbloqueada: false,
        });

        const gastoMensal = quizData.gasto_mensal_jogos || 0;

        progressosGerados.push({
          vicio: "jogos",
          metasConcluidas: 0,
          totalMetas: 3,
          diasSemRecaida: 0,
          economizado: gastoMensal * 0.2,
        });
      }

      if (vicio === "celular") {
        metasGeradas.push(
          {
            id: "celular-1",
            titulo: "Reduza 1 hora de uso hoje",
            descricao: "Use o celular 1 hora a menos que o habitual",
            concluida: false,
            tipo: "diaria",
            pontos: 15,
          },
          {
            id: "celular-2",
            titulo: "Sem celular na cama",
            descricao: "Deixe o celular fora do quarto ao dormir",
            concluida: false,
            tipo: "diaria",
            pontos: 20,
          },
          {
            id: "celular-3",
            titulo: "Configure limites de apps",
            descricao: "Use recursos nativos para limitar tempo em redes sociais",
            concluida: false,
            tipo: "semanal",
            pontos: 50,
          }
        );

        recompensasGeradas.push({
          id: "celular-r1",
          titulo: "Tempo Recuperado",
          descricao: "Reduziu 5 horas de uso na semana",
          icone: "⏰",
          desbloqueada: false,
        });

        const horasPorDia = quizData.horas_por_dia_celular || 0;
        const horasPorMes = horasPorDia * 30;

        progressosGerados.push({
          vicio: "celular",
          metasConcluidas: 0,
          totalMetas: 3,
          diasSemRecaida: 0,
          tempoRecuperado: horasPorMes * 0.15,
        });
      }
    });

    setMetas(metasGeradas);
    setRecompensas(recompensasGeradas);
    setProgressos(progressosGerados);
  }, [quizData]);

  const toggleMeta = (metaId: string) => {
    const meta = metas.find((m) => m.id === metaId);
    if (!meta) return;

    const novoEstado = !meta.concluida;

    setMetas((prev) =>
      prev.map((m) =>
        m.id === metaId ? { ...m, concluida: novoEstado } : m
      )
    );

    // Atualizar XP quando meta é concluída
    if (novoEstado) {
      setXpAtual((prev) => prev + meta.pontos);
      
      // Verificar se subiu de nível
      if (xpAtual + meta.pontos >= xpProximoNivel) {
        setNivelUsuario((prev) => prev + 1);
        setXpAtual(0);
        setXpProximoNivel((prev) => Math.floor(prev * 1.5));
      }
    } else {
      setXpAtual((prev) => Math.max(0, prev - meta.pontos));
    }

    // Atualizar progresso
    const vicioRelacionado = metaId.split("-")[0];
    setProgressos((prev) =>
      prev.map((p) =>
        p.vicio === vicioRelacionado
          ? {
              ...p,
              metasConcluidas: metas.filter(
                (m) => m.id.startsWith(vicioRelacionado) && (m.id === metaId ? novoEstado : m.concluida)
              ).length,
            }
          : p
      )
    );
  };

  const getVicioIcon = (vicio: string) => {
    switch (vicio) {
      case "fumar":
        return <Cigarette className="w-5 h-5" />;
      case "alcool":
        return <Wine className="w-5 h-5" />;
      case "jogos":
        return <Gamepad2 className="w-5 h-5" />;
      case "celular":
        return <Smartphone className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getVicioNome = (vicio: string) => {
    switch (vicio) {
      case "fumar":
        return "Fumar";
      case "alcool":
        return "Álcool";
      case "jogos":
        return "Jogos/Apostas";
      case "celular":
        return "Celular";
      default:
        return vicio;
    }
  };

  const getVicioColor = (vicio: string) => {
    switch (vicio) {
      case "fumar":
        return "from-orange-500 to-red-600";
      case "alcool":
        return "from-purple-500 to-pink-600";
      case "jogos":
        return "from-emerald-500 to-teal-600";
      case "celular":
        return "from-blue-500 to-indigo-600";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando seu dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (erroConexao) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <div className="pt-32 flex items-center justify-center px-4">
          <Card className="p-8 max-w-md text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Erro de Conexão
            </h2>
            <p className="text-gray-600 mb-6">
              Não foi possível conectar ao Supabase. Verifique se suas credenciais estão configuradas corretamente.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Tentar Novamente
              </Button>
              <p className="text-sm text-gray-500">
                Clique no banner laranja acima para configurar suas variáveis de ambiente.
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <Card className="p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Configure o Supabase
            </h2>
            <p className="text-gray-600 mb-6">
              Para usar o dashboard, você precisa configurar suas credenciais do Supabase.
            </p>
            <p className="text-sm text-gray-500">
              Clique no banner laranja acima para configurar suas variáveis de ambiente.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const metasDiarias = metas.filter((m) => m.tipo === "diaria");
  const metasSemanais = metas.filter((m) => m.tipo === "semanal");
  const totalMetasConcluidas = metas.filter((m) => m.concluida).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header com Stats Principais */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  Dashboard
                </h1>
                <p className="text-gray-600">
                  Acompanhe seu progresso e conquistas
                </p>
              </div>
            </div>

            {/* Cards de Stats Principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Nível */}
              <Card className="p-5 bg-gradient-to-br from-violet-500 to-purple-600 text-white border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    <span className="text-sm font-medium opacity-90">Nível</span>
                  </div>
                  <Badge className="bg-white/20 text-white border-0">
                    {nivelUsuario}
                  </Badge>
                </div>
                <div className="mb-2">
                  <Progress value={(xpAtual / xpProximoNivel) * 100} className="h-2 bg-white/20" />
                </div>
                <p className="text-xs opacity-75">
                  {xpAtual} / {xpProximoNivel} XP
                </p>
              </Card>

              {/* Streak */}
              <Card className="p-5 bg-gradient-to-br from-orange-500 to-red-600 text-white border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5" />
                    <span className="text-sm font-medium opacity-90">Sequência</span>
                  </div>
                  <Badge className="bg-white/20 text-white border-0">
                    {streak} dias
                  </Badge>
                </div>
                <p className="text-2xl font-bold">{streak}</p>
                <p className="text-xs opacity-75">Dias consecutivos</p>
              </Card>

              {/* XP Total */}
              <Card className="p-5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    <span className="text-sm font-medium opacity-90">XP Total</span>
                  </div>
                </div>
                <p className="text-2xl font-bold">{xpAtual}</p>
                <p className="text-xs opacity-75">Pontos de experiência</p>
              </Card>

              {/* Metas Concluídas */}
              <Card className="p-5 bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    <span className="text-sm font-medium opacity-90">Metas</span>
                  </div>
                </div>
                <p className="text-2xl font-bold">
                  {totalMetasConcluidas}/{metas.length}
                </p>
                <p className="text-xs opacity-75">Concluídas hoje</p>
              </Card>
            </div>
          </div>

          {/* Layout Principal - 2 Colunas */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Coluna Esquerda - Progresso Diário */}
            <div className="lg:col-span-2 space-y-6">
              {/* Mensagem Motivacional */}
              <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Mensagem do Dia
                    </h3>
                    <p className="text-gray-700 italic">"{mensagemMotivacional}"</p>
                  </div>
                </div>
              </Card>

              {/* Progresso por Vício */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Seu Progresso
                </h2>
                <div className="space-y-4">
                  {progressos.map((progresso) => (
                    <div key={progresso.vicio} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`bg-gradient-to-br ${getVicioColor(
                              progresso.vicio
                            )} w-10 h-10 rounded-lg flex items-center justify-center text-white`}
                          >
                            {getVicioIcon(progresso.vicio)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {getVicioNome(progresso.vicio)}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {progresso.metasConcluidas} de {progresso.totalMetas} metas
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 border-0">
                          {Math.round((progresso.metasConcluidas / progresso.totalMetas) * 100)}%
                        </Badge>
                      </div>

                      <Progress
                        value={(progresso.metasConcluidas / progresso.totalMetas) * 100}
                        className="mb-3 h-2"
                      />

                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Calendar className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600">Dias</span>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {progresso.diasSemRecaida}
                          </p>
                        </div>

                        {progresso.economizado !== undefined && (
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <DollarSign className="w-3 h-3 text-emerald-600" />
                              <span className="text-xs text-gray-600">Economizado</span>
                            </div>
                            <p className="text-lg font-bold text-emerald-600">
                              R$ {progresso.economizado.toFixed(0)}
                            </p>
                          </div>
                        )}

                        {progresso.tempoRecuperado !== undefined && (
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Clock className="w-3 h-3 text-blue-600" />
                              <span className="text-xs text-gray-600">Tempo</span>
                            </div>
                            <p className="text-lg font-bold text-blue-600">
                              {progresso.tempoRecuperado.toFixed(0)}h
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Metas Diárias */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ListTodo className="w-5 h-5 text-blue-600" />
                  Tarefas de Hoje
                </h2>
                <div className="space-y-3">
                  {metasDiarias.map((meta) => (
                    <div
                      key={meta.id}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                        meta.concluida
                          ? "bg-emerald-50 border-emerald-400"
                          : "bg-white border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => toggleMeta(meta.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            meta.concluida
                              ? "bg-emerald-500 border-emerald-500"
                              : "border-gray-300 hover:border-blue-500"
                          }`}
                        >
                          {meta.concluida && (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h4
                              className={`font-semibold mb-1 ${
                                meta.concluida
                                  ? "text-emerald-900 line-through"
                                  : "text-gray-900"
                              }`}
                            >
                              {meta.titulo}
                            </h4>
                            <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
                              +{meta.pontos} XP
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{meta.descricao}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Coluna Direita - Resumos */}
            <div className="space-y-6">
              {/* Metas Semanais */}
              <Card className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Metas da Semana
                </h2>
                <div className="space-y-3">
                  {metasSemanais.map((meta) => (
                    <div
                      key={meta.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        meta.concluida
                          ? "bg-emerald-50 border-emerald-300"
                          : "bg-gray-50 border-gray-200 hover:border-purple-300"
                      }`}
                      onClick={() => toggleMeta(meta.id)}
                    >
                      <div className="flex items-start gap-2">
                        <div
                          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            meta.concluida
                              ? "bg-emerald-500 border-emerald-500"
                              : "border-gray-300"
                          }`}
                        >
                          {meta.concluida && (
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`text-sm font-semibold mb-1 ${
                              meta.concluida
                                ? "text-emerald-900 line-through"
                                : "text-gray-900"
                            }`}
                          >
                            {meta.titulo}
                          </h4>
                          <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">
                            +{meta.pontos} XP
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Conquistas */}
              <Card className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-600" />
                  Conquistas
                </h2>
                <div className="space-y-3">
                  {recompensas.slice(0, 3).map((recompensa) => (
                    <div
                      key={recompensa.id}
                      className={`p-3 rounded-lg border transition-all ${
                        recompensa.desbloqueada
                          ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300"
                          : "bg-gray-50 border-gray-200 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{recompensa.icone}</div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900">
                            {recompensa.titulo}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {recompensa.descricao}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="p-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 opacity-50">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🔒</div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-600">
                          Bloqueada
                        </h4>
                        <p className="text-xs text-gray-500">Continue progredindo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Biblioteca de Recursos */}
              <Card className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  Recursos
                </h2>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-between hover:bg-indigo-50 hover:border-indigo-300"
                  >
                    <span className="text-sm">Guia de Motivação</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between hover:bg-indigo-50 hover:border-indigo-300"
                  >
                    <span className="text-sm">Técnicas de Controle</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between hover:bg-indigo-50 hover:border-indigo-300"
                  >
                    <span className="text-sm">Comunidade</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
