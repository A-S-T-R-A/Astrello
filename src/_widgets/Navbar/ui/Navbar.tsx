import { Plus } from "lucide-react";
import { Logo } from "@/_shared/ui/Logo";
import { Button } from "@/_shared/ui/Button";
import { ReactNode } from "react";
import { CreateBoard } from "@/_features/board/CreateBoard";
import { OrganizationSwitcher } from "@/_entities/Organization";
import { UserSettings } from "@/_entities/User";

type TNavbarProps = {
  slot?: ReactNode;
};

export function Navbar({ slot }: TNavbarProps) {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      {slot}

      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <CreateBoard align="start" side="bottom" sideOffset={18}>
          <Button variant="primary" size="sm" className="rounded-sm block h-auto py-1.5 px-2">
            Create
          </Button>
        </CreateBoard>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher />
        <UserSettings />
      </div>
    </nav>
  );
}
