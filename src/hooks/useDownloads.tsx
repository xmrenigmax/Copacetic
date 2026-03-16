import {
  useState,
  useCallback,
  useEffect
} from 'react';
import _ from 'lodash';

export interface DownloadItem {
  id: string;
  filename: string;
  progress: number;
  state: 'downloading' | 'completed' | 'interrupted';
}

export const useDownloads = () => {
  const [
    downloads,
    setDownloads
  ] = useState<DownloadItem[]>([]);

  const addDownload = useCallback((id: string, filename: string) => {
    setDownloads((prev) => {
      if (prev.some((d) => d.id === id)) return prev;
      return [ ...prev, { id, filename, progress: 0, state: 'downloading' } ];
    });
  }, []);

  const updateDownloadProgress = useCallback((id: string, progress: number, state: DownloadItem['state']) => {
    setDownloads((prev) => prev.map((d) => d.id === id ? { ...d, progress, state } : d));
  }, []);

  const clearCompletedDownloads = useCallback(() => {
    setDownloads((prev) => prev.filter((d) => d.state === 'downloading'));
  }, []);

  // Listen for Electron IPC messages
  useEffect(() => {
    // Safely check if we are running inside Electron with nodeIntegration enabled
    if (typeof window !== 'undefined' && window.require) {
      const { ipcRenderer } = window.require('electron');

      const handleStarted = (event: any, data: { id: string; filename: string }) => {
        addDownload(data.id, data.filename);
      };

      const handleProgress = (event: any, data: { id: string; progress: number; state: DownloadItem['state'] }) => {
        updateDownloadProgress(data.id, data.progress, data.state);
      };

      ipcRenderer.on('download-started', handleStarted);
      ipcRenderer.on('download-progress', handleProgress);

      return () => {
        ipcRenderer.removeListener('download-started', handleStarted);
        ipcRenderer.removeListener('download-progress', handleProgress);
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
