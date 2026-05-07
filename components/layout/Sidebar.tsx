export default function Sidebar() {
  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <ul className="sidebar-menu">
          <li className="header">MENU</li>

          <li className="active">
            <a href="/dashboard">
              <i className="fa fa-dashboard"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <li>
            <a href="/transactions">
              <i className="fa fa-money"></i>
              <span>Transações</span>
            </a>
          </li>

          <li>
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
