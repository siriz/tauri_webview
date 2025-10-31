# TauriWebview

**Languages:** [한국어](README.md) | [English](README_EN.md) | [日本語](README_JA.md)

[![GitHub](https://img.shields.io/badge/GitHub-siriz%2Ftauri__webview-black?logo=github)](https://github.com/siriz/tauri_webview)
[![Version](https://img.shields.io/github/v/tag/siriz/tauri_webview?label=version)](https://github.com/siriz/tauri_webview/releases)

A lightweight desktop application using Tauri that displays HTML/CSS/JS files from the `html/` folder through an embedded web server as a desktop application.

**GitHub Repository:** https://github.com/siriz/tauri_webview

## 🚀 Quick Start

Want to test without building?

👉 Download the latest [**tauriwebview-v0.2.16-windows-x64.zip**](https://github.com/siriz/tauri_webview/releases/latest) from [**GitHub Releases**](https://github.com/siriz/tauri_webview/releases), extract it, and run `tauriwebview.exe`!

- The package includes the executable, configuration file, sample HTML, and user guides.
- You can test immediately without setting up a development environment.
- Works on Windows x64 systems.

## Key Features

- **No Browser Required**: Uses Windows built-in WebView2 to run HTML as desktop app without separate browser
- **No Additional Installation**: Runs immediately with just the exe file, no external software installation needed
- **Embedded Web Server**: Rust-based HTTP server (tiny_http) for dynamic file serving with port configuration support
- **Real-time Editing**: Modify files in `html/` folder while running and see changes with F5 (no rebuild needed)
- **Easy Configuration**: Customize window size, port, always-on-top, etc. easily with `config.ini`
- **Extensible**: Simple structure makes adding new features easy

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
├── dev/                              # All development source code
│   ├── src-tauri/                   # Rust backend source
│   │   ├── src/
│   │   │   ├── main.rs              # Main entry point
│   │   │   └── lib.rs               # Embedded web server and core logic
│   │   ├── html/                    # Web content for development (source)
│   │   │   ├── index.html           # Includes Drag & Drop sample
│   │   │   ├── styles.css
│   │   │   └── main.js
│   │   ├── icons/
│   │   │   └── icon.ico             # Multi-size icon (157KB)
│   │   ├── Cargo.toml               # Rust dependencies (tauri, tiny_http, configparser, etc.)
│   │   ├── tauri.conf.json          # Tauri config (dragDropEnabled: false)
│   │   ├── build.rs                 # Build script (auto Git version generation)
│   │   └── .cargo/
│   │       └── config.toml          # Build output path (../../build)
│   ├── readme/                      # User guides (TXT format)
│   │   ├── README_KO.txt
│   │   ├── README_EN.txt
│   │   └── README_JA.txt
│   ├── scripts/                     # Automation scripts
│   │   ├── update-version.js        # Auto version update based on Git
│   │   ├── copy-contents.js         # Copy HTML and README files
│   │   ├── create-dist.js           # Create distribution package
│   │   └── create-release-zip.js    # Generate versioned zip file
│   ├── package.json                 # npm scripts (prebuild/postbuild)
│   └── node_modules/                # npm dependencies
├── build/                           # Build artifacts (auto-generated, Git excluded)
│   └── dist/                        # Final distribution package
│       ├── tauriwebview.exe         # Executable (~9MB)
│       ├── config.ini               # User configuration file
│       ├── html/                    # User-editable web content
│       │   ├── index.html
│       │   ├── styles.css
│       │   └── main.js
│       ├── README_KO.txt            # Korean user guide
│       ├── README_EN.txt            # English user guide
│       └── README_JA.txt            # Japanese user guide
├── config.ini                       # App configuration (development template)
├── LICENSE                          # MIT License
├── README.md                        # Korean documentation for developers
├── README_EN.md                     # English documentation for developers
├── README_JA.md                     # Japanese documentation for developers
└── tauriwebview-v0.2.16-windows-x64.zip  # Distribution package (~3MB)
```

## Distribution

After building, the distribution package is generated in the `build/dist/` folder:

```
build/dist/
├── tauriwebview.exe       # Executable (9.2MB, includes embedded web server)
├── config.ini             # Configuration file (port, window size, etc.)
├── html/                  # User-editable web content
│   ├── index.html
│   ├── styles.css
│   └── main.js
├── README_KO.txt          # Korean user guide
├── README_EN.txt          # English user guide
└── README_JA.txt          # Japanese user guide
```

**Distribution Methods:**
- Auto-generated `tauriwebview-v{version}-windows-x64.zip` during build
- Upload to GitHub Releases for distribution
- Or directly distribute the `build/dist/` folder

## User Guide

1. Run `tauriwebview.exe`
2. Application automatically starts web server at `http://localhost:8000`
3. Modify files in `html/` folder as desired
4. Press F5 (refresh) in the application to see changes immediately
5. If needed, change port number or window size in `config.ini`

### Keyboard Shortcuts
- **F5**: Refresh page (apply modified HTML/CSS/JS)
- **F11**: Toggle fullscreen (fullscreen ↔ window mode)

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
name=TauriWebview      # Application name (displayed in window title)
version=0.2.16          # Version (auto-updated with Git commit count during build)
port=8000              # Web server port number (default: 8000)
```

**Note**: name and version are displayed in the window title in the format {name} v{version}.

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
