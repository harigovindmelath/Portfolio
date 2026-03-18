"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type LineType = "input" | "output" | "system" | "error";

interface Line {
  id: number;
  type: LineType;
  text: string;
}

// ── Command definitions ────────────────────────────────────────────────────────
const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  projects  → View featured projects",
    "  skills    → Explore technical skills",
    "  contact   → Get in touch",
    "  about     → Learn about Harigovind",
    "  clear     → Clear terminal",
    "  help      → Show this message",
    "",
    "  Or ask me anything in plain English!",
  ],
  projects: ["Navigating to Projects..."],
  skills: ["Navigating to Skills..."],
  contact: ["Navigating to Contact..."],
  about: ["Navigating to About..."],
};

const SCROLL_TARGETS: Record<string, string> = {
  projects: "projects",
  skills: "skills",
  contact: "contact",
  about: "about",
};

// Quick command suggestions shown when input is empty
const SUGGESTIONS = ["projects", "skills", "about", "contact", "help"];

// ── Conversational AI responses ───────────────────────────────────────────────
function getConversationalResponse(input: string): string[] {
  const q = input.toLowerCase().trim();

  if (/^(hi|hello|hey|hiya|yo|sup)/.test(q))
    return ["Hello! 👋 How can I help you explore Harigovind's portfolio?"];

  if (/who are you|what are you/.test(q))
    return [
      "I'm a built-in terminal assistant for this portfolio.",
      "No external API — just fast, local responses.",
      "Type 'help' to see what I can do.",
    ];

  if (/what do you do|your purpose|what can you do/.test(q))
    return [
      "I help you navigate this portfolio interactively.",
      "Ask me about projects, skills, or how to get in touch.",
    ];

  if (/harigovind|portfolio owner|who is he|about him/.test(q))
    return [
      "Harigovind P is a final-year B.Tech student in AI/ML.",
      "He builds end-to-end intelligent systems — from ML models to backend services.",
      "Type 'about' to learn more, or 'projects' to see his work.",
    ];

  if (/project|work|build|built/.test(q))
    return [
      "Harigovind has built several AI/ML and backend projects.",
      "Highlights: Real-Time Violence Detection, Smart Water Leak IoT, AgriSkill.",
      "Type 'projects' to explore them all.",
    ];

  if (/skill|tech|language|framework|tool/.test(q))
    return [
      "Core stack: Python, PyTorch, OpenCV, Flask, Django, SQL.",
      "Experienced in AI/ML, Computer Vision, IoT, and backend development.",
      "Type 'skills' for the full breakdown.",
    ];

  if (/contact|reach|email|hire|available/.test(q))
    return [
      "You can reach Harigovind at:",
      "  📧 harigovindmelath52@gmail.com",
      "  📍 Kerala, India",
      "  🔗 linkedin.com/in/harigovind-melath",
      "Type 'contact' to go to the contact section.",
    ];

  if (/resume|cv/.test(q))
    return [
      "Download the resume using the 'Download Resume' button in the hero section.",
    ];

  if (/thank|thanks/.test(q))
    return ["You're welcome! Let me know if there's anything else."];

  if (/bye|goodbye|exit|quit/.test(q))
    return ["Goodbye! Feel free to come back any time. 👋"];

  return [
    `Command not recognized: '${input}'`,
    "Type 'help' to see available commands,",
    "or ask me a question in plain English.",
  ];
}

// ── Boot lines ────────────────────────────────────────────────────────────────
const BOOT_LINES: string[] = [
  "HarigovindOS v1.0  —  AI Engine Online",
  "",
  "Welcome to the interactive portfolio terminal.",
  "Type 'help' to see what I can do.",
  "Or try: projects · skills · contact · about",
];

let _id = 0;
function uid() {
  return ++_id;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(() =>
    BOOT_LINES.map((text) => ({ id: uid(), type: "system" as LineType, text }))
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cursor, setCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(t);
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Show suggestions only when input is empty and not typing
  useEffect(() => {
    setShowSuggestions(input.trim() === "" && !isTyping);
  }, [input, isTyping]);

  const focusInput = () => inputRef.current?.focus();

  const pushLines = useCallback(
    (newLines: string[], type: LineType = "output") => {
      setLines((prev) => [
        ...prev,
        ...newLines.map((text) => ({ id: uid(), type, text })),
      ]);
    },
    []
  );

  const typeLines = useCallback((responses: string[]) => {
    setIsTyping(true);
    responses.forEach((text, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, { id: uid(), type: "output", text }]);
        if (i === responses.length - 1) setIsTyping(false);
      }, i * 55);
    });
  }, []);

  const scrollTo = (sectionId: string) => {
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  const execute = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;

      // Echo input
      setLines((prev) => [...prev, { id: uid(), type: "input", text: cmd }]);
      setHistory((prev) => [cmd, ...prev.filter((h) => h !== cmd)]);
      setHistoryIndex(-1);

      const key = cmd.toLowerCase();

      if (key === "clear") {
        setTimeout(() => setLines([]), 100);
        return;
      }

      if (key in COMMANDS) {
        const responses = COMMANDS[key];
        typeLines(responses);
        if (key in SCROLL_TARGETS) scrollTo(SCROLL_TARGETS[key]);
        return;
      }

      // Conversational fallback
      const response = getConversationalResponse(cmd);
      typeLines(response);
    },
    [typeLines]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      execute(input);
      setInput("");
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? "");
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      setInput(nextIndex === -1 ? "" : history[nextIndex]);
    }
  };

  const lineColor: Record<LineType, string> = {
    system: "text-emerald-400/90",
    output: "text-zinc-300",
    input: "text-indigo-300",
    error: "text-red-400",
  };

  return (
    <div
      className="w-full rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl shadow-black/50 bg-[#0d1117] font-mono text-sm cursor-text select-text"
      onClick={focusInput}
      style={{ boxShadow: "0 0 40px rgba(0,0,0,0.5), 0 0 1px rgba(99,102,241,0.15)" }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/90 border-b border-zinc-800/60 select-none">
        <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-pointer" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors cursor-pointer" />
        <span className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors cursor-pointer" />
        <span className="ml-3 text-[11px] text-zinc-500 tracking-wide">
          harigovind@portfolio — bash
        </span>
      </div>

      {/* Output area */}
      <div className="p-5 space-y-1 h-[320px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800 overscroll-contain">
        {lines.map((line) => (
          <div
            key={line.id}
            className={`leading-relaxed ${lineColor[line.type]} text-[13px]`}
          >
            {line.type === "input" ? (
              <span>
                <span className="text-indigo-400">harigovind@portfolio</span>
                <span className="text-zinc-500">:</span>
                <span className="text-indigo-300">~</span>
                <span className="text-zinc-500">$ </span>
                <span className="text-zinc-100">{line.text}</span>
              </span>
            ) : (
              <span>
                {line.text === "" ? "\u00A0" : `${line.type === "output" ? "> " : ""}${line.text}`}
              </span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips — shown when idle */}
      {showSuggestions && (
        <div className="flex items-center gap-2 px-5 py-2 border-t border-zinc-800/40 bg-zinc-900/20 flex-wrap">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">try:</span>
          {SUGGESTIONS.map((cmd) => (
            <button
              key={cmd}
              onClick={(e) => {
                e.stopPropagation();
                execute(cmd);
              }}
              className="px-2.5 py-0.5 rounded-md bg-zinc-800/50 border border-zinc-700/40 text-[11px] text-zinc-400 hover:text-zinc-100 hover:border-indigo-500/40 hover:bg-zinc-800 transition-all duration-200"
            >
              {cmd}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="flex items-center gap-1 px-5 py-3 border-t border-zinc-800/60 bg-zinc-900/30">
        <span className="text-indigo-400 flex-shrink-0 text-[13px]">harigovind@portfolio</span>
        <span className="text-zinc-500 text-[13px]">:</span>
        <span className="text-indigo-300 text-[13px]">~</span>
        <span className="text-zinc-500 text-[13px]">$</span>
        <div className="relative flex-1 ml-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="w-full bg-transparent text-zinc-100 outline-none caret-transparent text-[13px]"
            aria-label="Terminal input"
          />
          {/* Rendered text + blinking block cursor */}
          <div className="absolute inset-0 pointer-events-none flex items-center">
            <span className="text-zinc-100 text-[13px]">{input}</span>
            <span
              className={`inline-block w-[2px] h-[1.1em] bg-emerald-400 ml-[1px] align-middle transition-opacity ${
                cursor ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
