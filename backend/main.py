import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai

load_dotenv(override =True)
genai.configure(api_key = os.getenv("GEMINI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #everything is allowed
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ask")
async def ask(question:str):
    try:
        with open('aboutMe.txt', 'r', encoding="utf-8") as f:
            my_context = f.read()
        model = genai.GenerativeModel(
            'models/gemini-2.5-flash',
            system_instruction= f""" you are Yu Sakuma 
                                and in an interview for new job.
                                basically, you answer briefly
                                except for user ask you detail.
                                please answer following the next: 
                                {my_context}"""
        )
        response = model.generate_content(question)
        return{"answer": response.text}
    except Exception as e:
        return {
            "answer": """I'm sorry, something went wrong.
                        I think I'm tired from thinking too much...
                        Let me take a break please"""
        }
