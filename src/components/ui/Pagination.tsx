import { cn } from "@/lib/cn";

type PaginationProps = {
  count: number;
  active: number;
  onSelect: (index: number) => void;
  /** Accessible name of each dot, e.g. (i) => `Слайд ${i + 1}`. */
  label: (index: number) => string;
  className?: string;
};

/** Figma "Pagination": active dot 26×8 orange, others 8×8 white 28 %, gap 8. */
export function Pagination({ count, active, onSelect, label, className }: PaginationProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={label(index)}
          aria-current={index === active || undefined}
          onClick={() => onSelect(index)}
          className={cn(
            // ::before enlarges the hit area without changing the 8px geometry.
            "relative h-2 rounded-pill before:absolute before:-inset-1 before:content-['']",
            index === active ? "w-[26px] bg-orange" : "w-2 bg-white/28",
          )}
        />
      ))}
    </div>
  );
}
