# 🌐 Yu Bot - Frontend (Next.js)

[🇺🇸 English](#english) | [🇯🇵 日本語](#japanese)

---

<a name="english"></a>
## 🇺🇸 Overview
An interactive AI interface built with Next.js (App Router), focusing on real-time chat experiences and multilingual text-to-speech.

### 🛠️ Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **State Management:** React Hooks
- **Styling:** Tailwind CSS

### ✨ Key Features
- **Auto-Scroll Tracking:** Seamlessly scrolls to the latest message using `useRef` and `useEffect`.
- **Intelligent TTS Switcher:** Custom logic to switch between Japanese and English voice engines based on content analysis.

---

<a name="japanese"></a>
## 🇯🇵 概要
Next.js (App Router) を使用した対話型AIインターフェースです。リアルタイムなチャット体験と、多言語音声合成にこだわりました。

### 🛠️ 技術スタック
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (useState, useEffect, useRef)
- **API Communication:** Fetch API (FastAPI backend)
- **Speech:** Web Speech API (Custom logic)

### ✨ こだわりポイント
- **自動スクロール追従:** `useRef` と `useEffect` を活用し、新しいメッセージが追加されるたびに最下部へスムーズにスクロール。ユーザーの手動操作を減らしました。
- **インテリジェントTTS:** 正規表現により言語を自動判定し、日本語・英語で適切なボイスエンジンを切り替えます。
- **スリープ復帰待機:** APIリクエスト中にローディング状態を視覚的に表示し、ユーザー体験を損なわない設計にしました。

---


```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```