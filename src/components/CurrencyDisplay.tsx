import React from 'react';

interface CurrencyDisplayProps {
  amount: number;
}

export function CurrencyDisplay({ amount }: CurrencyDisplayProps) {
  return (
    <div className=" relative w-32 h-auto transition-transform hover:scale-105 inset-0 border-4 border-white rounded-full p-2 items-center">
      {/* Frame Background */}
      <div className="absolute  text-2xl  font-bold text-yellow-800  bg-yellow-100 inset-0 border-2 border-yellow-500 
      rounded-full shadow-md">
      
    </div>
      
      {/* Coin Icon */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 w-12 h-12">
        <img 
          src="/images/coin.png" 
          alt="Coins"
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-2xl font-bold text-[#9F501F] drop-shadow-lg text-center w-full mx-12">
          {amount.toLocaleString()}
        </span>
      {/* Amount */}
    </div>
  );
}