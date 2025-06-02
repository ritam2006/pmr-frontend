'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  tradingDates: string[];
  dailyValues: number[];
  cumulativeReturns: number;
};

type ChartDataPoint = {
  date: string;
  value: number;
  trend: number;
};

const movingAverage = (values: number[], windowSize: number): number[] => {
  return values.map((_, i) => {
    const start = Math.max(0, i - windowSize + 1);
    const window = values.slice(start, i + 1);
    return window.reduce((sum, val) => sum + val, 0) / window.length;
  });
};

export default function PortfolioGraph({ tradingDates, dailyValues, cumulativeReturns }: Props) {
  const color = cumulativeReturns > 0 ? "#3EDBB4" : "red";

  const maValues = movingAverage(dailyValues, 10);
  const data: ChartDataPoint[] = tradingDates.map((date, i) => ({
    date,
    value: dailyValues[i],
    trend: maValues[i],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 50, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          label={{ 
            value: 'Date', 
            position: 'insideBottom', 
            offset: -25,
            style: { fill: '#1F2937', fontSize: 20, textAnchor: 'middle' }, 
          }}
          tick={{ fill: '#333', fontSize: 12 }}
        />
        <YAxis
          tickFormatter={(v) => `$${v.toFixed(2)}`}
          label={{
            value: 'Price ($)',
            angle: -90,
            position: 'insideLeft',
            offset: -25,
            style: { fill: '#1F2937', fontSize: 20, textAnchor: 'middle' }, 
          }}
          tick={{ fill: '#333', fontSize: 12 }}
        />
        <Tooltip
          formatter={(v) => `$${(v as number).toFixed(2)}`}
          labelFormatter={(label) => `Date: ${label}`}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          dot={false}
          strokeWidth={2}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="trend"
          stroke="#1F2937"
          dot={false}
          strokeDasharray="5 5"
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};