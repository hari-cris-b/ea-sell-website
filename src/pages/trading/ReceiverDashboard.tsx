import React, { useState, useEffect } from 'react';
import { Signal, Settings, History, Users, Zap, Wallet } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { SignalCard } from '../../components/trading/SignalCard';
import { ProviderCard } from '../../components/trading/ProviderCard';
import { TradingSettings } from '../../components/trading/TradingSettings';
import { StatsCards } from '../../components/trading/StatsCards';
import { PerformanceChart } from '../../components/trading/PerformanceChart';
import { useAuthStore } from '../../store/authStore';
import { getSubscribedSignals, getUserSignals, createUserSignal } from '../../lib/api/signals';
import { getActiveSubscriptions, subscribe, unsubscribe, toggleAutoTrade } from '../../lib/api/subscriptions';
import { getAllProviders } from '../../lib/api/profiles';
import { getTradingParams, saveTradingParams, getExchangeConfig, saveExchangeConfig, verifyExchangeConfig, executeTrade, getPerformanceStats, getTradeLogs } from '../../lib/api/trading';
import { formatDate, formatNumber } from '../../lib/utils';
import type { Signal as SignalType, Profile, Subscription, TradingParams, ExchangeConfig, PerformanceStats, UserSignal, TradeLog, TradingParamsForm, ExchangeConfigForm } from '../../types/trading';

export function ReceiverDashboard() {
  const { profile } = useAuthStore();
  const [signals, setSignals] = useState<SignalType[]>([]);
  const [userSignals, setUserSignals] = useState<UserSignal[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [providers, setProviders] = useState<Profile[]>([]);
  const [tradingParams, setTradingParams] = useState<TradingParams | null>(null);
  const [exchangeConfig, setExchangeConfig] = useState<ExchangeConfig | null>(null);
  const [stats, setStats] = useState<PerformanceStats[]>([]);
  const [tradeLogs, setTradeLogs] = useState<TradeLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [executingSignal, setExecutingSignal] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.id) {
      loadData();
    }
  }, [profile?.id]);

  const loadData = async () => {
    if (!profile?.id) return;
    setIsLoading(true);
    try {
      const [
        signalsData,
        userSignalsData,
        subscriptionsData,
        providersData,
        paramsData,
        configData,
        statsData,
        logsData,
      ] = await Promise.all([
        getSubscribedSignals(profile.id),
        getUserSignals(profile.id),
        getActiveSubscriptions(profile.id),
        getAllProviders(),
        getTradingParams(profile.id),
        getExchangeConfig(profile.id),
        getPerformanceStats(profile.id, 30),
        getTradeLogs(profile.id, 50),
      ]);
      setSignals(signalsData);
      setUserSignals(userSignalsData);
      setSubscriptions(subscriptionsData);
      setProviders(providersData);
      setTradingParams(paramsData);
      setExchangeConfig(configData);
      setStats(statsData);
      setTradeLogs(logsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExecuteTrade = async (signalId: string) => {
    if (!profile?.id) return;
    setExecutingSignal(signalId);
    try {
      await createUserSignal(profile.id, signalId);
      const result = await executeTrade(profile.id, signalId);
      if (result.success) {
        await loadData();
      } else {
        console.error('Trade execution failed:', result.error);
      }
    } catch (error) {
      console.error('Error executing trade:', error);
    } finally {
      setExecutingSignal(null);
    }
  };

  const handleSubscribe = async (providerId: string) => {
    if (!profile?.id) return;
    try {
      await subscribe(profile.id, providerId);
      await loadData();
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  const handleUnsubscribe = async (providerId: string) => {
    const sub = subscriptions.find(s => s.provider_id === providerId);
    if (!sub) return;
    try {
      await unsubscribe(sub.id);
      await loadData();
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  const handleSaveTradingParams = async (params: TradingParamsForm) => {
    if (!profile?.id) return;
    try {
      await saveTradingParams(profile.id, params);
      await loadData();
    } catch (error) {
      console.error('Error saving params:', error);
    }
  };

  const handleSaveExchangeConfig = async (config: ExchangeConfigForm) => {
    if (!profile?.id) return;
    try {
      await saveExchangeConfig(profile.id, config);
      await loadData();
    } catch (error) {
      console.error('Error saving config:', error);
    }
  };

  const handleVerifyExchange = async (): Promise<boolean> => {
    if (!profile?.id) return false;
    return verifyExchangeConfig(profile.id);
  };

  const subscribedProviderIds = subscriptions.map(s => s.provider_id);
  const totalPnl = userSignals.reduce((sum, us) => sum + (us.pnl || 0), 0);
  const totalPnlPercent = userSignals.reduce((sum, us) => sum + (us.pnl_percent || 0), 0);
  const executedSignals = userSignals.filter(us => us.execution_status === 'executed');
  const wins = executedSignals.filter(us => (us.pnl || 0) > 0).length;
  const winRate = executedSignals.length > 0 ? (wins / executedSignals.length) * 100 : 0;

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
            <h1 className="text-2xl font-bold text-white">Trading Dashboard</h1>
            <p className="text-slate-400">Follow signals and manage your trades</p>
          </div>
          <div className="flex items-center gap-2">
            {exchangeConfig?.status === 'active' ? (
              <Badge variant="success" className="flex items-center gap-1">
                <Wallet className="w-3 h-3" />
                Exchange Connected
              </Badge>
            ) : (
              <Badge variant="warning" className="flex items-center gap-1">
                <Wallet className="w-3 h-3" />
                Connect Exchange
              </Badge>
            )}
            {tradingParams?.auto_trade_enabled && (
              <Badge variant="success" className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Auto-Trade ON
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <StatsCards
          totalPnl={totalPnl}
          totalPnlPercent={totalPnlPercent}
          winRate={winRate}
          totalTrades={executedSignals.length}
          openPositions={userSignals.filter(us => us.execution_status === 'pending').length}
        />

        {/* Main Content */}
        <Tabs defaultValue="signals">
          <TabsList>
            <TabsTrigger value="signals">
              <Signal className="w-4 h-4 mr-2" />
              Live Signals ({signals.length})
            </TabsTrigger>
            <TabsTrigger value="providers">
              <Users className="w-4 h-4 mr-2" />
              Providers
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="w-4 h-4 mr-2" />
              Trade History
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signals">
            {signals.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Signal className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Active Signals</h3>
                  <p className="text-slate-400 mb-4">Subscribe to providers to receive trading signals</p>
                  <Button onClick={() => {}}>
                    Browse Providers
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {signals.map(signal => (
                  <SignalCard
                    key={signal.id}
                    signal={signal}
                    onExecute={handleExecuteTrade}
                    isExecuting={executingSignal === signal.id}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="providers">
            <div className="space-y-6">
              {/* Subscribed Providers */}
              {subscriptions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Your Subscriptions</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subscriptions.map(sub => sub.provider && (
                      <ProviderCard
                        key={sub.id}
                        provider={sub.provider}
                        isSubscribed={true}
                        onUnsubscribe={handleUnsubscribe}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* All Providers */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Discover Providers</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {providers
                    .filter(p => !subscribedProviderIds.includes(p.id))
                    .map(provider => (
                      <ProviderCard
                        key={provider.id}
                        provider={provider}
                        isSubscribed={false}
                        onSubscribe={handleSubscribe}
                      />
                    ))}
                </div>
                {providers.filter(p => !subscribedProviderIds.includes(p.id)).length === 0 && (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-slate-400">No more providers to discover</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-6">
              <PerformanceChart stats={stats} />
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Trades</CardTitle>
                </CardHeader>
                <CardContent>
                  {tradeLogs.length === 0 ? (
                    <p className="text-slate-400 text-center py-8">No trade history yet</p>
                  ) : (
                    <div className="space-y-3">
                      {tradeLogs.map(log => (
                        <div
                          key={log.id}
                          className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Badge variant={log.side === 'BUY' ? 'buy' : 'sell'}>
                              {log.side}
                            </Badge>
                            <span className="font-medium text-white">{log.symbol}</span>
                            <span className="text-sm text-slate-400">
                              {formatNumber(log.quantity)} @ {formatNumber(log.price || 0)}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                log.status === 'filled' ? 'success' :
                                log.status === 'failed' ? 'danger' : 'warning'
                              }
                            >
                              {log.status}
                            </Badge>
                            <span className="text-sm text-slate-400">
                              {formatDate(log.created_at)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <TradingSettings
              tradingParams={tradingParams || undefined}
              exchangeConfig={exchangeConfig ? {
                exchange: exchangeConfig.exchange,
                is_testnet: exchangeConfig.is_testnet,
                status: exchangeConfig.status,
              } : null}
              onSaveTradingParams={handleSaveTradingParams}
              onSaveExchangeConfig={handleSaveExchangeConfig}
              onVerifyExchange={handleVerifyExchange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ReceiverDashboard;
