"use client";

import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [sidebarOpen]);

  return (
    <div className="wrapper">
      <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <Sidebar />

      <div className="content-wrapper">
        <section className="content p-4">{children}</section>
      </div>
    </div>
  );
}
