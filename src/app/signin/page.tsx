"use client";

import { useEffect, useState } from "react";
import SignIn from "@/components/signin";
import { InteractiveCat } from "@/components/interactive-cat";

const TARGET_COLS = 8;
const TARGET_ROWS = 8;

const cellStyle = {
  backgroundImage:
    "repeating-linear-gradient(315deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
  backgroundSize: "7px 7px",
  backgroundAttachment: "fixed" as const,
  color: "oklch(from var(--foreground) l c h / 0.08)",
};

export default function SignInPage() {
  const [grid, setGrid] = useState({ cols: 0, rows: 0, cellW: 0, cellH: 0 });
  const [partyTrigger, setPartyTrigger] = useState(0);

  useEffect(() => {
    function calc() {
      setGrid({
        cols: TARGET_COLS,
        rows: TARGET_ROWS,
        cellW: window.innerWidth / TARGET_COLS,
        cellH: window.innerHeight / TARGET_ROWS,
      });
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  if (grid.cols === 0) return null;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Grid overlay — border cells only */}
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${grid.cols}, ${grid.cellW}px)`,
          gridTemplateRows: `repeat(${grid.rows}, ${grid.cellH}px)`,
        }}
      >
        {Array.from({ length: grid.rows * grid.cols }).map((_, i) => {
          const row = Math.floor(i / grid.cols);
          const col = i % grid.cols;
          const isBorder =
            row === 0 ||
            row === grid.rows - 1 ||
            col === 0 ||
            col === grid.cols - 1;

          if (!isBorder) return null;
          return (
            <div
              key={i}
              className="border border-border"
              style={{ ...cellStyle, gridColumn: col + 1, gridRow: row + 1 }}
            />
          );
        })}
        {/* Card spanning inner area */}
        <div
          className="bg-background border border-border grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-dashed divide-border"
          style={{ gridColumn: "2 / 8", gridRow: "2 / 8" }}
        >
          <SignIn onProviderClick={() => setPartyTrigger((p) => p + 1)} />
          <InteractiveCat externalPartyTrigger={partyTrigger} />
        </div>
      </div>
    </div>
  );
}
