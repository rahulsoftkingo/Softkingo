// src/app/login/layout.js
import "../globals.css";
export const metadata = {
  title: "Login | Softkingo",
  description: "Login Page",
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: "https://softkingo.com/login" }
};

export default function Layout({ children }) {
  return <>{children}</>;
}
