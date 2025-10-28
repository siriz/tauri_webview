import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// 경로 정의
const releaseExePath = path.join(projectRoot, '..', 'build', 'release', 'tauriwebview.exe');
const configIniPath = path.join(projectRoot, '..', 'config.ini');
const distPath = path.join(projectRoot, '..', 'build', 'dist');
const distHtmlPath = path.join(distPath, 'html');
const distReadmePath = distPath;
const htmlDir = path.join(projectRoot, 'src-tauri', 'html');
const readmeDir = path.join(projectRoot, 'readme');

// dist 디렉토리 생성
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

console.log('📦 Building distribution package...\n');

// dist 폴더 생성
ensureDir(distPath);
ensureDir(distHtmlPath);

// 1. exe 파일 복사
if (fs.existsSync(releaseExePath)) {
    fs.copyFileSync(releaseExePath, path.join(distPath, 'tauriwebview.exe'));
    console.log('✓ Copied tauriwebview.exe to dist/');
} else {
    console.warn('⚠ tauriwebview.exe not found');
}

// 2. config.ini 복사
if (fs.existsSync(configIniPath)) {
    fs.copyFileSync(configIniPath, path.join(distPath, 'config.ini'));
    console.log('✓ Copied config.ini to dist/');
} else {
    console.warn('⚠ config.ini not found');
}

// 3. HTML 폴더 전체 복사 (xcopy로 전부 복사)
if (fs.existsSync(htmlDir)) {
    try {
        execSync(`xcopy "${htmlDir}" "${distHtmlPath}" /E /I /Y`, { stdio: 'inherit' });
        console.log('✓ Copied html folder to dist/\n');
    } catch (error) {
        console.error('✗ Failed to copy html folder:', error.message);
    }
} else {
    console.warn(`⚠ HTML folder not found: ${htmlDir}`);
}

// 4. README 파일들 복사 (TXT 형식)
const readmeFiles = ['README_KO.txt', 'README_EN.txt', 'README_JA.txt'];
readmeFiles.forEach(file => {
    const srcFile = path.join(readmeDir, file);
    const destFile = path.join(distReadmePath, file);
    
    if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`✓ Copied ${file} to dist/`);
    } else {
        console.warn(`⚠ File not found: ${srcFile}`);
    }
});

console.log('\n✓ Distribution package created successfully!');
console.log(`📁 Output: ${distPath}`);
