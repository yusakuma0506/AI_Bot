"use client";
import {useState, useRef, useEffect} from 'react';

interface ChatMessage{
  role: string;
  content: string;
}

export default function Home (){
  const [text, setText] = useState<string>("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    scrollEndRef.current?.scrollIntoView({behavior: "smooth"})
  }, [chat]);
  const isInvalid = text.trim().length ===0 || loading;
    
  const handleAsk = async ()=>{
    if (isInvalid) {
      return;
    }
    const unlockUttr = new SpeechSynthesisUtterance(" ");
    window.speechSynthesis.speak(unlockUttr);
    
    const currentText = text;
    const userMessage: ChatMessage = {role: "user", content: currentText};
    setChat((prev) => [...prev, userMessage]);
    setText("");
    setLoading(true)

    try{
      const res = await fetch(`http://localhost:8000/ask?question=${encodeURIComponent(currentText)}`);
      const data = await res.json();

      const aiMessage: ChatMessage = {role: "ai", content: data.answer}
      setChat((prev) => [...prev, aiMessage]);

      if(data.answer){
        const uttr = new SpeechSynthesisUtterance(data.answer);
        const isJapanese = /[\u3040-\u309F\u30A0-\u30FF]/.test(data.answer);
        if(isJapanese){
          uttr.lang = "ja-JP";
          uttr.pitch = 1.0;
          uttr.rate = 2.0;
        }else{
          uttr.lang = "en-US";
          uttr.pitch = 1.6;
          uttr.rate =0.7;
        }
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(uttr);
      }

    }catch(e){
      setChat((prev)=>[...prev, {role: "ai", content:"Sorry, something went wrong. I couldn't contact with Backend"}])
    }finally{
      setLoading(false);
    }
  };

  return(
    <div className='flex h-screen flex-col bg-[#0b0f1a] text-slate-200 font-sans'>
      <header className='sticky top-0 z-10 border-b border-slate-800/50 bg-[#0f172a]/70 p-5 backdrop-blur-xl'>
        <h1 className='text-lg font-bold tracking-tight bg-liner-to-r from-blue-400 to-indigo-400 bg-clip-text text-slate-200'>
          Welcome to Yu Bot
        </h1>
      </header>
      <div className='flex-1 overflow-y-auto p-4 space-y-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        {chat.map((m,i) =>(
          <div key={i}
            className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${
              m.role === 'user' 
                ? 'ml-auto bg-indigo-600 text-white rounded-tr-none' 
                : 'mr-auto bg-slate-800/50 border border-slate-700/50 rounded-tl-none'
            }`}
          >
            <span className='text-sm leading-relaxed'>
              {m.content}
            </span>
          </div>
        ))}
        <div ref={scrollEndRef} />
        {loading && 
          <div 
            className="flex items-center gap-2 text-slate-400 italic text-sm animate-pulse ml-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            Thinking...
          </div>}
      </div>

      <div className='flex items-end gap-4 rounded-xl border-2 border-slate-700 bg-slate-900/90 p-3 shadow-2xl focus-within:border-indigo-500 transition-all m-2'>
        <textarea 
          rows={3}
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="TYPE SOMETHING..."
          className='flex-1 bg-transparent px-2 py-1 outline-none placeholder:text-slate-600 font-bold resize-none overflow-y-auto max-h-32 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          onKeyDown={(e) => {
            if(e.key === "Enter" && !e.shiftKey && !isInvalid) {
              e.preventDefault(); 
              handleAsk();
            }
          }}
        />

        <button 
          disabled={isInvalid}
          onClick={handleAsk}
          className={`rounded-lg border-2 px-6 py-2 text-xs font-black uppercase tracking-widest text-white active:scale-95 mb-5 transition-all 
            ${isInvalid? 'border-slate-400 bg-slate-400' : 'border-indigo-500 bg-indigo-500  hover:bg-indigo-400'}
          `}
        >
          {loading ? "..." : "Ask"}
        </button>
      </div>
    </div>
  )
}
