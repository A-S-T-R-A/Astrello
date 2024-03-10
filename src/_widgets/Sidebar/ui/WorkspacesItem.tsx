import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/_shared/ui/Button"

export function WorkspacesItem() {
    return (
        <div className="font-medium text-xs flex items-center mb-1">
            <span className="pl-4">Workspaces</span>
            <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
                <Link href="/select-org">
                    <Plus className="h-4 w-4" />
                </Link>
            </Button>
        </div>
    )
}
