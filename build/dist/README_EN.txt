================================================================================
                        TauriWebview User Guide
================================================================================

Other Languages: README_KO.txt (한국어) | README_EN.txt (English) | README_JA.txt (日本語)

Thank You!
----------
Thank you for downloading TauriWebview!

This application displays HTML/CSS/JavaScript files from the html/ folder 
as a desktop application.


================================================================================
System Requirements
================================================================================

✓ Windows 10 or higher
✓ No administrator privileges required
✓ No external software installation required


================================================================================
How to Use
================================================================================

1. Basic Usage
--------------

  1) Double-click tauriwebview.exe to run
  2) The application automatically starts a web server at http://localhost:8000
  3) Contents from the html/ folder will be displayed in the window


2. Modifying Content
--------------------

  You can freely modify files in the html/ folder:

  • index.html - Main page
  • styles.css - Stylesheet
  • main.js - JavaScript code
  • You can also add images, audio, video, and PDF files

  [Keyboard Shortcuts]
  • F5: Refresh page (apply modified HTML/CSS/JS)
  • F11: Toggle fullscreen (fullscreen ↔ window mode)


3. Changing Settings (config.ini)
----------------------------------

  Open the config.ini file with Notepad to change settings:

  [window]
  width=800              # Window width
  height=600             # Window height
  x=100                  # Window X position (optional)
  y=100                  # Window Y position (optional)
  always_on_top=false    # Always on top (true/false)
  resizable=true         # Resizable (true/false)

  [app]
  port=8000              # Web server port (change if conflicts)

  [Important] You need to restart the application after changing settings.


================================================================================
Supported File Types
================================================================================

You can add the following files to the html/ folder:

Web files:
  HTML, CSS, JavaScript, JSON

Images:
  PNG, JPG, JPEG, GIF, SVG, WebP, BMP, ICO

Audio:
  MP3, WAV, OGG, M4A, AAC, FLAC

Video:
  MP4, WebM, AVI, MOV, MKV

Documents:
  PDF, TXT, XML

Fonts:
  WOFF, WOFF2, TTF, OTF


================================================================================
Troubleshooting
================================================================================

Q: Application won't start
A: • Port conflict: Try changing the port value in config.ini
     (e.g., 8080, 8888)
   • Firewall: Allow the application in Windows Firewall

Q: Changes to files are not reflected
A: 1) Press F5 key in the application window to refresh
   2) If that doesn't work, restart the application

Q: Page is not displayed
A: • Check if index.html file exists in the html/ folder
   • Check for errors in browser developer tools (F12 key)


================================================================================
License
================================================================================

This project is distributed under the MIT License.

[MIT License Features]
✓ Commercial use allowed
✓ Modification allowed
✓ Distribution allowed
✓ Private use allowed

[Condition]
• License and copyright notice must be included when using the software

For more details, see the LICENSE file in the project.


================================================================================
Developer Information
================================================================================

Project: TauriWebview
Developer: siriz
GitHub: https://github.com/siriz/tauri_webview
License: MIT License

[Technology Stack]
• Tauri 2.0 - Desktop application framework
• Rust - Backend language
• tiny_http - Embedded web server
• Windows WebView2 - Rendering engine

[Contributions & Inquiries]
If you have questions or issues, please register them on GitHub Issues:
https://github.com/siriz/tauri_webview/issues

Bug reports, feature suggestions, and pull requests are all welcome!


================================================================================
Additional Information
================================================================================

• Latest version: https://github.com/siriz/tauri_webview/releases
• Documentation: https://github.com/siriz/tauri_webview
• Issue tracker: https://github.com/siriz/tauri_webview/issues


================================================================================
                        Enjoy using TauriWebview!
================================================================================
