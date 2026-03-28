# ⚙️ Yu Bot - Backend (FastAPI)

[🇺🇸 English](#english) | [🇯🇵 日本語](#japanese) 

----

<a name="english"></a>
## 🇺🇸 Overview
The "brain" of Yu Bot, built with FastAPI. It processes requests and interacts with the Gemini API to generate context-aware responses.

### 🛠️ Tech Stack
- **Framework:** FastAPI (Python)
- **AI Engine:** Gemini 2.5 Flash
- **Tools:** uvicorn, python-dotenv

### ✨ Technical Highlights
- **Context Injection (RAG-lite):** Pre-loads developer's professional background into the system instructions to ensure factual and persona-consistent responses.
- **Secure Configuration:** Managed sensitive API keys via environment variables for cloud deployment.

---

<a name="japanese"></a>
## 🇯🇵 概要
FastAPIを使用した、Yu Botの頭脳となるAPIサーバーです。Gemini APIを活用し、特定のコンテキストに基づいた回答を生成します。

### 🛠️ 技術スタック
- **Language:** Python 3.12
- **Framework:** FastAPI
- **AI Engine:** Google Gemini 2.5 Flash API
- **Dependency:** uvicorn, python-dotenv, google-generativeai

### ✨ こだわりポイント
- **System Instruction (RAG):** 開発者の経歴・スキルデータをシステムプロンプトに動的に注入。ハルシネーションを抑え、事実に基づいた「クローン」としての振る舞いを実現。
- **CORS設定:** フロントエンド（Vercel）からのリクエストを安全に許可するCORSミドルウェアの実装。
- **API Key管理:** `python-dotenv` を使用したセキュアな環境変数管理。

---