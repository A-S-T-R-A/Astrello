"use client"

import { toast } from "sonner"
import { Copy, Trash } from "lucide-react"
import { useParams } from "next/navigation"
import { useAction } from "@/_shared/hooks/useAction"
import { Button } from "@/_shared/ui/Button"
import { useCardModal } from "@/_shared/hooks/use-card-modal"
import { deleteCard } from "../model/services/deleteCard"
import { CardWithList } from "@/app/types"

type DeleteCardProps = {
    data: CardWithList
}

export function DeleteCard({ data }: DeleteCardProps) {
    const params = useParams()
    const cardModal = useCardModal()

    const { execute, isLoading } = useAction(deleteCard, {
        onSuccess: data => {
            toast.success(`Card "${data.title}" deleted`)
            cardModal.onClose()
        },
        onError: error => {
            toast.error(error)
        },
    })

    function onDelete() {
        const boardId = params?.boardId as string

        execute({
            id: data.id,
            boardId,
        })
    }

    return (
        <Button
            onClick={onDelete}
            disabled={isLoading}
            variant="gray"
            className="w-full justify-start"
            size="inline"
        >
            <Trash className="h-4 w-4 mr-2" />
            Delete
        </Button>
    )
}
