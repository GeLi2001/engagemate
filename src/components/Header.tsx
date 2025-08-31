'use client';

import { useState } from 'react';

export default function Header() {
  const [showNewCampaign, setShowNewCampaign] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🤖</div>
          <h1 className="text-2xl font-bold text-gray-900">EngageMate</h1>
          <span className="text-sm text-gray-500">AI Marketing Agent</span>
        </div>
      </div>
    </header>
  );
}
