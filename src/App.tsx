import React, { useState, useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import ThemeProvider from './components/Shared/ThemeProvider';
import TopNavbar from './components/Shared/TopNavbar';
import SimpleDesigner from './components/Designer/SimpleDesigner';
import SimpleSidebar from './components/Designer/SimpleSidebar';
import SimplePreview from './components/Preview/SimplePreview';
import SimpleInspector from './components/Inspector/SimpleInspector';
import ValidationPanel from './components/Shared/ValidationPanel';
import { useSpecStore } from './store/specStore';

function App() {
  const [activeTab, setActiveTab] = useState<'design' | 'preview'>('design');
  const [inspectorVisible, setInspectorVisible] = useState(true);
  const [validationVisible, setValidationVisible] = useState(true);
  const initializeSpec = useSpecStore(state => state.initializeSpec);
  
  useEffect(() => {
    // Initialize the spec when the app loads
    initializeSpec();
  }, [initializeSpec]);

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen">
        <TopNavbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        
        <div className="flex flex-1 overflow-hidden">
          <SimpleSidebar />
          
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex flex-1 min-w-0">
              <ReactFlowProvider>
                <div className="flex-1">
                  {activeTab === 'design' ? (
                    <SimpleDesigner />
                  ) : (
                    <SimplePreview />
                  )}
                </div>
              </ReactFlowProvider>
              
              {inspectorVisible && <SimpleInspector />}
            </div>
            
            {validationVisible && <ValidationPanel />}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
