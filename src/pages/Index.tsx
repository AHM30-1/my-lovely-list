import { motion } from "framer-motion";
import { useTodos } from "@/hooks/useTodos";
import { TodoInput } from "@/components/todo/TodoInput";
import { TodoList } from "@/components/todo/TodoList";
import { TodoFilters } from "@/components/todo/TodoFilters";
import { EmptyState } from "@/components/todo/EmptyState";

const Index = () => {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:py-16">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-foreground mb-3 tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            My Tasks
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stay organized, get things done
          </motion.p>
        </motion.header>

        {/* Main content */}
        <div className="space-y-6">
          <TodoInput onAdd={addTodo} />

          {allTodos.length > 0 && (
            <TodoFilters
              filter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />
          )}

          {todos.length > 0 ? (
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ) : (
            <EmptyState filter={filter} />
          )}
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-16 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>Double-click to edit • Check to complete • Hover to delete</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
