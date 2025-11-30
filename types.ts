import React from 'react';

export interface ChartDataPoint {
  name: string;
  value: number;
  volume: number;
}

export interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

export interface MarketInsight {
  analysis: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
}

export enum TimeRange {
  H1 = '1H',
  D1 = '24H',
  W1 = '7D',
  M1 = '30D'
}