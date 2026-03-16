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
          history.map((item) => (
            <div key={item.id} onClick={() => onNavigate(item.url)} className="p-3 bg-white/5 rounded-xl border border-white/5 shadow-sm hover:bg-white/10 transition-colors cursor-pointer group">
              <p className="text-sm text-white/90 truncate font-medium">
                {item.title || item.url}
              </p>
              <span className="text-[10px] text-white/40 truncate block mt-1">
                {item.url}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
