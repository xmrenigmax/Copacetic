import { useEffect } from 'react';

export const useShortcuts = (
  handleAddTab: () => void,
  handleCloseTab: (id: number) => void,
  activeTabId: number
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? event.metaKey : event.ctrlKey;

      if (modifier && event.key.toLowerCase() === 't') {
        event.preventDefault();
        handleAddTab();
      } else if (modifier && event.key.toLowerCase() === 'w') {
        event.preventDefault();
        handleCloseTab(activeTabId);
      } else if (modifier && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        const addressBar = document.getElementById('address-bar-input');
        if (addressBar) {
          addressBar.focus();
          (addressBar as HTMLInputElement).select();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ handleAddTab, handleCloseTab, activeTabId ]);
};
