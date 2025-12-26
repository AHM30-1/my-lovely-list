import { motion } from "framer-motion";
import { FilterType } from "@/types/todo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TodoFiltersProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export function TodoFilters({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoFiltersProps) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-card shadow-soft"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <span className="text-sm text-muted-foreground font-medium">
        {activeCount} {activeCount === 1 ? "item" : "items"} left
      </span>

      <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/50">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={cn(
              "relative px-4 py-1.5 text-sm font-medium rounded-md transition-colors duration-200",
              filter === f.value
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {filter === f.value && (
              <motion.div
                layoutId="filter-indicator"
                className="absolute inset-0 bg-card shadow-soft rounded-md"
                transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              />
            )}
            <span className="relative z-10">{f.label}</span>
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearCompleted}
          className="text-muted-foreground hover:text-destructive"
        >
          Clear completed
        </Button>
      )}
    </motion.div>
  );
}
