# TauriWebview

**言語:** [한국어](README.md) | [English](README_EN.md) | [日本語](README_JA.md)

[![GitHub](https://img.shields.io/badge/GitHub-siriz%2Ftauri__webview-black?logo=github)](https://github.com/siriz/tauri_webview)

Tauriを使用して、`./contents/`フォルダ内のHTML/CSS/JSファイルをデスクトップアプリケーションとして表示する、軽量なデスクトップアプリケーションです。

### 主な特徴

- **ブラウザ不要**: ブラウザを起動せずにローカル環境でHTMLをデスクトップアプリケーションのように直接実行
- **追加インストール不要**: Windowsに組み込まれたWebViewを使用しているため、非常に軽量で追加ソフトウェアのインストールなしに即座に実行可能
- **高速実行**: 最小限のリソースで高速かつ効率的なパフォーマンスを提供

**GitHubリポジトリ:** https://github.com/siriz/tauri_webview

## 機能

- **軽量実行ファイル**: 必要なすべてのリソースがパッケージに含まれており、外部インターネット接続なしで実行できます
- **シンプルな設定**: `config.ini`ファイルを使用してウィンドウサイズ、位置などを簡単にカスタマイズできます
- **ネイティブパフォーマンス**: Rustバックエンドによる高速パフォーマンスとセキュリティ
- **拡張可能**: シンプルな構造により、新機能の追加が簡単です

## システム要件

- Windows 10以上
- 管理者権限は不要です
- 外部ソフトウェアのインストールは不要です

## インストールと開発環境の構築

### 必須要件

1. **Rustのインストール**: https://www.rust-lang.org/tools/install
2. **Node.jsのインストール**: https://nodejs.org/
3. **Tauri CLIのインストール**: `cargo install tauri-cli`

### プロジェクト設定

```bash
# リポジトリをクローン
git clone <repository-url>
cd TauriWebview

# devフォルダに移動し、依存関係をインストール
cd dev
npm install

# 開発サーバーを起動
npm run dev

# リリースバージョンをビルド
npm run build
```

## プロジェクト構造

```
TauriWebview/
├── dev/                       # すべての開発ソースコード
│   ├── src-tauri/            # Rustバックエンドソース
│   │   ├── src/
│   │   │   ├── main.rs
│   │   │   └── lib.rs
│   │   ├── Cargo.toml
│   │   ├── tauri.conf.json
│   │   ├── .cargo/
│   │   │   └── config.toml   # ビルド出力パス設定
│   │   └── icons/
│   ├── scripts/              # ビルドスクリプト
│   │   └── copy-contents.js  # コンテンツコピースクリプト
│   ├── node_modules/         # npm依存関係
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
├── contents/                 # Webコンテンツ (開発用)
│   ├── index.html
│   ├── styles.css
│   ├── main.js
│   ├── icon.ico              # アプリケーションアイコン
│   ├── README.txt            # クイックスタートガイド
│   ├── README_EN.txt         # 英語マニュアル
│   ├── README_JA.txt         # 日本語マニュアル
│   └── README_KO.txt         # 韓国語マニュアル
├── build/                    # ビルドアーティファクト (自動生成)
│   ├── debug/               # デバッグビルド
│   ├── release/             # リリース実行ファイル
│   │   └── tauriwebview.exe
│   └── dist/                # 最終配布パッケージ
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
├── config.ini               # アプリケーション設定ファイル
├── .gitignore
├── .vscode/
│   ├── guide.md            # 開発ガイドラインとルール
│   └── feature.md          # 機能仕様
├── LICENSE                  # ライセンスファイル
└── README.md
```

## 配布

ビルド後、配布パッケージが`build/dist/`フォルダに生成されます:

```
build/dist/
├── tauriwebview.exe       # 実行ファイル (8.6MB)
├── config.ini             # 設定ファイル
├── icon.ico               # アプリケーションアイコン
├── README.txt             # クイックスタートガイド
├── README_EN.txt          # 英語マニュアル
├── README_JA.txt          # 日本語マニュアル
├── README_KO.txt          # 韓国語マニュアル
└── contents/              # Webコンテンツ
```

このフォルダを圧縮してユーザーに配布します。

## ユーザー配布ガイド

1. `build/dist/`フォルダを圧縮
2. ユーザーに配布
3. ユーザーが圧縮ファイルを抽出し、`tauriwebview.exe`を実行
4. ユーザーが`README.txt`から使用言語のマニュアルを選択

## 設定ファイル (config.ini)

`config.ini`ファイルを使用してアプリケーションをカスタマイズできます:

```ini
[window]
width=800              # ウィンドウ幅 (デフォルト: 800)
height=600             # ウィンドウ高さ (デフォルト: 600)
x=100                  # ウィンドウX座標 (オプション)
y=100                  # ウィンドウY座標 (オプション)
always_on_top=false    # ウィンドウを常に前面に保つ (true/false)
resizable=true         # ウィンドウをリサイズ可能 (true/false)

[app]
name=TauriWebview      # アプリケーション名
version=0.1.0          # バージョン
```

## アイコンのカスタマイズ

アプリケーションアイコンを変更するには:

### Windows標準アイコン解像度

| 解像度 | 用途 | 説明 |
|--------|------|------|
| 16x16 | ファイルエクスプローラ | リストビューと小さいアイコン |
| 32x32 | デスクトップ、タスクバー | 一般的な表示 |
| 48x48 | 中程度のアイコン | コントロールパネルと中程度 |
| 64x64 | タイルビュー | Windows 10/11タイル |
| 128x128 | サムネイル表示 | ファイルプロパティと大きなビュー |
| 256x256 | 高DPI表示 | 4K解像度と高解像度 |

### アイコン作成手順

1. **様々な解像度の画像を準備**
   - 推奨解像度: 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
   - 形式: PNG (透明背景を推奨)

2. **ICOファイルに変換**
   - オンラインツール: https://convertio.co/png-ico/
   - またはImageMagickで:
     ```bash
     magick convert icon-16.png icon-32.png icon-48.png icon-64.png icon-128.png icon-256.png icon.ico
     ```

3. **アイコンファイルを保存**
   - `dev/src-tauri/icons/icon.ico`に保存
   - 既存ファイルを上書き

4. **ビルドして配布**
   ```bash
   npm run build
   ```
   - ビルド中にアイコンが自動的に`build/dist/icon.ico`にコピーされます

## コードスタイル

- **インデント**: 4スペース
- **行長**: 1行80文字
- **命名規則**: camelCase (変数/関数), lowercase-hyphen (ファイル名)
- **コメント**: 英語で記述

## コミットメッセージルール

- 明確かつ簡潔に書く
- 英語で書く
- 命令形: "Add feature" (「Added feature」ではなく)

## ライセンス

このプロジェクトはMITライセンスの下で配布されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

### MITライセンスの主な特徴

- ✅ 商用利用可能
- ✅ 改変可能
- ✅ 配布可能
- ✅ 私的利用可能
- ⚠️ ライセンスと著作権表示が必須

## 参考資料

- [Tauri公式ドキュメント](https://tauri.app/v1/guides/)
- [Rust公式ドキュメント](https://doc.rust-lang.org/)
- [Node.jsドキュメント](https://nodejs.org/en/docs/)
- [Windowsアイコンガイドライン](https://docs.microsoft.com/en-us/windows/apps/design/style/iconography/)

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。詳細は[LICENSE](LICENSE)ファイルを参照してください。
