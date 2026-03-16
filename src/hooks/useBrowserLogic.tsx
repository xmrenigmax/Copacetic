import { useEffect, useState } from 'react';
import _ from 'lodash';

export const useBrowserLogic = () => {
  const [
    tabs,
    setTabs
  ] = useState([
    {
      id: 1,
      url: 'copacetic://newtab',
      title: 'Start Page'
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
  ] = useState(true);
  const [
    sidebarWidth,
    setSidebarWidth
  ] = useState(320);
  const [
    isResizing,
    setIsResizing
  ] = useState(false);
  const [
    isSettingsOpen,
    setIsSettingsOpen
  ] = useState(false);
  const [
    auroraTheme,
    setAuroraTheme
  ] = useState('midnight');

  const [
    isInitialized,
    setIsInitialized
  ] = useState(false);

  // 1. Load Data on Boot
  useEffect(() => {
    const storedTabs = localStorage.getItem('copacetic_tabs');
    const storedActiveTabId = localStorage.getItem('copacetic_active_tab');
    const storedTheme = localStorage.getItem('copacetic_theme');

    if (!_.isNull(storedTabs)) {
      try {
        const parsedTabs = JSON.parse(storedTabs);
        if (!_.isEmpty(parsedTabs)) {
          setTabs(parsedTabs);
        }
      } catch (e) {}
    }

    if (!_.isNull(storedActiveTabId)) {
      setActiveTabId(Number(storedActiveTabId));
    }

    if (!_.isNull(storedTheme)) {
      setAuroraTheme(storedTheme);
    }

    setIsInitialized(true);
  }, []);

  // 2. Auto-save Engine
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('copacetic_tabs', JSON.stringify(tabs));
      localStorage.setItem('copacetic_active_tab', activeTabId.toString());
      localStorage.setItem('copacetic_theme', auroraTheme);
    }
  }, [ tabs, activeTabId, auroraTheme, isInitialized ]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleSettings = () => setIsSettingsOpen((prev) => !prev);

  const handleNavigate = (url: string) => {
    setTabs((prevTabs) => prevTabs.map((tab) => tab.id === activeTabId ? { ...tab, url } : tab));
  };

  const handleAddTab = () => {
    const newId = Date.now();
    setTabs((prevTabs) => [
      ...prevTabs,
      { id: newId, url: 'copacetic://newtab', title: 'Start Page' }
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
    setTabs((prevTabs) => prevTabs.map((tab) => tab.id === id ? { ...tab, title } : tab));
  };

  const handleUpdateTabUrl = (id: number, url: string) => {
    setTabs((prevTabs) => prevTabs.map((tab) => tab.id === id ? { ...tab, url } : tab));
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  return {
    tabs,
    activeTabId,
    activeTab,
    isSidebarOpen,
    isCustomised,
    sidebarWidth,
    isResizing,
    isSettingsOpen,
    auroraTheme,
    setSidebarWidth,
    setIsResizing,
    setAuroraTheme,
    toggleSidebar,
    toggleSettings,
    handleNavigate,
    handleAddTab,
    handleCloseTab,
    handleTabClick,
    handleUpdateTabTitle,
    handleUpdateTabUrl
  };
};
