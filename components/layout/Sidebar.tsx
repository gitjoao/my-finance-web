"use client";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <ul className="sidebar-menu">
          <li className="header">MENU</li>

          <li className={pathname === "/dashboard" ? "active" : ""}>
            <a href="/dashboard">
              <i className="fa fa-dashboard"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <li
            className={
              pathname === "/transactions" ||
              (pathname.startsWith("/transactions/") &&
                pathname !== "/transactions/new")
                ? "active"
                : ""
            }
          >
            <a href="/transactions">
              <i className="fa fa-money"></i>
              <span>Transações</span>
            </a>
          </li>

          <li className={pathname === "/transactions/new" ? "active" : ""}>
            <a href="/transactions/new">
              <i className="fa fa-plus"></i>
              <span>Nova Transação</span>
            </a>
          </li>
        </ul>
      </section>
    </aside>
  );
}
