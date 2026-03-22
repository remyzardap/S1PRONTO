import { useState } from "react";
import { motion } from "framer-motion";
import { BookmarkPlus, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  model?: string;
  streaming?: boolean;
  createdAt: Date;
}

interface MessageBubbleProps {
  message: Message;
  onSave?: (content: string) => void;
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function parseContent(
  content: string
): Array<{ type: "text" | "code"; value: string; lang?: string }> {
  const segments: Array<{ type: "text" | "code"; value: string; lang?: string }> = [];
  const codeBlockRe = /```(\w*)\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;
  while ((match = codeBlockRe.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: content.slice(lastIndex, match.index) });
    }
    segments.push({ type: "code", value: match[2].trimEnd(), lang: match[1] || undefined });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    segments.push({ type: "text", value: content.slice(lastIndex) });
  }
  return segments;
}

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <div className="my-3 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(42,51,80,0.6)" }}>
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: "#0C0F1A", borderBottom: "1px solid rgba(42,51,80,0.6)" }}
      >
        <span className="text-[10px] tracking-widest uppercase font-mono" style={{ color: "#64748B" }}>
          {lang || "code"}
        </span>
        <button
          onClick={copy}
          className="flex items-center gap-1 text-[10px] tracking-widest uppercase font-mono transition-colors"
          style={{ color: copied ? "#22C55E" : "#64748B" }}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto" style={{ background: "#0C0F1A" }}>
        <code className="font-mono text-[13px] leading-relaxed" style={{ color: "#94A3B8" }}>
          {code}
        </code>
      </pre>
    </div>
  );
}

function getModelMeta(model?: string) {
  if (!model) return null;
  return { label: "S1", color: "#6366F1" };
}

export function MessageBubble({ message, onSave }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const segments = parseContent(message.content);
  const modelMeta = getModelMeta(message.model);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn("group flex items-end gap-3 mb-6", isUser ? "flex-row-reverse" : "")}
    >
      {/* Avatar */}
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 mb-1"
        style={
          isUser
            ? { background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", color: "#818CF8" }
            : { background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)", color: "#6366F1" }
        }
      >
        {isUser ? "Y" : "S"}
      </div>

      {/* Bubble */}
      <div className={cn("max-w-[84%] sm:max-w-[72%] flex flex-col gap-1.5", isUser ? "items-end" : "items-start")}>
        <div
          className={cn("px-4 py-3 text-[14px] leading-relaxed", isUser ? "chat-bubble-user text-white" : "chat-bubble-ai text-white")}
        >
          {message.streaming && !message.content ? (
            <div className="flex gap-1.5 items-center py-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#6366F1" }}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </div>
          ) : (
            <>
              {segments.map((seg, i) =>
                seg.type === "code" ? (
                  <CodeBlock key={i} code={seg.value} lang={seg.lang} />
                ) : (
                  <span key={i} className="whitespace-pre-wrap">{seg.value}</span>
                )
              )}
              {message.streaming && (
                <span className="inline-block w-[2px] h-[1em] ml-0.5 align-middle animate-pulse" style={{ backgroundColor: "#6366F1" }} />
              )}
            </>
          )}
        </div>

        {/* Footer row */}
        <div className={cn("flex items-center gap-2 px-1", isUser ? "flex-row-reverse" : "")}>
          <span className="text-[10px] font-mono" style={{ color: "#64748B" }}>
            {formatTime(message.createdAt)}
          </span>

          {/* Model badge */}
          {!message.streaming && modelMeta && (
            <span className="text-[10px] font-mono tracking-wide" style={{ color: modelMeta.color, opacity: 0.65 }}>
              {modelMeta.label}
            </span>
          )}
        </div>

        {/* Save to memory — appears on hover */}
        {!isUser && !message.streaming && onSave && (
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            onClick={() => onSave(message.content)}
            className="self-start flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] transition-all opacity-0 group-hover:opacity-100"
            style={{
              background: "rgba(28,34,53,0.8)",
              border: "1px solid rgba(42,51,80,0.6)",
              color: "#94A3B8",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(99,102,241,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(42,51,80,0.6)";
            }}
          >
            <BookmarkPlus className="h-3 w-3" />
            Save to memory
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
