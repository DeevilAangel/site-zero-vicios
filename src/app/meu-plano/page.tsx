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
  Target,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  TrendingUp,
  Award,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface QuizData {
  vicios: string[];
  frequencia_perda: string;
  cigarros_por_dia?: number;
  preco_maco?: number;
  gasto_semanal_alcool?: number;
  gasto_mensal_jogos?: number;
  horas_por_dia_celular?: number;
}

export default function MeuPlanoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  useEffect(() => {
    const loadQuizData = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from('quiz_data')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error || !data) {
        router.push("/questionario");
        return;
      }

      setQuizData({
        vicios: data.vicios,
        frequencia_perda: data.frequencia_perda,
        cigarros_por_dia: data.cigarros_por_dia,
        preco_maco: data.preco_maco,
        gasto_semanal_alcool: data.gasto_semanal_alcool,
        gasto_mensal_jogos: data.gasto_mensal_jogos,
        horas_por_dia_celular: data.horas_por_dia_celular,
      });

      setLoading(false);
    };

    loadQuizData();
  }, [router]);

  const getVicioIcon = (vicio: string) => {
    switch (vicio) {
      case "fumar":
        return <Cigarette className="w-6 h-6" />;
      case "alcool":
        return <Wine className="w-6 h-6" />;
      case "jogos":
        return <Gamepad2 className="w-6 h-6" />;
      case "celular":
        return <Smartphone className="w-6 h-6" />;
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

  const getPlanoPersonalizado = (vicio: string) => {
    const planos: Record<string, any> = {
      fumar: {
        objetivo: "Reduzir gradualmente até parar completamente",
        fases: [
          {
            titulo: "Fase 1: Consciência (Semanas 1-2)",
            descricao: "Identifique seus gatilhos e padrões de consumo",
            acoes: [
              "Anote cada cigarro fumado e o motivo",
              "Identifique 3 situações que mais te fazem fumar",
              "Comece a adiar o primeiro cigarro do dia em 30 minutos",
            ],
          },
          {
            titulo: "Fase 2: Redução (Semanas 3-6)",
            descricao: "Diminua progressivamente o número de cigarros",
            acoes: [
              "Reduza 2-3 cigarros por semana",
              "Substitua cigarros por caminhadas de 5 minutos",
              "Evite fumar em locais específicos (casa, carro)",
            ],
          },
          {
            titulo: "Fase 3: Eliminação (Semanas 7-12)",
            descricao: "Pare completamente e mantenha-se firme",
            acoes: [
              "Defina uma data para parar completamente",
              "Descarte todos os cigarros e isqueiros",
              "Use técnicas de respiração quando sentir vontade",
            ],
          },
        ],
        economia: quizData?.cigarros_por_dia && quizData?.preco_maco
          ? {
              mensal: (quizData.cigarros_por_dia / 20) * quizData.preco_maco * 30,
              anual: (quizData.cigarros_por_dia / 20) * quizData.preco_maco * 365,
            }
          : null,
      },
      alcool: {
        objetivo: "Estabelecer controle e reduzir consumo",
        fases: [
          {
            titulo: "Fase 1: Avaliação (Semanas 1-2)",
            descricao: "Entenda seu padrão de consumo",
            acoes: [
              "Registre cada bebida consumida",
              "Identifique gatilhos emocionais",
              "Estabeleça dias sem álcool (2-3 por semana)",
            ],
          },
          {
            titulo: "Fase 2: Moderação (Semanas 3-8)",
            descricao: "Reduza quantidade e frequência",
            acoes: [
              "Limite a 2 doses por ocasião",
              "Alterne bebidas alcoólicas com água",
              "Evite beber sozinho",
            ],
          },
          {
            titulo: "Fase 3: Controle (Semanas 9-16)",
            descricao: "Mantenha consumo consciente e saudável",
            acoes: [
              "Máximo de 1-2 vezes por semana",
              "Apenas em contextos sociais planejados",
              "Desenvolva hobbies alternativos",
            ],
          },
        ],
        economia: quizData?.gasto_semanal_alcool
          ? {
              mensal: quizData.gasto_semanal_alcool * 4.3,
              anual: quizData.gasto_semanal_alcool * 52,
            }
          : null,
      },
      jogos: {
        objetivo: "Eliminar comportamento de risco financeiro",
        fases: [
          {
            titulo: "Fase 1: Bloqueio (Semanas 1-2)",
            descricao: "Crie barreiras imediatas",
            acoes: [
              "Bloqueie sites e apps de apostas",
              "Entregue controle financeiro a pessoa de confiança",
              "Delete todos os apps de jogos",
            ],
          },
          {
            titulo: "Fase 2: Substituição (Semanas 3-8)",
            descricao: "Encontre alternativas saudáveis",
            acoes: [
              "Pratique exercícios quando sentir impulso",
              "Participe de grupos de apoio",
              "Desenvolva novo hobby que exija concentração",
            ],
          },
          {
            titulo: "Fase 3: Reconstrução (Semanas 9-24)",
            descricao: "Reconstrua saúde financeira e emocional",
            acoes: [
              "Crie plano de pagamento de dívidas",
              "Estabeleça metas financeiras positivas",
              "Mantenha acompanhamento terapêutico",
            ],
          },
        ],
        economia: quizData?.gasto_mensal_jogos
          ? {
              mensal: quizData.gasto_mensal_jogos,
              anual: quizData.gasto_mensal_jogos * 12,
            }
          : null,
      },
      celular: {
        objetivo: "Recuperar tempo e atenção",
        fases: [
          {
            titulo: "Fase 1: Medição (Semanas 1-2)",
            descricao: "Entenda seu uso real",
            acoes: [
              "Ative rastreamento de tempo de tela",
              "Identifique apps mais usados",
              "Estabeleça meta de redução de 1 hora/dia",
            ],
          },
          {
            titulo: "Fase 2: Limitação (Semanas 3-6)",
            descricao: "Implemente restrições graduais",
            acoes: [
              "Configure limites de tempo por app",
              "Desative notificações não essenciais",
              "Crie zonas livres de celular (quarto, refeições)",
            ],
          },
          {
            titulo: "Fase 3: Equilíbrio (Semanas 7-12)",
            descricao: "Mantenha uso consciente e saudável",
            acoes: [
              "Máximo de 2-3 horas de tela por dia",
              "Use celular apenas para tarefas específicas",
              "Pratique atividades offline diariamente",
            ],
          },
        ],
        economia: quizData?.horas_por_dia_celular
          ? {
              horasMensais: quizData.horas_por_dia_celular * 30 * 0.3,
              horasAnuais: quizData.horas_por_dia_celular * 365 * 0.3,
            }
          : null,
      },
    };

    return planos[vicio];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando seu plano...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Plano Personalizado</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Seu Plano de Transformação
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Baseado nas suas respostas, criamos um plano personalizado para cada vício
            </p>
          </div>

          {/* Resumo dos Vícios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quizData.vicios.map((vicio) => (
              <Card key={vicio} className="p-4 bg-white">
                <div className="flex items-center gap-3">
                  <div
                    className={`bg-gradient-to-br ${getVicioColor(
                      vicio
                    )} w-12 h-12 rounded-lg flex items-center justify-center text-white`}
                  >
                    {getVicioIcon(vicio)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {getVicioNome(vicio)}
                    </h3>
                    <p className="text-sm text-gray-600">Em progresso</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Planos Detalhados */}
          <div className="space-y-8">
            {quizData.vicios.map((vicio) => {
              const plano = getPlanoPersonalizado(vicio);
              return (
                <Card key={vicio} className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`bg-gradient-to-br ${getVicioColor(
                        vicio
                      )} w-16 h-16 rounded-xl flex items-center justify-center text-white`}
                    >
                      {getVicioIcon(vicio)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Plano: {getVicioNome(vicio)}
                      </h2>
                      <p className="text-gray-600">{plano.objetivo}</p>
                    </div>
                  </div>

                  {/* Economia Estimada */}
                  {plano.economia && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-emerald-50 rounded-lg">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <DollarSign className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-gray-700 font-medium">
                            Economia Mensal
                          </span>
                        </div>
                        <p className="text-3xl font-bold text-emerald-600">
                          R$ {plano.economia.mensal?.toFixed(0) || plano.economia.horasMensais?.toFixed(0)}
                          {plano.economia.horasMensais && " horas"}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-gray-700 font-medium">
                            Economia Anual
                          </span>
                        </div>
                        <p className="text-3xl font-bold text-emerald-600">
                          R$ {plano.economia.anual?.toFixed(0) || plano.economia.horasAnuais?.toFixed(0)}
                          {plano.economia.horasAnuais && " horas"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Fases do Plano */}
                  <div className="space-y-6">
                    {plano.fases.map((fase: any, index: number) => (
                      <div key={index} className="border-l-4 border-emerald-500 pl-6">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {fase.titulo}
                            </h3>
                            <p className="text-gray-600">{fase.descricao}</p>
                          </div>
                        </div>
                        <ul className="space-y-2 ml-11">
                          {fase.acoes.map((acao: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{acao}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* CTA */}
          <Card className="mt-8 p-8 bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-center">
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-emerald-50 mb-6 max-w-2xl mx-auto">
              Acesse seu dashboard para acompanhar seu progresso diário e conquistar suas metas
            </p>
            <Button
              onClick={() => router.push("/dashboard")}
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100"
            >
              Ir para Dashboard
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
