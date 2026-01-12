// ChatBot.jsx
import React, { useState, useEffect, useRef } from "react";
import api from "../Services/Api";
const ChatBot = ({ chatLang }) => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I’m Lencho, your farm assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);

    // Clear input
    setInput("");

    // Call your backend chatbot API here
   try {
  const res = await api.post(
    "/api/v1/users/chat",
    {
      message: input,
      language: chatLang
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );

  const data = res.data;
  console.log("data is", data);

  const botReply = data.reply || "Sorry, I didn’t get that.";

  setMessages(prev => [...prev, { from: "bot", text: botReply }]);

} catch (error) {
  setMessages(prev => [
    ...prev,
    { from: "bot", text: "Error: Unable to fetch reply." }
  ]);
}

  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
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
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center mt-4 bg-gray-50 rounded-xl border border-gray-200">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-3 rounded-xl focus:outline-none bg-transparent text-sm"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 text-green-600 font-semibold hover:text-green-700"
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
