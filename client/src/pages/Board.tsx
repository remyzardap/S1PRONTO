/**
 * Block Board — Sutaeru's freeform pinboard
 * All pinned blocks from any module in one place.
 * Filter by type, search, reorder.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { trpc } from "@/lib/trpc";
import { Block, BlockSkeleton, type BlockData, type BlockType } from "@/components/Block";
import {
  LayoutDashboard, MessageSquare, FileText, BookOpen,
  CheckSquare, Mic, StickyNote, Play, Search,
  Pin, Inbox,
} from "lucide-react";

// ─── Filter tabs ──────────────────────────────────────────────────────────────

const FILTERS: { id: BlockType | "all"; label: string; icon: React.ElementType; color: string }[] = [
  { id: "all",        label: "All",         icon: LayoutDashboard, color: "#f2f2f2"  },
  { id: "chat",       label: "Chat",        icon: MessageSquare,   color: "#f2f2f2"  },
  { id: "atelier",    label: "Atelier",     icon: FileText,        color: "#a78bfa"  },
  { id: "memory",     label: "Memories",    icon: BookOpen,        color: "#f59e0b"  },
  { id: "task",       label: "Tasks",       icon: CheckSquare,     color: "#818CF8"  },
  { id: "transcript", label: "Transcripts", icon: Mic,             color: "#f43f5e"  },
  { id: "note",       label: "Notes",       icon: StickyNote,      color: "#84cc16"  },
];

// ─── Board page ───────────────────────────────────────────────────────────────

export default function Board() {
  useSeoMeta({ title: "Board", path: "/board" });

  const [activeFilter, setActiveFilter] = useState<BlockType | "all">("all");
  const [search, setSearch] = useState("");

  const { data: pinnedBlocks, isLoading } = trpc.blocks.pinned.useQuery();
  const { data: allBlocks, isLoading: allLoading } = trpc.blocks.list.useQuery({
    archived: false,
    limit: 100,
  });

  const sourceBlocks = pinnedBlocks && pinnedBlocks.length > 0 ? pinnedBlocks : (allBlocks ?? []);

  const filtered = (sourceBlocks as unknown as BlockData[]).filter((b) => {
    const matchType = activeFilter === "all" || b.type === activeFilter;
    const matchSearch = !search.trim() ||
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      JSON.stringify(b.content).toLowerCase().includes(search.toLowerCase()) ||
      (Array.isArray(b.tags) && (b.tags as string[]).some((t) => t.toLowerCase().includes(search.toLowerCase())));
    return matchType && matchSearch;
  });

  const showingPinned = pinnedBlocks && pinnedBlocks.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-5 p-4 sm:p-6 max-w-5xl mx-auto w-full"
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "#f2f2f2", fontFamily: "'Syne', sans-serif" }}>
            Board
          </h1>
          <p className="text-sm mt-1" style={{ color: "rgba(242,242,242,0.35)" }}>
            {showingPinned ? "Your pinned blocks" : "All recent blocks"}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(242,242,242,0.4)" }}>
          <Pin className="w-3 h-3" />
          {pinnedBlocks?.length ?? 0} pinned
        </div>
      </div>

      {/* ── Search ── */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "rgba(242,242,242,0.25)" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blocks…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-[13px] bg-transparent outline-none"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#f2f2f2",
            fontFamily: "'DM Sans', sans-serif",
          }}
        />
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {FILTERS.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => setActiveFilter(id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all duration-150 shrink-0"
            style={activeFilter === id
              ? { background: `${color}15`, border: `1px solid ${color}30`, color }
              : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(242,242,242,0.35)" }}
          >
            <Icon className="w-3 h-3" />
            {label}
          </button>
        ))}
      </div>

      {/* ── Block grid ── */}
      {isLoading || allLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => <BlockSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4 py-20 text-center"
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <Inbox className="w-5 h-5" style={{ color: "rgba(242,242,242,0.2)" }} />
          </div>
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: "rgba(242,242,242,0.5)" }}>
              {search ? "No blocks match your search" : "No blocks yet"}
            </p>
            <p className="text-[13px]" style={{ color: "rgba(242,242,242,0.25)" }}>
              {search ? "Try a different search term" : "Pin blocks from Chat, Atelier, or Memories to see them here"}
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          <AnimatePresence>
            {filtered.map((block) => (
              <Block key={block.id} block={block} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}

