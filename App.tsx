import React, { useState, useEffect } from 'react';
import { Activity, BarChart3, Binary, ChevronRight, Layers, Wallet, Search, Bell, Zap, Globe, Cpu, LineChart, ArrowUpRight, ArrowDownRight, Clock, ShieldAlert } from 'lucide-react';
import { GlassCard } from './components/GlassCard';
import { MarketChart } from './components/MarketChart';
import { GeminiAnalyzer } from './components/GeminiAnalyzer';
import { ChartDataPoint } from './types';

// --- Mock Data Generators ---

const generateRandomData = (points: number, volatility: number = 0.05): ChartDataPoint[] => {
  let currentValue = 4000 + Math.random() * 1000;
  const data: ChartDataPoint[] = [];
  const now = new Date();

  for (let i = 0; i < points; i++) {
    const change = currentValue * (Math.random() - 0.5) * volatility;
    currentValue += change;
    
    // Ensure positive values
    if (currentValue < 100) currentValue = 100;

    const time = new Date(now.getTime() - (points - i) * 3600 * 1000); // Back in time by hours
    
    data.push({
      name: time.getHours() + ':00',
      value: Math.round(currentValue),
      volume: Math.round(1000 + Math.random() * 5000)
    });
  }
  return data;
};

// --- Sub-Components ---

const SignalItem = ({ pair, type, confidence, time }: { pair: string, type: 'buy' | 'sell', confidence: number, time: string }) => (
  <div className="flex items-center justify-between p-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${type === 'buy' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
        {type === 'buy' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
      </div>
      <div>
        <h4 className="font-bold text-sm text-white group-hover:text-rose-400 transition-colors">{pair}</h4>
        <p className="text-[10px] text-slate-500">{time} • <span className="font-mono">MACD Crossover</span></p>
      </div>
    </div>
    <div className="text-right">
      <div className="text-xs font-bold text-slate-200">{confidence}%</div>
      <div className="text-[10px] text-slate-500 uppercase">Confidence</div>
    </div>
  </div>
);

// --- Main Application ---

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'terminal'>('home');
  const [activeTab, setActiveTab] = useState('Crypto');
  const [timeRange, setTimeRange] = useState('1D');
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initial Data Load
  useEffect(() => {
    handleDataRefresh();
  }, []);

  const handleDataRefresh = () => {
    setIsAnimating(true);
    // Simulate network request with slight delay for realism
    setTimeout(() => {
      const volatility = activeTab === 'Crypto' ? 0.08 : 0.02;
      const points = timeRange === '1H' ? 12 : timeRange === '1D' ? 24 : 7;
      setChartData(generateRandomData(points, volatility));
      setIsAnimating(false);
    }, 400);
  };

  // Trigger data refresh when controls change
  useEffect(() => {
    handleDataRefresh();
  }, [activeTab, timeRange]);

  const handleNavClick = (view: 'home' | 'terminal') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Views ---

  const renderTerminal = () => (
    <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <LineChart className="w-6 h-6 text-rose-500" />
            QuantFlow Terminal <span className="text-xs align-top bg-rose-500 text-white px-1.5 py-0.5 rounded ml-2">PRO</span>
          </h2>
          <p className="text-slate-400 text-sm">Real-time institutional grade analytics.</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => handleDataRefresh()} 
             className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-rose-400 transition-all"
             title="Refresh Data"
           >
             <Activity className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[800px]">
        {/* Main Chart Area */}
        <div className="lg:col-span-3 flex flex-col gap-6 h-full">
           <GlassCard className="flex-1 p-1 relative flex flex-col" hoverEffect={false}>
              {/* Chart Controls Toolbar */}
              <div className="p-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
                 <div className="flex gap-1 bg-black/20 p-1 rounded-lg">
                    {['Crypto', 'Forex', 'Indices', 'Commodities'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                          activeTab === tab 
                          ? 'bg-gradient-to-r from-rose-600 to-orange-600 text-white shadow-lg' 
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                 </div>
                 <div className="flex gap-1 bg-black/20 p-1 rounded-lg">
                    {['1H', '1D', '1W', '1M'].map(range => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`w-8 py-1.5 text-xs font-bold rounded-md transition-all ${
                          timeRange === range
                          ? 'bg-white/10 text-white border border-white/10' 
                          : 'text-slate-500 hover:text-white'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                 </div>
              </div>
              
              {/* Chart Visual */}
              <div className="flex-grow relative w-full h-full min-h-[400px] p-4">
                 {isAnimating && (
                   <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-xl">
                      <div className="w-1 h-24 bg-gradient-to-b from-transparent via-rose-500 to-transparent animate-scan"></div>
                   </div>
                 )}
                 <MarketChart data={chartData} />
              </div>
           </GlassCard>

           {/* Metrics Strip */}
           <div className="h-32 grid grid-cols-4 gap-4">
              {[
                { label: 'RSI (14)', val: '64.2', status: 'Neutral', color: 'text-yellow-400' },
                { label: 'MACD', val: '+12.4', status: 'Buy', color: 'text-green-400' },
                { label: 'Bollinger', val: 'Upper', status: 'Squeeze', color: 'text-rose-400' },
                { label: 'Vol (24h)', val: 'High', status: '82%', color: 'text-orange-400' },
              ].map((m, i) => (
                <GlassCard key={i} className="flex flex-col justify-center items-center p-2" hoverEffect={true}>
                   <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{m.label}</span>
                   <span className="text-xl font-bold text-white mb-1">{m.val}</span>
                   <span className={`text-xs font-bold px-2 py-0.5 rounded bg-white/5 ${m.color}`}>{m.status}</span>
                </GlassCard>
              ))}
           </div>
        </div>

        {/* Sidebar: Signals & AI */}
        <div className="flex flex-col gap-6 h-full">
           {/* Gemini Analyzer */}
           <div className="h-1/3 min-h-[250px]">
              <GeminiAnalyzer data={chartData} />
           </div>

           {/* Signal Feed */}
           <GlassCard className="flex-1 flex flex-col min-h-0" hoverEffect={false}>
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                 <h3 className="font-bold flex items-center gap-2">
                   <Zap className="w-4 h-4 text-orange-400" /> Live Signals
                 </h3>
                 <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                 <div className="flex flex-col">
                    <SignalItem pair="BTC/USD" type="buy" confidence={92} time="2m ago" />
                    <SignalItem pair="ETH/USD" type="sell" confidence={64} time="5m ago" />
                    <SignalItem pair="SOL/USDT" type="buy" confidence={88} time="12m ago" />
                    <SignalItem pair="NVDA/USD" type="buy" confidence={95} time="15m ago" />
                    <SignalItem pair="EUR/USD" type="sell" confidence={71} time="24m ago" />
                    <SignalItem pair="XAU/USD" type="buy" confidence={82} time="41m ago" />
                    <SignalItem pair="LINK/USDT" type="buy" confidence={78} time="1h ago" />
                 </div>
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 animate-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_#f43f5e]"></span>
            System Operational
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight">
            Institutional <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500">
              Alpha Streams
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
            Harness the power of Gemini 2.5 for real-time market sentiment analysis and high-frequency signal detection.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => handleNavClick('terminal')}
              className="px-8 py-4 bg-gradient-to-r from-rose-600 to-orange-600 rounded-xl font-bold text-white shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" /> Launch Terminal
            </button>
            <button 
              className="px-8 py-4 bg-transparent border border-slate-700 rounded-xl font-bold text-white hover:bg-white/5 hover:border-white/20 transition-all flex items-center gap-2 group"
            >
              Read Docs <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative">
            {/* Main Chart Card Preview */}
            <GlassCard className="p-6 cursor-pointer group" hoverEffect={true}>
              <div onClick={() => handleNavClick('terminal')}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider">QuantFlow Index</h3>
                    <p className="text-3xl font-bold text-white mt-1 group-hover:text-rose-400 transition-colors">$1,248.21</p>
                  </div>
                  <ArrowUpRight className="text-green-400 w-6 h-6" />
                </div>
                {/* Small preview chart */}
                <div className="h-[200px] w-full -ml-2 pointer-events-none">
                    <MarketChart data={chartData} />
                </div>
                <div className="mt-2 text-center text-xs text-slate-500 font-mono">CLICK TO EXPAND ANALYTICS</div>
              </div>
            </GlassCard>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 z-20">
              <GlassCard className="p-4 flex items-center gap-3 animate-bounce-slow" hoverEffect={true}>
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">System Latency</div>
                  <div className="font-bold text-white">12ms</div>
                </div>
              </GlassCard>
            </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6" hoverEffect={true}>
             <ShieldAlert className="w-8 h-8 text-rose-500 mb-4" />
             <h3 className="text-xl font-bold mb-2">Risk Management</h3>
             <p className="text-slate-400 text-sm">Real-time VAR calculation and liquidation cascade detection.</p>
          </GlassCard>
          <GlassCard className="p-6" hoverEffect={true}>
             <Cpu className="w-8 h-8 text-orange-500 mb-4" />
             <h3 className="text-xl font-bold mb-2">AI Sentinel</h3>
             <p className="text-slate-400 text-sm">Powered by Gemini 2.5 to process unstructured market news.</p>
          </GlassCard>
          <GlassCard className="p-6" hoverEffect={true}>
             <Clock className="w-8 h-8 text-pink-500 mb-4" />
             <h3 className="text-xl font-bold mb-2">Backtesting</h3>
             <p className="text-slate-400 text-sm">Test strategies against 5 years of tick-level historical data.</p>
          </GlassCard>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0f0b1a] text-white relative overflow-x-hidden selection:bg-rose-500 selection:text-white font-['Outfit']">
      
      {/* Background Ambience */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-rose-900/10 rounded-full blur-[128px] pointer-events-none mix-blend-screen" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-purple-900/10 rounded-full blur-[128px] pointer-events-none mix-blend-screen" />
      
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto backdrop-blur-sm sticky top-0 border-b border-white/5 mb-8">
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:shadow-rose-500/40 transition-shadow">
            <Binary className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Quant<span className="font-light text-rose-500">Flow</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium bg-white/5 p-1 rounded-full border border-white/5">
          {['Home', 'Markets', 'Signals', 'Strategies'].map((item) => (
            <button 
              key={item} 
              onClick={() => handleNavClick(item === 'Home' ? 'home' : 'terminal')}
              className={`px-5 py-2 rounded-full transition-all duration-200 ${
                (item === 'Home' && currentView === 'home') || (item !== 'Home' && currentView === 'terminal') 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 bg-rose-600/10 border border-rose-500/30 rounded-full text-sm font-semibold text-rose-400 hover:bg-rose-600/20 transition-all backdrop-blur-md flex items-center gap-2 group">
            <Wallet className="w-4 h-4 group-hover:text-rose-300 transition-colors" />
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24 min-h-[calc(100vh-200px)]">
        {currentView === 'home' ? renderHome() : renderTerminal()}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/20 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">© 2024 QuantFlow Systems. Engine v2.4.0</p>
          <div className="flex gap-6 text-slate-400 text-sm font-medium">
             <button className="hover:text-rose-500 transition-colors">Risk Disclosure</button>
             <button className="hover:text-rose-500 transition-colors">API Docs</button>
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-slate-500">Systems Normal</span>
             </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;