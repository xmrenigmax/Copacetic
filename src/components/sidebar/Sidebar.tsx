import React, {
  useState
} from 'react';
import {
  FilePanel
} from './panel/FilePanel';
import {
  AIPanel
} from './panel/AIPanel';

interface SidebarProps {
  isOpen: boolean;
  isCustomised: boolean;
  activeUrl: string;
  onToggleSettings: () => void;
}

export const Sidebar = ({ isOpen, isCustomised, activeUrl, onToggleSettings }: SidebarProps) => {
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
        <div className="flex-1" />
        <button onClick={onToggleSettings} className="relative p-3 mb-4 rounded-xl transition-all duration-300 text-white hover:bg-white/5 opacity-50 hover:opacity-100 group">
          <svg className="w-5 h-5 transition-transform duration-500 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </button>
      </div>
      <div className="flex-1 flex flex-col bg-transparent overflow-hidden">
        {activePanel === 'file' && <FilePanel activeUrl={activeUrl} />}
        {activePanel === 'ai' && <AIPanel />}
      </div>
    </div>
  );
};
