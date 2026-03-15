import React, { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  isCustomised: boolean;
}

export const Sidebar = ({ isOpen, isCustomised }: SidebarProps) => {
  const [
    activePanel,
    setActivePanel
  ] = useState('globe');

  const navItems = [
    { id: 'globe', icon: '/globe.svg', label: 'Web' },
    { id: 'file', icon: '/file.svg', label: 'Files' },
    { id: 'window', icon: '/window.svg', label: 'Tabs' }
  ];

  return (
    <div className={`h-full flex flex-col items-center py-4 bdR ${isCustomised ? 'bg-black/40 backdrop-blur-xl' : 'bg-secondary'} transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {navItems.map((item) => (
        <button key={item.id} onClick={() => setActivePanel(item.id)} className={`relative p-3 mb-4 rounded-xl transition-all duration-200 group ${activePanel === item.id ? 'bg-primary shadow-inner' : 'hover:bg-primary/50'}`}>
          <img src={item.icon} alt={item.label} className="w-5 h-5 opacity-70 group-hover:opacity-100 invert" />
        </button>
      ))}
    </div>
  );
};