import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "en-US";

  const synth = window.speechSynthesis;

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const handleMic = () => {
    setIsListening(true);
    recognition.start();

    recognition.onresult = async (event) => {
      const said = event.results[0][0].transcript;
      const lowerSaid = said.toLowerCase().trim();

      let reply = "";

      if (lowerSaid.includes("superpower")) {
        reply = "Relentless self-learning — I can pick up anything fast and turn it into real, working products.";
      } else if (
        lowerSaid.includes("areas you'd like to grow") ||
        lowerSaid.includes("grow in")
      ) {
        reply = "Scaling systems, LLMs and API flows, and clean code architecture.";
      } else if (
        lowerSaid.includes("misconception") ||
        lowerSaid.includes("what do people think wrong")
      ) {
        reply = "That I’m always serious, but I’m also fun, creative, and a team motivator.";
      } else if (lowerSaid.includes("life story")) {
        reply = "I'm from India and grew up with a curiosity for tech. I turned a passion for building websites and AI into real-world internships and freelance projects. I’ve led full-stack and blockchain projects, and love learning every day.";
      } else if (
        lowerSaid.includes("push your limits") ||
        lowerSaid.includes("how do you push") ||
        lowerSaid.includes("stretch yourself")
      ) {
        reply = "By saying yes before I’m 100% ready — and then diving deep to master whatever it takes. Whether it’s a client project, a hackathon, or a new domain like Solana or AI video, I stretch myself to deliver beyond expectations.";
      }

      if (reply) {
        setResponse(reply);
        setChatHistory((prev) => [...prev, { question: said, answer: reply }]);
        speak(reply);
        setIsListening(false);
        setIsTyping(false);
        return;
      }

      // fallback response
      setResponse("Sorry, I don't have an answer for that yet.");
      speak("Sorry, I don't have an answer for that yet.");
      setIsListening(false);
      setIsTyping(false);
    };
  };

  return (
    <div className="app">
      <video
        autoPlay
        muted
        loop
        className="bg-video"
        src="/bg.mp4"
        type="video/mp4"
      ></video>

      <div className="overlay">
        <h1>Ask Me Anything</h1>
        <button className={`mic-button ${isListening ? "listening" : ""}`} onClick={handleMic}>
          🎤
        </button>
        {isTyping && <p className="typing">Thinking...</p>}
        {response && <p className="response">{response}</p>}
      </div>
    </div>
  );
}

export default App;
