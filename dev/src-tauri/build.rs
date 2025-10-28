fn main() {
    // Embed custom icon for Windows
    #[cfg(target_os = "windows")]
    {
        embed_resource::compile("icons/icon.ico", embed_resource::NONE);
    }
    
    tauri_build::build()
}
