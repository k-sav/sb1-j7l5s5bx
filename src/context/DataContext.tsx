import React, { createContext, useContext, useState, useEffect } from 'react';

interface DataContextType {
  data: Record<string, unknown>;
  updateData: (newData: Record<string, unknown>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    // Listen for messages from React Native WebView
    const handleMessage = (event: MessageEvent) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
      } catch (error) {
        console.error('Failed to parse WebView message:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Signal to React Native that we're ready to receive data
    window.parent.postMessage(JSON.stringify({ type: 'READY' }), '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const updateData = (newData: Record<string, unknown>) => {
    setData(newData);
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}