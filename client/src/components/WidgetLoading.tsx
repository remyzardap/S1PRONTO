export default function WidgetLoading({ count = 8 }: { count?: number }) {
  const sizes = ["large", "medium", "medium", "medium", "medium", "small", "small", "medium"];

  return (
    <div className="v2-widget-grid">
      {Array.from({ length: count }).map((_, i) => {
        const size = sizes[i % sizes.length];
        const isLarge = size === "large";

        return (
          <div
            key={i}
            className={`v2-skeleton ${isLarge ? "v2-widget-span-2" : ""}`}
            style={{
              height: size === "large" ? 160 : size === "medium" ? 130 : 90,
              borderRadius: size === "large" ? 20 : size === "medium" ? 16 : 12,
              border: "1px solid var(--v2-border)",
            }}
          />
        );
      })}
    </div>
  );
}
