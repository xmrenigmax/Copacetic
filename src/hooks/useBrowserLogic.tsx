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

  const [
    isSidebarOpen,
    setIsSidebarOpen
  ] = useState(false);

  const [
    isCustomised,
    setIsCustomised
  ] = useState(true); // Default to true so we can see the glassy effects!

  const [
    sidebarWidth,
    setSidebarWidth
  ] = useState(320);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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

  const handleUpdateTabTitle = (id: number, title: string) => {
    setTabs((prevTabs) => prevTabs.map((tab) => tab.id === id ? {
      ...tab,
      title
    } : tab));
  };

  const handleUpdateTabUrl = (id: number, url: string) => {
    setTabs((prevTabs) => prevTabs.map((tab) => tab.id === id ? {
      ...tab,
      url
    } : tab));
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  return {
    tabs,
    activeTabId,
    activeTab,
    isSidebarOpen,
    isCustomised,
    sidebarWidth,
    setSidebarWidth,
    toggleSidebar,
    handleNavigate,
    handleAddTab,
    handleCloseTab,
    handleTabClick,
    handleUpdateTabTitle,
    handleUpdateTabUrl
  };
};