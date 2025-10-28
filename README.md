# TauriWebview

**Languages:** [한국어](README.md) | [English](README_EN.md) | [日本語](README_JA.md)

[![GitHub](https://img.shields.io/badge/GitHub-siriz%2Ftauri__webview-black?logo=github)](https://github.com/siriz/tauri_webview)

Tauri를 이용한 가벼운 데스크탑 애플리케이션으로, `./contents/` 폴더의 HTML/CSS/JS 파일을 데스크탑 애플리케이션 형태로 표시합니다.

### 핵심 특징

- **브라우저 불필요**: 브라우저를 실행하지 않고 로컬 환경에서 HTML을 직접 데스크탑 애플리케이션처럼 실행
- **추가 설치 불필요**: Windows에 기본 포함된 WebView를 사용하므로 매우 가볍고 추가 설치 없이 바로 실행 가능
- **빠른 실행**: 최소한의 리소스로 빠르고 효율적인 성능 제공

**GitHub Repository:** https://github.com/siriz/tauri_webview

## 특징

- **가벼운 실행파일**: 패키지에 필요한 모든 리소스가 포함되어 있어 외부 인터넷 연결 없이 동작
- **간단한 설정**: `config.ini` 파일로 창 크기, 위치, 항상 위 표시 여부 등을 쉽게 설정
- **네이티브 성능**: Rust 백엔드를 통한 빠른 성능과 보안
- **확장 가능**: 간단한 구조로 기능 추가가 용이

## 시스템 요구사항

- Windows 10 이상
- 관리자 권한 불필요
- 외부 소프트웨어 설치 불필요

## 설치 및 개발 환경 설정

### 필수 요구사항

1. **Rust 설치**: https://www.rust-lang.org/tools/install
2. **Node.js 설치**: https://nodejs.org/
3. **Tauri CLI 설치**: `cargo install tauri-cli`

### 프로젝트 설정

```bash
# 저장소 클론
git clone <repository-url>
cd TauriWebview

# dev 폴더에서 의존성 설치
cd dev
npm install

# 개발 서버 실행
npm run dev

# 릴리스 빌드
npm run build
```

## 프로젝트 구조

```
TauriWebview/
├── dev/                       # 모든 개발 소스코드
│   ├── src-tauri/            # Rust 백엔드 소스
│   │   ├── src/
│   │   │   ├── main.rs
│   │   │   └── lib.rs
│   │   ├── Cargo.toml
│   │   ├── tauri.conf.json
│   │   ├── .cargo/
│   │   │   └── config.toml   # 빌드 출력 경로 설정
│   │   └── icons/
│   ├── scripts/              # 빌드 스크립트
│   │   └── copy-contents.js  # 콘텐츠 복사 스크립트
│   ├── node_modules/         # npm 의존성
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
├── contents/                 # 웹 콘텐츠 (개발용)
│   ├── index.html
│   ├── styles.css
│   ├── main.js
│   ├── icon.ico              # 애플리케이션 아이콘
│   ├── README.txt            # 빠른 시작 가이드
│   ├── README_EN.txt         # 영어 매뉴얼
│   ├── README_JA.txt         # 일본어 매뉴얼
│   └── README_KO.txt         # 한국어 매뉴얼
├── build/                    # 빌드 결과물 (자동 생성)
│   ├── debug/               # 디버그 빌드
│   ├── release/             # exe 릴리즈
│   │   └── tauriwebview.exe
│   └── dist/                # 최종 배포 패키지
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
├── config.ini               # 앱 설정 파일
├── .gitignore
├── .vscode/
│   ├── guide.md            # 개발 지침 및 규칙
│   └── feature.md          # 기능 명세서
└── README.md
```

## 배포

빌드 완료 후 배포용 패키지는 `build/dist/` 폴더에 생성됩니다:

```
build/dist/
├── tauriwebview.exe       # 실행파일 (8.6MB)
├── config.ini             # 설정파일
├── icon.ico               # 애플리케이션 아이콘
├── README.txt             # 빠른 시작 가이드
├── README_EN.txt          # 영어 매뉴얼
├── README_JA.txt          # 일본어 매뉴얼
├── README_KO.txt          # 한국어 매뉴얼
└── contents/              # 웹 콘텐츠
```

이 폴더의 내용을 압축하여 사용자에게 배포하면 됩니다.

## 사용자 배포 가이드

1. `build/dist/` 폴더를 압축
2. 사용자에게 배포
3. 사용자는 압축을 해제한 후 `tauriwebview.exe` 실행
4. `README.txt`에서 자신의 언어 매뉴얼 선택

## 설정 파일 (config.ini)

`config.ini` 파일로 다음 항목을 설정할 수 있습니다:

```ini
[window]
width=800              # 창 너비 (기본값: 800)
height=600             # 창 높이 (기본값: 600)
x=100                  # 창 X 좌표 (선택사항)
y=100                  # 창 Y 좌표 (선택사항)
always_on_top=false    # 항상 위에 표시 여부
resizable=true         # 창 리사이즈 가능 여부

[app]
name=TauriWebview      # 애플리케이션 이름
version=0.1.0          # 버전
```

## 아이콘 커스터마이징

애플리케이션 아이콘을 변경하려면:

### Windows 표준 아이콘 해상도

| 해상도 | 용도 | 설명 |
|--------|------|------|
| 16x16 | 파일 탐색기 | 목록 보기 및 작은 아이콘 |
| 32x32 | 바탕화면, 작업 표시줄 | 일반적인 표시용 |
| 48x48 | 중간 아이콘 | 제어판 및 중간 크기 |
| 64x64 | 타일 보기 | Windows 10/11 타일 |
| 128x128 | 섬네일 미리보기 | 파일 속성 및 큰 보기 |
| 256x256 | High DPI 디스플레이 | 4K 해상도 및 고해상도 |

### 아이콘 제작 단계

1. **다양한 해상도의 이미지 준비**
   - 권장 해상도: 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
   - 형식: PNG (투명 배경 권장)

2. **ICO 파일로 변환**
   - 온라인 도구: https://convertio.co/png-ico/
   - 또는 ImageMagick 설치 후:
     ```bash
     magick convert icon-16.png icon-32.png icon-48.png icon-64.png icon-128.png icon-256.png icon.ico
     ```

3. **아이콘 파일 저장**
   - `dev/src-tauri/icons/icon.ico` 에 저장
   - 기존 파일을 덮어쓰기

4. **빌드 및 배포**
   ```bash
   npm run build
   ```
   - 빌드 시 자동으로 `build/dist/icon.ico`에 복사됨

### 아이콘 제작 단계

1. **다양한 해상도의 이미지 준비**
   - 권장 해상도: 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
   - 형식: PNG (투명 배경 권장)

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

### MIT 라이센스의 주요 특징

- ✅ 상업적 사용 가능
- ✅ 수정 가능
- ✅ 배포 가능
- ✅ 개인/사적 사용 가능
- ⚠️ 라이선스 및 저작권 표시 필수

## 참고 자료

- [Tauri 공식 문서](https://tauri.app/v1/guides/)
- [Rust 공식 문서](https://doc.rust-lang.org/)
- [Node.js 문서](https://nodejs.org/en/docs/)
- [Windows 아이콘 가이드라인](https://docs.microsoft.com/en-us/windows/apps/design/style/iconography/)
