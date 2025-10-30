# TauriWebview

**言語:** [한국어](README.md) | [English](README_EN.md) | [日本語](README_JA.md)

[![GitHub](https://img.shields.io/badge/GitHub-siriz%2Ftauri__webview-black?logo=github)](https://github.com/siriz/tauri_webview)

Tauriを使用して、埋め込みWebサーバーを通じて`html/`フォルダ内のHTML/CSS/JSファイルをデスクトップアプリケーションとして表示する、軽量なデスクトップアプリケーションです。

**GitHubリポジトリ:** https://github.com/siriz/tauri_webview

## 🚀 クイックスタート

ビルドせずにすぐテストしたいですか？

👉 **[build/dist](build/dist)** フォルダのファイルをダウンロードするか、**[tauriwebview-dist.zip](tauriwebview-dist.zip)**をダウンロードして解凍後、`tauriwebview.exe`を実行してください！

- パッケージには実行ファイル、設定ファイル、サンプルHTML、ユーザーガイドが含まれています。
- 開発環境の構築なしにすぐにテストできます。

## 主な特徴

- **ブラウザ不要**: Windows内蔵WebView2を使用し、別途ブラウザなしでHTMLをデスクトップアプリとして実行
- **追加インストール不要**: exeファイルだけで即座に実行可能、外部ソフトウェアのインストール不要
- **埋め込みWebサーバー**: RustベースのHTTPサーバー(tiny_http)で動的ファイル提供、ポート設定をサポート
- **リアルタイム編集**: 実行中に`html/`フォルダのファイルを修正し、F5で即座に反映(再ビルド不要)
- **簡単な設定**: `config.ini`でウィンドウサイズ、ポート、常に前面表示などを簡単にカスタマイズ
- **拡張可能**: シンプルな構造により、新機能の追加が簡単

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
│   │   │   ├── main.rs       # メインエントリポイント
│   │   │   └── lib.rs        # 埋め込みWebサーバーとコアロジック
│   │   ├── html/             # 開発用Webコンテンツ (ソース)
│   │   │   ├── index.html
│   │   │   ├── styles.css
│   │   │   └── main.js
│   │   ├── icons/
│   │   │   └── icon.ico      # マルチサイズアイコン (157KB)
│   │   ├── Cargo.toml        # Rust依存関係 (tiny_http, configparser)
│   │   ├── tauri.conf.json   # Tauri設定 (URL: http://localhost:8000)
│   │   ├── build.rs          # ビルドスクリプト (アイコン埋め込み)
│   │   └── .cargo/
│   │       └── config.toml   # ビルド出力パス (../../build)
│   ├── readme/               # ユーザー向けガイド (TXT形式)
│   │   ├── README_KO.txt
│   │   ├── README_EN.txt
│   │   └── README_JA.txt
│   ├── scripts/              # ビルドスクリプト
│   │   ├── copy-contents.js  # HTMLとREADMEファイルをコピー
│   │   └── create-dist.js    # 配布パッケージを作成
│   ├── package.json          # npmスクリプト
│   └── node_modules/         # npm依存関係
├── build/                    # ビルドアーティファクト (自動生成)
│   └── dist/                 # 最終配布パッケージ
│       ├── tauriwebview.exe  # 実行ファイル (9.2MB)
│       ├── config.ini        # ユーザー設定ファイル
│       ├── html/             # ユーザー編集可能なWebコンテンツ
│       │   ├── index.html
│       │   ├── styles.css
│       │   └── main.js
│       ├── README_KO.txt     # 韓国語ユーザーガイド
│       ├── README_EN.txt     # 英語ユーザーガイド
│       └── README_JA.txt     # 日本語ユーザーガイド
├── config.ini                # アプリ設定 (開発用テンプレート)
├── LICENSE                   # MITライセンス
├── README.md                 # 開発者向け韓国語ドキュメント
├── README_EN.md              # 開発者向け英語ドキュメント
├── README_JA.md              # 開発者向け日本語ドキュメント
└── tauriwebview-dist.zip     # 配布用圧縮ファイル (2.81MB)
```

## 配布

ビルド後、配布パッケージが`build/dist/`フォルダに生成されます:

```
build/dist/
├── tauriwebview.exe       # 実行ファイル (9.2MB、埋め込みWebサーバー含む)
├── config.ini             # 設定ファイル (ポート、ウィンドウサイズなど)
├── html/                  # ユーザー編集可能なWebコンテンツ
│   ├── index.html
│   ├── styles.css
│   └── main.js
├── README_KO.txt          # 韓国語ユーザーガイド
├── README_EN.txt          # 英語ユーザーガイド
└── README_JA.txt          # 日本語ユーザーガイド
```

**配布方法:**
- `build/dist/`フォルダを圧縮してユーザーに配布
- またはプロジェクトルートの`tauriwebview-dist.zip`を使用

## ユーザー使用方法

1. `tauriwebview.exe`を実行
2. アプリケーションが`http://localhost:8000`で自動的にWebサーバーを起動
3. `html/`フォルダのファイルを必要に応じて修正
4. アプリケーションでF5(更新)を押して変更を即座に確認
5. 必要に応じて`config.ini`でポート番号やウィンドウサイズを変更

### ショートカットキー
- **F5**: ページ更新（修正されたHTML/CSS/JSを反映）
- **F11**: フルスクリーン切り替え（フルスクリーン ↔ ウィンドウモード）

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
name=TauriWebview      # アプリケーション名（ウィンドウタイトルに表示）
version=0.2.0          # バージョン（ビルド時にGitコミット数に基づいて自動更新）
port=8000              # Webサーバーポート番号 (デフォルト: 8000)
```

**注意**: nameとversionはウィンドウタイトルに{name} v{version}の形式で表示されます。

### ポート変更方法

他のアプリケーションとのポート競合が発生する場合:

1. `config.ini`ファイルをテキストエディタで開く
2. `[app]`セクションの`port`値を変更 (例: `port=8080`)
3. アプリケーションを再起動

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
