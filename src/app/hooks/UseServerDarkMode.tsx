import { cookies } from "next/headers";

type ServerThemeProps = "light" | "dark";
const UseServerDarkMode = async (defaultTheme: ServerThemeProps = "dark") => {
  const cookieStore = await cookies();
  return cookieStore.get("theme")?.value ?? defaultTheme;
};

export default UseServerDarkMode;
