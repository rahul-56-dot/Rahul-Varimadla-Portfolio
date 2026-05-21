"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const responses: Record<string, string> = {
  hello: `Hello! I'm Rahul's AI assistant. Ask me about his skills, projects, or experience!`,
  skills: "Rahul specializes in React, Next.js, TypeScript, Three.js, Node.js, and cloud technologies.",
  projects: "Rahul has built NeuralVerse, CyberVault, Orbit Commerce, and more immersive web experiences.",
  contact: `You can reach Rahul at ${personalInfo.email} or ${personalInfo.phone}.`,
  default: "I can tell you about Rahul's skills, projects, experience, or how to contact him. What would you like to know?",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("skill") || lower.includes("tech")) return responses.skills;
  if (lower.includes("project")) return responses.projects;
  if (lower.includes("contact") || lower.includes("email")) return responses.contact;
  if (lower.includes("hello") || lower.includes("hi")) return responses.hello;
  return responses.default;
}

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: responses.hello },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { role: "user", text: userMsg }, { role: "bot", text: getResponse(userMsg) }]);
    setInput("");
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        data-cursor="button"
        className="fixed bottom-24 right-6 z-[500] w-14 h-14 rounded-full glass-panel border border-neon-purple/30 flex items-center justify-center text-neon-purple shadow-[0_0_30px_rgba(168,85,247,0.3)]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="AI Assistant"
      >
        {open ? <X size={22} /> : <Bot size={22} />}
        {!open && (
          <motion.span
            className="absolute -top-1 -right-1 w-3 h-3 bg-neon-cyan rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-44 right-6 z-[500] w-80 sm:w-96 glass-panel rounded-2xl border border-neon-purple/20 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <motion.div className="px-4 py-3 border-b border-white/10 flex items-center gap-2 bg-neon-purple/5">
              <Bot size={18} className="text-neon-purple" />
              <span className="font-display text-sm text-white/90">Neural Assistant</span>
              <span className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </motion.div>

            <div className="h-64 overflow-y-auto p-4 space-y-3 hide-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/20"
                        : "bg-white/5 text-white/80 border border-white/10"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about Rahul..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-cyan/50"
              />
              <button onClick={send} data-cursor="button" className="p-2 rounded-xl bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 transition-colors">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
