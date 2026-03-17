import React, { useState } from 'react';
import { FilePanel } from './panel/FilePanel';
import { AIPanel } from './panel/AIPanel';
import { HistoryPanel } from './panel/HistoryPanel';
import { BookmarksPanel } from './panel/BookmarkPanel';
import { HistoryItem } from '@/hooks/useHistory';
import { Bookmark } from '@/hooks/useBookmarks';
import { Sparkles, Globe, FileText, Bookmark as BookmarkIcon, History, Settings } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isCustomised: boolean;
  activeUrl: string;
  history: HistoryItem[];
  bookmarks: Bookmark[];
  onNavigate: (url: string) => void;
  onClearHistory: () => void;
  onRemoveBookmark: (id: number) => void;
  onToggleSettings: () => void;
}

export const Sidebar = ({ isOpen, isCustomised, activeUrl, history, bookmarks, onNavigate, onClearHistory, onRemoveBookmark, onToggleSettings }: SidebarProps) => {
  const [ activePanel, setActivePanel ] = useState('file');

  const navItems = [
    { id: 'ai', icon: <Sparkles size={20} />, label: 'Copilot' },
    { id: 'globe', icon: <Globe size={20} />, label: 'Web' },
    { id: 'file', icon: <FileText size={20} />, label: 'Files' },
    { id: 'bookmarks', icon: <BookmarkIcon size={20} />, label: 'Bookmarks' },
    { id: 'history', icon: <History size={20} />, label: 'History' }
  ];

  return (
    <div className={`h-full flex w-full bg-secondary bdR shadow-2xl transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-16 min-w-16 flex flex-col items-center py-4 bg-black/20 bdR">
        {navItems.map(item => (
          <button key={item.id} onClick={() => setActivePanel(item.id)} className={`relative p-3 mb-4 rounded-xl transition-all duration-300 group ${activePanel === item.id ? 'bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] text-blue-400' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
            <div className={`transition-transform duration-300 ${activePanel === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
              {item.icon}
            </div>
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={onToggleSettings} className="relative p-3 mb-4 rounded-xl transition-all duration-300 text-white/50 hover:bg-white/5 hover:text-white group">
          <Settings size={20} className="transition-transform duration-500 group-hover:rotate-90" />
        </button>
      </div>
      <div className="flex-1 flex flex-col bg-transparent overflow-hidden">
        {activePanel === 'file' && <FilePanel activeUrl={activeUrl} />}
        {activePanel === 'ai' && <AIPanel />}
        {activePanel === 'history' && <HistoryPanel history={history} onNavigate={onNavigate} onClearHistory={onClearHistory} />}
        {activePanel === 'bookmarks' && <BookmarksPanel bookmarks={bookmarks} onNavigate={onNavigate} onRemoveBookmark={onRemoveBookmark} />}
      </div>
    </div>
  );
};
