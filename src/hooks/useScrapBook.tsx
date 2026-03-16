import { useState, useEffect } from 'react';
import _ from 'lodash';

interface Snippet {
  id: number;
  text: string;
  sourceUrl: string;
}

const SCRAPBOOK_KEY = 'copacetic_scrapbook';

export const useScrapbook = () => {
  const [
    snippets,
    setSnippets
  ] = useState<Snippet[]>([]);

  const [
    isInitialized,
    setIsInitialized
  ] = useState(false);

  // Load from local storage on boot
  useEffect(() => {
    const storedSnippets = localStorage.getItem(SCRAPBOOK_KEY);
    if (!_.isNull(storedSnippets)) {
      try {
        const parsed = JSON.parse(storedSnippets);
        if (!_.isEmpty(parsed)) {
          setSnippets(parsed);
        }
      } catch (error) {
        console.error('Failed to parse scrapbook data:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to local storage whenever a snippet is added or removed
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(SCRAPBOOK_KEY, JSON.stringify(snippets));
    }
  }, [ snippets, isInitialized ]);

  const addSnippet = (text: string, sourceUrl: string) => {
    if (!_.isEmpty(text)) {
      setSnippets((prev) => [
        {
          id: Date.now(),
          text,
          sourceUrl
        },
        ...prev
      ]);
    }
  };

  const removeSnippet = (id: number) => {
    setSnippets((prev) => prev.filter((s) => s.id !== id));
  };

  return {
    snippets,
    addSnippet,
    removeSnippet
  };
};
