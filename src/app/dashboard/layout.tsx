import PageHeader from "@/components/PageHeader";
import React, { type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader className="my-8" />
      <main>{children}</main>
      <footer className="mt-auto text-center py-8">Footer</footer>
    </div>
  );
};

export default Layout;
