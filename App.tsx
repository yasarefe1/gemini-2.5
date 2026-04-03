import React from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import WaitlistChat from './components/WaitlistForm';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-900 text-white">
      <AnimatedBackground />
      <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/20 p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center">
            <h1 className="text-4xl font-black tracking-tighter text-white sm:text-5xl">
              Join The Future
            </h1>
            <p className="mt-4 max-w-xs mx-auto text-base text-gray-300">
              Enter your email below and our AI will add you to our exclusive waitlist.
            </p>
          </div>
          <WaitlistChat />
        </div>
        <footer className="absolute bottom-4 text-center text-sm text-gray-400">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;