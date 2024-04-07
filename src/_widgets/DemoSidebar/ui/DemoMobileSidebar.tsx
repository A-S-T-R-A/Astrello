"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMobileSidebar } from "@/_shared/hooks/useMobileSidebar";
import { Button } from "@/_shared/ui/Button";
import { Sheet, SheetContent } from "@/_shared/ui/Sheet";
import { DemoSidebar } from "./DemoSidebar";

export function DemoMobileSidebar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const { onOpen, onClose, isOpen } = useMobileSidebar();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button onClick={onOpen} className="block md:hidden mr-2" variant="ghost" size="sm">
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <DemoSidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
}
