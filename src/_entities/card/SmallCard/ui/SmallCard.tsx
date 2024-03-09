"use client"

import { Card } from "@prisma/client"
import { Draggable } from "@hello-pangea/dnd"
import { useCardModal } from "@/_entities/card/CardModal/lib/useCardModal"

type TSmallCardProps = {
    data: Card
    index: number
}

export function SmallCard({ data, index }: TSmallCardProps) {
    const cardModal = useCardModal()

    return (
        <Draggable draggableId={data.id} index={index}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    role="button"
                    onClick={() => cardModal.onOpen(data.id)}
                    className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
                >
                    {data.title}
                </div>
            )}
        </Draggable>
    )
}
