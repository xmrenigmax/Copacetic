import React from 'react';
import _ from 'lodash';
import { Bookmark as BookmarkType } from '@/hooks/useBookmarks';
import { PanelLeft, Plus, Star, X } from 'lucide-react';

interface Tab {
  id: number;
  url: string;
  title: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTabId: number;
  bookmarks: BookmarkType[];
  onTabClick: (id: number) => void;
  onCloseTab: (id: number) => void;
  onAddTab: () => void;
  onToggleSidebar: () => void;
  onTabContextMenu: (x: number, y: number, tabId: number) => void;
}

export const TabBar = ({ tabs, activeTabId, bookmarks, onTabClick, onCloseTab, onAddTab, onToggleSidebar, onTabContextMenu }: TabBarProps) => {
  return (
    <div className="flex items-center flex-1 overflow-x-auto no-scrollbar">
      <button onClick={onToggleSidebar} className="mr-2 p-1.5 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0">
        <PanelLeft size={16} />
      </button>
      {tabs.map(tab => {
        const isFavorited = _.some(bookmarks, { url: tab.url });
        return (
          <div key={tab.id} onClick={() => onTabClick(tab.id)} onContextMenu={event => { event.preventDefault(); onTabContextMenu(event.clientX, event.clientY, tab.id); }} className={`group relative flex items-center justify-between min-w-[120px] max-w-[180px] px-3 py-1 mr-1.5 rounded-md cursor-pointer transition-all duration-200 ${activeTabId === tab.id ? 'bg-white/15 text-white shadow-sm border border-white/10' : 'text-white/50 hover:bg-white/5 hover:text-white/80 border border-transparent'}`}>
            <div className="flex items-center overflow-hidden w-full">
              {isFavorited && (
                <Star size={12} fill="currentColor" className="flex-none shrink-0 mr-1.5 text-yellow-400 drop-shadow-md" />
              )}
              <span className="text-xs truncate font-medium tracking-wide">
                {tab.title}
              </span>
            </div>
            <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => { event.stopPropagation(); onCloseTab(tab.id); }} className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-white ml-2 rounded-full p-0.5 transition-colors shrink-0">
              <X size={12} />
            </button>
          </div>
        );
      })}
      <button onClick={onAddTab} className="ml-1 p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0">
        <Plus size={16} />
      </button>
    </div>
  );
};
