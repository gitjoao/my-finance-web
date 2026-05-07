export default function Topbar() {
  return (
    <header className="main-header">
      <a href="/dashboard" className="logo">
        <span className="logo-lg">
          <b>My</b>Finance
        </span>
      </a>

      <nav className="navbar navbar-static-top">
        <span className="navbar-brand" style={{ color: "#fff" }}>
          Controle Financeiro
        </span>
      </nav>
    </header>
  );
}
