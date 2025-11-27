import type { ReactNode } from "react";
import Navbar from "../organisms/Navbar";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
