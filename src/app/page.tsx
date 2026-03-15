'use client';

import React, { useState, useEffect } from 'react';
import { useBrowserLogic } from '@/hooks/useBrowserLogic';
import { AddressBar } from '@/components/addressbar/AddressBar';
import { TabBar } from '@/components/tabbar/TabBar';
import { TabWebview } from '@/view/tabwebview/TabWebView';

export default function Home() {
  const [
    isMounted,
    setIsMounted
  ] = useState(false);

  const {
    tabs,
    activeTabId,
    activeTab,
    handleNavigate,
    handleAddTab,
    handleCloseTab,
    handleTabClick,
    handleUpdateTabTitle
  } = useBrowserLogic();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-primary text-white">
      <div className="w-16 bdR bg-secondary flex flex-col items-center py-4">
        <div className="w-8 h-8 rounded-full bg-primary mb-4" />
      </div>
      <main className="flex flex-col flex-1">
        <header className="bdB bg-primary pt-2">
          <TabBar
            tabs={tabs}
            activeTabId={activeTabId}
            onTabClick={handleTabClick}
            onCloseTab={handleCloseTab}
            onAddTab={handleAddTab}
          />
          <div className="p-2">
            <AddressBar
              url={activeTab?.url || ''}
              onNavigate={handleNavigate}
            />
          </div>
        </header>
        <section className="flex-1 relative bg-white flex flex-col">
          {isMounted && tabs.map((tab) => (
            <TabWebview
              key={tab.id}
              tab={tab}
              isActive={activeTabId === tab.id}
              onUpdateTitle={handleUpdateTabTitle}
            />
          ))}
        </section>
      </main>
    </div>
  );
};