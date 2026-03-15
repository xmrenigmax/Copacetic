import { useState } from 'react';
import _ from 'lodash';

export const useBrowserLogic = () => {
  const [
    tabs,
    setTabs
  ] = useState([
    {
      id: 1,
      url: 'https://google.com',
      title: 'New Tab'
    }
  ]);

  const [
    activeTabId,
    setActiveTabId
  ] = useState(1);

  const handleUpdateTabTitle = (id: number, title: string) => {
    setTabs((prevTabs) => prevTabs.map((tab) => tab.id === id ? { ...tab, title } : tab));
  };

  const handleNavigate = (url: string) => {
    setTabs((prevTabs) => prevTabs.map((tab) => tab.id === activeTabId ? {
      ...tab,
      url
    } : tab));
  };

  const handleAddTab = () => {
    const newId = Date.now();
    setTabs((prevTabs) => [
      ...prevTabs,
      {
        id: newId,
        url: 'https://google.com',
        title: 'New Tab'
      }
    ]);
    setActiveTabId(newId);
  };

  const handleCloseTab = (id: number) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
    if (activeTabId === id && tabs.length > 1) {
      const remainingTabs = tabs.filter((tab) => tab.id !== id);
      if (!_.isEmpty(remainingTabs)) {
        setActiveTabId(remainingTabs[0].id);
      }
    }
  };

  const handleTabClick = (id: number) => {
    setActiveTabId(id);
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  return {
    tabs,
    activeTabId,
    activeTab,
    handleNavigate,
    handleAddTab,
    handleCloseTab,
    handleTabClick,
    handleUpdateTabTitle
  };
};