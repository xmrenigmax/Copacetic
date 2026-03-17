import React from 'react';
import _ from 'lodash';
import { HistoryItem } from '@/hooks/useHistory';

interface HistoryPanelProps {
  history: HistoryItem[];
  onNavigate: (url: string) => void;
  onClearHistory: () => void;
}

export const HistoryPanel = ({ history, onNavigate, onClearHistory }: HistoryPanelProps) => {
  return (
    <div className="flex flex-col h-full w-full p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-semibold tt-u text-white/50 tracking-wider">
          Browsing History
        </h2>
        <button onClick={onClearHistory} className="text-[10px] text-red-400/80 hover:text-red-400 tt-u tracking-widest transition-colors">
          Clear
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 no-scrollbar space-y-2">
        {_.isEmpty(history) ? (
          <div className="text-xs text-white/30 text-center mt-10 font-light">
            No history yet.
          </div>
        ) : (
          history.map(item => (
            <div key={item.id} onClick={() => onNavigate(item.url)} className="p-3 bg-white/5 rounded-xl border border-white/5 shadow-sm hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 mb-1">
                {item.type === 'download' ? (
                  <svg className="w-3.5 h-3.5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                ) : (
                  <svg className="w-3.5 h-3.5 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                )}
                <p className="text-sm text-white/90 truncate font-medium">
                  {item.title || item.url}
                </p>
              </div>
              <span className="text-[10px] text-white/40 truncate block">
                {item.url}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
