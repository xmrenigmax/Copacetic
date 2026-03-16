'use client';

import React, { useState, useEffect } from 'react';
import { useBrowserLogic } from '@/hooks/useBrowserLogic';
import { AddressBar } from '@/components/addressbar/AddressBar';
import { TabBar } from '@/components/tabbar/TabBar';
import { TabWebView } from '@/view/tabwebview/TabWebView';
import { Sidebar } from '@/components/sidebar/Sidebar';

export default function Home() {
  const [
    isMounted,
    setIsMounted
  ] = useState(false);
  const {
    tabs,
    activeTabId,
    activeTab,
    isSidebarOpen,
    isCustomised,
    sidebarWidth,
    isResizing,
    setSidebarWidth,
    setIsResizing,
    toggleSidebar,
    handleNavigate,
    handleAddTab,
    handleCloseTab,
    handleTabClick,
    handleUpdateTabTitle,
    handleUpdateTabUrl
  } = useBrowserLogic();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    const startX = e.clientX;
    const startWidth = sidebarWidth;
    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(240, Math.min(startWidth + (moveEvent.clientX - startX), 800));
      setSidebarWidth(newWidth);
    };
    const onMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-primary text-white">
      <div className={`flex relative z-10 overflow-hidden ${!isResizing ? 'transition-all duration-300 ease-in-out' : ''}`} style={{ width: isSidebarOpen ? `${sidebarWidth}px` : '0px' }}>
        <Sidebar isOpen={isSidebarOpen} isCustomised={isCustomised} activeUrl={activeTab?.url || ''} />
        {isSidebarOpen && (
          <div className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-blue-500/50 transition-colors z-50" onMouseDown={handleMouseDown} />
        )}
      </div>
      <main className="flex flex-col flex-1 overflow-hidden relative z-0">
        {isResizing && <div className="absolute inset-0 z-50 cursor-col-resize" />}
        <header className="bdB bg-primary pt-2">
          <TabBar tabs={tabs} activeTabId={activeTabId} onTabClick={handleTabClick} onCloseTab={handleCloseTab} onAddTab={handleAddTab} onToggleSidebar={toggleSidebar} />
          <div className="p-2">
            <AddressBar url={activeTab?.url || ''} onNavigate={handleNavigate} />
          </div>
        </header>
        <section className="flex-1 relative flex flex-col">
          {isMounted && tabs.map((tab) => (
            <TabWebView key={tab.id} tab={tab} isActive={activeTabId === tab.id} onUpdateTitle={handleUpdateTabTitle} onUpdateUrl={handleUpdateTabUrl} />
          ))}
        </section>
      </main>
    </div>
  );
};