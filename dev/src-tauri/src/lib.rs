// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use configparser::ini::Ini;
use std::path::PathBuf;
use std::thread;
use tiny_http::{Server, Request, Response, Header};
use std::fs;
use tauri::Manager;

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
        if let Some(center) = config.get("window", "center") {
            settings.insert("center".to_string(), center);
        }
        // Load app settings
        if let Some(name) = config.get("app", "name") {
            settings.insert("name".to_string(), name);
        }
        if let Some(version) = config.get("app", "version") {
            settings.insert("version".to_string(), version);
        }
        if let Some(port) = config.get("app", "port") {
            settings.insert("port".to_string(), port);
        }
        if let Some(single_instance) = config.get("app", "single_instance") {
            settings.insert("single_instance".to_string(), single_instance);
        }
    }
    
    settings
}

fn start_web_server(port: u16, html_dir: PathBuf) {
    thread::spawn(move || {
        let addr = format!("127.0.0.1:{}", port);
        let server = Server::http(&addr).expect("Failed to start web server");
        
        println!("🌐 Web server started at http://127.0.0.1:{}", port);
        println!("📁 Serving files from: {:?}", html_dir);
        
        for request in server.incoming_requests() {
            let html_dir = html_dir.clone();
            thread::spawn(move || {
                handle_request(request, html_dir);
            });
        }
    });
}

fn handle_request(request: Request, html_dir: PathBuf) {
    let mut path = request.url().to_string();
    if path == "/" {
        path = "/index.html".to_string();
    }
    
    // 경로 정규화 (보안)
    let file_path = html_dir.join(path.trim_start_matches('/'));
    
    let response = if file_path.exists() && file_path.is_file() {
        // 파일 읽기
        match fs::read(&file_path) {
            Ok(content) => {
                let mime_type = get_mime_type(&file_path);
                Response::from_data(content)
                    .with_header(Header::from_bytes(&b"Content-Type"[..], mime_type.as_bytes()).unwrap())
            }
            Err(_) => {
                Response::from_string("500 Internal Server Error").with_status_code(500)
            }
        }
    } else {
        Response::from_string("404 Not Found").with_status_code(404)
    };
    
    let _ = request.respond(response);
}

fn get_mime_type(path: &PathBuf) -> String {
    match path.extension().and_then(|s| s.to_str()) {
        // HTML/CSS/JS
        Some("html") => "text/html; charset=utf-8".to_string(),
        Some("css") => "text/css; charset=utf-8".to_string(),
        Some("js") => "application/javascript; charset=utf-8".to_string(),
        Some("json") => "application/json; charset=utf-8".to_string(),
        
        // Images
        Some("png") => "image/png".to_string(),
        Some("jpg") | Some("jpeg") => "image/jpeg".to_string(),
        Some("gif") => "image/gif".to_string(),
        Some("svg") => "image/svg+xml".to_string(),
        Some("webp") => "image/webp".to_string(),
        Some("bmp") => "image/bmp".to_string(),
        Some("ico") => "image/x-icon".to_string(),
        
        // Fonts
        Some("woff") => "font/woff".to_string(),
        Some("woff2") => "font/woff2".to_string(),
        Some("ttf") => "font/ttf".to_string(),
        Some("otf") => "font/otf".to_string(),
        
        // Audio
        Some("mp3") => "audio/mpeg".to_string(),
        Some("wav") => "audio/wav".to_string(),
        Some("ogg") => "audio/ogg".to_string(),
        Some("m4a") => "audio/mp4".to_string(),
        Some("aac") => "audio/aac".to_string(),
        Some("flac") => "audio/flac".to_string(),
        
        // Video
        Some("mp4") => "video/mp4".to_string(),
        Some("webm") => "video/webm".to_string(),
        Some("avi") => "video/x-msvideo".to_string(),
        Some("mov") => "video/quicktime".to_string(),
        Some("mkv") => "video/x-matroska".to_string(),
        
        // Documents
        Some("pdf") => "application/pdf".to_string(),
        Some("txt") => "text/plain; charset=utf-8".to_string(),
        Some("xml") => "application/xml; charset=utf-8".to_string(),
        
        _ => "application/octet-stream".to_string(),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let config = load_config();
    
    // config.ini에서 포트 읽기 (기본값: 8000)
    let port: u16 = config
        .get("port")
        .and_then(|p| p.parse().ok())
        .unwrap_or(8000);
    
    // 앱 이름과 버전 읽기
    let app_name = config.get("name").cloned().unwrap_or_else(|| "TauriWebview".to_string());
    
    // 빌드 시 생성된 버전과 Git 해시 사용
    let app_version = env!("APP_VERSION");
    let git_hash = env!("GIT_HASH");
    let window_title = format!("{} v{} ({})", app_name, app_version, git_hash);
    
    // exe 위치의 html 폴더 결정
    let exe_dir = std::env::current_exe()
        .ok()
        .and_then(|path| path.parent().map(|p| p.to_path_buf()))
        .unwrap_or_else(|| PathBuf::from("."));
    let html_dir = exe_dir.join("html");
    
    // 웹서버 시작 (별도 스레드)
    start_web_server(port, html_dir);
    
    // single_instance 설정 확인
    let use_single_instance = config
        .get("single_instance")
        .and_then(|s| s.parse::<bool>().ok())
        .unwrap_or(true);
    
    // Tauri 앱 시작
    let mut builder = tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build());
    
    // single instance 플러그인 조건부 추가
    if use_single_instance {
        builder = builder.plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            // 이미 실행 중인 인스턴스가 있을 때 실행되는 콜백
            println!("앱이 이미 실행 중입니다. 기존 창을 활성화합니다.");
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.unminimize();
                let _ = window.set_focus();
            }
        }));
    }
    
    builder.invoke_handler(tauri::generate_handler![greet])
        .setup(move |app| {
            use tauri_plugin_global_shortcut::{GlobalShortcutExt, Shortcut, ShortcutState};
            
            if let Some(window) = app.get_webview_window("main") {
                // 창 제목 설정
                let _ = window.set_title(&window_title);
                
                // config.ini에서 창 크기 및 위치 설정 적용
                if let Some(width_str) = config.get("width") {
                    if let Ok(width) = width_str.parse::<f64>() {
                        if let Some(height_str) = config.get("height") {
                            if let Ok(height) = height_str.parse::<f64>() {
                                let _ = window.set_size(tauri::Size::Physical(tauri::PhysicalSize {
                                    width: width as u32,
                                    height: height as u32,
                                }));
                            }
                        }
                    }
                }
                
                // 창 위치 설정
                let should_center = config.get("center")
                    .and_then(|c| c.parse::<bool>().ok())
                    .unwrap_or(false);
                
                if should_center {
                    // 화면 중앙에 배치
                    let _ = window.center();
                } else {
                    // x, y 좌표로 배치
                    if let Some(x_str) = config.get("x") {
                        if let Ok(x) = x_str.parse::<i32>() {
                            if let Some(y_str) = config.get("y") {
                                if let Ok(y) = y_str.parse::<i32>() {
                                    let _ = window.set_position(tauri::Position::Physical(tauri::PhysicalPosition {
                                        x,
                                        y,
                                    }));
                                }
                            }
                        }
                    }
                }
                
                // always_on_top 설정
                if let Some(always_on_top_str) = config.get("always_on_top") {
                    if let Ok(always_on_top) = always_on_top_str.parse::<bool>() {
                        let _ = window.set_always_on_top(always_on_top);
                    }
                }
                
                // resizable 설정
                if let Some(resizable_str) = config.get("resizable") {
                    if let Ok(resizable) = resizable_str.parse::<bool>() {
                        let _ = window.set_resizable(resizable);
                    }
                }
                
                // F11 전역 단축키 등록 (전체화면)
                let window_clone = window.clone();
                let shortcut_f11: Shortcut = "F11".parse().unwrap();
                
                app.handle().global_shortcut().on_shortcut(shortcut_f11.clone(), move |_app, _shortcut, event| {
                    if event.state == ShortcutState::Pressed {
                        if let Ok(is_fullscreen) = window_clone.is_fullscreen() {
                            let _ = window_clone.set_fullscreen(!is_fullscreen);
                        }
                    }
                });
                
                if let Err(e) = app.handle().global_shortcut().register(shortcut_f11) {
                    eprintln!("Failed to register F11 shortcut: {}", e);
                }
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
