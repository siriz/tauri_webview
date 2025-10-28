# TauriWebview

**Languages:** [한국어](README.md) | [English](README_EN.md) | [日本語](README_JA.md)

[![GitHub](https://img.shields.io/badge/GitHub-siriz%2Ftauri__webview-black?logo=github)](https://github.com/siriz/tauri_webview)

A lightweight desktop application using Tauri that displays HTML/CSS/JS files from the `./contents/` folder as a desktop application.

### Key Features

- **No Browser Required**: Run HTML files directly as desktop applications without launching a browser in the local environment
- **No Additional Installation Needed**: Uses Windows built-in WebView, so it's lightweight and runs immediately without extra software installations
- **Fast Execution**: Provides fast and efficient performance with minimal resource consumption

**GitHub Repository:** https://github.com/siriz/tauri_webview

## Features

- **Lightweight Executable**: All necessary resources are included in the package, allowing it to run without external internet connection
- **Simple Configuration**: Easily customize window size, position, and other settings using the `config.ini` file
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
│   │   │   ├── main.rs
│   │   │   └── lib.rs
│   │   ├── Cargo.toml
│   │   ├── tauri.conf.json
│   │   ├── .cargo/
│   │   │   └── config.toml   # Build output path configuration
│   │   └── icons/
│   ├── scripts/              # Build scripts
│   │   └── copy-contents.js  # Content copying script
│   ├── node_modules/         # npm dependencies
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
├── contents/                 # Web content (development)
│   ├── index.html
│   ├── styles.css
│   ├── main.js
│   ├── icon.ico              # Application icon
│   ├── README.txt            # Quick start guide
│   ├── README_EN.txt         # English manual
│   ├── README_JA.txt         # Japanese manual
│   └── README_KO.txt         # Korean manual
├── build/                    # Build artifacts (auto-generated)
│   ├── debug/               # Debug build
│   ├── release/             # Release exe
│   │   └── tauriwebview.exe
│   └── dist/                # Final distribution package
│       ├── tauriwebview.exe
│       ├── config.ini
│       ├── icon.ico
│       ├── README.txt
│       ├── README_EN.txt
│       ├── README_JA.txt
│       ├── README_KO.txt
│       └── contents/
│           ├── index.html
│           ├── styles.css
│           ├── main.js
│           ├── icon.ico
│           ├── README.txt
│           ├── README_EN.txt
│           ├── README_JA.txt
│           └── README_KO.txt
├── config.ini               # Application settings file
├── .gitignore
├── .vscode/
│   ├── guide.md            # Development guidelines and rules
│   └── feature.md          # Feature specifications
├── LICENSE                  # License file
└── README.md
```

## Distribution

After building, the distribution package is generated in the `build/dist/` folder:

```
build/dist/
├── tauriwebview.exe       # Executable file (8.6MB)
├── config.ini             # Configuration file
├── icon.ico               # Application icon
├── README.txt             # Quick start guide
├── README_EN.txt          # English manual
├── README_JA.txt          # Japanese manual
├── README_KO.txt          # Korean manual
└── contents/              # Web content
```

Compress this folder and distribute it to users.

## User Distribution Guide

1. Compress the `build/dist/` folder
2. Distribute to users
3. Users extract the compressed file and run `tauriwebview.exe`
4. Users select their language manual from `README.txt`

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
```

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
