import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { AuroraBackground } from '@/components/background/AuroraBackground';

interface StartPageViewProps {
  isActive: boolean;
  auroraTheme: string;
  onNavigate: (url: string) => void;
}

export const StartPageView = ({ isActive, auroraTheme, onNavigate }: StartPageViewProps) => {
  const [ inputUrl, setInputUrl ] = useState('');
  const [ time, setTime ] = useState('');

  useEffect(() => {
    const updateClock = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!_.isEmpty(inputUrl)) {
      let parsedUrl = inputUrl;
      if (!parsedUrl.startsWith('http://') && !parsedUrl.startsWith('https://')) {
        parsedUrl = `https://${parsedUrl}`;
      }
      onNavigate(parsedUrl);
    }
  };

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center ${isActive ? 'flex' : 'hidden'}`}>
      <AuroraBackground theme={auroraTheme} />
      <div className="flex flex-col items-center mb-10 z-10">
        <h1 className="text-7xl font-light text-white/90 tracking-tight mb-3 drop-shadow-md">
          { time }
        </h1>
        <p className="text-xs text-white/40 tt-u tracking-[0.4em] font-medium">
          Copacetic
        </p>
      </div>
      <form onSubmit={handleSubmit} className="z-10 w-full max-w-2xl bg-primary rounded-full px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-500 hover:bg-white/5 focus-within:bg-white/10 focus-within:border-white/20 focus-within:shadow-[0_8px_40px_rgba(255,255,255,0.05)]">
        <input type="text" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} className="w-full bg-transparent outline-none text-white/80 text-lg font-light placeholder-white/30 text-center tracking-wide" placeholder="Search the web or enter a URL..." autoFocus />
      </form>
    </div>
  );
};
