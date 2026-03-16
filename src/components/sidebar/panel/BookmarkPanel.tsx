import React from 'react';
import _ from 'lodash';
import { Bookmark } from '@/hooks/useBookmarks';

interface BookmarksPanelProps {
  bookmarks: Bookmark[];
  onNavigate: (url: string) => void;
  onRemoveBookmark: (id: number) => void;
}

export const BookmarksPanel = ({ bookmarks, onNavigate, onRemoveBookmark }: BookmarksPanelProps) => {
  return (
    <div className="flex flex-col h-full w-full p-4 overflow-hidden">
      <h2 className="text-xs font-semibold tt-u text-white/50 tracking-wider mb-4">
        Bookmarks
      </h2>

      <div className="flex-1 overflow-y-auto pr-2 no-scrollbar space-y-2">
        {_.isEmpty(bookmarks) ? (
          <div className="text-xs text-white/30 text-center mt-10 font-light">
            No bookmarks saved yet.
          </div>
        ) : (
          bookmarks.map((bookmark) => (
            <div key={bookmark.id} onClick={() => onNavigate(bookmark.url)} className="p-3 bg-white/5 rounded-xl border border-white/5 shadow-sm hover:bg-white/10 transition-colors cursor-pointer group relative">
              <p className="text-sm text-white/90 truncate font-medium pr-6">
                {bookmark.title || bookmark.url}
              </p>
              <span className="text-[10px] text-white/40 truncate block mt-1 pr-6">
                {bookmark.url}
              </span>
              <button onClick={(e) => { e.stopPropagation(); onRemoveBookmark(bookmark.id); }} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all p-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
