import { motion } from "framer-motion";
import { CheckCircle2, ListTodo, Sparkles } from "lucide-react";
import { FilterType } from "@/types/todo";

interface EmptyStateProps {
  filter: FilterType;
}

export function EmptyState({ filter }: EmptyStateProps) {
  const content = {
    all: {
      icon: ListTodo,
      title: "No todos yet",
      subtitle: "Add your first task to get started",
    },
    active: {
      icon: Sparkles,
      title: "All done!",
      subtitle: "You've completed all your tasks",
    },
    completed: {
      icon: CheckCircle2,
      title: "Nothing completed",
      subtitle: "Start checking off those todos",
    },
  };

  const { icon: Icon, title, subtitle } = content[filter];

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Icon className="w-10 h-10 text-muted-foreground" />
      </motion.div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-center">{subtitle}</p>
    </motion.div>
  );
}
