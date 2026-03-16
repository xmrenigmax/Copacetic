import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import _ from 'lodash';
import {
  StartPageView
} from '../startpage/StartPageView';
import {
  ErrorPageView
} from '../errorpage/ErrorPageView';
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
  onAddToHistory: (url: string, title: string) => void;
}

export const TabWebView = ({ tab, isActive, auroraTheme, openContextMenu, onUpdateTitle, onUpdateUrl, onAddToHistory }: TabWebViewProps) => {
  const webviewRef = useRef<any>(null);

  const [ isLoading, setIsLoading ] = useState(false);
  const [ errorData, setErrorData ] = useState<{ code: string; description: string; url: string } | null>(null);

  useEffect(() => {
    if (tab.url === 'copacetic://newtab') {
      setErrorData(null);
      setIsLoading(false);
      return;
    }

    const webview = webviewRef.current;
    if (!_.isNull(webview)) {
      const handleTitleUpdate = (event: any) => {
        onUpdateTitle(tab.id, event.title);

        if (!tab.url.startsWith('copacetic://')) {
          onAddToHistory(tab.url, event.title);
        }
      };

      const handleUrlUpdate = (event: any) => {
        setErrorData(null);
        onUpdateUrl(tab.id, event.url);
      };

      const handleStartLoading = () => setIsLoading(true);
      const handleStopLoading = () => setIsLoading(false);

      const handleFailLoad = (event: any) => {
        const {
          errorCode,
          errorDescription,
          validatedURL,
          isMainFrame
        } = event;
        if (isMainFrame && errorCode !== -3) {
          setIsLoading(false);
          setErrorData({ code: `ERR_${errorCode}`, description: errorDescription, url: validatedURL });
        }
      };

      const handleCrash = () => {
        setIsLoading(false);
        setErrorData({ code: 'CRASHED', description: 'The webview process unexpectedly crashed.', url: tab.url });
      };

      const handleContextMenu = (event: any) => {
        const { params } = event;
        const menuItems: ContextMenuItem[] = [];

        if (webview.canGoBack()) {
          menuItems.push({ id: 'back', label: 'Go Back', action: () => webview.goBack() });
        }

        if (webview.canGoForward()) {
          menuItems.push({ id: 'forward', label: 'Go Forward', action: () => webview.goForward() });
        }

        menuItems.push({ id: 'reload', label: 'Reload Page', action: () => webview.reload() });
        menuItems.push({ isDivider: true, id: 'div1', label: '', action: () => {} });

        if (!_.isNull(params.linkURL) && !_.isEmpty(params.linkURL)) {
          menuItems.push({ id: 'copy-link', label: 'Copy Link Address', action: () => navigator.clipboard.writeText(params.linkURL) });
        } else {
          menuItems.push({ id: 'copy-url', label: 'Copy Page URL', action: () => navigator.clipboard.writeText(tab.url) });
        }

        menuItems.push({ isDivider: true, id: 'div2', label: '', action: () => {} });
        menuItems.push({ id: 'inspect', label: 'Inspect Element', action: () => webview.inspectElement(params.x, params.y) });

        openContextMenu(params.x, params.y, menuItems);
      };

      webview.addEventListener('page-title-updated', handleTitleUpdate);
      webview.addEventListener('did-navigate', handleUrlUpdate);
      webview.addEventListener('did-navigate-in-page', handleUrlUpdate);
      webview.addEventListener('did-start-loading', handleStartLoading);
      webview.addEventListener('did-stop-loading', handleStopLoading);
      webview.addEventListener('did-fail-load', handleFailLoad);
      webview.addEventListener('crashed', handleCrash);
      webview.addEventListener('context-menu', handleContextMenu);

      return () => {
        webview.removeEventListener('page-title-updated', handleTitleUpdate);
        webview.removeEventListener('did-navigate', handleUrlUpdate);
        webview.removeEventListener('did-navigate-in-page', handleUrlUpdate);
        webview.removeEventListener('did-start-loading', handleStartLoading);
        webview.removeEventListener('did-stop-loading', handleStopLoading);
        webview.removeEventListener('did-fail-load', handleFailLoad);
        webview.removeEventListener('crashed', handleCrash);
        webview.removeEventListener('context-menu', handleContextMenu);
      };
    }
  }, [ tab.id, tab.url, onUpdateTitle, onUpdateUrl, openContextMenu ]);

  const handleRetry = () => {
    setErrorData(null);
    if (!_.isNull(webviewRef.current)) {
      webviewRef.current.reload();
    }
  };

  return (
    <div className={`w-full flex-1 relative flex-col ${isActive ? 'flex' : 'hidden'}`}>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-blue-500/80 to-transparent animate-pulse z-50 pointer-events-none" />
      )}

      {tab.url === 'copacetic://newtab' ? (
        <StartPageView isActive={isActive} auroraTheme={auroraTheme} onNavigate={(newUrl) => onUpdateUrl(tab.id, newUrl)} />
      ) : !_.isNull(errorData) ? (
        <ErrorPageView isActive={isActive} errorCode={errorData.code} errorDescription={errorData.description} failedUrl={errorData.url} onRetry={handleRetry} />
      ) : (
        <webview ref={webviewRef} src={tab.url} className="w-full flex-1 bg-white" allowpopups={"true" as any} />
      )}
    </div>
  );
};
