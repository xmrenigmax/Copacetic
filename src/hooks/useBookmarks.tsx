import { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';

export interface Bookmark {
  id: number;
  url: string;
  title: string;
}

const BOOKMARKS_KEY = 'copacetic_bookmarks';

export const useBookmarks = () => {
  const [
    bookmarks,
    setBookmarks
  ] = useState<Bookmark[]>([]);

  const [
    isInitialized,
    setIsInitialized
  ] = useState(false);

  // Load from local storage on boot
  useEffect(() => {
    const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
    if (!_.isNull(storedBookmarks)) {
      try {
        const parsed = JSON.parse(storedBookmarks);
        if (!_.isEmpty(parsed)) {
          setBookmarks(parsed);
        }
      } catch (error) {
        console.error('Failed to parse bookmarks:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to local storage whenever bookmarks change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    }
  }, [ bookmarks, isInitialized ]);

  const addBookmark = useCallback((url: string, title: string) => {
    setBookmarks((prev) => {
      // Prevent duplicate bookmarks
      if (prev.some((b) => b.url === url)) {
        return prev;
      }
      return [ ...prev, { id: Date.now(), url, title } ];
    });
  }, []);

  const removeBookmark = useCallback((id: number) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return {
    bookmarks,
    addBookmark,
    removeBookmark
  };
};
