const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),

  // Menu events
  onMenuNewCampaign: (callback) => ipcRenderer.on('menu-new-campaign', callback),
  onMenuSettings: (callback) => ipcRenderer.on('menu-settings', callback),
  onMenuAbout: (callback) => ipcRenderer.on('menu-about', callback),

  // Remove listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),

  // Window controls
  windowMinimize: () => ipcRenderer.invoke('window-minimize'),
  windowMaximize: () => ipcRenderer.invoke('window-maximize'),
  windowClose: () => ipcRenderer.invoke('window-close'),
  windowIsMaximized: () => ipcRenderer.invoke('window-is-maximized'),

  // Future API methods for AI and social media integration
  // These will be implemented as the app grows
  
  // AI Comment Generation (placeholder)
  generateComment: (postContent, tone) => {
    // This will later connect to AI service
    return Promise.resolve(`AI generated comment for: ${postContent.substring(0, 50)}...`);
  },

  // Social Media API (placeholder)
  findPosts: (platform, keywords) => {
    // This will later connect to social media APIs
    return Promise.resolve([
      {
        id: '1',
        platform: platform,
        content: 'Sample post content...',
        author: 'user123',
        engagement: { likes: 10, comments: 5, shares: 2 },
        timestamp: new Date().toISOString()
      }
    ]);
  },

  // Post Comment (placeholder)
  postComment: (platform, postId, comment) => {
    // This will later connect to social media APIs
    return Promise.resolve({ success: true, commentId: 'comment123' });
  }
});
