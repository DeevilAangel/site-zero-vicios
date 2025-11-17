"use client";

import { Navbar } from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { 
  Calculator, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Heart,
  Clock,
  Award,
  Target
} from "lucide-react";

export default function FerramentasPage() {
  // Calculadora de Economia
  const [dailyCost, setDailyCost] = useState("");
  const [daysFree, setDaysFree] = useState("");
  const [savings, setSavings] = useState<number | null>(null);

  const calculateSavings = () => {
    const cost = parseFloat(dailyCost);
    const days = parseInt(daysFree);
    if (!isNaN(cost) && !isNaN(days)) {
      setSavings(cost * days);
    }
  };

  // Tracker de Hábitos
  const [habitDays, setHabitDays] = useState(0);
  const [habitGoal, setHabitGoal] = useState(30);

  const progressPercentage = Math.min((habitDays / habitGoal) * 100, 100);

  const milestones = [
    { days: 1, title: "Primeiro Dia", description: "Você deu o primeiro passo!" },
    { days: 7, title: "Uma Semana", description: "7 dias de força e determinação" },
    { days: 30, title: "Um Mês", description: "30 dias de transformação" },
    { days: 90, title: "Três Meses", description: "Hábito consolidado!" },
    { days: 365, title: "Um Ano", description: "Você é uma inspiração!" }
  ];

  const getCurrentMilestone = () => {
    return milestones.filter(m => habitDays >= m.days).pop();
  };

  const getNextMilestone = () => {
    return milestones.find(m => habitDays < m.days);
  };

  // Contador de Tempo Livre
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [daysClean, setDaysClean] = useState("");
  const [timeRecovered, setTimeRecovered] = useState<number | null>(null);

  const calculateTimeRecovered = () => {
    const hours = parseFloat(hoursPerDay);
    const days = parseInt(daysClean);
    if (!isNaN(hours) && !isNaN(days)) {
      setTimeRecovered(hours * days);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Ferramentas Práticas
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Acompanhe seu progresso, calcule suas conquistas e mantenha-se motivado
            </p>
          </div>

          <Tabs defaultValue="tracker" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8 h-auto">
              <TabsTrigger value="tracker" className="py-3">
                <Target className="w-4 h-4 mr-2" />
                Tracker de Progresso
              </TabsTrigger>
              <TabsTrigger value="calculator" className="py-3">
                <Calculator className="w-4 h-4 mr-2" />
                Calculadora de Economia
              </TabsTrigger>
              <TabsTrigger value="time" className="py-3">
                <Clock className="w-4 h-4 mr-2" />
                Tempo Recuperado
              </TabsTrigger>
            </TabsList>

            {/* Tracker de Progresso */}
            <TabsContent value="tracker">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Acompanhe Seu Progresso
                    </h2>
                    <p className="text-gray-600">
                      Visualize suas conquistas e celebre cada marco
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="habitDays">Dias Livre do Vício</Label>
                      <Input
                        id="habitDays"
                        type="number"
                        value={habitDays}
                        onChange={(e) => setHabitDays(parseInt(e.target.value) || 0)}
                        placeholder="Ex: 15"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="habitGoal">Meta de Dias</Label>
                      <Input
                        id="habitGoal"
                        type="number"
                        value={habitGoal}
                        onChange={(e) => setHabitGoal(parseInt(e.target.value) || 30)}
                        placeholder="Ex: 30"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progresso</span>
                      <span className="font-bold text-emerald-600">
                        {habitDays} / {habitGoal} dias
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    <p className="text-sm text-gray-500 text-center">
                      {progressPercentage.toFixed(0)}% completo
                    </p>
                  </div>

                  {/* Current Milestone */}
                  {getCurrentMilestone() && (
                    <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-3 rounded-xl">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            🎉 {getCurrentMilestone()?.title}
                          </h3>
                          <p className="text-gray-700">
                            {getCurrentMilestone()?.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Next Milestone */}
                  {getNextMilestone() && (
                    <Card className="p-6 border-2 border-dashed border-gray-300">
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-200 p-3 rounded-xl">
                          <Target className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            Próximo Marco: {getNextMilestone()?.title}
                          </h3>
                          <p className="text-gray-600">
                            Faltam {(getNextMilestone()?.days || 0) - habitDays} dias para alcançar
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* All Milestones */}
                  <div className="pt-6 border-t">
                    <h3 className="font-bold text-gray-900 mb-4">Todos os Marcos</h3>
                    <div className="space-y-3">
                      {milestones.map((milestone) => (
                        <div
                          key={milestone.days}
                          className={`flex items-center gap-4 p-4 rounded-lg ${
                            habitDays >= milestone.days
                              ? "bg-emerald-50 border border-emerald-200"
                              : "bg-gray-50 border border-gray-200"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                              habitDays >= milestone.days
                                ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {habitDays >= milestone.days ? "✓" : milestone.days}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">
                              {milestone.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Calculadora de Economia */}
            <TabsContent value="calculator">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-xl">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Calculadora de Economia
                    </h2>
                    <p className="text-gray-600">
                      Descubra quanto você já economizou
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dailyCost">Gasto Diário (R$)</Label>
                      <Input
                        id="dailyCost"
                        type="number"
                        value={dailyCost}
                        onChange={(e) => setDailyCost(e.target.value)}
                        placeholder="Ex: 20.00"
                        className="mt-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Quanto você gastava por dia com o vício
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="daysFree">Dias Livre</Label>
                      <Input
                        id="daysFree"
                        type="number"
                        value={daysFree}
                        onChange={(e) => setDaysFree(e.target.value)}
                        placeholder="Ex: 30"
                        className="mt-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Quantos dias você está livre do vício
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={calculateSavings}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calcular Economia
                  </Button>

                  {savings !== null && (
                    <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                      <div className="text-center">
                        <p className="text-gray-700 mb-2">Você já economizou</p>
                        <p className="text-5xl font-bold text-green-600 mb-4">
                          R$ {savings.toFixed(2)}
                        </p>
                        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-green-200">
                          <div>
                            <p className="text-2xl font-bold text-gray-900">
                              R$ {(savings / 12).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">Por mês</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-gray-900">
                              R$ {((savings / parseInt(daysFree)) * 365).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">Por ano</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-gray-900">
                              R$ {((savings / parseInt(daysFree)) * 3650).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">Em 10 anos</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  <Card className="p-6 bg-blue-50 border-blue-200">
                    <h3 className="font-bold text-gray-900 mb-3">
                      💡 O que você pode fazer com essa economia?
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>✈️ Fazer uma viagem dos sonhos</li>
                      <li>📚 Investir em educação e cursos</li>
                      <li>💰 Criar uma reserva de emergência</li>
                      <li>🎁 Presentear pessoas queridas</li>
                      <li>🏠 Melhorar sua casa</li>
                    </ul>
                  </Card>
                </div>
              </Card>
            </TabsContent>

            {/* Tempo Recuperado */}
            <TabsContent value="time">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-3 rounded-xl">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Tempo Recuperado
                    </h2>
                    <p className="text-gray-600">
                      Veja quanto tempo você ganhou de volta
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hoursPerDay">Horas por Dia no Vício</Label>
                      <Input
                        id="hoursPerDay"
                        type="number"
                        value={hoursPerDay}
                        onChange={(e) => setHoursPerDay(e.target.value)}
                        placeholder="Ex: 3"
                        className="mt-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Quantas horas por dia você dedicava ao vício
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="daysClean">Dias Livre</Label>
                      <Input
                        id="daysClean"
                        type="number"
                        value={daysClean}
                        onChange={(e) => setDaysClean(e.target.value)}
                        placeholder="Ex: 30"
                        className="mt-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Quantos dias você está livre do vício
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={calculateTimeRecovered}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Calcular Tempo
                  </Button>

                  {timeRecovered !== null && (
                    <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                      <div className="text-center">
                        <p className="text-gray-700 mb-2">Você recuperou</p>
                        <p className="text-5xl font-bold text-blue-600 mb-4">
                          {timeRecovered.toFixed(0)} horas
                        </p>
                        <p className="text-xl text-gray-700">
                          Isso equivale a {(timeRecovered / 24).toFixed(1)} dias completos!
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-blue-200">
                          <div>
                            <p className="text-2xl font-bold text-gray-900">
                              {(timeRecovered / 24 / 7).toFixed(1)}
                            </p>
                            <p className="text-sm text-gray-600">Semanas</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-gray-900">
                              {((timeRecovered / parseFloat(hoursPerDay)) * 365 / 24).toFixed(0)}
                            </p>
                            <p className="text-sm text-gray-600">Dias por ano</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  <Card className="p-6 bg-purple-50 border-purple-200">
                    <h3 className="font-bold text-gray-900 mb-3">
                      ⏰ Use esse tempo para:
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>📖 Ler livros que sempre quis</li>
                      <li>🏃 Praticar exercícios físicos</li>
                      <li>👨‍👩‍👧 Passar mais tempo com a família</li>
                      <li>🎨 Desenvolver novos hobbies</li>
                      <li>💼 Investir na sua carreira</li>
                      <li>🧘 Cuidar da sua saúde mental</li>
                    </ul>
                  </Card>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <Card className="mt-12 p-8 bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-center">
            <Heart className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">
              Quer acompanhamento personalizado?
            </h2>
            <p className="text-emerald-50 mb-6 max-w-2xl mx-auto">
              Crie seu plano personalizado e tenha acesso a mais ferramentas, comunidade e suporte profissional.
            </p>
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
              Criar Meu Plano Gratuito
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
