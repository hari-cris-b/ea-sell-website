import React, { useState, useEffect } from 'react';
import { Settings, Shield, Zap, AlertTriangle, Save, Key, Eye, EyeOff } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Switch } from '../ui/switch';
import type { TradingParamsForm, ExchangeConfigForm } from '../../types/trading';

interface TradingSettingsProps {
  tradingParams?: TradingParamsForm;
  exchangeConfig?: { exchange: string; is_testnet: boolean; status: string } | null;
  onSaveTradingParams: (params: TradingParamsForm) => Promise<void>;
  onSaveExchangeConfig: (config: ExchangeConfigForm) => Promise<void>;
  onVerifyExchange: () => Promise<boolean>;
  isLoading?: boolean;
}

export function TradingSettings({
  tradingParams,
  exchangeConfig,
  onSaveTradingParams,
  onSaveExchangeConfig,
  onVerifyExchange,
  isLoading = false,
}: TradingSettingsProps) {
  const [params, setParams] = useState<TradingParamsForm>({
    risk_per_trade: 1,
    max_drawdown: 10,
    max_trades_per_day: 10,
    position_size_type: 'percentage',
    use_take_profit: true,
    use_stop_loss: true,
    execution_type: 'market',
    auto_trade_enabled: false,
  });

  const [exchange, setExchange] = useState<ExchangeConfigForm>({
    exchange: 'binance',
    api_key: '',
    api_secret: '',
    is_testnet: true,
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [showApiSecret, setShowApiSecret] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (tradingParams) {
      setParams(tradingParams);
    }
  }, [tradingParams]);

  useEffect(() => {
    if (exchangeConfig) {
      setExchange(prev => ({
        ...prev,
        exchange: exchangeConfig.exchange as 'binance' | 'binance_futures',
        is_testnet: exchangeConfig.is_testnet,
      }));
    }
  }, [exchangeConfig]);

  const handleParamChange = (field: keyof TradingParamsForm, value: unknown) => {
    setParams(prev => ({ ...prev, [field]: value }));
  };

  const handleExchangeChange = (field: keyof ExchangeConfigForm, value: unknown) => {
    setExchange(prev => ({ ...prev, [field]: value }));
  };

  const handleVerify = async () => {
    setVerifying(true);
    try {
      await onVerifyExchange();
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Exchange Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            Exchange Connection
          </CardTitle>
          <CardDescription>
            Connect your Binance account to enable auto-trading
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
              <div className="text-sm text-amber-200">
                <p className="font-medium">Security Notice</p>
                <p className="text-amber-300/80">
                  Only enable trading permissions. Never enable withdrawal permissions.
                </p>
              </div>
            </div>
          </div>

          <Select
            label="Exchange"
            value={exchange.exchange}
            onChange={(e) => handleExchangeChange('exchange', e.target.value)}
            options={[
              { value: 'binance', label: 'Binance Spot' },
              { value: 'binance_futures', label: 'Binance Futures' },
            ]}
          />

          <div className="relative">
            <Input
              label="API Key"
              type={showApiKey ? 'text' : 'password'}
              value={exchange.api_key}
              onChange={(e) => handleExchangeChange('api_key', e.target.value)}
              placeholder="Enter your API key"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-9 text-slate-400 hover:text-slate-300"
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="relative">
            <Input
              label="API Secret"
              type={showApiSecret ? 'text' : 'password'}
              value={exchange.api_secret}
              onChange={(e) => handleExchangeChange('api_secret', e.target.value)}
              placeholder="Enter your API secret"
            />
            <button
              type="button"
              onClick={() => setShowApiSecret(!showApiSecret)}
              className="absolute right-3 top-9 text-slate-400 hover:text-slate-300"
            >
              {showApiSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Switch
              checked={exchange.is_testnet}
              onCheckedChange={(checked) => handleExchangeChange('is_testnet', checked)}
              label="Use Testnet (Recommended for testing)"
            />
          </div>

          {exchangeConfig && (
            <div className={`p-2 rounded-lg text-sm ${
              exchangeConfig.status === 'active' 
                ? 'bg-emerald-500/10 text-emerald-400' 
                : 'bg-red-500/10 text-red-400'
            }`}>
              Status: {exchangeConfig.status === 'active' ? 'Connected' : 'Error'}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={() => onSaveExchangeConfig(exchange)}
              isLoading={isLoading}
              disabled={!exchange.api_key || !exchange.api_secret}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Connection
            </Button>
            <Button
              variant="outline"
              onClick={handleVerify}
              isLoading={verifying}
              disabled={!exchangeConfig}
            >
              Verify Connection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Risk Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Risk Management
          </CardTitle>
          <CardDescription>
            Configure your risk parameters for auto-trading
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Risk Per Trade (%)"
              type="number"
              min="0.1"
              max="10"
              step="0.1"
              value={params.risk_per_trade}
              onChange={(e) => handleParamChange('risk_per_trade', parseFloat(e.target.value))}
            />
            <Input
              label="Max Drawdown (%)"
              type="number"
              min="1"
              max="50"
              step="1"
              value={params.max_drawdown}
              onChange={(e) => handleParamChange('max_drawdown', parseFloat(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Max Trades Per Day"
              type="number"
              min="1"
              max="100"
              value={params.max_trades_per_day}
              onChange={(e) => handleParamChange('max_trades_per_day', parseInt(e.target.value))}
            />
            <Select
              label="Position Size Type"
              value={params.position_size_type}
              onChange={(e) => handleParamChange('position_size_type', e.target.value)}
              options={[
                { value: 'percentage', label: 'Percentage of Balance' },
                { value: 'fixed', label: 'Fixed Amount' },
              ]}
            />
          </div>

          {params.position_size_type === 'fixed' && (
            <Input
              label="Fixed Position Size (USDT)"
              type="number"
              min="1"
              value={params.fixed_position_size || ''}
              onChange={(e) => handleParamChange('fixed_position_size', parseFloat(e.target.value))}
            />
          )}

          <div className="space-y-3 pt-2">
            <Switch
              checked={params.use_take_profit}
              onCheckedChange={(checked) => handleParamChange('use_take_profit', checked)}
              label="Use Take Profit from signals"
            />
            <Switch
              checked={params.use_stop_loss}
              onCheckedChange={(checked) => handleParamChange('use_stop_loss', checked)}
              label="Use Stop Loss from signals"
            />
          </div>

          <Select
            label="Execution Type"
            value={params.execution_type}
            onChange={(e) => handleParamChange('execution_type', e.target.value)}
            options={[
              { value: 'market', label: 'Market Order (Instant)' },
              { value: 'limit', label: 'Limit Order (At signal price)' },
            ]}
          />
        </CardContent>
      </Card>

      {/* Auto Trading */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            Auto Trading
          </CardTitle>
          <CardDescription>
            Enable automatic trade execution for subscribed signals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-slate-900/50 rounded-lg">
            <Switch
              checked={params.auto_trade_enabled}
              onCheckedChange={(checked) => handleParamChange('auto_trade_enabled', checked)}
              label="Enable Auto Trading"
            />
            <p className="text-xs text-slate-400 mt-2">
              When enabled, signals from your subscribed providers will be automatically executed
              based on your risk settings.
            </p>
          </div>

          <Button
            onClick={() => onSaveTradingParams(params)}
            isLoading={isLoading}
            className="w-full"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default TradingSettings;
