import { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';

export interface DownloadItem {
  id: string;
  filename: string;
  progress: number;
  state: 'downloading' | 'completed' | 'interrupted';
  url?: string;
}

export const useDownloads = (onDownloadComplete?: (filename: string, url: string) => void) => {
  const [ downloads, setDownloads ] = useState<DownloadItem[]>([]);

  const addDownload = useCallback((id: string, filename: string) => {
    setDownloads(prev => {
      if (prev.some(d => d.id === id)) {
        return prev;
      }
      return [ ...prev, { id, filename, progress: 0, state: 'downloading' } ];
    });
  }, []);

  const updateDownloadProgress = useCallback((id: string, progress: number, state: DownloadItem['state'], url?: string) => {
    setDownloads(prev => {
      const existing = prev.find(d => d.id === id);

      if (!_.isUndefined(existing) && existing.state !== 'completed' && state === 'completed' && !_.isUndefined(onDownloadComplete) && !_.isUndefined(url)) {
        setTimeout(() => onDownloadComplete(existing.filename, url), 0);
      }

      return prev.map(d => d.id === id ? { ...d, progress, state, url } : d);
    });
  }, [ onDownloadComplete ]);

  const clearCompletedDownloads = useCallback(() => {
    setDownloads(prev => prev.filter(d => d.state === 'downloading'));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.onDownloadStarted(data => {
        addDownload(data.id, data.filename);
      });

      window.electronAPI.onDownloadProgress(data => {
        updateDownloadProgress(data.id, data.progress, data.state, data.url);
      });

      return () => {
        window.electronAPI.removeDownloadListeners();
      };
    }
  }, [ addDownload, updateDownloadProgress ]);

  return {
    downloads,
    addDownload,
    updateDownloadProgress,
    clearCompletedDownloads
  };
};
