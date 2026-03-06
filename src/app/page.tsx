import { TechGrid } from "@/components/tech-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";

const RUNG_COUNT = 10;

const Ladder = ({ side }: { side: "left" | "right" }) => (
  <div
    className="absolute top-0 bottom-0 flex flex-col"
    style={
      side === "left"
        ? {
            right: "calc(100% + (100vw - 100%) / 4 - 5.5rem)",
            left: "calc(-1 * (100vw - 100%) / 2)",
          }
        : {
            left: "calc(100% + (100vw - 100%) / 4 - 5.5rem)",
            right: "calc(-1 * (100vw - 100%) / 2)",
          }
    }
  >
    {Array.from({ length: RUNG_COUNT }).map((_, i) => (
      <div
        key={i}
        className={`relative ${side === "left" ? "border-r" : "border-l"} border-border w-full flex-1 ${i !== RUNG_COUNT - 1 ? "border-b-2" : ""}`}
        style={{
          backgroundImage: "repeating-linear-gradient(315deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
          backgroundSize: "7px 7px",
          backgroundAttachment: "fixed",
          color: "rgba(0,0,0,0.08)",
        }}
      >
        {i !== RUNG_COUNT - 1 && (
          <div
            className={`absolute z-10 ${
              side === "left"
                ? "right-0 border-y-4 border-y-transparent border-r-4 border-r-border"
                : "left-0 border-y-4 border-y-transparent border-l-4 border-l-border"
            } bottom-[-4px]`}
          />
        )}
      </div>
    ))}
  </div>
);

function HeroButton() {
  return (
    <div className="relative w-fit group">
      <Button
        type="submit"
        variant="outline"
        className="rounded-none cursor-pointer relative overflow-hidden focus-visible:ring-0 h-8 px-3 py-1 border-dashed"
      >
        <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
        <GithubIcon className="size-4" />
        Github
      </Button>
      <span className="absolute h-2 w-2 border-foreground border-b border-r bottom-0 right-0" />
      <span className="absolute h-2 w-2 border-foreground border-b border-l bottom-0 left-0" />
      <span className="absolute h-2 w-2 border-foreground border-t border-r top-0 right-0" />
      <span className="absolute h-2 w-2 border-foreground border-t border-l top-0 left-0" />
    </div>
  );
}

function HeroButton2() {
  return (
    <div className="relative w-fit group">
      <Button
        type="submit"
        className="rounded-none cursor-pointer relative overflow-hidden focus-visible:ring-0 h-8 px-3 py-1"
      >
        <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
        Get Akira
      </Button>
      <span className="absolute h-2 w-2 border-foreground border-dashed border-b border-r bottom-0 right-0" />
      <span className="absolute h-2 w-2 border-foreground border-dashed border-b border-l bottom-0 left-0" />
      <span className="absolute h-2 w-2 border-foreground border-dashed border-t border-r top-0 right-0" />
      <span className="absolute h-2 w-2 border-foreground border-dashed border-t border-l top-0 left-0" />
    </div>
  );
}

function HeroBadge() {
  return (
    <Badge
      variant="outline"
      className="mx-auto border border-foreground/40 transition-all duration-300 delay-100 flex items-center gap-2 bg-muted-foreground/10 dark:bg-muted-foreground/20 text-foreground cursor-pointer group [&>svg]:size-0 relative overflow-hidden"
    >
      <span className="shine absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent -translate-x-full" />
      <p className="font-light">
        The only starter kit you need to build your next saas
      </p>
    </Badge>
  );
}

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col mx-auto max-w-7xl border-x">
      <nav className="relative px-4 py-4">
        Akira
        <div className="z-10 absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
        <div className="z-10 absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
        <div className="border-b absolute bottom-0 left-1/2 -translate-x-1/2 w-screen" />
      </nav>
      <section className="relative flex flex-1">
        <Ladder side="left" />
        <Ladder side="right" />
        <div className="flex-1 flex flex-col font-(family-name:--font-geist-pixel-square) ">
          <div className="flex-1 flex flex-col items-start justify-center px-8">
            <div className="flex items-center gap-2 mb-4">
              <HeroBadge />
            </div>
            <h1 className="text-5xl">Akira</h1>
            <p className="text-base text-muted-foreground mt-3 max-w-md leading-relaxed">
              A modern starter with Next.js, Tailwind, shadcn/ui, Postgres,
              Auth, Payments and Email baked in. Skip the setup, start building
              and ship before the weekend.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <HeroButton />
              <HeroButton2 />
            </div>
          </div>
          <div className="flex-1 border-t border-border relative">
            <TechGrid />
          </div>
        </div>
        <div className="flex-1 border-l border-border" />
      </section>
      <footer className="relative px-4 py-4">
        <div className="z-10 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
        <div className="z-10 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
        <div className="border-t absolute top-0 left-1/2 -translate-x-1/2 w-screen" />
      </footer>
    </div>
  );
}
