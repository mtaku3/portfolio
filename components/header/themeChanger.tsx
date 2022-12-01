import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeChanger() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={
        resolvedTheme === "light"
          ? "p-3 rounded-xl bg-gray-200 hover:bg-gray-300"
          : "p-3 rounded-xl bg-gray-600 hover:bg-gray-700"
      }
      onClick={toggleTheme}
      aria-label="Theme toggle button"
    >
      {resolvedTheme === "light" && (
        <motion.div
          initial={{ scale: 0.0 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 0.1 }}
        >
          <HiOutlineMoon className="h-5 w-5" />
        </motion.div>
      )}
      {resolvedTheme === "dark" && (
        <motion.div
          initial={{ scale: 0.0 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 0.1 }}
        >
          <HiOutlineSun className="h-5 w-5" />
        </motion.div>
      )}
    </button>
  );
}
