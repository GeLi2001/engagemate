'use client';

import { useState, useEffect } from 'react';

interface RedditSettings {
  clientId: string;
  clientSecret: string;
  userAgent: string;
}

export default function Settings() {
  const [settings, setSettings] = useState<RedditSettings>({
    clientId: '',
    clientSecret: '',
    userAgent: 'EngageMate:v1.0.0 (by /u/yourusername)'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('reddit-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage for now (later we'll use API)
      localStorage.setItem('reddit-settings', JSON.stringify(settings));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof RedditSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Reddit API Settings</h2>
          <p className="text-sm text-gray-600 mt-1">
            Configure your Reddit API credentials to enable auto-commenting
          </p>
        </div>

        <div className="px-6 py-4 space-y-6">
          {/* Reddit App Setup Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">📋 Setup Instructions</h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://www.reddit.com/prefs/apps" target="_blank" rel="noopener noreferrer" className="underline">reddit.com/prefs/apps</a></li>
              <li>Click &quot;Create App&quot; or &quot;Create Another App&quot;</li>
              <li>Choose &quot;script&quot; as the app type</li>
              <li>Set redirect URI to: <code className="bg-blue-100 px-1 rounded">http://localhost:3000</code></li>
              <li>Copy the Client ID and Secret below</li>
            </ol>
          </div>

          {/* Client ID */}
          <div>
            <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-2">
              Reddit Client ID
            </label>
            <input
              type="text"
              id="clientId"
              value={settings.clientId}
              onChange={(e) => handleInputChange('clientId', e.target.value)}
              placeholder="Enter your Reddit app client ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Found under your app name in the Reddit apps page
            </p>
          </div>

          {/* Client Secret */}
          <div>
            <label htmlFor="clientSecret" className="block text-sm font-medium text-gray-700 mb-2">
              Reddit Client Secret
            </label>
            <input
              type="password"
              id="clientSecret"
              value={settings.clientSecret}
              onChange={(e) => handleInputChange('clientSecret', e.target.value)}
              placeholder="Enter your Reddit app client secret"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              The secret key shown when you created the app
            </p>
          </div>

          {/* User Agent */}
          <div>
            <label htmlFor="userAgent" className="block text-sm font-medium text-gray-700 mb-2">
              User Agent
            </label>
            <input
              type="text"
              id="userAgent"
              value={settings.userAgent}
              onChange={(e) => handleInputChange('userAgent', e.target.value)}
              placeholder="EngageMate:v1.0.0 (by /u/yourusername)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Replace &quot;yourusername&quot; with your actual Reddit username
            </p>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-4">
            <div>
              {saveStatus === 'success' && (
                <span className="text-green-600 text-sm">✅ Settings saved successfully!</span>
              )}
              {saveStatus === 'error' && (
                <span className="text-red-600 text-sm">❌ Failed to save settings</span>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving || !settings.clientId || !settings.clientSecret}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      {settings.clientId && settings.clientSecret && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-green-900 mb-2">🎉 Ready for Reddit Integration!</h3>
          <p className="text-sm text-green-800">
            Your Reddit API credentials are configured. Next we&apos;ll add the ability to browse and comment on Reddit posts.
          </p>
        </div>
      )}
    </div>
  );
}
