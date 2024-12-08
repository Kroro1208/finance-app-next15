import { useState } from "react";
import { useCookies } from "react-cookie";

type ThemeProps = "light" | "dark";

const UseDarkMode = (defaultTheme: ThemeProps = "dark") => {
  // クッキーからテーマを取得して設定
  const [cookies, setCookie] = useCookies(["theme"]);
  const [theme, setTheme] = useState<ThemeProps>(cookies.theme || defaultTheme);

  // テーマを設定してクッキーに保存
  const setAndSaveTheme = (newTheme: ThemeProps) => {
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    setCookie("theme", newTheme, { path: "/" }); // クッキーの保存パスを設定
  };
  const toggleTheme = () => {
    setAndSaveTheme(theme === "dark" ? "light" : "dark");
  };
  return { theme, toggleTheme, setAndSaveTheme };
};

export default UseDarkMode;
