type Props = {
  sidebarOpen: boolean;

  setSidebarOpen: (value: boolean) => void;
};

export default function Topbar({ sidebarOpen, setSidebarOpen }: Props) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  return (
    <header className="main-header">
      <a
        href={`/dashboard?month=${currentMonth}&year=${currentYear}`}
        className="logo"
      >
        <span className="logo-lg">
          <b>My</b>Finance
        </span>
      </a>

      <nav className="navbar navbar-top">
        <a
          href="#"
          className="sidebar-toggle"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            setSidebarOpen(!sidebarOpen);
          }}
        >
          <span className="sr-only">Toggle navigation</span>
        </a>

        <span
          className="navbar-brand"
          style={{
            color: "#fff",
          }}
        >
          Controle Financeiro
        </span>
      </nav>
    </header>
  );
}
