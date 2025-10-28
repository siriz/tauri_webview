import fs from 'fs';
import path from 'path';

// dev 폴더 내에서 실행되므로, 루트는 상위 폴더(..)
const srcDir = '../contents';
const contentsDir = './src-tauri/contents';

// contents 디렉토리 생성
if (!fs.existsSync(contentsDir)) {
    fs.mkdirSync(contentsDir, { recursive: true });
}

// 복사할 파일 목록
const files = ['index.html', 'styles.css', 'main.js', 'icon.ico', 'README.txt', 'README_EN.txt', 'README_JA.txt', 'README_KO.txt'];

files.forEach(file => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(contentsDir, file);
    
    if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`✓ Copied ${file} to src-tauri/contents/`);
    } else {
        console.warn(`⚠ File not found: ${srcFile}`);
    }
});

console.log('✓ Contents folder synchronized');
