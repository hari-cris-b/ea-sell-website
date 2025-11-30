import React, { useEffect, useState } from 'react';
import { Signal, RefreshCw, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { SignalCard } from './SignalCard';
import { supabase } from '../../lib/supabase';
import type { Signal as SignalType } from '../../types/trading';

interface SignalFeedProps {
  signals: SignalType[];
  onExecute?: (signalId: string) => void;
  onRefresh?: () => void;
  isLoading?: boolean;
  executingSignal?: string | null;
}

export function SignalFeed({
  signals,
  onExecute,
  onRefresh,
  isLoading = false,
  executingSignal = null,
}: SignalFeedProps) {
  const [filter, setFilter] = useState<'all' | 'BUY' | 'SELL'>('all');
  const [realtimeSignals, setRealtimeSignals] = useState<SignalType[]>(signals);

  useEffect(() => {
    setRealtimeSignals(signals);
  }, [signals]);

  // Subscribe to real-time signal updates
  useEffect(() => {
    const channel = supabase
      .channel('signals-feed')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'signals',
        },
        (payload) => {
          const newSignal = payload.new as SignalType;
          setRealtimeSignals((prev) => [newSignal, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'signals',
        },
        (payload) => {
          const updatedSignal = payload.new as SignalType;
          setRealtimeSignals((prev) =>
            prev.map((s) => (s.id === updatedSignal.id ? updatedSignal : s))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredSignals = realtimeSignals.filter((signal) => {
    if (filter === 'all') return true;
    return signal.side === filter;
  });

  const activeSignals = filteredSignals.filter((s) => s.status === 'active');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Signal className="w-5 h-5 text-emerald-400" />
          Live Signals
          {activeSignals.length > 0 && (
            <Badge variant="success" className="ml-2">
              {activeSignals.length} Active
            </Badge>
          )}
        </CardTitle>
        <div className="flex items-center gap-2">
          {/* Filter Buttons */}
          <div className="flex rounded-lg bg-slate-800 p-1">
            {(['all', 'BUY', 'SELL'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  filter === f
                    ? f === 'BUY'
                      ? 'bg-emerald-600 text-white'
                      : f === 'SELL'
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
          {onRefresh && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {activeSignals.length === 0 ? (
          <div className="text-center py-12">
            <Signal className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Active Signals</h3>
            <p className="text-slate-400 text-sm">
              {filter !== 'all'
                ? `No ${filter} signals at the moment`
                : 'Subscribe to providers to receive signals'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {activeSignals.map((signal) => (
              <SignalCard
                key={signal.id}
                signal={signal}
                onExecute={onExecute}
                isExecuting={executingSignal === signal.id}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SignalFeed;
