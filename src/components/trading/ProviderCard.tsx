import React from 'react';
import { User, CheckCircle, TrendingUp, Users, Signal, Star } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { formatNumber } from '../../lib/utils';
import type { Profile } from '../../types/trading';

interface ProviderCardProps {
  provider: Profile;
  isSubscribed?: boolean;
  onSubscribe?: (providerId: string) => void;
  onUnsubscribe?: (providerId: string) => void;
  onViewProfile?: (providerId: string) => void;
  isLoading?: boolean;
}

export function ProviderCard({
  provider,
  isSubscribed = false,
  onSubscribe,
  onUnsubscribe,
  onViewProfile,
  isLoading = false,
}: ProviderCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:border-slate-600">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center flex-shrink-0">
            {provider.avatar_url ? (
              <img src={provider.avatar_url} alt="" className="w-14 h-14 rounded-full object-cover" />
            ) : (
              <User className="w-7 h-7 text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-white truncate">
                {provider.full_name || 'Anonymous Trader'}
              </h3>
              {provider.is_verified && (
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              )}
            </div>
            {provider.bio && (
              <p className="text-sm text-slate-400 line-clamp-2">{provider.bio}</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-900/50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-400 mb-1">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-lg font-bold text-white">
              {formatNumber(provider.win_rate)}%
            </div>
            <div className="text-xs text-slate-400">Win Rate</div>
          </div>
          
          <div className="bg-slate-900/50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
              <Signal className="w-4 h-4" />
            </div>
            <div className="text-lg font-bold text-white">
              {provider.total_signals}
            </div>
            <div className="text-xs text-slate-400">Signals</div>
          </div>
          
          <div className="bg-slate-900/50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-lg font-bold text-white">
              {provider.total_subscribers}
            </div>
            <div className="text-xs text-slate-400">Subscribers</div>
          </div>
        </div>

        {/* Profit Factor */}
        {provider.profit_factor > 0 && (
          <div className="flex items-center justify-between mb-4 p-2 bg-slate-900/30 rounded-lg">
            <span className="text-sm text-slate-400">Profit Factor</span>
            <Badge variant={provider.profit_factor >= 1.5 ? 'success' : 'warning'}>
              {formatNumber(provider.profit_factor)}
            </Badge>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {isSubscribed ? (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onUnsubscribe?.(provider.id)}
              isLoading={isLoading}
            >
              Unsubscribe
            </Button>
          ) : (
            <Button
              className="flex-1"
              onClick={() => onSubscribe?.(provider.id)}
              isLoading={isLoading}
            >
              Subscribe
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={() => onViewProfile?.(provider.id)}
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProviderCard;
