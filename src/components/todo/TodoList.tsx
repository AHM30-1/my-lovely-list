import { AnimatePresence, motion } from "framer-motion";
import { Todo } from "@/types/todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onUpdate }: TodoListProps) {
  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <AnimatePresence mode="popLayout">
        {todos.map((todo, index) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
