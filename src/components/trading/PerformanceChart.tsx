import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { TrendingUp, BarChart3 } from 'lucide-react';
import type { PerformanceStats } from '../../types/trading';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PerformanceChartProps {
  stats: PerformanceStats[];
  title?: string;
}

export function PerformanceChart({ stats, title = 'Performance' }: PerformanceChartProps) {
  const labels = stats.map(s => {
    const date = new Date(s.date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const pnlData = {
    labels,
    datasets: [
      {
        label: 'Cumulative P&L %',
        data: stats.reduce((acc: number[], stat, i) => {
          const prev = i > 0 ? acc[i - 1] : 0;
          acc.push(prev + stat.total_pnl_percent);
          return acc;
        }, []),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const tradesData = {
    labels,
    datasets: [
      {
        label: 'Winning Trades',
        data: stats.map(s => s.winning_trades),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      },
      {
        label: 'Losing Trades',
        data: stats.map(s => s.losing_trades),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#94a3b8',
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
        },
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
        },
      },
    },
  };

  if (stats.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-slate-400">
            No performance data available yet
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            P&L Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Line data={pnlData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            Trade Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Bar data={tradesData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PerformanceChart;
