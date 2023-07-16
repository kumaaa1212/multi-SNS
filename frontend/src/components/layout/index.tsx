import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main_area">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
