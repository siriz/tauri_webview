use std::process::Command;

fn main() {
    // Git 커밋 카운트 가져오기 (버전 번호로 사용)
    let commit_count = Command::new("git")
        .args(&["rev-list", "--count", "HEAD"])
        .output()
        .ok()
        .and_then(|output| String::from_utf8(output.stdout).ok())
        .map(|s| s.trim().to_string())
        .unwrap_or_else(|| "0".to_string());
    
    // Git 커밋 해시 가져오기
    let git_hash = Command::new("git")
        .args(&["rev-parse", "--short=7", "HEAD"])
        .output()
        .ok()
        .and_then(|output| String::from_utf8(output.stdout).ok())
        .map(|s| s.trim().to_string())
        .unwrap_or_else(|| "unknown".to_string());
    
    // 버전 문자열 생성 (0.1.{commit_count})
    let version = format!("0.1.{}", commit_count);
    
    // 환경 변수로 설정
    println!("cargo:rustc-env=APP_VERSION={}", version);
    println!("cargo:rustc-env=GIT_HASH={}", git_hash);
    println!("cargo:rustc-env=COMMIT_COUNT={}", commit_count);
    
    // Embed custom icon for Windows
    #[cfg(target_os = "windows")]
    {
        embed_resource::compile("icons/icon.ico", embed_resource::NONE);
    }
    
    tauri_build::build()
}
