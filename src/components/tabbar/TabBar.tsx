import React from 'react';
import _ from 'lodash';
import { Bookmark } from '@/hooks/useBookmarks';

interface Tab {
  id: number;
  url: string;
  title: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTabId: number;
  bookmarks: Bookmark[];
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
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>
      {tabs.map(tab => {
        const isFavorited = _.some(bookmarks, { url: tab.url });
        return (
          <div key={tab.id} onClick={() => onTabClick(tab.id)} onContextMenu={event => { event.preventDefault(); onTabContextMenu(event.clientX, event.clientY, tab.id); }} className={`group relative flex items-center justify-between min-w-[120px] max-w-[180px] px-3 py-1 mr-1.5 rounded-md cursor-pointer transition-all duration-200 ${activeTabId === tab.id ? 'bg-white/15 text-white shadow-sm border border-white/10' : 'text-white/50 hover:bg-white/5 hover:text-white/80 border border-transparent'}`}>
            <div className="flex items-center overflow-hidden w-full">
              <span className="text-xs truncate font-medium tracking-wide">
                {tab.title}
              </span>
              {isFavorited && (
                <svg className="w-3 h-3 flex-none shrink-0 ml-1.5 text-yellow-400 drop-shadow-md" style={{ minWidth: 12, minHeight: 12 }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              )}
            </div>
            <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => { event.stopPropagation(); onCloseTab(tab.id); }} className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-white ml-2 rounded-full p-0.5 transition-colors shrink-0">
              ✕
            </button>
          </div>
        );
      })}
      <button onClick={onAddTab} className="ml-1 p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};
