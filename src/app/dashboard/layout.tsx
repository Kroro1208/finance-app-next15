import PageHeader from "@/components/PageHeader";
import React, { type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <PageHeader className="my-8" />
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
