import React, { useState } from 'react';
import { FilePanel } from './panel/FilePanel';
import { AIPanel } from './panel/AIPanel';

interface SidebarProps {
  isOpen: boolean;
  isCustomised: boolean;
  activeUrl: string;
}

export const Sidebar = ({ isOpen, isCustomised, activeUrl }: SidebarProps) => {
  const [
    activePanel,
    setActivePanel
  ] = useState('file');

  const navItems = [
    { id: 'ai', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, label: 'Copilot' },
    { id: 'globe', icon: <img src="/globe.svg" alt="Web" className="w-5 h-5 invert" />, label: 'Web' },
    { id: 'file', icon: <img src="/file.svg" alt="Files" className="w-5 h-5 invert" />, label: 'Files' },
    { id: 'window', icon: <img src="/window.svg" alt="Tabs" className="w-5 h-5 invert" />, label: 'Tabs' }
  ];

  return (
    <div className={`h-full flex w-full ${isCustomised ? 'bg-primary/40 backdrop-blur-2xl border-r border-white/10 shadow-2xl' : 'bg-secondary bdR'} transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-16 min-w-16 flex flex-col items-center py-4 bg-black/20 border-r border-white/5">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => setActivePanel(item.id)} className={`relative p-3 mb-4 rounded-xl transition-all duration-300 group ${activePanel === item.id ? 'bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] text-blue-400' : 'text-white hover:bg-white/5'}`}>
            <div className={`transition-opacity duration-300 ${activePanel === item.id ? 'opacity-100 scale-110' : 'opacity-50 group-hover:opacity-100'}`}>
              {item.icon}
            </div>
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col bg-transparent overflow-hidden">
        {activePanel === 'file' && <FilePanel activeUrl={activeUrl} />}
        {activePanel === 'ai' && <AIPanel />}
      </div>
    </div>
  );
};
