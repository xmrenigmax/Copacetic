import React from 'react';
import _ from 'lodash';

interface Tab {
  id: number;
  url: string;
  title: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTabId: number;
  onTabClick: (id: number) => void;
  onCloseTab: (id: number) => void;
  onAddTab: () => void;
  onToggleSidebar: () => void;
  onTabContextMenu: (x: number, y: number, tabId: number) => void;
}

export const TabBar = ({ tabs, activeTabId, onTabClick, onCloseTab, onAddTab, onToggleSidebar, onTabContextMenu }: TabBarProps) => {
  return (
    <div className="flex items-center flex-1 overflow-x-auto no-scrollbar">
      <button
        onClick={onToggleSidebar}
        className="mr-2 p-1.5 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {tabs.map(tab => (
        <div
          key={tab.id}
          onClick={() => onTabClick(tab.id)}
          onContextMenu={event => {
            event.preventDefault();
            onTabContextMenu(event.clientX, event.clientY, tab.id);
          }}
          className={`group relative flex items-center justify-between min-w-[120px] max-w-[180px] px-3 py-1 mr-1.5 rounded-md cursor-pointer transition-all duration-200 ${activeTabId === tab.id ? 'bg-white/15 text-white shadow-sm border border-white/10' : 'text-white/50 hover:bg-white/5 hover:text-white/80 border border-transparent'}`}
        >
          <span className="text-xs truncate font-medium tracking-wide">
            {tab.title}
          </span>
          <button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              onCloseTab(tab.id);
            }}
            className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-white ml-2 rounded-full p-0.5 transition-colors shrink-0"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={onAddTab}
        className="ml-1 p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};
