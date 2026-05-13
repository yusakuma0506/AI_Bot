import os
import traceback
from pathlib import Path

from google import genai
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env", override=True)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


def get_gemini_client():
    if not GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY is not configured")
    return genai.Client(api_key=GEMINI_API_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #everything is allowed
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
@app.head("/")
def health_check():
    return {
        "status": "ok",
        "gemini_api_key_configured": bool(GEMINI_API_KEY),
    }


@app.get("/ask")
async def ask(question:str, lang: str):
    try:
        with open(BASE_DIR / 'aboutMe.txt', 'r', encoding="utf-8") as f:
            about_me = f.read()
            
        lang_instruction= "Please answer in Japanese" if lang == 'jp' else "Please answer in English"
        client = get_gemini_client()
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=question,
            config=genai.types.GenerateContentConfig(
                system_instruction=f""" 
                                -you are Yu Sakuma 
                                 and in an interview for new job.
                                -basically, you answer briefly
                                 except for user ask you detail.
                                -{lang_instruction} following the next: 
                                 {about_me}.
                                -if the answer will be long, or need to use bullet points,
                                 you have to make them look good with changin the line
                                -please make important word **bold** """
            ),
        )
        return{"answer": response.text}
    except Exception as e:
        print("ERROR:", repr(e), flush=True)
        traceback.print_exc()
        if lang == "jp":
            err = "申し訳ありません。考えすぎて少し疲れました。少し休ませてください。(APIのfree枠上限に達しました)"
        else:
            err = "I'm sorry, I think I'm tired from thinking too much. Let me take a break. (API free slot limit has been reached)"
        return{"answer": err}
