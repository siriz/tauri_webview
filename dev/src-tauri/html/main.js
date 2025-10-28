// Main application script
document.addEventListener('DOMContentLoaded', () => {
  console.log('Application loaded');
  updateStatus('Application is ready');
  loadSystemInfo();
  setupEventListeners();
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
