import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div 
      className={`
        relative overflow-hidden
        bg-white/5 
        backdrop-blur-xl 
        border border-white/10 
        rounded-2xl 
        shadow-xl
        transition-all duration-300
        ${hoverEffect ? 'hover:bg-white/10 hover:border-pink-500/30 hover:shadow-pink-500/10 hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {/* Subtle gradient noise overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};