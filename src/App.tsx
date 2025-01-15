import React, { Suspense } from 'react';
import { DataProvider, useData } from './context/DataContext';

// @ts-ignore
const RemoteComponent = React.lazy(() => import('profilePreview/PreviewComponent'));

function RemoteWrapper() {
  const { data } = useData();
  
  return (
    <Suspense fallback={<div>Loading remote component...</div>}>
      <RemoteComponent {...data} />
    </Suspense>
  );
}

function App() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-4">Host Application</h1>
        <div className="bg-white rounded-lg shadow p-4">
          <RemoteWrapper />
        </div>
      </div>
    </DataProvider>
  );
}

export default App;