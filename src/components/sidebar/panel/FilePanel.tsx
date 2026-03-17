import React, { useState } from 'react';
import _ from 'lodash';
import { useScrapbook } from '@/hooks/useScrapBook';

interface FilePanelProps {
  activeUrl: string;
}

export const FilePanel = ({ activeUrl }: FilePanelProps) => {
  const { snippets, addSnippet, removeSnippet } = useScrapbook();
  const [ isDragging, setIsDragging ] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const text = event.dataTransfer.getData('text');
    if (!_.isEmpty(text)) {
      addSnippet(text, activeUrl);
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-4 overflow-hidden">
      <h2 className="text-xs font-semibold tt-u text-gray-400 mb-4 tracking-wider">
        Scrapbook Stash
      </h2>
      <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`flex-1 overflow-y-auto rounded-2xl border transition-all duration-300 p-3 ${isDragging ? 'border-blue-500/50 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-white/10 bg-black/20 shadow-inner'}`}>
        {_.isEmpty(snippets) ? (
          <div className="text-xs text-gray-500 text-center mt-10">
            Drag and drop text here to save it.
          </div>
        ) : (
          snippets.map(snippet => (
            <div key={snippet.id} className="mb-3 p-3 bg-white/5 rounded-xl border border-white/5 shadow-sm backdrop-blur-md relative group">
              <p className="text-sm text-gray-200 wrap-break-words whitespace-pre-wrap leading-relaxed">
                {snippet.text}
              </p>
              <span className="text-[10px] text-gray-500 truncate block mt-2 opacity-60">
                {snippet.sourceUrl}
              </span>
              <button onClick={() => removeSnippet(snippet.id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-[10px] bg-red-500/20 text-red-300 hover:bg-red-500/40 px-2 py-1 rounded-md transition-all tt-u">
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
