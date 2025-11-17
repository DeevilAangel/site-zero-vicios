"use client";

import { Navbar } from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  CheckCircle2, 
  Calendar,
  TrendingUp,
  Users,
  Award,
  Heart,
  Cigarette,
  Smartphone,
  Wine,
  Gamepad2,
  Clock,
  Brain,
  Activity
} from "lucide-react";
import Link from "next/link";

export default function PlanosPage() {
  const addictionTypes = [
    { 
      icon: Cigarette, 
      name: "Cigarro", 
      color: "from-orange-400 to-red-500",
      duration: "8-12 semanas",
      difficulty: "Alta"
    },
    { 
      icon: Smartphone, 
      name: "Celular", 
      color: "from-blue-400 to-indigo-500",
      duration: "4-8 semanas",
      difficulty: "Média"
    },
    { 
      icon: Wine, 
      name: "Álcool", 
      color: "from-purple-400 to-pink-500",
      duration: "12-16 semanas",
      difficulty: "Alta"
    },
    { 
      icon: Gamepad2, 
      name: "Jogos", 
      color: "from-green-400 to-emerald-500",
      duration: "6-10 semanas",
      difficulty: "Média"
    },
  ];

  const planPhases = [
    {
      phase: 1,
      title: "Preparação",
      duration: "1-2 semanas",
      icon: Brain,
      color: "from-blue-400 to-indigo-500",
      goals: [
        "Identificar gatilhos e padrões",
        "Definir motivações pessoais",
        "Criar estratégias de enfrentamento",
        "Preparar ambiente de apoio"
      ]
    },
    {
      phase: 2,
      title: "Ação",
      duration: "4-8 semanas",
      icon: Target,
      color: "from-emerald-400 to-teal-500",
      goals: [
        "Implementar mudanças no dia a dia",
        "Usar ferramentas de controle",
        "Participar da comunidade",
        "Registrar progresso diário"
      ]
    },
    {
      phase: 3,
      title: "Manutenção",
      duration: "Contínuo",
      icon: Activity,
      color: "from-purple-400 to-pink-500",
      goals: [
        "Consolidar novos hábitos",
        "Prevenir recaídas",
        "Ajudar outros membros",
        "Celebrar conquistas"
      ]
    }
  ];

  const planFeatures = [
    {
      icon: Target,
      title: "Metas Personalizadas",
      description: "Objetivos adaptados ao seu ritmo e necessidades específicas"
    },
    {
      icon: Calendar,
      title: "Cronograma Flexível",
      description: "Plano que se ajusta à sua rotina e progresso"
    },
    {
      icon: TrendingUp,
      title: "Acompanhamento Diário",
      description: "Ferramentas para monitorar seu progresso em tempo real"
    },
    {
      icon: Users,
      title: "Suporte Comunitário",
      description: "Acesso à comunidade de pessoas na mesma jornada"
    },
    {
      icon: Award,
      title: "Sistema de Recompensas",
      description: "Conquiste badges e celebre cada vitória"
    },
    {
      icon: Heart,
      title: "Recursos de Bem-estar",
      description: "Técnicas de relaxamento e gestão de ansiedade"
    }
  ];

  const successStories = [
    {
      name: "Maria Santos",
      addiction: "Cigarro",
      days: 180,
      text: "O plano personalizado me ajudou a entender meus gatilhos. Hoje, 6 meses livre!",
      avatar: "MS"
    },
    {
      name: "João Pedro",
      addiction: "Celular",
      days: 60,
      text: "Recuperei minha produtividade e relacionamentos. Valeu cada dia de esforço.",
      avatar: "JP"
    },
    {
      name: "Fernanda Lima",
      addiction: "Jogos",
      days: 120,
      text: "As etapas do plano tornaram tudo mais gerenciável. Não me sinto mais perdida.",
      avatar: "FL"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              Planos Baseados em Ciência
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Seu Plano Personalizado
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada vício é único. Criamos um plano adaptado às suas necessidades, com etapas claras e suporte contínuo.
            </p>
          </div>

          {/* Addiction Types */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Escolha Seu Tipo de Vício
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addictionTypes.map((addiction) => (
                <Card 
                  key={addiction.name} 
                  className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-emerald-200"
                >
                  <div className={`bg-gradient-to-br ${addiction.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    <addiction.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                    {addiction.name}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Duração:</span>
                      <span className="font-semibold">{addiction.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Dificuldade:</span>
                      <Badge variant="outline" className="text-xs">
                        {addiction.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                    Criar Plano
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          {/* Plan Phases */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                As 3 Fases do Seu Plano
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Um processo estruturado e comprovado para sua transformação
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {planPhases.map((phase) => (
                <Card key={phase.phase} className="p-8 hover:shadow-xl transition-all duration-300 border-2">
                  <div className="text-center mb-6">
                    <div className={`bg-gradient-to-br ${phase.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <phase.icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge className="mb-2">Fase {phase.phase}</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      {phase.duration}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="font-semibold text-gray-900 text-sm">Objetivos:</p>
                    {phase.goals.map((goal, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{goal}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Plan Features */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                O Que Está Incluído
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tudo que você precisa para ter sucesso na sua jornada
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planFeatures.map((feature) => (
                <Card key={feature.title} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="bg-gradient-to-br from-emerald-400 to-teal-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* Success Stories */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Histórias de Sucesso
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Veja como nossos planos transformaram vidas reais
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story) => (
                <Card key={story.name} className="p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                      {story.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{story.name}</p>
                      <p className="text-sm text-gray-600">
                        {story.days} dias livre de {story.addiction}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "{story.text}"
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <Card className="p-12 bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-center">
            <Target className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
              Crie seu plano personalizado gratuito e dê o primeiro passo rumo à liberdade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
                Criar Meu Plano Gratuito
              </Button>
              <Link href="/ferramentas">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-2 border-white text-white hover:bg-white/10">
                  Ver Ferramentas
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
