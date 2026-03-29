# 🤖 Another Me - Interactive AI Clone
[🇺🇸 English](#english) | [🇯🇵 日本語](#japanese) | [Structure](#structure)

---

<a name="english"></a>
## 🇺🇸 Overview
Yu Bot is a full-stack AI application featuring my **"Digital Clone,"** trained on my professional background and skill sets.

### 🚀 Why I Built This
* **Self-Analysis:** To conduct mock interviews with my own clone, discovering hidden strengths and areas for improvement from an objective perspective.
* **Pre-Interview Experience:** To provide recruiters with an interactive portfolio where they can explore my experiences and personality before an actual interview.

### 🛠️ Tech Stack
* **Frontend:** Next.js (Typescript), Tailwind CSS
* **Backend:** FastAPI (Python)
* **AI:** Gemini 2.5 Flash API
* **Infrastructure:** Vercel (Frontend), Render (Backend)
* **CI/CD:** GitHub Actions

### ✨ Key Technical Highlights
* **Lightweight RAG Implementation:**
    By injecting my career data into the system prompt, I minimized AI hallucinations and ensured the bot provides highly accurate information.
* **UX Optimization (React Hooks):**
    Leveraged `useEffect` and `useRef` to implement **smooth auto-scrolling**. To solve Render's "cold start" issue, I integrated **UptimeRobot** for 24/7 availability, ensuring instant responses.
* **Intelligent Multilingual TTS:**
    Developed a custom language detection logic using Regular Expressions. It automatically identifies Japanese or English and switches the Web Speech API voice engine accordingly.

---

<a name="japanese"></a>
## 🇯🇵 概要
Yu Botは、私自身の経歴やスキルセットを学習させた**「デジタル・クローン」**と対話ができるフルスタックAIアプリケーションです。

### 🚀 開発の動機
* **客観的な自己分析:** 自分自身のクローンと模擬面接を行うことで、客観的な視点から自分の強みや改善点を発見するため。
* **プレ・インタビュー:** 採用担当者様が、実際の面接の前に私の経験や考え方をカジュアルに知ることができるインタラクティブなポートフォリオを提供したかったため。

### 🛠️ 技術スタック
* **Frontend:** Next.js (Typescript), Tailwind CSS
* **Backend:** FastAPI (Python)
* **AI:** Gemini 2.5 Flash API
* **Infrastructure:** Vercel (Frontend), Render (Backend)
* **CI/CD:** GitHub Actions (Automated Build & Testing)

### ✨ 技術的なこだわり (Technical Challenges)
* **RAG (検索拡張生成) の簡易実装:**
    経歴データをシステムプロンプトに注入。ハルシネーション（AIの嘘）を抑制し、事実に基づいた正確な回答を実現しました。
* **UXの最適化 (React Hooks):**
    `useEffect` と `useRef` を活用し、メッセージ生成時の**自動スクロール追従**を実装。また、Renderのコールドスタート対策として **UptimeRobot** による常時起動を行い、待機ストレスを排除しました。
* **多言語音声合成 (Web Speech API):**
    正規表現を用いた言語判定ロジックにより、日本語と英語を自動判別。適切な音声エンジンを切り替えるバイリンガル仕様を自作しました。

---


<a name ="structure">
## 📂 Folder Structure
```text
.
├── .github/workflows/  # CI/CD Pipeline (GitHub Actions)
├── frontend/           # Next.js (React) App
└── backend/            # FastAPI (Python) Server