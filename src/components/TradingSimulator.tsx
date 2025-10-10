import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface Trade {
  id: string;
  pair: string;
  type: 'buy' | 'sell';
  entry: number;
  exit: number;
  profit: number;
  timestamp: Date;
}

export default function TradingSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(1.0850);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [winRate, setWinRate] = useState(0);

  // Simulate price movement
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.002; // Random price movement
      setCurrentPrice(prev => {
        const newPrice = prev + change;

        // Simulate trades every few price movements
        if (Math.random() < 0.1) { // 10% chance of trade
          const tradeType = Math.random() > 0.5 ? 'buy' : 'sell';
          const entryPrice = newPrice;
          const exitPrice = entryPrice + (Math.random() - 0.5) * 0.004;
          const profit = tradeType === 'buy'
            ? (exitPrice - entryPrice) * 100000
            : (entryPrice - exitPrice) * 100000;

          const newTrade: Trade = {
            id: Date.now().toString(),
            pair: 'EUR/USD',
            type: tradeType,
            entry: entryPrice,
            exit: exitPrice,
            profit: Math.round(profit * 100) / 100,
            timestamp: new Date()
          };

          setTrades(prev => [newTrade, ...prev.slice(0, 9)]); // Keep last 10 trades
          setTotalProfit(prev => prev + newTrade.profit);
        }

        return newPrice;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Calculate win rate
  useEffect(() => {
    if (trades.length === 0) return;
    const winningTrades = trades.filter(trade => trade.profit > 0).length;
    setWinRate(Math.round((winningTrades / trades.length) * 100));
  }, [trades]);

  const resetSimulator = () => {
    setIsRunning(false);
    setCurrentPrice(1.0850);
    setTrades([]);
    setTotalProfit(0);
    setWinRate(0);
  };

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-2" />
              Live Trading Simulator
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            See Our EA in Action
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Watch our AI-powered trading algorithm make decisions in real-time. This simulation shows how our Expert Advisors analyze market conditions and execute trades.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Price Chart Simulation */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">EUR/USD Live Simulation</h3>
                  <p className="text-slate-400 text-sm">Real-time price feed simulation</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {currentPrice.toFixed(4)}
                    </div>
                    <div className={`text-sm flex items-center ${
                      currentPrice > 1.0850 ? 'text-emerald-500' : 'text-red-500'
                    }`}>
                      {currentPrice > 1.0850 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {((currentPrice - 1.0850) / 1.0850 * 100).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Simple price chart visualization */}
              <div className="h-64 bg-slate-800 rounded-lg p-4 mb-6">
                <div className="flex items-end justify-between h-full space-x-1">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const height = 40 + Math.sin(i * 0.5) * 20 + Math.random() * 10;
                    return (
                      <div
                        key={i}
                        className="bg-emerald-500 rounded-t w-full transition-all duration-300"
                        style={{ height: `${height}%` }}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>1H</span>
                  <span>30M</span>
                  <span>Now</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isRunning
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-5 h-5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>Start Simulation</span>
                    </>
                  )}
                </button>
                <button
                  onClick={resetSimulator}
                  className="flex items-center space-x-2 px-6 py-3 bg-slate-800 text-slate-300 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats and Recent Trades */}
          <div className="space-y-6">
            {/* Performance Stats */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h4 className="text-lg font-bold text-white mb-4">Performance Stats</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Profit</span>
                  <span className={`font-bold ${totalProfit >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    ${totalProfit.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Win Rate</span>
                  <span className="font-bold text-emerald-500">{winRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Trades</span>
                  <span className="font-bold text-white">{trades.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className={`font-bold ${isRunning ? 'text-emerald-500' : 'text-slate-500'}`}>
                    {isRunning ? 'Running' : 'Paused'}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Trades */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h4 className="text-lg font-bold text-white mb-4">Recent Trades</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {trades.length === 0 ? (
                  <p className="text-slate-400 text-sm text-center py-4">
                    No trades yet. Start the simulation to see trades.
                  </p>
                ) : (
                  trades.slice(0, 5).map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          trade.type === 'buy' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                        }`}>
                          <DollarSign className={`w-4 h-4 ${
                            trade.type === 'buy' ? 'text-emerald-500' : 'text-red-500'
                          }`} />
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">
                            {trade.type.toUpperCase()} {trade.pair}
                          </div>
                          <div className="text-slate-400 text-xs">
                            {trade.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <div className={`font-bold ${
                        trade.profit >= 0 ? 'text-emerald-500' : 'text-red-500'
                      }`}>
                        ${trade.profit.toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-slate-900 rounded-xl border border-slate-800 p-6">
          <div className="text-center">
            <h4 className="text-lg font-bold text-white mb-2">Simulation Disclaimer</h4>
            <p className="text-slate-400 text-sm max-w-3xl mx-auto">
              This is a simplified simulation for demonstration purposes only. Past performance does not guarantee future results.
              Real trading involves risk of loss. Always backtest strategies thoroughly and use proper risk management.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
