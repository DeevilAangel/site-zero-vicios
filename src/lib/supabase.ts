import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para o banco de dados
export interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface QuizData {
  id: string;
  user_id: string;
  vicios: string[];
  frequencia_perda: string;
  cigarros_por_dia?: number;
  preco_maco?: number;
  gasto_semanal_alcool?: number;
  gasto_mensal_jogos?: number;
  horas_por_dia_celular?: number;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  vicio: string;
  metas_concluidas: number;
  total_metas: number;
  dias_sem_recaida: number;
  economizado?: number;
  tempo_recuperado?: number;
  created_at: string;
  updated_at: string;
}
