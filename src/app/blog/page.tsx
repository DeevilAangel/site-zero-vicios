"use client";

import { Navbar } from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock,
  User,
  TrendingUp,
  Heart,
  Brain,
  Target,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const featuredPost = {
    title: "Como Superar os Primeiros 30 Dias: Guia Completo",
    excerpt: "Os primeiros 30 dias são os mais desafiadores. Descubra estratégias comprovadas para passar por esse período crítico com sucesso.",
    author: "Dr. Paulo Mendes",
    date: "15 de Março, 2024",
    readTime: "12 min",
    category: "Guias",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop"
  };

  const blogPosts = [
    {
      title: "A Ciência Por Trás dos Vícios: Entendendo Seu Cérebro",
      excerpt: "Compreenda como os vícios afetam a química cerebral e por que é tão difícil parar.",
      author: "Dra. Ana Costa",
      date: "12 de Março, 2024",
      readTime: "8 min",
      category: "Ciência",
      icon: Brain,
      color: "from-purple-400 to-pink-500"
    },
    {
      title: "10 Técnicas de Mindfulness Para Controlar Gatilhos",
      excerpt: "Aprenda práticas de atenção plena que ajudam a identificar e gerenciar gatilhos emocionais.",
      author: "Carlos Oliveira",
      date: "10 de Março, 2024",
      readTime: "6 min",
      category: "Técnicas",
      icon: Target,
      color: "from-emerald-400 to-teal-500"
    },
    {
      title: "Histórias Reais: 5 Anos Livre do Cigarro",
      excerpt: "João compartilha sua jornada de 5 anos sem fumar e as lições aprendidas pelo caminho.",
      author: "João Silva",
      date: "8 de Março, 2024",
      readTime: "10 min",
      category: "Histórias",
      icon: Heart,
      color: "from-pink-400 to-rose-500"
    },
    {
      title: "Recaída Não é Fracasso: Como Se Recuperar",
      excerpt: "Entenda que recaídas fazem parte do processo e aprenda a se recuperar mais forte.",
      author: "Dra. Marina Santos",
      date: "5 de Março, 2024",
      readTime: "7 min",
      category: "Apoio",
      icon: TrendingUp,
      color: "from-blue-400 to-indigo-500"
    },
    {
      title: "Alimentação e Vícios: O Que Comer Para Ajudar",
      excerpt: "Descubra como uma dieta equilibrada pode apoiar sua jornada de recuperação.",
      author: "Nutricionista Laura Reis",
      date: "3 de Março, 2024",
      readTime: "9 min",
      category: "Saúde",
      icon: Heart,
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "Exercícios Físicos Como Aliados na Recuperação",
      excerpt: "Como a atividade física pode reduzir sintomas de abstinência e melhorar seu humor.",
      author: "Prof. Roberto Lima",
      date: "1 de Março, 2024",
      readTime: "8 min",
      category: "Fitness",
      icon: TrendingUp,
      color: "from-orange-400 to-red-500"
    }
  ];

  const categories = [
    { name: "Todos", count: 156 },
    { name: "Guias", count: 42 },
    { name: "Ciência", count: 28 },
    { name: "Histórias", count: 35 },
    { name: "Técnicas", count: 31 },
    { name: "Saúde", count: 20 }
  ];

  const popularTopics = [
    "Primeiros 30 dias",
    "Gatilhos emocionais",
    "Mindfulness",
    "Recaída",
    "Apoio familiar",
    "Exercícios físicos",
    "Alimentação saudável",
    "Histórias de sucesso"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              Conteúdo Atualizado Semanalmente
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Blog ZeroVícios
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Artigos, guias e histórias inspiradoras para apoiar sua jornada de transformação
            </p>
          </div>

          {/* Featured Post */}
          <Card className="mb-16 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <img 
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-emerald-500 text-white">
                  Destaque
                </Badge>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-3" variant="outline">
                  {featuredPost.category}
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <Button className="w-fit bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                  Ler Artigo Completo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Categories */}
              <Card className="p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Categorias
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-emerald-50 transition-colors text-left"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Popular Topics */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Tópicos Populares
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTopics.map((topic) => (
                    <Badge
                      key={topic}
                      variant="outline"
                      className="cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>

            {/* Blog Posts Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Artigos Recentes
                </h2>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>Mais Recentes</option>
                  <option>Mais Populares</option>
                  <option>Mais Lidos</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts.map((post, index) => (
                  <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <div className={`bg-gradient-to-br ${post.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <post.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <Badge variant="outline" className="mb-3">
                      {post.category}
                    </Badge>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="border-2">
                  Carregar Mais Artigos
                </Button>
              </div>
            </div>
          </div>

          {/* Newsletter CTA */}
          <Card className="mt-16 p-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              Receba Conteúdo Exclusivo
            </h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Inscreva-se na nossa newsletter e receba artigos, dicas e histórias inspiradoras diretamente no seu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Inscrever
              </Button>
            </div>
            <p className="text-sm text-blue-100 mt-4">
              Sem spam. Cancele quando quiser.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
