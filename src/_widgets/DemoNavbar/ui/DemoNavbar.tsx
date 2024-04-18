import { Plus } from "lucide-react";
import { DemoLogo } from "@/_shared/ui/Logo";
import { Button } from "@/_shared/ui/Button";
import { ReactNode } from "react";
import { DemoCreateBoard } from "@/_features/board/CreateBoard";
import Image from "next/image";
import Link from "next/link";

type TNavbarProps = {
  slot?: ReactNode;
};

export function DemoNavbar({ slot }: TNavbarProps) {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      {slot}

      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <DemoLogo />
        </div>
        <DemoCreateBoard align="start" side="bottom" sideOffset={18}>
          <Button variant="primary" size="sm" className="rounded-sm md:block h-auto  py-1.5 px-2">
            Create
          </Button>
        </DemoCreateBoard>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <Link href="/sign-in">
          <Image src="/mockUserAvatar.webp" alt="user-avatar" width={30} height={30} className="w-8 h-8 rounded-full" />
        </Link>
      </div>
    </nav>
  );
}
