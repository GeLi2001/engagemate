import { check } from '@tauri-apps/plugin-updater';
import { invoke } from '@tauri-apps/api/core';

async function runDatabaseMigrations() {
  try {
    console.log('Running database migrations...');
    
    // Run Prisma migrations
    await invoke('run_migrations');
    
    console.log('Database migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    
    // Show user-friendly error
    alert('Database update failed. Please contact support or reinstall the app.');
    throw error;
  }
}

export async function checkForUpdates() {
  try {
    const update = await check();
    
    if (update?.available) {
      console.log(`Update available: ${update.version}`);
      
      // Show update dialog
      const shouldUpdate = confirm(
        `A new version (${update.version}) is available!\n\nWould you like to update now?`
      );
      
      if (shouldUpdate) {
        console.log('Downloading update...');
        
        // Download and install the update
        await update.downloadAndInstall();
        
        // Run database migrations before restart
        await runDatabaseMigrations();
        
        // Restart the app
        await invoke('plugin:process|restart');
      }
    } else {
      console.log('App is up to date');
    }
  } catch (error) {
    console.error('Failed to check for updates:', error);
  }
}

// Check for updates on app startup (with delay)
export function initAutoUpdater() {
  // Check for updates 5 seconds after app starts
  setTimeout(() => {
    checkForUpdates();
  }, 5000);
  
  // Then check every 24 hours
  setInterval(() => {
    checkForUpdates();
  }, 24 * 60 * 60 * 1000); // 24 hours
}
