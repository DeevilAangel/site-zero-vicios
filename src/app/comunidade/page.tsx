"use client";

import { Navbar } from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageCircle, 
  Heart,
  TrendingUp,
  Award,
  Shield,
  Clock,
  ThumbsUp,
  Share2,
  Lock
} from "lucide-react";

export default function ComunidadePage() {
  const communityStats = [
    { number: "50K+", label: "Membros Ativos" },
    { number: "500K+", label: "Mensagens de Apoio" },
    { number: "10K+", label: "Histórias de Sucesso" },
    { number: "24/7", label: "Suporte Disponível" }
  ];

  const forumCategories = [
    {
      icon: Heart,
      title: "Apoio Emocional",
      description: "Compartilhe seus desafios e receba suporte",
      posts: 12453,
      color: "from-pink-400 to-rose-500"
    },
    {
      icon: TrendingUp,
      title: "Progresso e Conquistas",
      description: "Celebre suas vitórias com a comunidade",
      posts: 8921,
      color: "from-emerald-400 to-teal-500"
    },
    {
      icon: MessageCircle,
      title: "Dicas e Estratégias",
      description: "Aprenda com quem já passou por isso",
      posts: 15678,
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: Award,
      title: "Histórias Inspiradoras",
      description: "Inspire-se com transformações reais",
      posts: 6234,
      color: "from-purple-400 to-pink-500"
    }
  ];

  const recentPosts = [
    {
      author: "Carlos M.",
      avatar: "CM",
      time: "2 horas atrás",
      category: "Progresso",
      title: "100 dias sem cigarro! 🎉",
      excerpt: "Nunca pensei que chegaria aqui. Obrigado a todos que me apoiaram nessa jornada...",
      likes: 234,
      replies: 45
    },
    {
      author: "Ana Silva",
      avatar: "AS",
      time: "5 horas atrás",
      category: "Dicas",
      title: "Como lidar com gatilhos sociais",
      excerpt: "Compartilho 5 estratégias que me ajudaram em situações sociais difíceis...",
      likes: 189,
      replies: 32
    },
    {
      author: "Roberto L.",
      avatar: "RL",
      time: "1 dia atrás",
      category: "Apoio",
      title: "Preciso de ajuda - momento difícil",
      excerpt: "Estou passando por um momento complicado e preciso de palavras de apoio...",
      likes: 156,
      replies: 67
    }
  ];

  const supportGroups = [
    {
      name: "Grupo Cigarro",
      members: 12500,
      description: "Apoio específico para quem quer parar de fumar",
      nextMeeting: "Hoje às 20h"
    },
    {
      name: "Grupo Celular",
      members: 8900,
      description: "Estratégias para uso consciente de tecnologia",
      nextMeeting: "Amanhã às 19h"
    },
    {
      name: "Grupo Álcool",
      members: 15200,
      description: "Suporte para sobriedade e vida saudável",
      nextMeeting: "Hoje às 21h"
    },
    {
      name: "Grupo Jogos",
      members: 6700,
      description: "Equilíbrio entre diversão e responsabilidade",
      nextMeeting: "Sexta às 18h"
    }
  ];

  const communityRules = [
    "Respeite todos os membros e suas jornadas",
    "Mantenha a confidencialidade das histórias compartilhadas",
    "Seja empático e ofereça apoio construtivo",
    "Não julgue - cada jornada é única",
    "Compartilhe recursos e estratégias úteis",
    "Celebre as vitórias, grandes e pequenas"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
              Comunidade Ativa 24/7
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Comunidade de Apoio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Você não está sozinho. Conecte-se com milhares de pessoas que entendem sua jornada e estão aqui para apoiar.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {communityStats.map((stat) => (
              <Card key={stat.label} className="p-6 text-center hover:shadow-lg transition-all">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="forum" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8 h-auto">
              <TabsTrigger value="forum" className="py-3">
                <MessageCircle className="w-4 h-4 mr-2" />
                Fórum
              </TabsTrigger>
              <TabsTrigger value="groups" className="py-3">
                <Users className="w-4 h-4 mr-2" />
                Grupos de Apoio
              </TabsTrigger>
              <TabsTrigger value="rules" className="py-3">
                <Shield className="w-4 h-4 mr-2" />
                Diretrizes
              </TabsTrigger>
            </TabsList>

            {/* Forum Tab */}
            <TabsContent value="forum">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Categories */}
                <div className="lg:col-span-1">
                  <Card className="p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Categorias</h3>
                    <div className="space-y-3">
                      {forumCategories.map((category) => (
                        <div
                          key={category.title}
                          className="p-4 rounded-lg border-2 border-gray-200 hover:border-emerald-200 cursor-pointer transition-all group"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`bg-gradient-to-br ${category.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                              <category.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                {category.title}
                              </h4>
                              <p className="text-xs text-gray-600 mb-2">
                                {category.description}
                              </p>
                              <p className="text-xs text-gray-500">
                                {category.posts.toLocaleString()} posts
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Recent Posts */}
                <div className="lg:col-span-2">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-900 text-xl">Posts Recentes</h3>
                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Novo Post
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {recentPosts.map((post, index) => (
                      <Card key={index} className="p-6 hover:shadow-lg transition-all cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                            {post.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-gray-900">{post.author}</span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{post.time}</span>
                              <Badge variant="outline" className="text-xs">
                                {post.category}
                              </Badge>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2 text-lg">
                              {post.title}
                            </h4>
                            <p className="text-gray-600 mb-4">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <button className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                {post.likes}
                              </button>
                              <button className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                {post.replies}
                              </button>
                              <button className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
                                <Share2 className="w-4 h-4" />
                                Compartilhar
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Groups Tab */}
            <TabsContent value="groups">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {supportGroups.map((group) => (
                  <Card key={group.name} className="p-6 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {group.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {group.description}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-3 rounded-xl">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {group.members.toLocaleString()} membros
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {group.nextMeeting}
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                      Participar do Grupo
                    </Button>
                  </Card>
                ))}
              </div>

              <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-3 rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Ambiente Seguro e Confidencial
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Todos os grupos são moderados por profissionais e seguem rígidas políticas de privacidade. 
                      O que é compartilhado aqui, fica aqui.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Lock className="w-4 h-4" />
                      <span>Conversas criptografadas de ponta a ponta</span>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Rules Tab */}
            <TabsContent value="rules">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-3 rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Diretrizes da Comunidade
                    </h2>
                    <p className="text-gray-600">
                      Para manter um ambiente seguro e acolhedor para todos
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {communityRules.map((rule, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{rule}</p>
                    </div>
                  ))}
                </div>

                <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                  <h3 className="font-bold text-gray-900 mb-3">
                    ⚠️ Comportamentos Não Tolerados
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Assédio, bullying ou discriminação de qualquer tipo</li>
                    <li>• Compartilhamento de informações pessoais de outros membros</li>
                    <li>• Spam, propaganda ou autopromoção excessiva</li>
                    <li>• Conteúdo que incentive comportamentos prejudiciais</li>
                    <li>• Linguagem ofensiva ou desrespeitosa</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4">
                    Violações dessas diretrizes podem resultar em advertência ou banimento da comunidade.
                  </p>
                </Card>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <Card className="mt-12 p-12 bg-gradient-to-br from-purple-500 to-pink-600 text-white text-center">
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              Junte-se à Nossa Comunidade
            </h2>
            <p className="text-xl text-purple-50 mb-8 max-w-2xl mx-auto">
              Milhares de pessoas estão esperando para apoiar você. Crie sua conta gratuita e comece hoje.
            </p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
              Criar Conta Gratuita
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
