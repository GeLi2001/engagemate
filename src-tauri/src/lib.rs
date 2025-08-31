#[tauri::command]
async fn run_migrations() -> Result<String, String> {
    use std::process::Command;
    
    // Run Prisma migrations
    let output = Command::new("npx")
        .args(&["prisma", "db", "push", "--accept-data-loss"])
        .output()
        .map_err(|e| format!("Failed to run migrations: {}", e))?;
    
    if output.status.success() {
        Ok("Migrations completed successfully".to_string())
    } else {
        let error = String::from_utf8_lossy(&output.stderr);
        Err(format!("Migration failed: {}", error))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_sql::Builder::default().build())
    .plugin(tauri_plugin_updater::Builder::new().build())
    .plugin(tauri_plugin_process::init())
    .invoke_handler(tauri::generate_handler![run_migrations])
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
