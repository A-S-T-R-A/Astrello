import { DemoNavbar } from "@/_widgets/DemoNavbar";
import { DemoMobileSidebar } from "@/_widgets/DemoSidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <DemoNavbar slot={<DemoMobileSidebar />} />
      {children}
    </div>
  );
}
