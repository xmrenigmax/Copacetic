import { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';

export interface HistoryItem {
  id: number;
  url: string;
  title: string;
  timestamp: number;
  type?: 'page' | 'download';
}

const HISTORY_KEY = 'copacetic_history';
const THIRTY_DAYS_MS = 2592000000;

export const useHistory = () => {
  const [ history, setHistory ] = useState<HistoryItem[]>([]);
  const [ isInitialized, setIsInitialized ] = useState(false);

  useEffect(() => {
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    if (!_.isNull(storedHistory)) {
      try {
        const parsedHistory: HistoryItem[] = JSON.parse(storedHistory);
        const now = Date.now();
        const prunedHistory = parsedHistory.filter(item => (now - item.timestamp) < THIRTY_DAYS_MS);
        setHistory(prunedHistory);
      } catch(error) {
        console.error('Failed to parse history:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }
  }, [ history, isInitialized ]);

  const addHistoryItem = useCallback((url: string, title: string, type: 'page' | 'download' = 'page') => {
    setHistory(prev => {
      const existingIndex = prev.findIndex(item => item.url === url);

      if (existingIndex !== -1) {
        const existingItem = prev[existingIndex];
        const newHistory = [ ...prev ];
        
        if (Date.now() - existingItem.timestamp < 10000) {
          newHistory[existingIndex] = {
            ...existingItem,
            title: title || existingItem.title
          };
          return newHistory;
        }

        newHistory.splice(existingIndex, 1);
        return [
          { ...existingItem, title: title || existingItem.title, timestamp: Date.now() },
          ...newHistory
        ];
      }

      return [ { id: Date.now(), url, title, timestamp: Date.now(), type }, ...prev ];
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
