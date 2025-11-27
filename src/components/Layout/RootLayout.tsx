import type { ReactNode } from "react";
import Navbar from "../organisms/Navbar";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      {children}
    </div>
  );
}
