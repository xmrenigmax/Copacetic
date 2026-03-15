import React, {
  useState,
  useEffect
} from 'react';
import _ from 'lodash';

interface StartPageProps {
  isActive: boolean;
  onNavigate: (url: string) => void;
}

export const StartPage = ({ isActive, onNavigate }: StartPageProps) => {
  const [
    inputUrl,
    setInputUrl
  ] = useState('');
  const [
    time,
    setTime
  ] = useState('');

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
    if (!_.isNull(inputUrl) && !_.isEmpty(inputUrl)) {
      let parsedUrl = inputUrl;
      if (!parsedUrl.startsWith('http://') && !parsedUrl.startsWith('https://')) {
        parsedUrl = `https://${parsedUrl}`;
      }
      onNavigate(parsedUrl);
    }
  };

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center bg-transparent ${isActive ? 'flex' : 'hidden'}`}>
      <div className="flex flex-col items-center mb-12 bg-primary rounded-[3rem] p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-red-500/5 bdT">
        <h1 className="text-8xl font-extralight text-gray-200 tracking-tighter mb-4 drop-shadow-lg">
          { time }
        </h1>
        <p className="text-[10px] text-red-400/50 tt-u tracking-[0.3em] font-medium">
          Copacetic
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-primary rounded-full px-8 py-5 shadow-2xl border border-red-500/5 bdT transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 focus-within:bg-white/5 focus-within:scale-[1.02] focus-within:border-red-500/10">
        <input type="text" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} className="w-full bg-transparent outline-none text-gray-300 text-lg font-light placeholder-gray-600 text-center tracking-wide" placeholder="Search the web or enter a URL..." autoFocus />
      </form>
    </div>
  );
};
