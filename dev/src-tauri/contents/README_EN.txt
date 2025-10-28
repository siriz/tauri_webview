================================================================================
TAURIWEBVIEW - USER MANUAL (ENGLISH)
================================================================================

QUICK START
-----------
1. Extract the folder contents to a location of your choice
2. Locate "tauriwebview.exe" in this folder
3. Double-click on "tauriwebview.exe" to launch the application

REQUIREMENTS
------------
- Windows 10 or higher
- No installation required
- No administrator privileges required
- Standalone executable (all dependencies included)

CONFIGURATION
-------------
To customize the application, edit the "config.ini" file:

    [window]
    width = 1024          # Window width in pixels
    height = 768          # Window height in pixels
    x = 100               # Window X position
    y = 100               # Window Y position
    always_on_top = false # Keep window on top (true/false)
    resizable = true      # Allow window resizing (true/false)

After editing, restart the application for changes to take effect.

FILES INCLUDED
--------------
- tauriwebview.exe     Main application executable
- config.ini           Application configuration file
- contents/            Web application resources
  - index.html         Main HTML file
  - main.js            JavaScript code
  - styles.css         Stylesheet
- README.txt           Multi-language guide
- README_EN.txt        English manual (this file)
- README_JA.txt        Japanese manual
- README_KO.txt        Korean manual

TROUBLESHOOTING
---------------
Application won't start:
  - Make sure all files are in the same folder
  - Verify config.ini syntax is correct
  - Try resetting config.ini to default values

Window not appearing:
  - Check x and y values in config.ini
  - Try setting x=0 and y=0 to position at top-left

Application is slow:
  - Close other applications to free up memory
  - Check your internet connection (if applicable)

SUPPORT
-------
For more information, please refer to the README files in other languages:
- README_JA.txt for Japanese
- README_KO.txt for Korean

================================================================================
