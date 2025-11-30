import React from 'react';
import { TrendingUp, TrendingDown, Activity, Target, Shield, DollarSign } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { cn, formatNumber, formatPercent } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  iconColor?: string;
}

function StatCard({ title, value, change, icon, iconColor = 'text-emerald-400' }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            {change !== undefined && (
              <div className={cn(
                'flex items-center gap-1 text-sm mt-1',
                change >= 0 ? 'text-emerald-400' : 'text-red-400'
              )}>
                {change >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {formatPercent(change)}
              </div>
            )}
          </div>
          <div className={cn('p-2 rounded-lg bg-slate-800', iconColor)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatsCardsProps {
  totalPnl: number;
  totalPnlPercent: number;
  winRate: number;
  totalTrades: number;
  openPositions?: number;
  balance?: number;
}

export function StatsCards({
  totalPnl,
  totalPnlPercent,
  winRate,
  totalTrades,
  openPositions = 0,
  balance,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total P&L"
        value={`$${formatNumber(totalPnl)}`}
        change={totalPnlPercent}
        icon={<DollarSign className="w-5 h-5" />}
        iconColor={totalPnl >= 0 ? 'text-emerald-400' : 'text-red-400'}
      />
      <StatCard
        title="Win Rate"
        value={`${formatNumber(winRate)}%`}
        icon={<Target className="w-5 h-5" />}
        iconColor="text-blue-400"
      />
      <StatCard
        title="Total Trades"
        value={totalTrades}
        icon={<Activity className="w-5 h-5" />}
        iconColor="text-purple-400"
      />
      {balance !== undefined ? (
        <StatCard
          title="Balance"
          value={`$${formatNumber(balance)}`}
          icon={<Shield className="w-5 h-5" />}
          iconColor="text-amber-400"
        />
      ) : (
        <StatCard
          title="Open Positions"
          value={openPositions}
          icon={<Activity className="w-5 h-5" />}
          iconColor="text-amber-400"
        />
      )}
    </div>
  );
}

export default StatsCards;
