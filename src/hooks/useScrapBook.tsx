import { useState } from 'react';
import _ from 'lodash';

interface Snippet {
  id: number;
  text: string;
  sourceUrl: string;
}

export const useScrapbook = () => {
  const [
    snippets,
    setSnippets
  ] = useState<Snippet[]>([]);

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