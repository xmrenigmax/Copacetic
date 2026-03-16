import React from 'react';
import _ from 'lodash';
import {
  ContextMenuItem
} from '@/hooks/useContextMenu';

interface ContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  items: ContextMenuItem[];
  onClose: () => void;
}

export const ContextMenu = ({ isOpen, position, items, onClose }: ContextMenuProps) => {
  if (!isOpen || _.isEmpty(items)) return null;

  return (
    <div className="fixed z-9999 bg-secondary border border-white/10 shadow-2xl rounded-xl py-1.5 min-w-[200px] bdT" style={{ top: position.y, left: position.x }} onClick={(event) => event.stopPropagation()}>
      {items.map((item, index) => {
        if (item.isDivider) {
          return <div key={`divider-${index}`} className="h-px bg-white/10 my-1 w-full" />;
        }
        return (
          <button key={item.id} onClick={() => { item.action(); onClose(); }} className="w-full text-left px-4 py-1.5 text-xs text-white/80 hover:bg-white/10 hover:text-white transition-colors tracking-wide">
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
