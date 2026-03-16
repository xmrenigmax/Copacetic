import React from 'react';

interface ErrorPageViewProps {
  isActive: boolean;
  errorCode: string;
  errorDescription: string;
  failedUrl: string;
  onRetry: () => void;
}

export const ErrorPageView = ({ isActive, errorCode, errorDescription, failedUrl, onRetry }: ErrorPageViewProps) => {
  return (
    <div className={`w-full h-full flex-col items-center justify-center bg-black ${isActive ? 'flex' : 'hidden'}`}>
      <div className="flex flex-col items-center text-center max-w-lg p-10 bg-primary rounded-3xl border border-white/10 shadow-2xl bdT">
        <div className="w-16 h-16 mb-6 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-inner">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <h1 className="text-2xl font-light text-white mb-3 tracking-wide">
          Page Unreachable
        </h1>
        <p className="text-sm text-white/50 mb-8 break-all font-light leading-relaxed">
          Copacetic couldn't establish a connection to <br />
          <strong className="text-white/80 font-medium">{failedUrl}</strong>.
          <span className="text-[10px] text-red-400/80 tt-u tracking-[0.2em] mt-4 block">
            {errorCode}: {errorDescription}
          </span>
        </p>
        <button onClick={onRetry} className="px-8 py-2.5 bg-white/5 hover:bg-white/15 text-white text-xs tt-u tracking-widest rounded-full transition-all border border-white/10 hover:border-white/20 active:scale-95">
          Try Again
        </button>
      </div>
    </div>
  );
};
