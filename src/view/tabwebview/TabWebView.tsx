import React, { useEffect, useRef } from 'react';
import _ from 'lodash';

interface Tab {
  id: number;
  url: string;
  title: string;
}

interface TabWebviewProps {
  tab: Tab;
  isActive: boolean;
  onUpdateTitle: (id: number, title: string) => void;
}

export const TabWebview = ({ tab, isActive, onUpdateTitle }: TabWebviewProps) => {
  const webviewRef = useRef<any>(null);

  useEffect(() => {
    const webview = webviewRef.current;
    if (!_.isNull(webview)) {
      const handleTitleUpdate = (event: any) => {
        onUpdateTitle(tab.id, event.title);
      };
      webview.addEventListener('page-title-updated', handleTitleUpdate);
      return () => {
        webview.removeEventListener('page-title-updated', handleTitleUpdate);
      };
    }
  }, [ tab.id, onUpdateTitle ]);

  return (
    <webview
      ref={webviewRef}
      src={tab.url}
      className={`w-full flex-1 ${isActive ? 'flex' : 'hidden'}`}
      allowpopups={"true" as any}
    />
  );
};