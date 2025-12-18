// src/app/login/layout.js
import "../globals.css";
export const metadata = {
  title: "Login | Softkingo",
  robots: { index: false, follow: false },
};

export default function Layout({ children }) {
  return <>{children}</>;
}
