import { Dialog, DialogContent } from "../../Dialog"
import { ReactNode } from "react"

type TModalProps = {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    contentClassName?: string
}

export function Modal(props: TModalProps) {
    const { children, isOpen, onClose, contentClassName } = props

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={contentClassName}>{children}</DialogContent>
        </Dialog>
    )
}
