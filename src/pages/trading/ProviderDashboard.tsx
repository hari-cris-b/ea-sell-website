import React, { useState, useEffect } from 'react';
import { Signal, Users, TrendingUp, Plus, History, BarChart3 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { CreateSignalForm } from '../../components/trading/CreateSignalForm';
import { SignalCard } from '../../components/trading/SignalCard';
import { StatsCards } from '../../components/trading/StatsCards';
import { PerformanceChart } from '../../components/trading/PerformanceChart';
import { useAuthStore } from '../../store/authStore';
import { getProviderSignals, createSignal, closeSignal } from '../../lib/api/signals';
import { getProviderSubscribers } from '../../lib/api/subscriptions';
import { getPerformanceStats } from '../../lib/api/trading';
import { formatDate, formatNumber } from '../../lib/utils';
import type { Signal as SignalType, Subscription, PerformanceStats, CreateSignalForm as SignalFormData } from '../../types/trading';

export function ProviderDashboard() {
  const { profile } = useAuthStore();
  const [signals, setSignals] = useState<SignalType[]>([]);
  const [subscribers, setSubscribers] = useState<Subscription[]>([]);
  const [stats, setStats] = useState<PerformanceStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (profile?.id) {
      loadData();
    }
  }, [profile?.id]);

  const loadData = async () => {
    if (!profile?.id) return;
    setIsLoading(true);
    try {
      const [signalsData, subscribersData, statsData] = await Promise.all([
        getProviderSignals(profile.id),
        getProviderSubscribers(profile.id),
        getPerformanceStats(profile.id, 30),
      ]);
      setSignals(signalsData);
      setSubscribers(subscribersData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSignal = async (formData: SignalFormData) => {
    if (!profile?.id) return;
    setIsCreating(true);
    try {
      await createSignal(profile.id, formData);
      await loadData();
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating signal:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCloseSignal = async (signalId: string, result: 'win' | 'loss' | 'breakeven', pnl: number) => {
    try {
      await closeSignal(signalId, result, pnl);
      await loadData();
    } catch (error) {
      console.error('Error closing signal:', error);
    }
  };

  const activeSignals = signals.filter(s => s.status === 'active');
  const closedSignals = signals.filter(s => s.status === 'closed');
  const totalPnl = closedSignals.reduce((sum, s) => sum + (s.pnl_percent || 0), 0);
  const wins = closedSignals.filter(s => s.result === 'win').length;
  const winRate = closedSignals.length > 0 ? (wins / closedSignals.length) * 100 : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Provider Dashboard</h1>
            <p className="text-slate-400">Manage your signals and track performance</p>
          </div>
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            <Plus className="w-4 h-4 mr-2" />
            New Signal
          </Button>
        </div>

        {/* Stats */}
        <StatsCards
          totalPnl={totalPnl * 100}
          totalPnlPercent={totalPnl}
          winRate={winRate}
          totalTrades={closedSignals.length}
          openPositions={activeSignals.length}
        />

        {/* Create Signal Form */}
        {showCreateForm && (
          <CreateSignalForm onSubmit={handleCreateSignal} isLoading={isCreating} />
        )}

        {/* Main Content */}
        <Tabs defaultValue="signals">
          <TabsList>
            <TabsTrigger value="signals">
              <Signal className="w-4 h-4 mr-2" />
              Active Signals ({activeSignals.length})
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="subscribers">
              <Users className="w-4 h-4 mr-2" />
              Subscribers ({subscribers.length})
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signals">
            {activeSignals.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Signal className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Active Signals</h3>
                  <p className="text-slate-400 mb-4">Create your first signal to start sharing with subscribers</p>
                  <Button onClick={() => setShowCreateForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Signal
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeSignals.map(signal => (
                  <SignalCard
                    key={signal.id}
                    signal={signal}
                    showProvider={false}
                    onViewDetails={(id) => console.log('View details:', id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Signal History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {closedSignals.length === 0 ? (
                    <p className="text-slate-400 text-center py-8">No closed signals yet</p>
                  ) : (
                    closedSignals.map(signal => (
                      <div
                        key={signal.id}
                        className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant={signal.side === 'BUY' ? 'buy' : 'sell'}>
                            {signal.side}
                          </Badge>
                          <span className="font-medium text-white">{signal.symbol}</span>
                          <span className="text-sm text-slate-400">
                            {formatDate(signal.closed_at || signal.created_at)}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              signal.result === 'win' ? 'success' :
                              signal.result === 'loss' ? 'danger' : 'warning'
                            }
                          >
                            {signal.result?.toUpperCase()}
                          </Badge>
                          <span className={`font-semibold ${
                            (signal.pnl_percent || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'
                          }`}>
                            {(signal.pnl_percent || 0) >= 0 ? '+' : ''}{formatNumber(signal.pnl_percent || 0)}%
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscribers">
            <Card>
              <CardHeader>
                <CardTitle>Your Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                {subscribers.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No subscribers yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {subscribers.map(sub => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                            <Users className="w-5 h-5 text-slate-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">Subscriber</p>
                            <p className="text-sm text-slate-400">
                              Since {formatDate(sub.created_at)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={sub.auto_trade ? 'success' : 'outline'}>
                            {sub.auto_trade ? 'Auto-Trade' : 'Manual'}
                          </Badge>
                          <Badge variant={sub.status === 'active' ? 'success' : 'warning'}>
                            {sub.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <PerformanceChart stats={stats} title="Your Performance" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ProviderDashboard;
