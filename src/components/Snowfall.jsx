import React from 'react';

const Snowfall = ({ count = 20 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
      {[...Array(count)].map((_, i) => {
        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * -20;
        const opacity = Math.random() * 0.4 + 0.5; // Increased opacity range
        const blur = Math.random() * 1.5; // Reduced blur for sharpness
        
        return (
          <div 
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `-20px`,
              opacity: opacity,
              filter: `blur(${blur}px)`,
              animation: `snow-fall ${duration}s linear ${delay}s infinite, snow-sway 3s ease-in-out infinite alternate`
            }}
          />
        );
      })}
    </div>
  );
};

export default Snowfall;
