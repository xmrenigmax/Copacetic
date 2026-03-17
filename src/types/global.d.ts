export {};

declare global {
  interface Window {
    electronAPI: {
      downloadURL: (url: string) => void;
      onDownloadStarted: (callback: (data: { id: string; filename: string }) => void) => void;
      onDownloadProgress: (callback: (data: { id: string; progress: number; state: 'downloading' | 'completed' | 'interrupted'; url?: string }) => void) => void;
      removeDownloadListeners: () => void;
    };
  }
}
