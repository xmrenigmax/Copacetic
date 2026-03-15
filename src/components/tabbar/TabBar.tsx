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
}

export const TabBar = ({ tabs, activeTabId, onTabClick, onCloseTab, onAddTab, onToggleSidebar }: TabBarProps) => {
  return (
    <div className="flex items-center w-full overflow-x-auto px-2">
      <button onClick={onToggleSidebar} className="mr-3 ml-1 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-secondary transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
      </button>
      {tabs.map((tab) => (
        <div key={tab.id} onClick={() => onTabClick(tab.id)} className={`group relative flex items-center justify-between min-w-[150px] max-w-[200px] px-3 py-2 mr-1 rounded-t-lg cursor-pointer transition-colors ${activeTabId === tab.id ? 'bg-secondary text-white' : 'bg-primary text-gray-400 hover:bg-secondary bdT bdR'}`}>
          <span className="text-xs truncate tt-u">
            {tab.title}
          </span>
          <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => { event.stopPropagation(); onCloseTab(tab.id); }} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white ml-2 rounded-full p-0.5">
            ✕
          </button>
        </div>
      ))}
      <button onClick={onAddTab} className="ml-2 text-xl text-gray-400 hover:text-white mb-1 transition-transform hover:scale-110">
        +
      </button>
    </div>
  );
};
