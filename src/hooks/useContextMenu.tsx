import { useState, useCallback } from 'react';
import _ from 'lodash';

export interface ContextMenuItem {
  id: string;
  label: string;
  action: () => void;
  isDivider?: boolean;
}

export const useContextMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [items, setItems] = useState<ContextMenuItem[]>([]);

  const openContextMenu = useCallback((x: number, y: number, menuItems: ContextMenuItem[]) => {
    setPosition({ x, y });
    setItems(menuItems);
    setIsOpen(true);
  }, []);

  const closeContextMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isContextOpen: isOpen,
    contextPosition: position,
    contextItems: items,
    openContextMenu,
    closeContextMenu
  };
};
