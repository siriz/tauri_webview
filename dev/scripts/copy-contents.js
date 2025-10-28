import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// dev 폴더 내에서 실행되므로, 상대 경로로 설정
const srcHtmlDir = './src-tauri/html';
const srcReadmeDir = './readme';
const distHtmlDir = '../build/dist/html';
const distReadmeDir = '../build/dist';

// 디렉토리 생성 함수
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

console.log('📦 Copying files...\n');

// dist 디렉토리 생성
ensureDir(distHtmlDir);
ensureDir(distReadmeDir);

// HTML 폴더 전체 복사 (전부 복사)
console.log('→ Copying src-tauri/html to build/dist/html...');
try {
    // Windows에서 /Y는 덮어쓰기 확인 안 함
    execSync(`xcopy "${srcHtmlDir}" "${distHtmlDir}" /E /I /Y`, { stdio: 'inherit' });
    console.log('✓ HTML folder copied successfully\n');
} catch (error) {
    console.error('✗ Failed to copy HTML folder:', error.message);
}

// README 파일들 복사 (TXT 형식만)
const readmeFiles = ['README_KO.txt', 'README_EN.txt', 'README_JA.txt'];
readmeFiles.forEach(file => {
    const srcFile = path.join(srcReadmeDir, file);
    const destFile = path.join(distReadmeDir, file);
    
    if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`✓ Copied ${file}`);
    } else {
        console.warn(`⚠ File not found: ${srcFile}`);
    }
});

console.log('\n✓ Contents folder synchronized successfully!');
