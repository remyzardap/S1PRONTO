import { motion } from "framer-motion";
import { Globe, Code2, PenLine, Zap } from "lucide-react";

const SUGGESTIONS = [
  {
    icon: Globe,
    label: "Search",
    prompt: "What's happening in Indonesian renewable energy this week?",
  },
  {
    icon: Code2,
    label: "Code",
    prompt: "Review this code and suggest improvements",
  },
  {
    icon: PenLine,
    label: "Write",
    prompt: "Draft a professional memo about our Q2 strategy",
  },
  {
    icon: Zap,
    label: "Think",
    prompt: "Summarise the key points from my last conversation",
  },
];

interface ChatEmptyStateProps {
  agentName?: string;
  onSuggestion: (s: string) => void;
}

export function ChatEmptyState({ agentName, onSuggestion }: ChatEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full gap-10 px-4 sm:px-6 py-12"
    >
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-2xl sm:text-3xl font-light tracking-[0.25em] uppercase mb-2"
          style={{ color: "#FFFFFF", fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {agentName ? `${agentName}'s Agent` : "S1"}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-[11px] tracking-widest uppercase font-mono"
          style={{ color: "#64748B" }}
        >
          One mind. Every model.
        </motion.p>
      </div>

      <div className="w-px h-8 bg-gradient-to-b from-transparent via-[#2A3350] to-transparent" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg">
        {SUGGESTIONS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.button
              key={i}
              data-testid={`button-suggestion-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.07 }}
              onClick={() => onSuggestion(s.prompt)}
              className="group text-left p-3.5 rounded-xl transition-all duration-200"
              style={{
                background: "#1C2235",
                border: "1px solid rgba(42,51,80,0.6)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#252D42";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(99,102,241,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#1C2235";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(42,51,80,0.6)";
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(99,102,241,0.10)", border: "1px solid rgba(99,102,241,0.20)" }}
                >
                  <Icon className="w-3 h-3" style={{ color: "#6366F1" }} />
                </div>
                <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#64748B", fontFamily: "'Inter', system-ui, sans-serif" }}>
                  {s.label}
                </span>
              </div>
              <p className="text-[13px] leading-snug" style={{ color: "#94A3B8" }}>
                {s.prompt}
              </p>
            </motion.button>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[11px] text-center font-mono tracking-wide"
        style={{ color: "#64748B" }}
      >
        S1 routes your message to the best model automatically
      </motion.p>
    </motion.div>
  );
}
