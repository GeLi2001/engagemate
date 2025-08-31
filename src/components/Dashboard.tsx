'use client';

import { useState, useEffect } from 'react';

interface Stats {
  campaigns: number;
  posts: number;
  comments: number;
  engagement: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    campaigns: 0,
    posts: 0,
    comments: 0,
    engagement: 0
  });

  useEffect(() => {
    // TODO: Fetch real stats from API
    setStats({
      campaigns: 3,
      posts: 127,
      comments: 89,
      engagement: 12.5
    });
  }, []);

  const statCards = [
    { title: 'Active Campaigns', value: stats.campaigns, icon: '🎯', color: 'blue' },
    { title: 'Posts Found', value: stats.posts, icon: '📝', color: 'green' },
    { title: 'Comments Generated', value: stats.comments, icon: '💬', color: 'purple' },
    { title: 'Engagement Rate', value: `${stats.engagement}%`, icon: '📈', color: 'orange' },
  ];

  const quickActions = [
    {
      title: 'Find Posts',
      description: 'Search for relevant posts to engage with',
      icon: '🔍',
      action: () => console.log('Find posts')
    },
    {
      title: 'Generate Comment',
      description: 'Create AI-powered engaging comments',
      icon: '🤖',
      action: () => console.log('Generate comment')
    },
    {
      title: 'View Analytics',
      description: 'Check your engagement performance',
      icon: '📊',
      action: () => console.log('View analytics')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Welcome to EngageMate - Your AI Marketing Assistant</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">{card.icon}</div>
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.title}
              onClick={action.action}
              className="bg-white rounded-lg shadow p-6 text-left hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="text-2xl mr-4">{action.icon}</div>
                <div>
                  <h4 className="font-medium text-gray-900">{action.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📋</div>
              <p>No recent activity</p>
              <p className="text-sm">Start by creating a campaign or finding posts to engage with</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
