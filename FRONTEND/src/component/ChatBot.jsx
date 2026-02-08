import React, { useState, useEffect, useRef } from "react";
import api from "../Services/Api";

const ChatBot = ({ chatLang }) => {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi! I’m Lencho, your KishanSetu farm assistant. Ask me anything about crops, soil, irrigation, or selling produce.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ---------------- SEND MESSAGE ---------------- */
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    setMessages((prev) => [
      ...prev,
      { from: "user", text: userMessage },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/api/v1/chatBot/", {
        message: userMessage,
        language: chatLang,
      });

      const botReply =
        res?.data?.data ||
        "Sorry, I couldn’t understand that. Please try again.";

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: botReply },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "⚠️ AI service is temporarily unavailable. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="flex flex-col h-full">
      {/* CHAT MESSAGES */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                msg.from === "user"
                  ? "bg-green-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-sm text-gray-500 animate-pulse">
            Lencho is typing...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT BOX */}
      <div className="flex items-center mt-4 bg-gray-50 rounded-xl border border-gray-200">
        <input
          type="text"
          placeholder="Ask about crops, fertilizer, irrigation..."
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-3 rounded-xl focus:outline-none bg-transparent text-sm"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="px-4 py-2 text-green-600 font-semibold hover:text-green-700 disabled:opacity-50"
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
