import React, { useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useSpecStore } from '../../store/specStore';
import { downloadAsJson, downloadAsYaml } from '../../utils/exportUtils';

interface TopNavbarProps {
  activeTab: 'design' | 'preview';
  setActiveTab: (tab: 'design' | 'preview') => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const { theme, setTheme } = useThemeStore();
  const { spec } = useSpecStore();
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  
  const handleExportJson = () => {
    downloadAsJson(spec);
    setExportMenuOpen(false);
  };
  
  const handleExportYaml = () => {
    downloadAsYaml(spec);
    setExportMenuOpen(false);
  };
  
  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm px-4 py-2 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <img src="/src/assets/logo.svg" alt="Logo" className="h-8 w-8" />
          <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Swagger Contract Builder
          </h1>
        </div>
        
        <div className="flex items-center">
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
            <button
              onClick={() => setActiveTab('design')}
              className={`px-3 py-1 ${activeTab === 'design' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              Design
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 ${activeTab === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              Preview
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            title="Toggle Theme"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
          
          <div className="border-l border-gray-300 dark:border-gray-600 h-5 mx-2"></div>
          
          <div className="relative">
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md flex items-center space-x-1"
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
            >
              <span>Export</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {exportMenuOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleExportJson}
                >
                  Export as JSON
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleExportYaml}
                >
                  Export as YAML
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
