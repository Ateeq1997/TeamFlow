import { cn } from "@/lib/utils";

export function Select({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "h-10 rounded-xl border border-[var(--field-border)] bg-[var(--field-bg)] px-3 text-sm text-foreground focus:border-sky-500 focus:ring-2 focus:ring-sky-200",
        className,
      )}
    >
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
