// components/DarkModeToggle.tsx
"use client";

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-foreground ml-4">
      {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </Button>
  );
}
