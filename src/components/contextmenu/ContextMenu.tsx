import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { ContextMenuItem } from '@/hooks/useContextMenu';

interface ContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  items: ContextMenuItem[];
  onClose: () => void;
}

export const ContextMenu = ({ isOpen, position, items, onClose }: ContextMenuProps) => {
  const [ adjustedPos, setAdjustedPos ] = useState(position);

  useEffect(() => {
    if (isOpen) {
      const menuWidth = 220;
      const menuHeight = items.length * 35 + 10;
      let newX = position.x;
      let newY = position.y;

      if (newX + menuWidth > window.innerWidth) {
        newX = window.innerWidth - menuWidth - 10;
      }

      if (newY + menuHeight > window.innerHeight) {
        newY = window.innerHeight - menuHeight - 10;
      }

      setAdjustedPos({ x: newX, y: newY });
    }
  }, [ isOpen, position, items ]);

  if (!isOpen || _.isEmpty(items)) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-99998"
        onMouseDown={e => { e.preventDefault(); onClose(); }}
        onContextMenu={e => { e.preventDefault(); onClose(); }}
      />
      <div
        className="fixed z-99999 bg-[#0f0f0f]/95 backdrop-blur-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-xl py-1.5 min-w-[200px]"
        style={{ top: `${adjustedPos.y}px`, left: `${adjustedPos.x}px` }}
        onMouseDown={e => e.stopPropagation()}
        onClick={e => e.stopPropagation()}
        onContextMenu={e => e.stopPropagation()}
      >
        {items.map((item, index) => {
          if (item.isDivider) {
            return <div key={`divider-${index}`} className="h-px bg-white/10 my-1 w-full" />;
          }
          return (
            <button
              key={item.id}
              onClick={() => { item.action(); onClose(); }}
              className="w-full text-left px-4 py-2 text-xs font-medium text-white/80 hover:bg-blue-600 hover:text-white transition-colors tracking-wide"
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </>
  );
};
