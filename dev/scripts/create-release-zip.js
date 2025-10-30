import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..', '..');
const distDir = path.join(rootDir, 'build', 'dist');

// Read version from tauri.conf.json
const tauriConfPath = path.join(__dirname, '..', 'src-tauri', 'tauri.conf.json');
const tauriConf = JSON.parse(fs.readFileSync(tauriConfPath, 'utf-8'));
const version = tauriConf.version;

// Platform and architecture
const platform = 'windows';
const arch = 'x64';

const zipPath = path.join(rootDir, `tauriwebview-v${version}-${platform}-${arch}.zip`);

console.log('\n📦 Creating release distribution zip...');
console.log('━'.repeat(50));
console.log(`📌 Version: v${version}`);
console.log(`💻 Platform: ${platform}-${arch}`);

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('❌ Error: build/dist directory not found!');
  console.error('   Please run "npm run build" first.');
  process.exit(1);
}

// Remove old zip if exists
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
  console.log('🗑️  Removed old zip file');
}

// Create zip using PowerShell
try {
  const command = `Compress-Archive -Path "${distDir}\\*" -DestinationPath "${zipPath}"`;
  execSync(command, { 
    shell: 'powershell.exe',
    stdio: 'inherit' 
  });
  
  const stats = fs.statSync(zipPath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
  
  console.log('━'.repeat(50));
  console.log(`✅ Created: tauriwebview-v${version}-${platform}-${arch}.zip (${sizeMB} MB)`);
  console.log('📍 Location: ' + zipPath);
  console.log('\n💡 This file is ready for GitHub Release!\n');
  
} catch (error) {
  console.error('❌ Error creating zip:', error.message);
  process.exit(1);
}
