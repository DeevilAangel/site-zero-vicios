"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowRight, 
  ArrowLeft,
  Cigarette,
  Wine,
  Gamepad2,
  Smartphone,
  CheckCircle2
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface QuestionarioData {
  // Seção 1
  vicios: string[];
  
  // Seção 2
  motivacao: string;
  motivacaoOutro?: string;
  frequenciaPerda: string;
  impactos: string[];
  impactoOutro?: string;
  tentativasAnteriores: string;
  
  // Seção Fumar
  cigarrosPorDia?: number;
  precoMaco?: number;
  tentouPararFumar?: string;
  impedimentoFumar?: string;
  
  // Seção Álcool
  frequenciaAlcool?: string;
  gastoSemanalAlcool?: number;
  culpaAlcool?: string;
  preocupacaoAlcool?: string;
  
  // Seção Jogos
  frequenciaJogos?: string;
  gastoMensalJogos?: number;
  gastouDemaisJogos?: string;
  escondeuJogos?: string;
  
  // Seção Celular
  ansiedadeCelular?: string;
  horasPorDiaCelular?: number;
  atrapalhaCelular?: string;
  tentouReduzirCelular?: string;
}

export default function QuestionarioPage() {
  const router = useRouter();
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState<QuestionarioData>({
    vicios: [],
    motivacao: "",
    frequenciaPerda: "",
    impactos: [],
    tentativasAnteriores: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  // Construir array de perguntas dinamicamente
  const construirPerguntas = () => {
    const perguntas = [
      { id: "vicios", tipo: "secao1" },
      { id: "motivacao", tipo: "secao2-1" },
      { id: "frequenciaPerda", tipo: "secao2-2" },
      { id: "impactos", tipo: "secao2-3" },
      { id: "tentativasAnteriores", tipo: "secao2-4" },
    ];

    // Adicionar perguntas específicas de vícios
    if (dados.vicios.includes("fumar")) {
      perguntas.push(
        { id: "fumar-1", tipo: "fumar" },
        { id: "fumar-2", tipo: "fumar" },
        { id: "fumar-3", tipo: "fumar" },
        { id: "fumar-4", tipo: "fumar" }
      );
    }
    if (dados.vicios.includes("alcool")) {
      perguntas.push(
        { id: "alcool-1", tipo: "alcool" },
        { id: "alcool-2", tipo: "alcool" },
        { id: "alcool-3", tipo: "alcool" },
        { id: "alcool-4", tipo: "alcool" }
      );
    }
    if (dados.vicios.includes("jogos")) {
      perguntas.push(
        { id: "jogos-1", tipo: "jogos" },
        { id: "jogos-2", tipo: "jogos" },
        { id: "jogos-3", tipo: "jogos" },
        { id: "jogos-4", tipo: "jogos" }
      );
    }
    if (dados.vicios.includes("celular")) {
      perguntas.push(
        { id: "celular-1", tipo: "celular" },
        { id: "celular-2", tipo: "celular" },
        { id: "celular-3", tipo: "celular" },
        { id: "celular-4", tipo: "celular" }
      );
    }

    return perguntas;
  };

  const perguntas = construirPerguntas();
  const totalPerguntas = perguntas.length;

  const handleVicioToggle = (vicio: string) => {
    setDados(prev => ({
      ...prev,
      vicios: prev.vicios.includes(vicio)
        ? prev.vicios.filter(v => v !== vicio)
        : [...prev.vicios, vicio]
    }));
  };

  const handleImpactoToggle = (impacto: string) => {
    setDados(prev => ({
      ...prev,
      impactos: prev.impactos.includes(impacto)
        ? prev.impactos.filter(i => i !== impacto)
        : [...prev.impactos, impacto]
    }));
  };

  const salvarNoSupabase = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      console.log("Iniciando salvamento do quiz para usuário:", user.id);

      // Preparar dados para salvar
      const dadosParaSalvar = {
        user_id: user.id,
        vicios: dados.vicios,
        motivacao: dados.motivacao || null,
        frequencia_perda: dados.frequenciaPerda || null,
        impactos: dados.impactos,
        tentativas_anteriores: dados.tentativasAnteriores || null,
        cigarros_por_dia: dados.cigarrosPorDia || null,
        preco_maco: dados.precoMaco || null,
        gasto_semanal_alcool: dados.gastoSemanalAlcool || null,
        gasto_mensal_jogos: dados.gastoMensalJogos || null,
        horas_por_dia_celular: dados.horasPorDiaCelular || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log("Dados preparados para salvar:", dadosParaSalvar);

      // Verificar se já existe registro
      const { data: existente, error: erroConsulta } = await supabase
        .from('quiz_responses')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (erroConsulta) {
        console.error("Erro ao consultar dados existentes:", erroConsulta);
        throw erroConsulta;
      }

      console.log("Registro existente?", existente ? "Sim" : "Não");

      if (existente) {
        // Atualizar registro existente
        console.log("Atualizando registro existente...");
        const { data, error } = await supabase
          .from('quiz_responses')
          .update({
            vicios: dadosParaSalvar.vicios,
            motivacao: dadosParaSalvar.motivacao,
            frequencia_perda: dadosParaSalvar.frequencia_perda,
            impactos: dadosParaSalvar.impactos,
            tentativas_anteriores: dadosParaSalvar.tentativas_anteriores,
            cigarros_por_dia: dadosParaSalvar.cigarros_por_dia,
            preco_maco: dadosParaSalvar.preco_maco,
            gasto_semanal_alcool: dadosParaSalvar.gasto_semanal_alcool,
            gasto_mensal_jogos: dadosParaSalvar.gasto_mensal_jogos,
            horas_por_dia_celular: dadosParaSalvar.horas_por_dia_celular,
            updated_at: dadosParaSalvar.updated_at
          })
          .eq('user_id', user.id)
          .select();

        if (error) {
          console.error("Erro ao atualizar:", error);
          throw error;
        }

        console.log("Registro atualizado com sucesso:", data);
      } else {
        // Inserir novo registro
        console.log("Inserindo novo registro...");
        const { data, error } = await supabase
          .from('quiz_responses')
          .insert([dadosParaSalvar])
          .select();

        if (error) {
          console.error("Erro ao inserir:", error);
          throw error;
        }

        console.log("Registro inserido com sucesso:", data);
      }

      console.log("✅ Quiz salvo com sucesso! Redirecionando para o dashboard...");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("❌ Erro ao salvar quiz:", error);
      alert(`Erro ao salvar suas respostas: ${error?.message || "Erro desconhecido"}. Por favor, tente novamente.`);
    } finally {
      setLoading(false);
    }
  };

  const proximaPergunta = () => {
    if (perguntaAtual < totalPerguntas - 1) {
      setPerguntaAtual(perguntaAtual + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Finalizar questionário e salvar no Supabase
      salvarNoSupabase();
    }
  };

  const perguntaAnterior = () => {
    if (perguntaAtual > 0) {
      setPerguntaAtual(perguntaAtual - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPerguntaAtual = () => {
    const pergunta = perguntas[perguntaAtual];
    
    // SEÇÃO 1 - Escolha de Vícios
    if (pergunta.id === "vicios") {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Escolha dos Vícios a Trabalhar
            </h2>
            <p className="text-gray-600">
              Quais hábitos você gostaria de trabalhar? (Marque quantos quiser)
            </p>
          </div>

          <div className="grid gap-3">
            {[
              { id: "fumar", label: "Fumar", icon: Cigarette, color: "from-orange-400 to-red-500" },
              { id: "alcool", label: "Beber álcool", icon: Wine, color: "from-purple-400 to-pink-500" },
              { id: "jogos", label: "Jogar/apostar", icon: Gamepad2, color: "from-green-400 to-emerald-500" },
              { id: "celular", label: "Uso excessivo do celular", icon: Smartphone, color: "from-blue-400 to-indigo-500" },
            ].map((vicio) => (
              <Card
                key={vicio.id}
                className={`p-4 cursor-pointer transition-all duration-300 ${
                  dados.vicios.includes(vicio.id)
                    ? "border-2 border-emerald-500 bg-emerald-50"
                    : "border-2 border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleVicioToggle(vicio.id)}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={dados.vicios.includes(vicio.id)}
                    onCheckedChange={() => handleVicioToggle(vicio.id)}
                  />
                  <div className={`bg-gradient-to-br ${vicio.color} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <vicio.icon className="w-5 h-5 text-white" />
                  </div>
                  <Label className="text-base font-semibold cursor-pointer flex-1">
                    {vicio.label}
                  </Label>
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    // SEÇÃO 2 - Pergunta 1
    if (pergunta.id === "motivacao") {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Perguntas Gerais
            </h2>
            <p className="text-gray-600 mb-6">
              Vamos conhecer melhor sua situação atual
            </p>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-semibold text-gray-900">
              O que te motivou a procurar ajuda hoje?
            </Label>
            <RadioGroup
              value={dados.motivacao}
              onValueChange={(value) => setDados({ ...dados, motivacao: value })}
            >
              <div className="space-y-3">
                {[
                  "Estou preocupado com meus hábitos",
                  "Alguém me sugeriu buscar ajuda",
                  "Já tentei parar sozinho e não consegui",
                  "Outro"
                ].map((opcao) => (
                  <div key={opcao} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-emerald-200 transition-colors">
                    <RadioGroupItem value={opcao} id={opcao} />
                    <Label htmlFor={opcao} className="cursor-pointer flex-1">
                      {opcao}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
            {dados.motivacao === "Outro" && (
              <Textarea
                placeholder="Por favor, descreva sua motivação..."
                value={dados.motivacaoOutro || ""}
                onChange={(e) => setDados({ ...dados, motivacaoOutro: e.target.value })}
                className="mt-3"
              />
            )}
          </div>
        </div>
      );
    }

    // SEÇÃO 2 - Pergunta 2
    if (pergunta.id === "frequenciaPerda") {
      return (
        <div className="space-y-6">
          <Label className="text-lg font-semibold text-gray-900">
            Com que frequência você sente que perde o controle sobre algum comportamento ou hábito?
          </Label>
          <RadioGroup
            value={dados.frequenciaPerda}
            onValueChange={(value) => setDados({ ...dados, frequenciaPerda: value })}
          >
            <div className="space-y-3">
              {[
                "Raramente",
                "Algumas vezes por mês",
                "Quase todos os dias",
                "Todos os dias"
              ].map((opcao) => (
                <div key={opcao} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-emerald-200 transition-colors">
                  <RadioGroupItem value={opcao} id={opcao} />
                  <Label htmlFor={opcao} className="cursor-pointer flex-1">
                    {opcao}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      );
    }

    // SEÇÃO 2 - Pergunta 3
    if (pergunta.id === "impactos") {
      return (
        <div className="space-y-6">
          <Label className="text-lg font-semibold text-gray-900">
            Como esse hábito está afetando a sua vida atualmente? (Marque todas as que se aplicam)
          </Label>
          <div className="space-y-3">
            {[
              "Problemas no trabalho ou estudos",
              "Conflitos familiares ou sociais",
              "Problemas de saúde física",
              "Problemas emocionais (ansiedade, culpa, tristeza, etc.)",
              "Perda de dinheiro",
              "Outro"
            ].map((impacto) => (
              <Card
                key={impacto}
                className={`p-4 cursor-pointer transition-all ${
                  dados.impactos.includes(impacto)
                    ? "border-2 border-emerald-500 bg-emerald-50"
                    : "border-2 border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleImpactoToggle(impacto)}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={dados.impactos.includes(impacto)}
                    onCheckedChange={() => handleImpactoToggle(impacto)}
                  />
                  <Label className="cursor-pointer flex-1">
                    {impacto}
                  </Label>
                </div>
              </Card>
            ))}
          </div>
          {dados.impactos.includes("Outro") && (
            <Textarea
              placeholder="Por favor, descreva outros impactos..."
              value={dados.impactoOutro || ""}
              onChange={(e) => setDados({ ...dados, impactoOutro: e.target.value })}
              className="mt-3"
            />
          )}
        </div>
      );
    }

    // SEÇÃO 2 - Pergunta 4
    if (pergunta.id === "tentativasAnteriores") {
      return (
        <div className="space-y-6">
          <Label className="text-lg font-semibold text-gray-900">
            Você já tentou mudar esse comportamento antes?
          </Label>
          <RadioGroup
            value={dados.tentativasAnteriores}
            onValueChange={(value) => setDados({ ...dados, tentativasAnteriores: value })}
          >
            <div className="space-y-3">
              {[
                "Nunca",
                "Já tentei algumas vezes, sem sucesso",
                "Consegui parar por um tempo, mas voltei",
                "Sim, estou tentando agora"
              ].map((opcao) => (
                <div key={opcao} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-emerald-200 transition-colors">
                  <RadioGroupItem value={opcao} id={opcao} />
                  <Label htmlFor={opcao} className="cursor-pointer flex-1">
                    {opcao}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      );
    }

    // SEÇÃO FUMAR
    if (pergunta.tipo === "fumar") {
      const perguntaNumero = parseInt(pergunta.id.split("-")[1]);
      
      return (
        <div className="space-y-6">
          {perguntaNumero === 1 && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-orange-400 to-red-500 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Cigarette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Sobre o Fumo</h2>
                  <p className="text-gray-600">Vamos entender melhor seu hábito</p>
                </div>
              </div>
              <div>
                <Label className="text-lg font-semibold text-gray-900 mb-3 block">
                  Quantos cigarros você fuma por dia?
                </Label>
                <Input
                  type="number"
                  placeholder="Ex: 15"
                  value={dados.cigarrosPorDia || ""}
                  onChange={(e) => setDados({ ...dados, cigarrosPorDia: Number(e.target.value) })}
                  className="text-lg"
                />
              </div>
            </>
          )}

          {perguntaNumero === 2 && (
            <div>
              <Label className="text-lg font-semibold text-gray-900 mb-3 block">
                Qual é o preço médio do maço que você compra? (R$)
              </Label>
              <Input
                type="number"
                step="0.01"
                placeholder="Ex: 10.00"
                value={dados.precoMaco || ""}
                onChange={(e) => setDados({ ...dados, precoMaco: Number(e.target.value) })}
                className="text-lg"
              />
            </div>
          )}

          {perguntaNumero === 3 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">
                Você já tentou parar de fumar antes?
              </Label>
              <RadioGroup
                value={dados.tentouPararFumar}
                onValueChange={(value) => setDados({ ...dados, tentouPararFumar: value })}
              >
                <div className="space-y-3">
                  {["Sim, várias vezes", "Sim, uma vez", "Não"].map((opcao) => (
                    <div key={opcao} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-emerald-200 transition-colors">
                      <RadioGroupItem value={opcao} id={opcao} />
                      <Label htmlFor={opcao} className="cursor-pointer flex-1">{opcao}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {perguntaNumero === 4 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">
                O que mais te impede de parar de fumar hoje?
              </Label>
              <RadioGroup
                value={dados.impedimentoFumar}
                onValueChange={(value) => setDados({ ...dados, impedimentoFumar: value })}
              >
                <div className="space-y-3">
                  {[
                    "Ansiedade",
                    "Hábito social",
                    "Medo de engordar ou outros efeitos",
                    "Falta de motivação ou apoio"
                  ].map((opcao) => (
                    <div key={opcao} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-emerald-200 transition-colors">
                      <RadioGroupItem value={opcao} id={opcao} />
                      <Label htmlFor={opcao} className="cursor-pointer flex-1">{opcao}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      );
    }

    // SEÇÃO ÁLCOOL
    if (pergunta.tipo === "alcool") {
      const perguntaNumero = parseInt(pergunta.id.split("-")[1]);
      
      return (
        <div className="space-y-6">
          {perguntaNumero === 1 && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-400 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Wine className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Sobre o Álcool</h2>
                  <p className="text-gray-600">Vamos entender melhor seu consumo</p>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-900">
                  Com que frequência você consome bebidas alcoólicas?
                </Label>
                <RadioGroup
                  value={dados.frequenciaAlcool}
                  onValueChange={(value) => setDados({ ...dados, frequenciaAlcool: value })}
                >
                  <div className="space-y-3">
                    {[
                      "Todos os dias",
                      "Fins de semana",
                      "Apenas em eventos sociais",
                      "Raramente"
                    ].map((opcao) => (
                      <div key={opcao} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-emerald-200 transition-colors">
                        <RadioGroupItem value={opcao} id={opcao} />
                        <Label htmlFor={opcao} className="cursor-pointer flex-1">{opcao}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          {perguntaNumero === 2 && (
            <div>
              <Label className="text-lg font-semibold text-gray-900 mb-3 block">
                Em média, quanto você gasta por semana com bebidas alcoólicas? (R$)
              </Label>
              <Input
                type="number"
                step="0.01"
                placeholder="Ex: 50.00"
                value={dados.gastoSemanalAlcool || ""}
                onChange={(e) => setDados({ ...dados, gastoSemanalAlcool: Number(e.target.value) })}
                className="text-lg"
              />
            </div>
          )}

          {perguntaNumero === 3 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">
                Você já se sentiu culpado(a) ou envergonhado(a) depois de beber?
              </Label>
              <RadioGroup
                value={dados.culpaAlcool}
                onValueChange={(value) => setDados({ ...dados, culpaAlcool: value })}
              >
                <div className="space-y-3">
                  {["Sim", "Não", "Às vezes"].map((opcao) => (
                    <div key={opcao} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-emerald-200 transition-colors">
                      <RadioGroupItem value={opcao} id={opcao} />
                      <Label htmlFor={opcao} className="cursor-pointer flex-1">{opcao}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {perguntaNumero === 4 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">
                Alguém já expressou preocupação com seu consumo de álcool?
              </Label>
              <RadioGroup
                value={dados.preocupacaoAlcool}
                onValueChange={(value) => setDados({ ...dados, preocupacaoAlcool: value })}
              >
                <div className="space-y-3">
                  {["Sim", "Não", "Já evitaram falar sobre isso"].map((opcao) => (
                    <div key={opcao} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-emerald-200 transition-colors">
                      <RadioGroupItem value={opcao} id={opcao} />
                      <Label htmlFor={opcao} className="cursor-pointer flex-1">{opcao}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      );
    }

    // SEÇÃO JOGOS
    if (pergunta.tipo === "jogos") {
      const perguntaNumero = parseInt(pergunta.id.split("-")[1]);
      
      return (
        <div className="space-y-6">
          {perguntaNumero === 1 && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Sobre Jogos e Apostas</h2>
                  <p className="text-gray-600">Vamos entender melhor seu hábito</p>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-900">
                  Com que frequência você joga por dinheiro ou aposta?
                </Label>
                <RadioGroup
                  value={dados.frequenciaJogos}
                  onValueChange={(value) => setDados({ ...dados, frequenciaJogos: value })}
                >
                  <div className="space-y-3">
                    {[
                      "Diariamente",
                      "Algumas vezes por semana",
                      "Eventualmente",
                      "Raramente"
                    ].map((opcao) => (
                      <div key={opcao} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-emerald-200 transition-colors">
                        <RadioGroupItem value={opcao} id={opcao} />
                        <Label htmlFor={opcao} className="cursor-pointer flex-1">{opcao}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          {perguntaNumero === 2 && (
            <div>
              <Label className="text-lg font-semibold text-gray-900 mb-3 block">
                Em média, quanto você gasta por mês com jogos ou apostas? (R$)
              </Label>
              <Input
                type="number"
                step="0.01"
                placeholder="Ex: 200.00"
                value={dados.gastoMensalJogos || ""}
                onChange={(e) => setDados({ ...dados, gastoMensalJogos: Number(e.target.value) })}
                className="text-lg"
              />
            </div>
          )}

          {perguntaNumero === 3 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">
                Você já gastou mais dinheiro do que podia com jogos/apostas?
              </Label>
              <RadioGroup
                value={dados.gastouDemaisJogos}
                onValueChange={(value) => setDados({ ...dados, gastouDemaisJogos: value })}
              >
                <div className="space-y-3">
                  {["Sim", "Não", "Prefiro não dizer"].map((opcao) => (
                    <div key={opcao} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-emerald-200 transition-colors">
                      <RadioGroupItem value={opcao} id={opcao} />
                      <Label htmlFor={opcao} className="cursor-pointer flex-1">{opcao}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {perguntaNumero === 4 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">
                Você já tentou esconder ou mentir sobre o tempo ou dinheiro que gasta com jogos?
              </Label>
              <RadioGroup
                value={dados.escondeuJogos}
                onValueChange={(value) => setDados({ ...dados, escondeuJogos: value })}
              >
                <div className="space-y-3">
                  {["Sim", "Não"].map((opcao) => (
                    <div key={opcao} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-emerald-200 transition-colors">
                      <RadioGroupItem value={opcao} id={opcao} />
                      <Label htmlFor={opcao} className="cursor-pointer flex-1">{opcao}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      );
    }

    // SEÇÃO CELULAR
    if (pergunta.tipo === "celular") {
      const perguntaNumero = parseInt(pergunta.id.split("-")[1]);
      
      return (
        <div className="space-y-6">
          {perguntaNumero === 1 && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Sobre o Uso do Celular</h2>
                  <p className="text-gray-600">Vamos entender melhor seu uso</p>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-900">
                  Você sente ansiedade ou irritação quando está longe do celular?
                </Label>
                <RadioGroup
                  value={dados.ansiedadeCelular}
                  onValueChange={(value) => setDados({ ...dados, ansiedadeCelular: value })}
                >
                  <div className="space-y-3">
                    {["Sim", "Não", "Às vezes"].map((opcao) => (
                      <div key={opcao} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-emerald-200 transition-colors">
                        <RadioGroupItem value={opcao} id={opcao} />
                        <Label htmlFor={opcao} className="cursor-pointer flex-1">{opcao}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          {perguntaNumero === 2 && (
            <div>
              <Label className="text-lg font-semibold text-gray-900 mb-3 block">
                Quantas horas por dia, em média, você passa no celular (fora do trabalho)?
              </Label>
              <Input
                type="number"
                placeholder="Ex: 6"
                value={dados.horasPorDiaCelular || ""}
                onChange={(e) => setDados({ ...dados, horasPorDiaCelular: Number(e.target.value) })}
                className="text-lg"
              />
            </div>
          )}

          {perguntaNumero === 3 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">
                Você sente que o uso do celular está atrapalhando seu sono, suas relações ou sua produtividade?
              </Label>
              <RadioGroup
                value={dados.atrapalhaCelular}
                onValueChange={(value) => setDados({ ...dados, atrapalhaCelular: value })}
              >
                <div className="space-y-3">
                  {["Sim", "Não", "Um pouco"].map((opcao) => (
                    <div key={opcao} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-emerald-200 transition-colors">
                      <RadioGroupItem value={opcao} id={opcao} />
                      <Label htmlFor={opcao} className="cursor-pointer flex-1">{opcao}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {perguntaNumero === 4 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">
                Você já tentou reduzir ou controlar o tempo de uso do celular?
              </Label>
              <RadioGroup
                value={dados.tentouReduzirCelular}
                onValueChange={(value) => setDados({ ...dados, tentouReduzirCelular: value })}
              >
                <div className="space-y-3">
                  {["Sim", "Não", "Já pensei, mas não tentei"].map((opcao) => (
                    <div key={opcao} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-emerald-200 transition-colors">
                      <RadioGroupItem value={opcao} id={opcao} />
                      <Label htmlFor={opcao} className="cursor-pointer flex-1">{opcao}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const podeAvancar = () => {
    const pergunta = perguntas[perguntaAtual];
    
    if (pergunta.id === "vicios") return dados.vicios.length > 0;
    if (pergunta.id === "motivacao") return dados.motivacao !== "";
    if (pergunta.id === "frequenciaPerda") return dados.frequenciaPerda !== "";
    if (pergunta.id === "impactos") return dados.impactos.length > 0;
    if (pergunta.id === "tentativasAnteriores") return dados.tentativasAnteriores !== "";
    
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Pergunta {perguntaAtual + 1} de {totalPerguntas}
              </span>
              <span className="text-sm font-medium text-emerald-600">
                {Math.round(((perguntaAtual + 1) / totalPerguntas) * 100)}% completo
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((perguntaAtual + 1) / totalPerguntas) * 100}%` }}
              />
            </div>
          </div>

          {/* Conteúdo da Pergunta */}
          <Card className="p-6 sm:p-8 mb-8 min-h-[400px] flex flex-col justify-between">
            <div>
              {renderPerguntaAtual()}
            </div>
          </Card>

          {/* Botões de Navegação */}
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={perguntaAnterior}
              disabled={perguntaAtual === 0}
              className="px-6 sm:px-8"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Voltar
            </Button>
            
            <Button
              size="lg"
              onClick={proximaPergunta}
              disabled={!podeAvancar() || loading}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 sm:px-8"
            >
              {loading ? (
                "Salvando..."
              ) : perguntaAtual === totalPerguntas - 1 ? (
                <>
                  Finalizar
                  <CheckCircle2 className="ml-2 w-5 h-5" />
                </>
              ) : (
                <>
                  Próximo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
