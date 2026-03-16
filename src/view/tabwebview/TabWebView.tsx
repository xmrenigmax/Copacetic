import React, {
  useEffect,
  useRef
} from 'react';
import _ from 'lodash';
import {
  StartPageView
} from '../startpage/StartPageView';
import {
  ContextMenuItem
} from '@/hooks/useContextMenu';

interface Tab {
  id: number;
  url: string;
  title: string;
}

interface TabWebViewProps {
  tab: Tab;
  isActive: boolean;
  auroraTheme: string;
  openContextMenu: (x: number, y: number, items: ContextMenuItem[]) => void;
  onUpdateTitle: (id: number, title: string) => void;
  onUpdateUrl: (id: number, url: string) => void;
}

export const TabWebView = ({ tab, isActive, auroraTheme, openContextMenu, onUpdateTitle, onUpdateUrl }: TabWebViewProps) => {
  const webviewRef = useRef<any>(null);

  useEffect(() => {
    if (tab.url === 'copacetic://newtab') return;
    const webview = webviewRef.current;
    if (!_.isNull(webview)) {
      const handleTitleUpdate = (event: any) => onUpdateTitle(tab.id, event.title);
      const handleUrlUpdate = (event: any) => onUpdateUrl(tab.id, event.url);

      const handleContextMenu = (event: any) => {
        const { params } = event;
        const menuItems: ContextMenuItem[] = [];

        // 1. Standard User Navigation
        if (webview.canGoBack()) {
          menuItems.push({ id: 'back', label: 'Go Back', action: () => webview.goBack() });
        }
        if (webview.canGoForward()) {
          menuItems.push({ id: 'forward', label: 'Go Forward', action: () => webview.goForward() });
        }
        menuItems.push({ id: 'reload', label: 'Reload Page', action: () => webview.reload() });
        menuItems.push({ isDivider: true, id: 'div1', label: '', action: () => {} });

        // 2. Clipboard Actions
        if (!_.isNull(params.linkURL) && !_.isEmpty(params.linkURL)) {
          menuItems.push({ id: 'copy-link', label: 'Copy Link Address', action: () => navigator.clipboard.writeText(params.linkURL) });
        } else {
          menuItems.push({ id: 'copy-url', label: 'Copy Page URL', action: () => navigator.clipboard.writeText(tab.url) });
        }

        // 3. React Developer Tools
        menuItems.push({ isDivider: true, id: 'div2', label: '', action: () => {} });
        menuItems.push({ id: 'inspect', label: 'Inspect Element', action: () => webview.inspectElement(params.x, params.y) });

        openContextMenu(params.x, params.y, menuItems);
      };

      webview.addEventListener('page-title-updated', handleTitleUpdate);
      webview.addEventListener('did-navigate', handleUrlUpdate);
      webview.addEventListener('did-navigate-in-page', handleUrlUpdate);
      webview.addEventListener('context-menu', handleContextMenu);

      return () => {
        webview.removeEventListener('page-title-updated', handleTitleUpdate);
        webview.removeEventListener('did-navigate', handleUrlUpdate);
        webview.removeEventListener('did-navigate-in-page', handleUrlUpdate);
        webview.removeEventListener('context-menu', handleContextMenu);
      };
    }
  }, [ tab.id, tab.url, onUpdateTitle, onUpdateUrl, openContextMenu ]);

  if (tab.url === 'copacetic://newtab') {
    return (
      <StartPageView isActive={isActive} auroraTheme={auroraTheme} onNavigate={(newUrl) => onUpdateUrl(tab.id, newUrl)} />
    );
  }

  return (
    <webview ref={webviewRef} src={tab.url} className={`w-full flex-1 bg-white ${isActive ? 'flex' : 'hidden'}`} allowpopups={"true" as any} />
  );
};
