import React from 'react';

interface ShoppingItemProps {
  name: string;
  price: number;
  image: string;
}

export function ShoppingItem({ name, price, image }: ShoppingItemProps) {
  return (
    <div className="relative group">
      <div className="w-40 h-40 flex items-center justify-center">
        <img 
          src={`/images/foods/${image}`}
          alt={name}
          className="w-32 h-32 object-contain transform group-hover:scale-110 transition-transform duration-200"
        />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-1.5 flex items-center gap-1.5 shadow-lg">
        <img 
          src="/images/coin.png"
          alt="coin"
          className="w-5 h-5 object-contain"
        />
        <span className="font-bold text-emerald-600 text-base">{price}</span>
      </div>
    </div>
  );
}