// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use configparser::ini::Ini;
use std::path::PathBuf;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn load_config() -> std::collections::HashMap<String, String> {
    let mut config = Ini::new();
    let config_path = PathBuf::from("config.ini");
    
    let mut settings = std::collections::HashMap::new();
    
    if let Ok(_) = config.load(config_path) {
        // Load default window settings
        if let Some(width) = config.get("window", "width") {
            settings.insert("width".to_string(), width);
        }
        if let Some(height) = config.get("window", "height") {
            settings.insert("height".to_string(), height);
        }
        if let Some(x) = config.get("window", "x") {
            settings.insert("x".to_string(), x);
        }
        if let Some(y) = config.get("window", "y") {
            settings.insert("y".to_string(), y);
        }
        if let Some(always_on_top) = config.get("window", "always_on_top") {
            settings.insert("always_on_top".to_string(), always_on_top);
        }
        if let Some(resizable) = config.get("window", "resizable") {
            settings.insert("resizable".to_string(), resizable);
        }
    }
    
    settings
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let _config = load_config();
    
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
