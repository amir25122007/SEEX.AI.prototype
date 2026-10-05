import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { headerActions, headerNav } from "@/data/navigation";
import { cn } from "@/lib/cn";

type HeaderProps = {
  className?: string;
};

/**
 * Desktop header — Figma "Main page v3" › header (1394:4361), 1280×66.
 *
 * Lives inside the Hero: absolutely positioned, 36px from the top,
 * horizontally centred (80px side margins at 1440px). The Hero must be
 * `position: relative`.
 */
export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "absolute top-9 left-1/2 z-20 -translate-x-1/2",
        // 1280×66 glass bar: white 4.5 % fill, white 9 % 1px inside stroke, radius 40.
        // Figma GLASS effect (frost 4) is approximated with a 4px backdrop blur.
        // Padding 26/12 in Figma; minus the 1px CSS border (Figma stroke is inside, outside layout).
        "flex h-[66px] w-[min(var(--container-content),calc(100%-2*var(--page-gutter-min)))] items-center justify-between",
        "rounded-header border border-border-glass bg-white/[0.045] pr-[11px] pl-[25px] backdrop-blur-[4px]",
        className,
      )}
    >
      <Link
        href="/"
        className="font-archivo text-[31.43px] leading-normal font-bold tracking-[-0.005em] text-white"
      >
        SeexAI
      </Link>

      <nav aria-label="Основная навигация">
        <ul className="flex items-center gap-[26px]">
          {headerNav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block font-mono text-nav-18 font-medium text-white uppercase transition-opacity duration-200 hover:opacity-80"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Figma "actions": fixed 186px, space-between → 15px between login and CTA. */}
      <div className="flex w-[186px] items-center justify-between">
        <a
          href={headerActions.login.href}
          className="font-mono text-nav-18 font-medium tracking-[0] text-white uppercase transition-opacity duration-200 hover:opacity-80"
        >
          {headerActions.login.label}
        </a>
        <Button href={headerActions.cta.href} variant="lime" size="md" className="w-[117px]">
          {headerActions.cta.label}
        </Button>
      </div>
    </header>
  );
}
