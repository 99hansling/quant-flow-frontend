
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

interface MarketChartProps {
  data: ChartDataPoint[];
}

export const MarketChart: React.FC<MarketChartProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-full relative group">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            {/* Gradient for the Area fill (Rose/Red) */}
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
            </linearGradient>
            {/* Gradient for the Volume fill (Pink) */}
            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
            </linearGradient>
            {/* Neon Glow Filter - Reddish */}
            <filter id="neonGlow" height="200%" width="200%" x="-50%" y="-50%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.05)" 
            vertical={false} 
          />
          
          <XAxis 
            dataKey="name" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            dy={10}
          />
          
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `${value/1000}k`}
          />
          
          <Tooltip 
            cursor={{ stroke: 'rgba(244, 63, 94, 0.4)', strokeWidth: 1, strokeDasharray: '4 4' }}
            contentStyle={{ 
              backgroundColor: 'rgba(15, 11, 26, 0.9)', 
              borderColor: 'rgba(255,255,255,0.1)', 
              borderRadius: '12px', 
              color: '#fff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)'
            }}
            itemStyle={{ color: '#fff', fontSize: '13px' }}
            labelStyle={{ color: '#94a3b8', marginBottom: '8px', fontSize: '12px' }}
          />
          
          {/* Secondary Data (Volume) - Background layer */}
          <Area 
            type="monotone" 
            dataKey="volume" 
            stroke="none" 
            fillOpacity={1} 
            fill="url(#colorVolume)" 
          />

          {/* Primary Data (Price) - The "Line" Chart with Glow */}
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#f43f5e" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            filter="url(#neonGlow)" /* Applies the glow effect */
            animationDuration={1500}
          />
          
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};