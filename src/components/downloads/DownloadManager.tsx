import React from 'react';
import _ from 'lodash';
import {
  DownloadItem
} from '@/hooks/useDownloads';

interface DownloadManagerProps {
  downloads: DownloadItem[];
  onClear: () => void;
}

export const DownloadManager = ({ downloads, onClear }: DownloadManagerProps) => {
  if (_.isEmpty(downloads)) return null;

  const hasCompleted = downloads.some((d) => d.state !== 'downloading');

  return (
    <div className="fixed bottom-6 right-6 z-9999 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {downloads.map((dl) => (
        <div key={dl.id} className="bg-[#0f0f0f]/95 backdrop-blur-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-2xl p-4 pointer-events-auto flex flex-col gap-3 transition-all duration-500">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-white/90 truncate pr-4 tracking-wide">
              {dl.filename}
            </span>
            {dl.state === 'completed' ? (
              <span className="text-[10px] text-green-400 tt-u tracking-widest font-semibold">Done</span>
            ) : dl.state === 'interrupted' ? (
              <span className="text-[10px] text-red-400 tt-u tracking-widest font-semibold">Failed</span>
            ) : (
              <span className="text-[10px] text-blue-400 tt-u tracking-widest font-semibold">{Math.round(dl.progress * 100)}%</span>
            )}
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
            <div className={`h-full transition-all duration-300 rounded-full ${dl.state === 'completed' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : dl.state === 'interrupted' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'}`} style={{ width: `${dl.progress * 100}%` }} />
          </div>
        </div>
      ))}

      {hasCompleted && (
        <div className="flex justify-end pointer-events-auto mt-1">
          <button onClick={onClear} className="text-[10px] text-white/50 hover:text-white tt-u tracking-widest transition-colors px-3 py-1 bg-black/40 rounded-full border border-white/5 hover:bg-white/10">
            Clear Completed
          </button>
        </div>
      )}
    </div>
  );
};
