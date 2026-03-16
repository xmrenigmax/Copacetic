import { useState, useCallback } from 'react';
import _ from 'lodash';

export interface HistoryItem {
  id: number;
  url: string;
  title: string;
  timestamp: number;
}

export const useHistory = () => {
  const [
    history,
    setHistory
  ] = useState<HistoryItem[]>([]);

  const addHistoryItem = useCallback((url: string, title: string) => {
    setHistory((prev) => {
      // Prevent spamming the history with consecutive duplicate URLs
      if (!_.isEmpty(prev) && prev[0].url === url) {
        return prev;
      }
      return [ { id: Date.now(), url, title, timestamp: Date.now() }, ...prev ];
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    addHistoryItem,
    clearHistory
  };
};
