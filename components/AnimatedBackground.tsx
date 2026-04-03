import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-0 h-full w-full">
      <div className="relative h-full w-full">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] animate-[blob-spin_20s_linear_infinite] rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 opacity-30 blur-3xl filter" />
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] animate-[blob-spin_25s_linear_infinite_reverse] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30 blur-3xl filter animation-delay-3000" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] animate-[blob-spin_15s_linear_infinite] rounded-full bg-gradient-to-r from-pink-500 to-rose-500 opacity-30 blur-3xl filter animation-delay-5000" />
      </div>
    </div>
  );
};

export default AnimatedBackground;
