import React from 'react';
import { History, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { formatDate, formatNumber } from '../../lib/utils';
import type { TradeLog } from '../../types/trading';

interface TradeHistoryProps {
  trades: TradeLog[];
  title?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

export function TradeHistory({
  trades,
  title = 'Trade History',
  showViewAll = false,
  onViewAll,
}: TradeHistoryProps) {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'filled':
      case 'executed':
        return 'success';
      case 'failed':
      case 'rejected':
        return 'danger';
      case 'pending':
      case 'new':
        return 'warning';
      case 'cancelled':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5 text-slate-400" />
          {title}
        </CardTitle>
        {showViewAll && onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            View All
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </CardHeader>
      <CardContent>
        {trades.length === 0 ? (
          <div className="text-center py-8">
            <History className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No trades yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {trades.map((trade) => (
              <div
                key={trade.id}
                className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    trade.side === 'BUY' 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {trade.side === 'BUY' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{trade.symbol}</span>
                      <Badge variant={trade.side === 'BUY' ? 'buy' : 'sell'} className="text-xs">
                        {trade.side}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-400">
                      {formatNumber(trade.quantity)} @ ${formatNumber(trade.price || 0)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={getStatusVariant(trade.status)}>
                    {trade.status}
                  </Badge>
                  <div className="text-xs text-slate-500 mt-1">
                    {formatDate(trade.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TradeHistory;
