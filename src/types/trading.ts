// Trading Platform Types

export type UserRole = 'provider' | 'receiver' | 'admin';
export type SignalSide = 'BUY' | 'SELL';
export type OrderType = 'MARKET' | 'LIMIT';
export type SignalStatus = 'active' | 'closed' | 'cancelled';
export type SignalResult = 'win' | 'loss' | 'breakeven' | null;
export type ExecutionStatus = 'pending' | 'executed' | 'failed' | 'cancelled' | 'partial';
export type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'expired';
export type ExchangeStatus = 'active' | 'inactive' | 'error';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  bio: string | null;
  is_verified: boolean;
  total_subscribers: number;
  total_signals: number;
  win_rate: number;
  profit_factor: number;
  created_at: string;
  updated_at: string;
}

export interface ExchangeConfig {
  id: string;
  user_id: string;
  exchange: 'binance' | 'binance_futures';
  api_key_encrypted: string;
  api_secret_encrypted: string;
  is_testnet: boolean;
  status: ExchangeStatus;
  last_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Signal {
  id: string;
  provider_id: string;
  symbol: string;
  side: SignalSide;
  order_type: OrderType;
  entry_price: number | null;
  take_profit_1: number | null;
  take_profit_2: number | null;
  take_profit_3: number | null;
  stop_loss: number | null;
  leverage: number;
  risk_reward_ratio: number | null;
  notes: string | null;
  status: SignalStatus;
  result: SignalResult;
  pnl_percent: number | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  provider?: Profile;
}

export interface UserSignal {
  id: string;
  user_id: string;
  signal_id: string;
  exchange_order_id: string | null;
  execution_status: ExecutionStatus;
  executed_price: number | null;
  executed_quantity: number | null;
  pnl: number | null;
  pnl_percent: number | null;
  error_message: string | null;
  executed_at: string | null;
  created_at: string;
  updated_at: string;
  signal?: Signal;
}

export interface Subscription {
  id: string;
  user_id: string;
  provider_id: string;
  status: SubscriptionStatus;
  auto_trade: boolean;
  subscription_type: 'free' | 'basic' | 'premium';
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  provider?: Profile;
}

export interface TradingParams {
  id: string;
  user_id: string;
  risk_per_trade: number;
  max_drawdown: number;
  max_trades_per_day: number;
  position_size_type: 'percentage' | 'fixed';
  fixed_position_size: number | null;
  use_take_profit: boolean;
  use_stop_loss: boolean;
  execution_type: 'market' | 'limit';
  auto_trade_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface TradeLog {
  id: string;
  user_id: string;
  signal_id: string | null;
  exchange: string;
  symbol: string;
  side: string;
  order_type: string;
  quantity: number;
  price: number | null;
  status: string;
  exchange_order_id: string | null;
  exchange_response: Record<string, unknown> | null;
  error_message: string | null;
  created_at: string;
}

export interface PerformanceStats {
  id: string;
  user_id: string;
  date: string;
  total_trades: number;
  winning_trades: number;
  losing_trades: number;
  total_pnl: number;
  total_pnl_percent: number;
  max_drawdown: number;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'signal' | 'trade' | 'subscription' | 'system';
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  is_read: boolean;
  created_at: string;
}

// Form types
export interface CreateSignalForm {
  symbol: string;
  side: SignalSide;
  order_type: OrderType;
  entry_price?: number;
  take_profit_1?: number;
  take_profit_2?: number;
  take_profit_3?: number;
  stop_loss?: number;
  leverage?: number;
  notes?: string;
}

export interface ExchangeConfigForm {
  exchange: 'binance' | 'binance_futures';
  api_key: string;
  api_secret: string;
  is_testnet: boolean;
}

export interface TradingParamsForm {
  risk_per_trade: number;
  max_drawdown: number;
  max_trades_per_day: number;
  position_size_type: 'percentage' | 'fixed';
  fixed_position_size?: number;
  use_take_profit: boolean;
  use_stop_loss: boolean;
  execution_type: 'market' | 'limit';
  auto_trade_enabled: boolean;
}
