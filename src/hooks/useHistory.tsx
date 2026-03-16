import {
  useState,
  useCallback,
  useEffect
} from 'react';
import _ from 'lodash';

export interface HistoryItem {
  id: number;
  url: string;
  title: string;
  timestamp: number;
}

const HISTORY_KEY = 'copacetic_history';
const THIRTY_DAYS_MS = 2592000000;

export const useHistory = () => {
  const [
    history,
    setHistory
  ] = useState<HistoryItem[]>([]);

  const [ isInitialized, setIsInitialized ] = useState(false);

  useEffect(() => {
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    if (!_.isNull(storedHistory)) {
      try {
        const parsedHistory: HistoryItem[] = JSON.parse(storedHistory);
        const now = Date.now();
        const prunedHistory = parsedHistory.filter((item) => (now - item.timestamp) < THIRTY_DAYS_MS);
        setHistory(prunedHistory);
      } catch (error) {
        console.error('Failed to parse history:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Auto-save whenever history changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }
  }, [ history, isInitialized ]);

  const addHistoryItem = useCallback((url: string, title: string) => {
    setHistory((prev) => {
      const existingIndex = prev.findIndex((item) => item.url === url);

      if (existingIndex !== -1) {
        const existingItem = prev[existingIndex];

        if (Date.now() - existingItem.timestamp < 10000) {
          const newHistory = [...prev];
          newHistory[existingIndex] = {
            ...existingItem,
            title: title || existingItem.title
          };
          return newHistory;
        }

        const newHistory = [...prev];
        newHistory.splice(existingIndex, 1);
        return [
          { ...existingItem, title: title || existingItem.title, timestamp: Date.now() },
          ...newHistory
        ];
      }

      // Brand new unique URL, add it to the top
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
