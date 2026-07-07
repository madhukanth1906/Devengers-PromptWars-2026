"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Send, Bot, User, Mic } from "lucide-react";
import { generateText } from "@/lib/gemini";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Namaste! I am your Smart Bharat AI Civic Assistant. How can I help you today? You can ask me about government schemes, documents, or public services." }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await generateText(
        userMessage, 
        "You are an expert AI Civic Assistant for India called Smart Bharat. Answer questions about Indian government schemes, certificates, taxes, and services accurately and concisely in a helpful tone. Format responses nicely."
      );
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (_error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I am having trouble connecting to the network right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-grow pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex flex-col">
        <div className="glass-card flex-grow flex flex-col overflow-hidden shadow-2xl border border-border/50 rounded-3xl bg-white/50 dark:bg-black/40">
          {/* Chat Header */}
          <div className="p-6 border-b border-border/50 bg-primary/5 flex items-center gap-4">
            <div className="p-3 bg-primary rounded-xl text-white shadow-lg">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Civic Assistant</h1>
              <p className="text-sm text-foreground/60">Powered by Gemini AI</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {messages.map((msg, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={index}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-secondary text-white" : "bg-primary text-white"}`}>
                  {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`px-5 py-3 rounded-2xl max-w-[80%] ${msg.role === "user" ? "bg-secondary/10 text-foreground" : "glass border border-border shadow-sm text-foreground"}`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="px-5 py-4 rounded-2xl glass border border-border flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200"></div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white/80 dark:bg-black/80 border-t border-border/50">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about schemes, certificates, or services..."
                aria-label="Message input"
                className="w-full pl-6 pr-24 py-4 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-inner"
              />
              <div className="absolute right-2 flex gap-2">
                <button aria-label="Voice input" className="p-2 text-foreground/50 hover:text-primary transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-md"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
