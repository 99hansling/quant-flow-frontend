
import React, { useEffect, useState } from 'react';
import { analyzeMarketTrend } from '../services/geminiService';
import { ChartDataPoint, MarketInsight } from '../types';
import { BrainCircuit, Loader2, TrendingUp, TrendingDown, Minus, RefreshCcw } from 'lucide-react';

interface GeminiAnalyzerProps {
  data: ChartDataPoint[];
}

export const GeminiAnalyzer: React.FC<GeminiAnalyzerProps> = ({ data }) => {
  const [insight, setInsight] = useState<MarketInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = async () => {
    if (data.length === 0) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeMarketTrend(data);
      setInsight(result);
    } catch (err) {
      console.error(err);
      setError("Analysis unavailable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="relative h-full">
      {/* Decorative Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-600/50 to-orange-600/50 rounded-2xl blur opacity-20 animate-pulse"></div>
      
      <div className="relative h-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col">
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-rose-500 to-orange-600 rounded-lg shadow-lg shadow-rose-500/20">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-md font-bold text-white leading-none">Gemini 2.5</h3>
              <span className="text-[10px] text-orange-400 font-mono tracking-wider uppercase">Analyst Mode</span>
            </div>
          </div>
          
          <button 
            onClick={fetchInsight}
            disabled={loading}
            className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {loading ? (
          <div className="flex-grow flex flex-col items-center justify-center space-y-4 min-h-[150px]">
            <div className="relative">
              <div className="absolute inset-0 bg-rose-500 blur-lg opacity-20 rounded-full animate-pulse"></div>
              <Loader2 className="w-8 h-8 text-rose-500 animate-spin relative z-10" />
            </div>
            <p className="text-xs text-slate-400 font-mono animate-pulse">DECODING MARKET SIGNALS...</p>
          </div>
        ) : error ? (
           <div className="flex-grow flex items-center justify-center text-red-400 text-sm">
             {error}
           </div>
        ) : insight ? (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Sentiment Chip */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Market Mood</span>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md ${
                insight.sentiment === 'bullish' ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.2)]' : 
                insight.sentiment === 'bearish' ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(248,113,113,0.2)]' :
                'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
              }`}>
                {insight.sentiment === 'bullish' && <TrendingUp className="w-3.5 h-3.5" />}
                {insight.sentiment === 'bearish' && <TrendingDown className="w-3.5 h-3.5" />}
                {insight.sentiment === 'neutral' && <Minus className="w-3.5 h-3.5" />}
                {insight.sentiment.toUpperCase()}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-sm text-slate-200 leading-relaxed font-light">
                "{insight.analysis}"
                </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                <span>AI Confidence</span>
                <span>{insight.confidence}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" 
                  style={{ width: `${insight.confidence}%`, transition: 'width 1s ease-out' }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};