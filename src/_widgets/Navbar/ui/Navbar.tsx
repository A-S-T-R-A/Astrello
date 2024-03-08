import { Plus } from "lucide-react"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Logo } from "@/_shared/ui/logo"
import { Button } from "@/_shared/ui/Button"
import { ReactNode } from "react"
import { CreateBoard } from "@/_features/CreateBoard/ui/CreateBoard"

type TNavbarProps = {
    slot?: ReactNode
}

export function Navbar({ slot }: TNavbarProps) {
    return (
        <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
            {slot}
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
                <CreateBoard align="start" side="bottom" sideOffset={18}>
                    <Button
                        variant="primary"
                        size="sm"
                        className="rounded-sm hidden md:block h-auto  py-1.5 px-2"
                    >
                        Create
                    </Button>
                </CreateBoard>
                <CreateBoard>
                    <Button variant="primary" size="sm" className="rounded-sm block md:hidden">
                        <Plus className="h-4 w-4" />
                    </Button>
                </CreateBoard>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl="/organization/:id"
                    afterLeaveOrganizationUrl="/select-org"
                    afterSelectOrganizationUrl="/organization/:id"
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            },
                        },
                    }}
                />
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 30,
                                width: 30,
                            },
                        },
                    }}
                />
            </div>
        </nav>
    )
}
