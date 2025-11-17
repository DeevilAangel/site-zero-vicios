"use client";

import { Navbar } from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria o envio real do formulário
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contato@zerovicios.com.br",
      description: "Respondemos em até 24 horas"
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "(11) 9999-9999",
      description: "Seg-Sex: 9h às 18h"
    },
    {
      icon: MapPin,
      title: "Endereço",
      content: "São Paulo, SP",
      description: "Atendimento online em todo Brasil"
    },
    {
      icon: Clock,
      title: "Horário",
      content: "24/7 Online",
      description: "Comunidade sempre ativa"
    }
  ];

  const faqs = [
    {
      question: "O ZeroVícios é gratuito?",
      answer: "Sim! Oferecemos ferramentas gratuitas e acesso à comunidade. Também temos planos premium com recursos adicionais."
    },
    {
      question: "Como funciona o suporte?",
      answer: "Você tem acesso à comunidade 24/7, além de poder entrar em contato conosco por email ou telefone durante horário comercial."
    },
    {
      question: "Preciso de acompanhamento médico?",
      answer: "Recomendamos sempre consultar um profissional de saúde. O ZeroVícios é uma ferramenta de apoio complementar."
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim, não há contratos ou fidelidade. Você pode cancelar quando quiser, sem custos adicionais."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Entre em Contato
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos aqui para ajudar. Envie sua mensagem e responderemos o mais rápido possível.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-3 rounded-xl">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Envie sua Mensagem
                    </h2>
                    <p className="text-gray-600">
                      Preencha o formulário abaixo
                    </p>
                  </div>
                </div>

                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Mensagem Enviada!
                    </h3>
                    <p className="text-gray-600">
                      Obrigado pelo contato. Responderemos em breve.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Seu nome"
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="seu@email.com"
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="(11) 99999-9999"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Assunto *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          placeholder="Sobre o que você quer falar?"
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Conte-nos como podemos ajudar..."
                        required
                        rows={6}
                        className="mt-2"
                      />
                    </div>

                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <Card key={info.title} className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-3 rounded-xl">
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-900 font-semibold mb-1">
                        {info.content}
                      </p>
                      <p className="text-sm text-gray-600">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <h3 className="font-bold text-gray-900 mb-3">
                  🚨 Em Crise?
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Se você está em crise ou precisa de ajuda imediata, entre em contato com:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-blue-600">CVV: 188</span>
                  </div>
                  <p className="text-gray-600 text-xs">
                    Centro de Valorização da Vida - Atendimento 24h
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Respostas rápidas para as dúvidas mais comuns
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="p-12 bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-center">
            <MessageCircle className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              Prefere Começar Agora?
            </h2>
            <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
              Não precisa esperar! Crie sua conta gratuita e comece sua jornada de transformação hoje mesmo.
            </p>
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
              Criar Conta Gratuita
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
