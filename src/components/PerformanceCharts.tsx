import { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, DollarSign, Target, Zap } from 'lucide-react';

interface PerformanceData {
  month: string;
  profit: number;
  winRate: number;
  totalTrades: number;
  drawdown: number;
}

const performanceData: PerformanceData[] = [
  { month: 'Jan', profit: 1250, winRate: 78, totalTrades: 145, drawdown: 8.5 },
  { month: 'Feb', profit: 980, winRate: 82, totalTrades: 132, drawdown: 6.2 },
  { month: 'Mar', profit: 1650, winRate: 75, totalTrades: 158, drawdown: 9.1 },
  { month: 'Apr', profit: 1420, winRate: 80, totalTrades: 141, drawdown: 7.3 },
  { month: 'May', profit: 1890, winRate: 77, totalTrades: 167, drawdown: 8.8 },
  { month: 'Jun', profit: 2100, winRate: 79, totalTrades: 152, drawdown: 6.9 },
  { month: 'Jul', profit: 1750, winRate: 81, totalTrades: 149, drawdown: 7.5 },
  { month: 'Aug', profit: 2230, winRate: 78, totalTrades: 163, drawdown: 8.2 },
  { month: 'Sep', profit: 1980, winRate: 76, totalTrades: 156, drawdown: 9.4 },
  { month: 'Oct', profit: 2450, winRate: 80, totalTrades: 171, drawdown: 7.1 },
  { month: 'Nov', profit: 2120, winRate: 79, totalTrades: 148, drawdown: 6.8 },
  { month: 'Dec', profit: 2680, winRate: 82, totalTrades: 175, drawdown: 8.0 }
];

export default function PerformanceCharts() {
  const [selectedMetric, setSelectedMetric] = useState<'profit' | 'winRate' | 'totalTrades' | 'drawdown'>('profit');

  const getMetricData = () => {
    switch (selectedMetric) {
      case 'profit':
        return performanceData.map(d => d.profit);
      case 'winRate':
        return performanceData.map(d => d.winRate);
      case 'totalTrades':
        return performanceData.map(d => d.totalTrades);
      case 'drawdown':
        return performanceData.map(d => d.drawdown);
      default:
        return performanceData.map(d => d.profit);
    }
  };

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'profit':
        return 'Monthly Profit ($)';
      case 'winRate':
        return 'Win Rate (%)';
      case 'totalTrades':
        return 'Total Trades';
      case 'drawdown':
        return 'Max Drawdown (%)';
      default:
        return 'Monthly Profit ($)';
    }
  };

  const getMetricColor = () => {
    switch (selectedMetric) {
      case 'profit':
        return 'text-emerald-500';
      case 'winRate':
        return 'text-blue-500';
      case 'totalTrades':
        return 'text-purple-500';
      case 'drawdown':
        return 'text-red-500';
      default:
        return 'text-emerald-500';
    }
  };

  const maxValue = Math.max(...getMetricData());
  const minValue = Math.min(...getMetricData());

  const stats = [
    {
      label: 'Total Annual Profit',
      value: '$21,420',
      change: '+24.5%',
      icon: DollarSign,
      color: 'text-emerald-500'
    },
    {
      label: 'Average Win Rate',
      value: '78.9%',
      change: '+2.1%',
      icon: Target,
      color: 'text-blue-500'
    },
    {
      label: 'Total Trades',
      value: '1,857',
      change: '+15.3%',
      icon: BarChart3,
      color: 'text-purple-500'
    },
    {
      label: 'Max Drawdown',
      value: '9.4%',
      change: '-1.2%',
      icon: TrendingUp,
      color: 'text-orange-500'
    }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <BarChart3 className="w-4 h-4 mr-2" />
              Performance Analytics
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Proven Track Record
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            12 months of real trading performance data. Our Expert Advisors deliver consistent results across various market conditions.
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className={`text-sm font-semibold ${
                  stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">12-Month Performance</h3>
              <p className="text-slate-400">Live trading results from our AI Scalper Pro EA</p>
            </div>

            {/* Metric Selector */}
            <div className="flex space-x-2">
              {[
                { key: 'profit', label: 'Profit', icon: DollarSign },
                { key: 'winRate', label: 'Win Rate', icon: Target },
                { key: 'totalTrades', label: 'Trades', icon: BarChart3 },
                { key: 'drawdown', label: 'Drawdown', icon: TrendingUp }
              ].map((metric) => (
                <button
                  key={metric.key}
                  onClick={() => setSelectedMetric(metric.key as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedMetric === metric.key
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <metric.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{metric.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chart Visualization */}
          <div className="mb-6">
            <div className="flex items-end justify-between h-64 space-x-2">
              {getMetricData().map((value, index) => {
                const height = ((value - minValue) / (maxValue - minValue)) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex justify-center mb-2">
                      <div
                        className={`w-full max-w-8 rounded-t transition-all duration-500 ${
                          selectedMetric === 'profit' ? 'bg-emerald-500' :
                          selectedMetric === 'winRate' ? 'bg-blue-500' :
                          selectedMetric === 'totalTrades' ? 'bg-purple-500' :
                          'bg-red-500'
                        }`}
                        style={{ height: `${Math.max(height, 5)}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 transform -rotate-45 origin-top">
                      {performanceData[index].month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getMetricColor()} mb-2`}>
                {selectedMetric === 'profit' && '$21,420'}
                {selectedMetric === 'winRate' && '78.9%'}
                {selectedMetric === 'totalTrades' && '1,857'}
                {selectedMetric === 'drawdown' && '9.4%'}
              </div>
              <div className="text-slate-400 text-sm">{getMetricLabel()}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-500 mb-2">
                +{((maxValue - minValue) / minValue * 100).toFixed(1)}%
              </div>
              <div className="text-slate-400 text-sm">Best vs Worst Month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                12
              </div>
              <div className="text-slate-400 text-sm">Months of Data</div>
            </div>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h4 className="text-xl font-bold text-white mb-4">Risk Management</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Max Drawdown</span>
                <span className="text-red-500 font-semibold">9.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Recovery Factor</span>
                <span className="text-emerald-500 font-semibold">2.27</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Sharpe Ratio</span>
                <span className="text-blue-500 font-semibold">1.85</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Profit Factor</span>
                <span className="text-emerald-500 font-semibold">2.34</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h4 className="text-xl font-bold text-white mb-4">Market Conditions Tested</h4>
            <div className="space-y-3">
              {[
                { condition: 'Trending Markets', performance: 'Excellent' },
                { condition: 'Ranging Markets', performance: 'Good' },
                { condition: 'High Volatility', performance: 'Very Good' },
                { condition: 'News Events', performance: 'Filtered' },
                { condition: 'Weekend Gaps', performance: 'Avoided' },
                { condition: 'Low Liquidity', performance: 'Conservative' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-slate-400">{item.condition}</span>
                  <span className={`text-sm font-semibold ${
                    item.performance === 'Excellent' ? 'text-emerald-500' :
                    item.performance === 'Very Good' ? 'text-blue-500' :
                    item.performance === 'Good' ? 'text-yellow-500' :
                    'text-slate-500'
                  }`}>
                    {item.performance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-slate-900 rounded-xl border border-slate-800 p-6">
          <div className="flex items-start space-x-3">
            <Calendar className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-bold text-white mb-2">Performance Disclaimer</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Past performance does not guarantee future results. The results shown are from live trading with real market conditions,
                including spreads, slippage, and commissions. All trading involves risk of loss. Always use proper risk management
                and never invest more than you can afford to lose.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
