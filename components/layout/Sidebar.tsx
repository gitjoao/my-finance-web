"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();

  const [transactionsOpen, setTransactionsOpen] = useState(
    pathname.startsWith("/transactions"),
  );

  const [categoriesOpen, setCategoriesOpen] = useState(
    pathname.startsWith("/categories"),
  );

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
            className={`treeview ${transactionsOpen ? "active menu-open" : ""}`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();

                setTransactionsOpen(!transactionsOpen);
              }}
            >
              <i className="fa fa-money"></i>

              <span>Transações</span>

              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right"></i>
              </span>
            </a>

            <ul
              className="treeview-menu"
              style={{
                display: transactionsOpen ? "block" : "none",
              }}
            >
              <li className={pathname === "/transactions" ? "active" : ""}>
                <a href="/transactions">
                  <i className="fa fa-table"></i>
                  Lista
                </a>
              </li>

              <li className={pathname === "/transactions/new" ? "active" : ""}>
                <a href="/transactions/new">
                  <i className="fa fa-plus"></i>
                  Criar Transação
                </a>
              </li>
            </ul>
          </li>

          <li
            className={`treeview ${categoriesOpen ? "active menu-open" : ""}`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();

                setCategoriesOpen(!categoriesOpen);
              }}
            >
              <i className="fa fa-list"></i>

              <span>Categorias</span>

              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right"></i>
              </span>
            </a>

            <ul
              className="treeview-menu"
              style={{
                display: categoriesOpen ? "block" : "none",
              }}
            >
              <li className={pathname === "/categories" ? "active" : ""}>
                <a href="/categories">
                  <i className="fa fa-table"></i>
                  Lista
                </a>
              </li>

              <li className={pathname === "/categories/new" ? "active" : ""}>
                <a href="/categories/new">
                  <i className="fa fa-plus"></i>
                  Criar Categoria
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </aside>
  );
}
