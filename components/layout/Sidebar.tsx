"use client";

import { logout } from "@/services/authService";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }

  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <ul className="sidebar-menu">
          <li className="header">MENU</li>

          <li className={pathname === "/dashboard" ? "active" : ""}>
            <Link href={`/dashboard?month=${currentMonth}&year=${currentYear}`}>
              <i className="fa fa-dashboard"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className={pathname.startsWith("/transactions") ? "active" : ""}>
            <Link
              href={`/transactions?month=${currentMonth}&year=${currentYear}`}
            >
              <i className="fa fa-money"></i>
              <span>Transações</span>
            </Link>
          </li>

          <li className={pathname === "/reports" ? "active" : ""}>
            <Link href="/reports">
              <i className="fa fa-file-text"></i>
              <span>Relatórios</span>
            </Link>
          </li>

          <li className={pathname.startsWith("/categories") ? "active" : ""}>
            <Link href="/categories">
              <i className="fa fa-tag"></i>
              <span>Categorias</span>
            </Link>
          </li>

          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <i className="fa fa-sign-out"></i>
              <span>Sair</span>
            </a>
          </li>
        </ul>
      </section>
    </aside>
  );
}
