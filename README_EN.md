# TauriWebview

**Languages:** [한국어](README.md) | [English](README_EN.md) | [日本語](README_JA.md)

[![GitHub](https://img.shields.io/badge/GitHub-siriz%2Ftauri__webview-black?logo=github)](https://github.com/siriz/tauri_webview)

A lightweight desktop application using Tauri that displays HTML/CSS/JS files from the `html/` folder through an embedded web server as a desktop application.

### Key Features

- **No Browser Required**: Run HTML files directly as desktop applications without launching a browser in the local environment
- **No Additional Installation Needed**: Uses Windows built-in WebView, so it's lightweight and runs immediately without extra software installations
- **Fast Execution**: Provides fast and efficient performance with minimal resource consumption
- **Dynamic File Loading**: Modify HTML/CSS/JS files and see changes immediately with browser refresh (F5) without rebuilding the executable
- **User Customization**: End users can modify files in the `html/` folder after deployment

**GitHub Repository:** https://github.com/siriz/tauri_webview

## Features

- **Lightweight Executable**: All necessary resources are included in the package, allowing it to run without external internet connection
- **Embedded Web Server**: Dynamically serves files through embedded HTTP server (tiny_http) implemented in Rust
- **Real-time Editable**: Modify files in `html/` folder while exe is running and see changes immediately with browser refresh (F5)
- **Simple Configuration**: Easily customize window size, port, and other settings using the `config.ini` file
- **Native Performance**: Fast performance and security through Rust backend
- **Extensible**: Simple structure makes it easy to add new features

## System Requirements

- Windows 10 or higher
- No administrator privileges required
- No external software installation required

## Installation and Development Setup

### Requirements

1. **Rust Installation**: https://www.rust-lang.org/tools/install
2. **Node.js Installation**: https://nodejs.org/
3. **Tauri CLI Installation**: `cargo install tauri-cli`

### Project Setup

```bash
# Clone the repository
git clone <repository-url>
cd TauriWebview

# Navigate to dev folder and install dependencies
cd dev
npm install

# Start development server
npm run dev

# Build release version
npm run build
```

## Project Structure

```
TauriWebview/
├── dev/                       # All development source code
│   ├── src-tauri/            # Rust backend source
│   │   ├── src/
│   │   │   ├── main.rs       # Main entry point
│   │   │   └── lib.rs        # Embedded web server and core logic
│   │   ├── html/             # Web content for development (source)
│   │   │   ├── index.html
│   │   │   ├── styles.css
│   │   │   └── main.js
│   │   ├── Cargo.toml        # Rust dependencies (includes tiny_http)
│   │   ├── tauri.conf.json   # Tauri config (URL: http://localhost:8000)
│   │   ├── build.rs          # Build script (icon embedding)
│   │   ├── .cargo/
│   │   │   └── config.toml   # Build output path configuration
│   │   └── icons/
│   │       └── icon.ico      # Multi-size icon
│   ├── scripts/              # Build scripts
│   │   ├── copy-contents.js  # HTML file copy script
│   │   └── create-dist.js    # Distribution package creation script
│   ├── node_modules/         # npm dependencies
│   ├── package.json          # npm scripts and dependencies
│   ├── package-lock.json
│   └── tsconfig.json
├── build/                    # Build artifacts (auto-generated)
│   ├── debug/               # Debug build
│   ├── release/             # Release build
│   │   └── tauriwebview.exe (9.8MB)
│   └── dist/                # Final distribution package
│       ├── tauriwebview.exe
│       ├── config.ini       # User configuration file
│       ├── html/            # User-editable web content
│       │   ├── index.html
│       │   ├── styles.css
│       │   └── main.js
│       ├── README.md
│       ├── README_EN.md
│       └── README_JA.md
├── config.ini               # Application settings file (development)
├── .gitignore
├── .vscode/
│   ├── guide.md            # Development guidelines and rules
│   └── feature.md          # Feature specifications
└── README.md
```

## Distribution

After building, the distribution package is generated in the `build/dist/` folder:

```
build/dist/
├── tauriwebview.exe       # Executable file (9.8MB, includes embedded web server)
├── config.ini             # Configuration file (port, window size, etc.)
├── html/                  # User-editable web content
│   ├── index.html
│   ├── styles.css
│   └── main.js
├── README.md              # Korean guide
├── README_EN.md           # English guide
└── README_JA.md           # Japanese guide
```

Compress this folder and distribute it to users.

## User Guide

1. Run `tauriwebview.exe`
2. Application automatically starts web server at `http://localhost:8000`
3. Modify files in `html/` folder as desired
4. Press F5 (refresh) in the application to see changes immediately
5. If needed, change port number or window size in `config.ini`

## Configuration File (config.ini)

You can customize the application using the `config.ini` file:

```ini
[window]
width=800              # Window width (default: 800)
height=600             # Window height (default: 600)
x=100                  # Window X coordinate (optional)
y=100                  # Window Y coordinate (optional)
always_on_top=false    # Keep window on top (true/false)
resizable=true         # Allow window resizing (true/false)

[app]
name=TauriWebview      # Application name
version=0.1.0          # Version
port=8000              # Web server port number (default: 8000)
```

### How to Change Port

If port conflict occurs with other applications:

1. Open `config.ini` file in a text editor
2. Change `port` value in `[app]` section (e.g., `port=8080`)
3. Restart the application

## Icon Customization

To change the application icon:

### Windows Standard Icon Resolutions

| Resolution | Usage | Description |
|------------|-------|-------------|
| 16x16 | File Explorer | List view and small icons |
| 32x32 | Desktop, Taskbar | General display |
| 48x48 | Medium Icon | Control Panel and medium size |
| 64x64 | Tile View | Windows 10/11 tiles |
| 128x128 | Thumbnail Preview | File properties and large view |
| 256x256 | High DPI Display | 4K resolution and high resolution |

### Icon Creation Steps

1. **Prepare images in various resolutions**
   - Recommended resolutions: 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
   - Format: PNG (transparent background recommended)

2. **Convert to ICO file**
   - Online tool: https://convertio.co/png-ico/
   - Or with ImageMagick:
     ```bash
     magick convert icon-16.png icon-32.png icon-48.png icon-64.png icon-128.png icon-256.png icon.ico
     ```

3. **Save icon file**
   - Save to `dev/src-tauri/icons/icon.ico`
   - Overwrite the existing file

4. **Build and distribute**
   ```bash
   npm run build
   ```
   - The icon is automatically copied to `build/dist/icon.ico` during build

## Code Style

- **Indentation**: 4 spaces
- **Line Length**: 80 characters per line
- **Naming Convention**: camelCase (variables/functions), lowercase-hyphen (filenames)
- **Comments**: Written in English

## Commit Message Rules

- Write clearly and concisely
- Written in English
- Imperative mood: "Add feature" (not "Added feature")

## License

This project is distributed under the MIT License. For details, see the [LICENSE](LICENSE) file.

### Key Features of MIT License

- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ⚠️ License and copyright notice required

## References

- [Tauri Official Documentation](https://tauri.app/v1/guides/)
- [Rust Official Documentation](https://doc.rust-lang.org/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Windows Icon Guidelines](https://docs.microsoft.com/en-us/windows/apps/design/style/iconography/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
