import React from 'react';

export const AIPanel = () => {
  return (
    <div className="flex flex-col h-full w-full p-4">
      <h2 className="text-sm tt-u text-gray-400 mb-4">
        Copacetic AI
      </h2>
      <div className="flex-1 bg-primary/30 rounded-lg p-4 flex items-center justify-center bdR bdB">
        <p className="text-xs text-gray-500 text-center">
          AI Assistant ready to summarize and assist.
        </p>
      </div>
      <div className="mt-4 flex">
        <input type="text" placeholder="Ask Copilot..." className="flex-1 bg-primary rounded-l-lg px-3 py-2 text-xs outline-none text-white bdT bdB" />
        <button className="bg-blue-600 px-3 py-2 rounded-r-lg text-xs hover:bg-blue-500 transition-colors tt-u">
          Send
        </button>
      </div>
    </div>
  );
};
