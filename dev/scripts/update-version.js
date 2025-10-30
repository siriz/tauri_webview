import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Git 커밋 카운트 가져오기
function getCommitCount() {
  try {
    const count = execSync('git rev-list --count HEAD', { encoding: 'utf-8' }).trim();
    return count;
  } catch (error) {
    console.error('Failed to get commit count:', error.message);
    return '0';
  }
}

// Git 커밋 해시 가져오기
function getGitHash() {
  try {
    const hash = execSync('git rev-parse --short=7 HEAD', { encoding: 'utf-8' }).trim();
    return hash;
  } catch (error) {
    console.error('Failed to get git hash:', error.message);
    return 'unknown';
  }
}

// 파일 내용에서 버전 패턴 치환
function replaceVersion(content, newVersion) {
  // 0.1.숫자 패턴을 모두 치환
  return content.replace(/0\.1\.\d+/g, newVersion);
}

// 파일 업데이트
function updateFile(filePath, newVersion) {
  try {
    const fullPath = path.resolve(__dirname, '..', '..', filePath);
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  파일 없음: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(fullPath, 'utf-8');
    const originalContent = content;
    
    // 버전 업데이트
    content = replaceVersion(content, newVersion);
    
    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf-8');
      console.log(`✅ 업데이트: ${filePath}`);
    } else {
      console.log(`⏭️  변경 없음: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ 실패: ${filePath} - ${error.message}`);
  }
}

// 메인 실행
function main() {
  const commitCount = getCommitCount();
  const gitHash = getGitHash();
  const newVersion = `0.1.${commitCount}`;
  
  console.log('\n🔧 버전 자동 업데이트 시작');
  console.log(`📦 새 버전: ${newVersion} (${gitHash})`);
  console.log('━'.repeat(50));
  
  // 업데이트할 파일 목록
  const filesToUpdate = [
    // Tauri 설정
    'dev/src-tauri/tauri.conf.json',
    'dev/src-tauri/Cargo.toml',
    
    // Node.js 설정
    'dev/package.json',
    'dev/package-lock.json',
    
    // 설정 파일
    'config.ini',
    
    // README 파일들
    'README.md',
    'README_EN.md',
    'README_JA.md',
    
    // 사용자 가이드
    'dev/readme/README_KO.txt',
    'dev/readme/README_EN.txt',
    'dev/readme/README_JA.txt'
  ];
  
  filesToUpdate.forEach(file => updateFile(file, newVersion));
  
  console.log('━'.repeat(50));
  console.log(`✨ 버전 업데이트 완료: ${newVersion}\n`);
}

main();
