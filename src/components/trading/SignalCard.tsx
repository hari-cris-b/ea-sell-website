import React from 'react';
import { TrendingUp, TrendingDown, Clock, Target, Shield, User, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { cn, formatNumber, getTimeAgo } from '../../lib/utils';
import type { Signal } from '../../types/trading';

interface SignalCardProps {
  signal: Signal;
  onExecute?: (signalId: string) => void;
  onViewDetails?: (signalId: string) => void;
  showProvider?: boolean;
  isExecuting?: boolean;
}

export function SignalCard({
  signal,
  onExecute,
  onViewDetails,
  showProvider = true,
  isExecuting = false,
}: SignalCardProps) {
  const isBuy = signal.side === 'BUY';
  const provider = signal.provider;

  return (
    <Card className="overflow-hidden transition-all hover:border-slate-600">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant={isBuy ? 'buy' : 'sell'} className="text-xs">
              {isBuy ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {signal.side}
            </Badge>
            <span className="text-lg font-bold text-white">{signal.symbol}</span>
            {signal.leverage > 1 && (
              <Badge variant="warning" className="text-xs">
                {signal.leverage}x
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="w-3 h-3" />
            {getTimeAgo(signal.created_at)}
          </div>
        </div>

        {/* Provider Info */}
        {showProvider && provider && (
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-700">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              {provider.avatar_url ? (
                <img src={provider.avatar_url} alt="" className="w-8 h-8 rounded-full" />
              ) : (
                <User className="w-4 h-4 text-slate-400" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-white">
                  {provider.full_name || 'Anonymous'}
                </span>
                {provider.is_verified && (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>
              <span className="text-xs text-slate-400">
                {formatNumber(provider.win_rate)}% Win Rate
              </span>
            </div>
          </div>
        )}

        {/* Price Levels */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-900/50 rounded-lg p-2">
            <div className="text-xs text-slate-400 mb-1">Entry</div>
            <div className="text-sm font-semibold text-white">
              {signal.entry_price ? formatNumber(signal.entry_price, 4) : 'Market'}
            </div>
          </div>
          
          {signal.stop_loss && (
            <div className="bg-red-500/10 rounded-lg p-2">
              <div className="flex items-center gap-1 text-xs text-red-400 mb-1">
                <Shield className="w-3 h-3" />
                Stop Loss
              </div>
              <div className="text-sm font-semibold text-red-400">
                {formatNumber(signal.stop_loss, 4)}
              </div>
            </div>
          )}
          
          {signal.take_profit_1 && (
            <div className="bg-emerald-500/10 rounded-lg p-2">
              <div className="flex items-center gap-1 text-xs text-emerald-400 mb-1">
                <Target className="w-3 h-3" />
                TP 1
              </div>
              <div className="text-sm font-semibold text-emerald-400">
                {formatNumber(signal.take_profit_1, 4)}
              </div>
            </div>
          )}
          
          {signal.take_profit_2 && (
            <div className="bg-emerald-500/10 rounded-lg p-2">
              <div className="flex items-center gap-1 text-xs text-emerald-400 mb-1">
                <Target className="w-3 h-3" />
                TP 2
              </div>
              <div className="text-sm font-semibold text-emerald-400">
                {formatNumber(signal.take_profit_2, 4)}
              </div>
            </div>
          )}
        </div>

        {/* Notes */}
        {signal.notes && (
          <p className="text-xs text-slate-400 mb-4 line-clamp-2">{signal.notes}</p>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {onExecute && (
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onExecute(signal.id)}
              isLoading={isExecuting}
              variant={isBuy ? 'default' : 'destructive'}
            >
              Execute Trade
            </Button>
          )}
          {onViewDetails && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewDetails(signal.id)}
            >
              Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default SignalCard;
