---
title: "Mac 初期セットアップ＆カスタマイズガイド"
date: 2025-04-11
---
# 💻 Mac 初期セットアップ＆カスタマイズガイド

このページは、Mac mini (M4, 2025年) を導入してから行った初期設定や、アプリのセットアップ、キーボード・Finder・NASなどの環境整備を記録したものです。
## ✅ Homebrew のインストール

``` bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

その後、PATHを通す：

``` bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile eval "$(/opt/homebrew/bin/brew shellenv)"
```

確認：

``` bash
brew --version
```

## 📦 Brew で導入したアプリ（GUI）

``` bash
brew install --cask alfred
brew install --cask karabiner-elements
brew install --cask appcleaner
brew install --cask keycastr
brew install --cask warp
brew install --cask google-chrome
```

### 他に便利なGUIアプリの候補：

- Rectangle（ウィンドウ整列）
    
- Visual Studio Code
    
- Obsidian
    
- Raycast
    
- Notion
    
- Stats（メニューバーでCPUなどを表示）
    

## ⚙️ Brew CLI系おすすめツール

``` bash
brew install zoxide fzf bat eza ripgrep fd
brew install lazygit gh glow htop
brew install lolcat neofetch cmatrix
```

## 🔄 Brew の一括アップデート

``` bash
brew update && brew upgrade && brew cleanup
```

## 🧠 Alfred 活用例

- `obs new vocab:meticulous` → Obsidianに語彙ノート作成
    
- `obs daily` → 学習ログを作成
    
- `obs search moon base` → Vault内検索
    
- クリップボード履歴・スニペット展開・ワークフロー活用でMac操作を爆速化
    

## ✍️ Karabiner-Elements

Caps Lock → Ctrlや英数/かなキーのリマップに使用。細かいキーリマップやLayer風入力にも対応可能。

::: details 英字キーボードの場合
cmd（左）でアルファベット入力、cmd（右）で日本語入力にできる
:::

## 🧾 Finder & スクリーンショット設定

### NASをFinderに表示

1. `⌘ + K` → `smb://[NASのIP]` に接続
    
2. サイドバーにドラッグで固定
    
3. 「ログイン項目」に追加で自動マウント
    

### Finder 再起動

``` bash
killall Finder
```

または Option + 右クリックで「再度開く」

### スクリーンショットの保存先変更

- `⌘ + ⇧ + 5` → オプション → 「保存先」から任意の場所を選択
    

## 🧠 Obsidianとの統合

- Vault: `digital-garden`
    
- VitePressでGitHub Pages公開中
    
- `docs/english/eiken-pre-1/` に英検準1級の記録を構築
    
- AlfredでVault操作を高速化（ワークフロー構築中）
    