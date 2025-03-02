import React from 'react';

interface CurrencyDisplayProps {
  amount: number;
}

export function CurrencyDisplay({ amount }: CurrencyDisplayProps) {
  return (
    <div className="relative w-32 h-20 transition-transform hover:scale-105">
      {/* Frame Background */}
      <div 
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/coin-frame.png)' }}
      />
      
      {/* Coin Icon */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12">
        <img 
          src="/images/coin.png" 
          alt="Coins"
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Amount */}
      <div className="absolute left-12 inset-y-0 flex items-center">
        <span className="text-2xl font-bold text-[#9F501F] drop-shadow-lg">
          {amount.toLocaleString()}
        </span>
      </div>
    </div>
  );
}