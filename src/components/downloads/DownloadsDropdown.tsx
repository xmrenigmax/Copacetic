import React, { useState } from 'react';
import _ from 'lodash';
import { DownloadItem } from '@/hooks/useDownloads';

interface DownloadsDropdownProps {
  downloads: DownloadItem[];
  onClear: () => void;
}

export const DownloadsDropdown = ({ downloads, onClear }: DownloadsDropdownProps) => {
  const [
    isOpen,
    setIsOpen
  ] = useState(false);

  if (_.isEmpty(downloads)) return null;

  const activeDownloads = downloads.filter((d) => d.state === 'downloading').length;
  const hasCompleted = downloads.some((d) => d.state !== 'downloading');

  return (
    <div className="relative flex items-center">
      <button onClick={() => setIsOpen(!isOpen)} className={`p-1.5 rounded-md transition-all duration-300 relative flex items-center justify-center ${isOpen ? 'bg-white/15 text-white' : 'bg-black/20 text-white/50 hover:bg-white/10 hover:text-white'} border border-white/5 shadow-inner`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        {activeDownloads > 0 && (
          <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 border border-[#0f0f0f]" />
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-90" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-3 w-80 bg-[#0f0f0f]/95 backdrop-blur-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-xl p-3 z-100 flex flex-col gap-2 bdT">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-[10px] text-white/50 tt-u tracking-widest font-semibold">
                Downloads
              </span>
              {hasCompleted && (
                <button onClick={onClear} className="text-[9px] text-white/40 hover:text-red-400 transition-colors tt-u tracking-wider">
                  Clear
                </button>
              )}
            </div>
            <div className="max-h-72 overflow-y-auto no-scrollbar flex flex-col gap-2">
              {downloads.map((dl) => (
                <div key={dl.id} className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col gap-2 relative overflow-hidden group">
                  <div className="flex justify-between items-center relative z-10">
                    <span className="text-xs font-medium text-white/90 truncate pr-3 tracking-wide" title={dl.filename}>
                      {dl.filename}
                    </span>
                    {dl.state === 'completed' ? (
                      <span className="text-[9px] text-green-400 tt-u tracking-widest font-semibold">Done</span>
                    ) : dl.state === 'interrupted' ? (
                      <span className="text-[9px] text-red-400 tt-u tracking-widest font-semibold">Failed</span>
                    ) : (
                      <span className="text-[9px] text-blue-400 tt-u tracking-widest font-semibold">{Math.round(dl.progress * 100)}%</span>
                    )}
                  </div>
                  <div className="h-1 w-full bg-black/40 rounded-full overflow-hidden shadow-inner relative z-10">
                    <div className={`h-full transition-all duration-300 rounded-full ${dl.state === 'completed' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : dl.state === 'interrupted' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'}`} style={{ width: `${dl.progress * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
