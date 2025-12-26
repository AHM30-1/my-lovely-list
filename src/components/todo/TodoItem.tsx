import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Todo } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group"
    >
      <div
        className={cn(
          "flex items-center gap-4 p-4 rounded-xl bg-card shadow-soft transition-all duration-300",
          "hover:shadow-lifted hover:scale-[1.01]",
          todo.completed && "bg-secondary/50"
        )}
      >
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          variant="success"
          size="lg"
          className="cursor-pointer"
        />
        
        <motion.span
          className={cn(
            "flex-1 text-lg font-medium transition-all duration-300",
            todo.completed && "text-muted-foreground line-through"
          )}
          animate={{
            opacity: todo.completed ? 0.6 : 1,
          }}
        >
          {todo.text}
        </motion.span>

        <Button
          variant="icon"
          size="icon-sm"
          onClick={() => onDelete(todo.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-destructive hover:text-destructive hover:bg-destructive/10"
          aria-label="Delete todo"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
