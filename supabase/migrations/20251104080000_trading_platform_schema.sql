-- TradeSignalApp Database Schema

-- User profiles with role selection
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'receiver' CHECK (role IN ('provider', 'receiver', 'admin')),
  avatar_url TEXT,
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  total_subscribers INTEGER DEFAULT 0,
  total_signals INTEGER DEFAULT 0,
  win_rate DECIMAL(5,2) DEFAULT 0,
  profit_factor DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exchange configurations (encrypted API keys)
CREATE TABLE IF NOT EXISTS exchange_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exchange TEXT NOT NULL DEFAULT 'binance' CHECK (exchange IN ('binance', 'binance_futures')),
  api_key_encrypted TEXT NOT NULL,
  api_secret_encrypted TEXT NOT NULL,
  is_testnet BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
  last_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, exchange)
);

-- Trading signals
CREATE TABLE IF NOT EXISTS signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('BUY', 'SELL')),
  order_type TEXT NOT NULL DEFAULT 'MARKET' CHECK (order_type IN ('MARKET', 'LIMIT')),
  entry_price DECIMAL(20,8),
  take_profit_1 DECIMAL(20,8),
  take_profit_2 DECIMAL(20,8),
  take_profit_3 DECIMAL(20,8),
  stop_loss DECIMAL(20,8),
  leverage INTEGER DEFAULT 1,
  risk_reward_ratio DECIMAL(5,2),
  notes TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'cancelled')),
  result TEXT CHECK (result IN ('win', 'loss', 'breakeven', NULL)),
  pnl_percent DECIMAL(10,2),
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User signal executions
CREATE TABLE IF NOT EXISTS user_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  signal_id UUID NOT NULL REFERENCES signals(id) ON DELETE CASCADE,
  exchange_order_id TEXT,
  execution_status TEXT DEFAULT 'pending' CHECK (execution_status IN ('pending', 'executed', 'failed', 'cancelled', 'partial')),
  executed_price DECIMAL(20,8),
  executed_quantity DECIMAL(20,8),
  pnl DECIMAL(20,8),
  pnl_percent DECIMAL(10,2),
  error_message TEXT,
  executed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, signal_id)
);

-- Provider subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'expired')),
  auto_trade BOOLEAN DEFAULT FALSE,
  subscription_type TEXT DEFAULT 'free' CHECK (subscription_type IN ('free', 'basic', 'premium')),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, provider_id)
);

-- Trading parameters per user
CREATE TABLE IF NOT EXISTS trading_params (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  risk_per_trade DECIMAL(5,2) DEFAULT 1.00,
  max_drawdown DECIMAL(5,2) DEFAULT 10.00,
  max_trades_per_day INTEGER DEFAULT 10,
  position_size_type TEXT DEFAULT 'percentage' CHECK (position_size_type IN ('percentage', 'fixed')),
  fixed_position_size DECIMAL(20,8),
  use_take_profit BOOLEAN DEFAULT TRUE,
  use_stop_loss BOOLEAN DEFAULT TRUE,
  execution_type TEXT DEFAULT 'market' CHECK (execution_type IN ('market', 'limit')),
  auto_trade_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trade execution logs
CREATE TABLE IF NOT EXISTS trade_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  signal_id UUID REFERENCES signals(id) ON DELETE SET NULL,
  exchange TEXT NOT NULL,
  symbol TEXT NOT NULL,
  side TEXT NOT NULL,
  order_type TEXT NOT NULL,
  quantity DECIMAL(20,8) NOT NULL,
  price DECIMAL(20,8),
  status TEXT NOT NULL,
  exchange_order_id TEXT,
  exchange_response JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance analytics
CREATE TABLE IF NOT EXISTS performance_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_trades INTEGER DEFAULT 0,
  winning_trades INTEGER DEFAULT 0,
  losing_trades INTEGER DEFAULT 0,
  total_pnl DECIMAL(20,8) DEFAULT 0,
  total_pnl_percent DECIMAL(10,2) DEFAULT 0,
  max_drawdown DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('signal', 'trade', 'subscription', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_signals_provider ON signals(provider_id);
CREATE INDEX IF NOT EXISTS idx_signals_status ON signals(status);
CREATE INDEX IF NOT EXISTS idx_signals_created ON signals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_signals_user ON user_signals(user_id);
CREATE INDEX IF NOT EXISTS idx_user_signals_signal ON user_signals(signal_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_provider ON subscriptions(provider_id);
CREATE INDEX IF NOT EXISTS idx_trade_logs_user ON trade_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_exchange_configs_updated_at ON exchange_configs;
CREATE TRIGGER update_exchange_configs_updated_at BEFORE UPDATE ON exchange_configs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_signals_updated_at ON signals;
CREATE TRIGGER update_signals_updated_at BEFORE UPDATE ON signals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_signals_updated_at ON user_signals;
CREATE TRIGGER update_user_signals_updated_at BEFORE UPDATE ON user_signals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_trading_params_updated_at ON trading_params;
CREATE TRIGGER update_trading_params_updated_at BEFORE UPDATE ON trading_params FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  
  INSERT INTO trading_params (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update provider stats
CREATE OR REPLACE FUNCTION update_provider_stats()
RETURNS TRIGGER AS $$
DECLARE
  total_sigs INTEGER;
  wins INTEGER;
  losses INTEGER;
  win_pct DECIMAL(5,2);
BEGIN
  SELECT COUNT(*), 
         COUNT(*) FILTER (WHERE result = 'win'),
         COUNT(*) FILTER (WHERE result = 'loss')
  INTO total_sigs, wins, losses
  FROM signals
  WHERE provider_id = NEW.provider_id AND status = 'closed';
  
  IF total_sigs > 0 THEN
    win_pct := (wins::DECIMAL / total_sigs) * 100;
  ELSE
    win_pct := 0;
  END IF;
  
  UPDATE profiles
  SET total_signals = total_sigs,
      win_rate = win_pct
  WHERE id = NEW.provider_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_signal_closed ON signals;
CREATE TRIGGER on_signal_closed
  AFTER UPDATE OF status ON signals
  FOR EACH ROW
  WHEN (NEW.status = 'closed')
  EXECUTE FUNCTION update_provider_stats();
