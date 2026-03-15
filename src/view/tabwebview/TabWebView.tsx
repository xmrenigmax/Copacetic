import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import { StartPage } from '../startpage/StartPageView';

interface Tab {
  id: number;
  url: string;
  title: string;
}

interface TabWebViewProps {
  tab: Tab;
  isActive: boolean;
  onUpdateTitle: (id: number, title: string) => void;
  onUpdateUrl: (id: number, url: string) => void;
}

export const TabWebView = ({ tab, isActive, onUpdateTitle, onUpdateUrl }: TabWebViewProps) => {
  const webviewRef = useRef<any>(null);

  useEffect(() => {
    if (tab.url === 'copacetic://newtab') return;
    const webview = webviewRef.current;
    if (!_.isNull(webview)) {
      const handleTitleUpdate = (event: any) => onUpdateTitle(tab.id, event.title);
      const handleUrlUpdate = (event: any) => onUpdateUrl(tab.id, event.url);
      webview.addEventListener('page-title-updated', handleTitleUpdate);
      webview.addEventListener('did-navigate', handleUrlUpdate);
      webview.addEventListener('did-navigate-in-page', handleUrlUpdate);
      return () => {
        webview.removeEventListener('page-title-updated', handleTitleUpdate);
        webview.removeEventListener('did-navigate', handleUrlUpdate);
        webview.removeEventListener('did-navigate-in-page', handleUrlUpdate);
      };
    }
  }, [ tab.id, tab.url, onUpdateTitle, onUpdateUrl ]);

  if (tab.url === 'copacetic://newtab') {
    return (
      <StartPage isActive={isActive} onNavigate={(newUrl) => onUpdateUrl(tab.id, newUrl)} />
    );
  }

  return (
    <webview ref={webviewRef} src={tab.url} className={`w-full flex-1 bg-white ${isActive ? 'flex' : 'hidden'}`} allowpopups={"true" as any} />
  );
};
