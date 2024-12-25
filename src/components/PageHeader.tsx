import type { NextPage } from "next";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import UseServerDarkMode from "../app/hooks/UseServerDarkMode";

type ClassNameProps = {
  className: string;
};

const PageHeader: NextPage<ClassNameProps> = async ({ className }) => {
  const theme = await UseServerDarkMode();
  return (
    <header
      className={`flex justify-between items-center ${className} max-h-[36px] w-[960px] mx-auto`}
    >
      <Link
        href="/dashboard"
        className="text-xl hover:underline underline-offset-8 decoration-2 w-[120px]"
      >
        Finance App
      </Link>
      <div className="flex items-center space-x-4 w-[250px]">
        <DarkModeToggle defaultMode={theme as "light" | "dark"} />
        <div>ユーザープロフィール</div>
      </div>
    </header>
  );
};

export default PageHeader;
