import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="wrapper">
      <Topbar />
      <Sidebar />

      <div className="content-wrapper">
        <section className="content p-4">{children}</section>
      </div>
    </div>
  );
}
