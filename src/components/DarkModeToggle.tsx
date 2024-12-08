"use client";
import UseDarkMode from "@/app/hooks/UseDarkMode";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

type DarkModeProps = { defaultMode: "light" | "dark" };
const DarkModeToggle: React.FC<DarkModeProps> = ({ defaultMode = "dark" }) => {
  const { theme, toggleTheme } = UseDarkMode(defaultMode);
  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {theme === "light" ? (
        <SunIcon className="w-4 h-4" role="img" />
      ) : (
        <MoonIcon className="w-4 h-4" role="img" />
      )}
    </Button>
  );
};

export default DarkModeToggle;
