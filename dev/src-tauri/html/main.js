// Main application script
document.addEventListener('DOMContentLoaded', () => {
  console.log('Application loaded');
  updateStatus('Application is ready');
  loadSystemInfo();
  setupEventListeners();
  setupDragAndDrop();
});

function updateStatus(message) {
  const statusText = document.getElementById('status-text');
  if (statusText) {
    const timestamp = new Date().toLocaleTimeString();
    statusText.textContent = `[${timestamp}] ${message}`;
  }
}

function loadSystemInfo() {
  try {
    const info = {
      platform: getPlatform(),
      language: navigator.language,
      timestamp: new Date().toLocaleString()
    };
    
    document.getElementById('info-platform').textContent = info.platform;
    document.getElementById('info-language').textContent = info.language;
    document.getElementById('info-time').textContent = info.timestamp;
    
    updateStatus('System information loaded');
  } catch (error) {
    console.error('Error loading system info:', error);
    updateStatus('Error loading system info');
  }
}

function getPlatform() {
  if (navigator.platform.indexOf('Win') > -1) return 'Windows';
  if (navigator.platform.indexOf('Mac') > -1) return 'macOS';
  if (navigator.platform.indexOf('Linux') > -1) return 'Linux';
  return 'Unknown';
}

function setupEventListeners() {
  const btnAction = document.getElementById('btn-action');
  const btnReset = document.getElementById('btn-reset');
  
  if (btnAction) {
    btnAction.addEventListener('click', () => {
      updateStatus('Action button clicked!');
    });
  }
  
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      updateStatus('Reset button clicked');
      loadSystemInfo();
    });
  }
}

// Handle window resize
window.addEventListener('resize', () => {
  console.log(`Window resized to: ${window.innerWidth}x${window.innerHeight}`);
});

// Drag & Drop functionality
let droppedFiles = [];

function setupDragAndDrop() {
  const dropzone = document.getElementById('dropzone');
  
  if (!dropzone) {
    return;
  }

  // 테스트: 드래그 존 클릭 시 샘플 파일 추가
  dropzone.addEventListener('click', () => {
    updateStatus('Testing: Adding sample file...');
    const samplePath = 'C:\\Users\\Test\\sample.txt';
    addFilePathToList('sample.txt', samplePath);
    updateStatus('Click works! Now try dragging a file.');
  });

  // HTML5 기본 drag and drop (일단 이것만으로 테스트)
  dropzone.addEventListener('dragenter', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.add('drag-over');
    updateStatus('DRAG ENTER detected!');
  });

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.add('drag-over');
  });

  dropzone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.remove('drag-over');
    updateStatus('DRAG LEAVE detected');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.remove('drag-over');
    
    updateStatus('DROP detected! Processing files...');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      updateStatus(`Got ${files.length} files from HTML5 drop`);
      handleFiles(files);
    } else {
      updateStatus('No files in dataTransfer');
    }
  });

  // 전체 document에도 이벤트 추가 (Tauri 이벤트 캐치용)
  document.addEventListener('tauri://drag-enter', (event) => {
    updateStatus('Tauri drag-enter event!');
    dropzone.classList.add('drag-over');
  });

  document.addEventListener('tauri://drag-over', (event) => {
    dropzone.classList.add('drag-over');
  });

  document.addEventListener('tauri://drag-leave', (event) => {
    updateStatus('Tauri drag-leave event');
    dropzone.classList.remove('drag-over');
  });

  document.addEventListener('tauri://drag-drop', (event) => {
    updateStatus('Tauri drag-drop event!');
    dropzone.classList.remove('drag-over');
    
    const paths = event.detail?.paths || event.detail || [];
    
    if (paths.length > 0) {
      updateStatus(`Got ${paths.length} files from Tauri`);
      handleFilePaths(paths);
    } else {
      updateStatus('Tauri event but no paths');
    }
  });
  
  updateStatus('Drag & Drop initialized. Try clicking or dragging!');
}

function handleFiles(files) {
  [...files].forEach(file => {
    droppedFiles.push(file);
    addFileToList(file);
  });
  
  updateStatus(`${files.length} file(s) dropped successfully!`);
}

function handleFilePaths(paths) {
  // Tauri provides file paths as strings
  paths.forEach(path => {
    const fileName = path.split('\\').pop().split('/').pop();
    addFilePathToList(fileName, path);
  });
  
  updateStatus(`${paths.length} file(s) dropped successfully!`);
}

function addFileToList(file) {
  const fileList = document.getElementById('file-list');
  
  const fileItem = document.createElement('div');
  fileItem.className = 'file-item';
  
  const fileIcon = getFileIcon(file.type);
  const fileSize = formatFileSize(file.size);
  
  fileItem.innerHTML = `
    <div class="file-icon">${fileIcon}</div>
    <div class="file-info">
      <div class="file-name">${file.name}</div>
      <div class="file-details">${fileSize} • ${file.type || 'Unknown type'}</div>
    </div>
    <button class="file-remove" onclick="removeFile('${file.name}', this)">Remove</button>
  `;
  
  fileList.appendChild(fileItem);
}

function addFilePathToList(fileName, fullPath) {
  const fileList = document.getElementById('file-list');
  
  const fileItem = document.createElement('div');
  fileItem.className = 'file-item';
  
  const fileIcon = getFileIconFromName(fileName);
  
  fileItem.innerHTML = `
    <div class="file-icon">${fileIcon}</div>
    <div class="file-info">
      <div class="file-name">${fileName}</div>
      <div class="file-details">${fullPath}</div>
    </div>
    <button class="file-remove" onclick="removeFile('${fileName}', this)">Remove</button>
  `;
  
  fileList.appendChild(fileItem);
}

function getFileIconFromName(fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
  const videoExts = ['mp4', 'avi', 'mov', 'mkv', 'webm'];
  const audioExts = ['mp3', 'wav', 'ogg', 'flac', 'aac'];
  const documentExts = ['doc', 'docx', 'txt', 'rtf'];
  const spreadsheetExts = ['xls', 'xlsx', 'csv'];
  const presentationExts = ['ppt', 'pptx'];
  const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz'];
  
  if (imageExts.includes(ext)) return '🖼️';
  if (videoExts.includes(ext)) return '🎥';
  if (audioExts.includes(ext)) return '🎵';
  if (ext === 'pdf') return '📕';
  if (documentExts.includes(ext)) return '📘';
  if (spreadsheetExts.includes(ext)) return '📊';
  if (presentationExts.includes(ext)) return '📈';
  if (archiveExts.includes(ext)) return '📦';
  if (ext === 'txt') return '📄';
  
  return '📁';
}

function getFileIcon(type) {
  if (type.startsWith('image/')) return '🖼️';
  if (type.startsWith('video/')) return '🎥';
  if (type.startsWith('audio/')) return '🎵';
  if (type.startsWith('text/')) return '📄';
  if (type.includes('pdf')) return '📕';
  if (type.includes('zip') || type.includes('rar')) return '📦';
  if (type.includes('word')) return '📘';
  if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
  if (type.includes('powerpoint') || type.includes('presentation')) return '📈';
  return '📁';
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function removeFile(fileName, button) {
  droppedFiles = droppedFiles.filter(f => f.name !== fileName);
  button.parentElement.remove();
  updateStatus(`File "${fileName}" removed`);
}
