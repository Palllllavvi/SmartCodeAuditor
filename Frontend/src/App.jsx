import { useState } from "react"
import { Editor } from "@monaco-editor/react"
import axios from "axios"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import "./App.css"

function App() {
  const [code, setCode] = useState(`//Put your code here and let AI take care of the rest...`)
  const [review, setReview] = useState("")
   const [language, setLanguage] = useState("javascript");

  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-ai-review", { code , language },{ responseType: "text" })
          const fullText = "HHey here is the " + response.data;
          setReview("")

    let i = 0;
    const speed = 10; // typing speed in ms (adjust as needed)

    const interval = setInterval(() => {
      if (i < fullText.length) {
        setReview((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
  } catch (error) {
    console.error(error);
  }
  }

  return (
    <main className="app">
    <div className="header">HELLO Kitty</div>
    <div className="body">

      <div className="left">
        <div className="editor-container">
          <div className="language-dropdown">
        {/* 👇 Language Selector */}
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="typescript">TypeScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
    </div>
          <Editor
            height="100%"
            width="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(newCode) => setCode(newCode)}
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              lineNumbers: "on",
              automaticLayout: true,
              scrollBeyondLastLine: false,
              wordWrap: "on",
            }}
          />

          {/* The button positioned absolutely over the editor */}
          <button className="reviewButton" onClick={reviewCode}>
            Review
          </button>
        </div>
      </div>

      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>
          {review}
        </Markdown>
      </div>

    </div>
    
    </main>
  )
}

export default App
