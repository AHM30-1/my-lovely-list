import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value);
      setValue("");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="flex gap-3"
        animate={{
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <Input
          type="text"
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          variant="elegant"
          inputSize="lg"
          className="flex-1 font-medium"
        />
        <Button
          type="submit"
          size="lg"
          disabled={!value.trim()}
          className="px-6"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Add</span>
        </Button>
      </motion.div>
    </motion.form>
  );
}
