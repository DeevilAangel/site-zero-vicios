"use client";

import { Navbar } from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Heart, 
  Target, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Cigarette, 
  Smartphone, 
  Wine, 
  Gamepad2,
  ArrowRight,
  Star,
  Calendar,
  Award,
  Shield
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkAuth();
  }, []);

  const handleStartJourney = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/questionario");
    }
  };

  const addictions = [
    { icon: Cigarette, name: "Cigarro", color: "from-orange-400 to-red-500" },
    { icon: Smartphone, name: "Celular", color: "from-blue-400 to-indigo-500" },
    { icon: Wine, name: "Álcool", color: "from-purple-400 to-pink-500" },
    { icon: Gamepad2, name: "Jogos", color: "from-green-400 to-emerald-500" },
  ];

  const benefits = [
    {
      icon: Target,
      title: "Planos Personalizados",
      description: "Estratégias adaptadas ao seu vício e ritmo de vida"
    },
    {
      icon: TrendingUp,
      title: "Acompanhamento em Tempo Real",
      description: "Visualize seu progresso e conquiste metas diárias"
    },
    {
      icon: Users,
      title: "Comunidade de Apoio",
      description: "Conecte-se com pessoas que entendem sua jornada"
    },
    {
      icon: Award,
      title: "Sistema de Recompensas",
      description: "Celebre cada vitória e mantenha-se motivado"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      addiction: "Cigarro",
      days: 127,
      text: "Depois de 15 anos fumando, finalmente consegui parar. O suporte da comunidade foi essencial!",
      avatar: "CS"
    },
    {
      name: "Ana Martins",
      addiction: "Celular",
      days: 89,
      text: "Recuperei 3 horas por dia da minha vida. Agora tenho tempo para o que realmente importa.",
      avatar: "AM"
    },
    {
      name: "Roberto Costa",
      addiction: "Álcool",
      days: 365,
      text: "1 ano sem beber! O ZeroVícios me deu as ferramentas e o apoio que eu precisava.",
      avatar: "RC"
    }
  ];

  const stats = [
    { number: "50K+", label: "Pessoas Ajudadas" },
    { number: "89%", label: "Taxa de Sucesso" },
    { number: "2M+", label: "Dias Livres de Vícios" },
    { number: "24/7", label: "Suporte Disponível" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Mais de 50.000 vidas transformadas</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Liberte-se dos seus{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                vícios
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Transforme sua vida com planos personalizados, ferramentas práticas e uma comunidade que te apoia em cada passo da jornada.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                onClick={handleStartJourney}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg px-8 py-6 h-auto"
              >
                Começar Minha Jornada
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link href="/ferramentas">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-2 hover:bg-gray-50">
                  Ver Ferramentas Gratuitas
                </Button>
              </Link>
            </div>

            {/* Addiction Types */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {addictions.map((addiction) => (
                <Card key={addiction.name} className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className={`bg-gradient-to-br ${addiction.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform`}>
                    <addiction.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-gray-800">{addiction.name}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-emerald-50 text-sm sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Por que escolher o ZeroVícios?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Uma abordagem completa e comprovada para sua transformação
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-200">
                <div className="bg-gradient-to-br from-emerald-400 to-teal-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Histórias de Sucesso
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pessoas reais que transformaram suas vidas com o ZeroVícios
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.days} dias livre de {testimonial.addiction}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-center">
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              Pronto para começar sua transformação?
            </h2>
            <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já deram o primeiro passo rumo a uma vida livre de vícios.
            </p>
            <Button 
              size="lg" 
              onClick={handleStartJourney}
              className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto"
            >
              Criar Meu Plano Gratuito
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-white">ZeroVícios</span>
              </div>
              <p className="text-sm text-gray-400">
                Transformando vidas através do apoio e ferramentas práticas.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/planos" className="hover:text-emerald-400">Planos</Link></li>
                <li><Link href="/ferramentas" className="hover:text-emerald-400">Ferramentas</Link></li>
                <li><Link href="/comunidade" className="hover:text-emerald-400">Comunidade</Link></li>
                <li><Link href="/blog" className="hover:text-emerald-400">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contato" className="hover:text-emerald-400">Contato</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">FAQ</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">Privacidade</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">Termos</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Emergência</h4>
              <p className="text-sm text-gray-400 mb-2">
                Se você está em crise, procure ajuda imediatamente:
              </p>
              <p className="text-sm font-bold text-emerald-400">
                CVV: 188 (24h)
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 ZeroVícios. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
