import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Pencil, Check, X } from "lucide-react";
import { Todo } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setEditValue(todo.text);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editValue.trim()) {
      onUpdate(todo.id, editValue);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        className={cn(
          "flex items-center gap-4 p-4 rounded-2xl glass border border-border/50 transition-all duration-300",
          "hover:shadow-lifted hover:border-primary/20 hover:scale-[1.01]",
          todo.completed && "bg-secondary/30 border-transparent"
        )}
        onDoubleClick={() => !todo.completed && handleStartEdit()}
      >
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          variant="success"
          size="lg"
          className="cursor-pointer shrink-0"
        />

        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="editing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex items-center gap-2"
            >
              <Input
                ref={inputRef}
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSave}
                className="flex-1 h-9 text-base"
              />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleSave}
                className="text-success hover:text-success hover:bg-success/10 shrink-0"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleCancel}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.span
              key="display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "flex-1 text-base font-medium transition-all duration-300 cursor-pointer",
                todo.completed && "text-muted-foreground line-through"
              )}
              onClick={() => !todo.completed && handleStartEdit()}
            >
              {todo.text}
            </motion.span>
          )}
        </AnimatePresence>

        {!isEditing && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {!todo.completed && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleStartEdit}
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                aria-label="Edit todo"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(todo.id)}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              aria-label="Delete todo"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
