import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Send } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import type { CreateSignalForm as SignalFormData, SignalSide, OrderType } from '../../types/trading';

interface CreateSignalFormProps {
  onSubmit: (signal: SignalFormData) => Promise<void>;
  isLoading?: boolean;
}

const POPULAR_SYMBOLS = [
  'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT', 'SOLUSDT',
  'ADAUSDT', 'DOGEUSDT', 'AVAXUSDT', 'DOTUSDT', 'MATICUSDT',
];

export function CreateSignalForm({ onSubmit, isLoading = false }: CreateSignalFormProps) {
  const [formData, setFormData] = useState<SignalFormData>({
    symbol: 'BTCUSDT',
    side: 'BUY',
    order_type: 'MARKET',
    leverage: 1,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof SignalFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.symbol) {
      newErrors.symbol = 'Symbol is required';
    }
    
    if (formData.order_type === 'LIMIT' && !formData.entry_price) {
      newErrors.entry_price = 'Entry price required for limit orders';
    }
    
    if (formData.stop_loss && formData.entry_price) {
      if (formData.side === 'BUY' && formData.stop_loss >= formData.entry_price) {
        newErrors.stop_loss = 'Stop loss must be below entry for BUY';
      }
      if (formData.side === 'SELL' && formData.stop_loss <= formData.entry_price) {
        newErrors.stop_loss = 'Stop loss must be above entry for SELL';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5 text-emerald-400" />
          Create New Signal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Symbol Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Trading Pair
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {POPULAR_SYMBOLS.slice(0, 5).map(symbol => (
                <button
                  key={symbol}
                  type="button"
                  onClick={() => handleChange('symbol', symbol)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    formData.symbol === symbol
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {symbol}
                </button>
              ))}
            </div>
            <Input
              value={formData.symbol}
              onChange={(e) => handleChange('symbol', e.target.value.toUpperCase())}
              placeholder="Enter symbol (e.g., BTCUSDT)"
              error={errors.symbol}
            />
          </div>

          {/* Side Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Direction
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleChange('side', 'BUY')}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  formData.side === 'BUY'
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                    : 'border-slate-600 text-slate-400 hover:border-slate-500'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">BUY / LONG</span>
              </button>
              <button
                type="button"
                onClick={() => handleChange('side', 'SELL')}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  formData.side === 'SELL'
                    ? 'border-red-500 bg-red-500/20 text-red-400'
                    : 'border-slate-600 text-slate-400 hover:border-slate-500'
                }`}
              >
                <TrendingDown className="w-5 h-5" />
                <span className="font-semibold">SELL / SHORT</span>
              </button>
            </div>
          </div>

          {/* Order Type & Entry */}
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Order Type"
              value={formData.order_type}
              onChange={(e) => handleChange('order_type', e.target.value as OrderType)}
              options={[
                { value: 'MARKET', label: 'Market' },
                { value: 'LIMIT', label: 'Limit' },
              ]}
            />
            <Input
              label="Entry Price"
              type="number"
              step="any"
              value={formData.entry_price || ''}
              onChange={(e) => handleChange('entry_price', parseFloat(e.target.value) || undefined)}
              placeholder={formData.order_type === 'MARKET' ? 'Market price' : 'Enter price'}
              error={errors.entry_price}
            />
          </div>

          {/* Take Profits */}
          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Take Profit 1"
              type="number"
              step="any"
              value={formData.take_profit_1 || ''}
              onChange={(e) => handleChange('take_profit_1', parseFloat(e.target.value) || undefined)}
              placeholder="TP 1"
            />
            <Input
              label="Take Profit 2"
              type="number"
              step="any"
              value={formData.take_profit_2 || ''}
              onChange={(e) => handleChange('take_profit_2', parseFloat(e.target.value) || undefined)}
              placeholder="TP 2"
            />
            <Input
              label="Take Profit 3"
              type="number"
              step="any"
              value={formData.take_profit_3 || ''}
              onChange={(e) => handleChange('take_profit_3', parseFloat(e.target.value) || undefined)}
              placeholder="TP 3"
            />
          </div>

          {/* Stop Loss & Leverage */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Stop Loss"
              type="number"
              step="any"
              value={formData.stop_loss || ''}
              onChange={(e) => handleChange('stop_loss', parseFloat(e.target.value) || undefined)}
              placeholder="Stop loss price"
              error={errors.stop_loss}
            />
            <Input
              label="Leverage"
              type="number"
              min="1"
              max="125"
              value={formData.leverage || 1}
              onChange={(e) => handleChange('leverage', parseInt(e.target.value) || 1)}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Add analysis or notes for subscribers..."
              className="w-full h-20 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
          >
            <Send className="w-4 h-4 mr-2" />
            Publish Signal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default CreateSignalForm;
