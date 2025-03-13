import React, { useState, useEffect } from 'react';
import { items } from './data';
import { ShoppingItem } from './ShoppingItem';

interface ShoppingPageProps {
isOpen: boolean;
onClose: () => void
}
export function ShoppingPage({isOpen,onClose}:ShoppingPageProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState('');
  const totalPages = 3;

  const nextPage = () => {
    setDirection('slide-left');
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setDirection('slide-right');
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection('');
    }, 500);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const getCurrentItems = () => {
    return items.slice(currentPage * 5, (currentPage * 5) + 5);
  };
  if(!isOpen)
  return null;
  return (
    <div className="top-0 left-0 z-50 absolute bg-cover bg-center bg-no-repeat w-full px-4"
         style={{ backgroundImage: 'url("/images/BG2.png")' }}>
      {/* Background Images */}
      <div className="absolute inset-x-0 top-[20%] w-full">
        <img 
          src="/images/1.png" 
          alt="Shelf 1"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="absolute inset-x-0 top-[55%] w-full">
        <img 
          src="/images/2.png" 
          alt="Shelf 2"
          className="w-full h-auto object-cover"
        />
      </div>
      
      {/* Behind Image at the bottom */}
      <div className="absolute inset-x-0 bottom-0 w-full flex justify-center">
        <img 
          src="/images/behind.png" 
          alt="Behind decoration"
          className="w-[20%] h-auto object-contain"
        />
      </div>

      {/* Front Image at the bottom */}
      <div className="absolute inset-x-0 bottom-0 w-full flex justify-center">
        <img 
          src="/src/Images/front.png" 
          alt="Front decoration"
          className="w-1/5 h-auto object-contain"
        />
      </div>

      {/* Safe Area Container (9:16 aspect ratio) */}
      <div className="relative z-10 w-full h-screen flex items-center justify-center">
      <button
            onClick={onClose}
            className="clickable absolute top-4 right-4 w-8 h-8 transition-transform hover:scale-110"
          >
            <img
              src="/images/Close.png"
              alt="Close"
              className="w-full h-full object-contain"
            />
      </button>
        <div className="w-full max-w-[calc(100vh*9/16)] h-full mx-auto px-4 py-8">
          {/* Content */}
          <div className="relative h-full flex flex-col justify-center">
            {/* Items Container */}
            <div className="relative flex items-center justify-center">
              {/* Left Navigation Button */}
              <button 
                onClick={prevPage}
                className="clickable absolute -left-14 z-10 hover:scale-110 transition-transform"
              >
                <img 
                  src="/images/arrow.png"
                  alt="Previous"
                  className="w-8 h-8 object-contain"
                />
              </button>

              {/* Items Grid */}
              <div className="w-full">
                {/* Top Row */}
                <div className={`flex justify-center gap-2 mb-4 ${direction}`}>
                  {getCurrentItems().slice(0, 3).map((item, index) => (
                    <ShoppingItem
                      key={`${currentPage}-top-${index}`}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                    />
                  ))}
                </div>

                {/* Bottom Row */}
                <div className={`flex justify-center gap-4 ${direction}`}>
                  {getCurrentItems().slice(3, 5).map((item, index) => (
                    <ShoppingItem
                      key={`${currentPage}-bottom-${index}`}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                    />
                  ))}
                </div>
              </div>

              {/* Right Navigation Button */}
              <button 
                onClick={nextPage}
                className="clickable absolute -right-14 z-10 hover:scale-110 transition-transform"
              >
                <img 
                  src="/images/arrow-1.png"
                  alt="Next"
                  className="w-8 h-8 object-contain"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}