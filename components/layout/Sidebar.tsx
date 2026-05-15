"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <ul className="sidebar-menu">
          <li className="header">MENU</li>

          <li className={pathname === "/dashboard" ? "active" : ""}>
            <Link href="/dashboard">
              <i className="fa fa-dashboard"></i>

              <span>Dashboard</span>
            </Link>
          </li>

          <li className={pathname.startsWith("/transactions") ? "active" : ""}>
            <Link href="/transactions">
              <i className="fa fa-money"></i>
              <span>Transações</span>
            </Link>
          </li>

          <li className={pathname.startsWith("/categories") ? "active" : ""}>
            <Link href="/categories">
              <i className="fa fa-tag"></i>
              <span>Categorias</span>
            </Link>
          </li>
        </ul>
      </section>
    </aside>
  );
}
