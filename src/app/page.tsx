'use client';

import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useBrowserLogic } from '@/hooks/useBrowserLogic';
import { AddressBar } from '@/components/addressbar/AddressBar';
import { TabBar } from '@/components/tabbar/TabBar';
import { TabWebView } from '@/view/tabwebview/TabWebView';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { SettingsModal } from '@/components/settings/SettingsModal';
import { useContextMenu } from '@/hooks/useContextMenu';
import { ContextMenu } from '@/components/contextmenu/ContextMenu';
import { useHistory } from '@/hooks/useHistory';
import { useShortcuts } from '@/hooks/useShortcuts';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useDownloads } from '@/hooks/useDownloads';
import { DownloadManager } from '@/components/downloads/DownloadManager';
import { DownloadsDropdown } from '@/components/downloads/DownloadsDropdown';

export default function Home() {
  const [ isMounted, setIsMounted ] = useState(false);

  const {
    tabs,
    activeTabId,
    activeTab,
    isSidebarOpen,
    isCustomised,
    sidebarWidth,
    isResizing,
    isSettingsOpen,
    auroraTheme,
    setSidebarWidth,
    setIsResizing,
    setAuroraTheme,
    toggleSidebar,
    toggleSettings,
    handleNavigate,
    handleAddTab,
    handleCloseTab,
    handleTabClick,
    handleUpdateTabTitle,
    handleUpdateTabUrl
  } = useBrowserLogic();

  const { isContextOpen, contextPosition, contextItems, openContextMenu, closeContextMenu } = useContextMenu();

  useShortcuts(handleAddTab, handleCloseTab, activeTabId);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const { history, addHistoryItem, clearHistory } = useHistory();

  const { downloads, addDownload, updateDownloadProgress, clearCompletedDownloads } = useDownloads((filename, url) => {
    addHistoryItem(url, filename, 'download');
  });

  const handleTabContextMenu = (x: number, y: number, tabId: number) => {
    const targetTab = tabs.find(t => t.id === tabId);

    openContextMenu(x, y, [
      { id: 'bookmark', label: 'Pin to Bookmarks', action: () => {
        if (!_.isUndefined(targetTab) && !targetTab.url.startsWith('copacetic://')) {
          addBookmark(targetTab.url, targetTab.title);
        }
      }},
      { isDivider: true, id: 'div1', label: '', action: () => {} },
      { id: 'close', label: 'Close Tab', action: () => handleCloseTab(tabId) }
    ]);
  };

  const handleWebviewContextMenu = (x: number, y: number, linkUrl: string | null) => {
    const menuItems = [];
    if (!_.isNull(linkUrl) && !_.isEmpty(linkUrl)) {
      menuItems.push({ id: 'copy-link', label: 'Copy Link Address', action: () => navigator.clipboard.writeText(linkUrl) });
    } else {
      menuItems.push({ id: 'copy-url', label: 'Copy Page URL', action: () => navigator.clipboard.writeText(activeTab.url) });
    }
    openContextMenu(x, y, menuItems);
  };

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
    <>
      <SettingsModal isOpen={isSettingsOpen} onClose={toggleSettings} currentTheme={auroraTheme} onSelectTheme={setAuroraTheme} />
      <ContextMenu isOpen={isContextOpen} position={contextPosition} items={contextItems} onClose={closeContextMenu} />
      <div className="flex h-screen w-screen overflow-hidden bg-primary text-white">
        <div className={`flex relative z-10 overflow-hidden ${!isResizing ? 'transition-all duration-300 ease-in-out' : ''}`} style={{ width: isSidebarOpen ? `${sidebarWidth}px` : '0px' }}>
          <Sidebar isOpen={isSidebarOpen} isCustomised={isCustomised} activeUrl={activeTab?.url || ''} history={history} bookmarks={bookmarks} onNavigate={handleNavigate} onClearHistory={clearHistory} onRemoveBookmark={removeBookmark} onToggleSettings={toggleSettings} />
          {isSidebarOpen && (
            <div className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-blue-500/50 transition-colors z-50" onMouseDown={handleMouseDown} />
          )}
        </div>
        <main className="flex flex-col flex-1 overflow-hidden relative z-0">
          {isResizing && <div className="absolute inset-0 z-50 cursor-col-resize" />}
          <header className="bdB bg-primary flex items-center px-3 py-2 z-20 shadow-sm">
            <div className="flex-1 flex items-center overflow-hidden pr-4">
              <TabBar tabs={tabs} activeTabId={activeTabId} onTabClick={handleTabClick} onCloseTab={handleCloseTab} onAddTab={handleAddTab} onToggleSidebar={toggleSidebar} onTabContextMenu={handleTabContextMenu} />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="w-80">
                <AddressBar url={activeTab?.url || ''} onNavigate={handleNavigate} />
              </div>
              <DownloadsDropdown downloads={downloads} onClear={clearCompletedDownloads} />
            </div>
          </header>
          <section className="flex-1 relative flex flex-col">
            {isMounted && tabs.map(tab => (
              <TabWebView key={tab.id} tab={tab} isActive={activeTabId === tab.id} auroraTheme={auroraTheme} openContextMenu={openContextMenu} onUpdateTitle={handleUpdateTabTitle} onUpdateUrl={handleUpdateTabUrl} onAddToHistory={addHistoryItem} onAddBookmark={addBookmark} />
            ))}
          </section>
        </main>
      </div>
    </>
  );
}
