import { supabase } from '../supabase';
import type { ExchangeConfig, TradingParams, TradeLog, PerformanceStats, ExchangeConfigForm, TradingParamsForm } from '../../types/trading';

// Exchange Configuration
export async function getExchangeConfig(userId: string): Promise<ExchangeConfig | null> {
  const { data, error } = await supabase
    .from('exchange_configs')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching exchange config:', error);
  }
  return data;
}

export async function saveExchangeConfig(
  userId: string,
  config: ExchangeConfigForm
): Promise<ExchangeConfig | null> {
  // In production, encrypt API keys before storing
  const { data, error } = await supabase
    .from('exchange_configs')
    .upsert({
      user_id: userId,
      exchange: config.exchange,
      api_key_encrypted: config.api_key, // Should be encrypted
      api_secret_encrypted: config.api_secret, // Should be encrypted
      is_testnet: config.is_testnet,
      status: 'active',
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving exchange config:', error);
    throw error;
  }
  return data;
}

export async function deleteExchangeConfig(userId: string): Promise<void> {
  const { error } = await supabase
    .from('exchange_configs')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Error deleting exchange config:', error);
    throw error;
  }
}

export async function verifyExchangeConfig(userId: string): Promise<boolean> {
  // Call edge function to verify API keys
  const { data, error } = await supabase.functions.invoke('supabase-functions-verify-exchange', {
    body: { user_id: userId },
  });

  if (error) {
    console.error('Error verifying exchange:', error);
    return false;
  }
  return data?.valid || false;
}

// Trading Parameters
export async function getTradingParams(userId: string): Promise<TradingParams | null> {
  const { data, error } = await supabase
    .from('trading_params')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching trading params:', error);
  }
  return data;
}

export async function saveTradingParams(
  userId: string,
  params: TradingParamsForm
): Promise<TradingParams | null> {
  const { data, error } = await supabase
    .from('trading_params')
    .upsert({
      user_id: userId,
      ...params,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving trading params:', error);
    throw error;
  }
  return data;
}

// Trade Logs
export async function getTradeLogs(userId: string, limit = 100): Promise<TradeLog[]> {
  const { data, error } = await supabase
    .from('trade_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching trade logs:', error);
    return [];
  }
  return data || [];
}

export async function createTradeLog(log: Omit<TradeLog, 'id' | 'created_at'>): Promise<TradeLog | null> {
  const { data, error } = await supabase
    .from('trade_logs')
    .insert(log)
    .select()
    .single();

  if (error) {
    console.error('Error creating trade log:', error);
    throw error;
  }
  return data;
}

// Performance Stats
export async function getPerformanceStats(
  userId: string,
  days = 30
): Promise<PerformanceStats[]> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('performance_stats')
    .select('*')
    .eq('user_id', userId)
    .gte('date', startDate.toISOString().split('T')[0])
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching performance stats:', error);
    return [];
  }
  return data || [];
}

export async function getProviderPerformanceStats(
  providerId: string,
  days = 30
): Promise<PerformanceStats[]> {
  return getPerformanceStats(providerId, days);
}

// Execute Trade via Edge Function
export async function executeTrade(
  userId: string,
  signalId: string
): Promise<{ success: boolean; orderId?: string; error?: string }> {
  const { data, error } = await supabase.functions.invoke('supabase-functions-execute-trade', {
    body: { user_id: userId, signal_id: signalId },
  });

  if (error) {
    console.error('Error executing trade:', error);
    return { success: false, error: error.message };
  }
  return data;
}

// Get account balance from exchange
export async function getAccountBalance(userId: string): Promise<{
  totalBalance: number;
  availableBalance: number;
  positions: Array<{ symbol: string; size: number; pnl: number }>;
} | null> {
  const { data, error } = await supabase.functions.invoke('supabase-functions-get-balance', {
    body: { user_id: userId },
  });

  if (error) {
    console.error('Error fetching balance:', error);
    return null;
  }
  return data;
}
