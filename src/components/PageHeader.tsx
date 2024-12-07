import type { NextPage } from "next";
import Link from "next/link";

type ClassNameProps = {
  className: string;
};

const PageHeader: NextPage<ClassNameProps> = ({ className }) => {
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Finance App
      </Link>
      <div className="flex items-center space-x-4">
        <div>切り替え</div>
        <div>ユーザープロフィール</div>
      </div>
    </header>
  );
};

export default PageHeader;
