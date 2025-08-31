'use client';

import { Suspense, useState } from 'react';
import Products from '@/components/Products';
import Comments from '@/components/Comments';
import Settings from '@/components/Settings';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function Home() {
  const [activeTab, setActiveTab] = useState('products');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'products':
        return <Products />;
      case 'comments':
        return <Comments />;
      case 'settings':
        return <Settings />;
      default:
        return <Products />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-6">
          <Suspense fallback={<div>Loading...</div>}>
            {renderActiveTab()}
          </Suspense>
        </main>
      </div>
    </div>
  );
}