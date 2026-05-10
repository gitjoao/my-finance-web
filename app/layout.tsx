import "./globals.css";
import Script from "next/script";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        <link
          rel="stylesheet"
          href="/admin/bower_components/bootstrap/dist/css/bootstrap.min.css"
        />

        <link
          rel="stylesheet"
          href="/admin/bower_components/font-awesome/css/font-awesome.min.css"
        />

        <link rel="stylesheet" href="/admin/dist/css/AdminLTE.min.css" />

        <link
          rel="stylesheet"
          href="/admin/dist/css/skins/_all-skins.min.css"
        />
      </head>

      <body className="hold-transition skin-blue sidebar-mini">
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
        <Script
          src="/admin/bower_components/jquery/dist/jquery.min.js"
          strategy="beforeInteractive"
        />

        <Script
          src="/admin/bower_components/bootstrap/dist/js/bootstrap.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
