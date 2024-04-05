"use client"

import { ElementRef, useRef, useState } from "react"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { cn } from "@/_shared/lib/cn"
import { ListHeader } from "./ListHeader"
import { ListWithCards } from "@/app/types/types"
import { SmallCard, useCardModal } from "@/_entities/Ccard"
import { CreateCard } from "@/_features/card/CreateCard"

interface ListItemProps {
    data: ListWithCards
    index: number
}

export function ListItem({ data, index }: ListItemProps) {
    const textareaRef = useRef<ElementRef<"textarea">>(null)
    const cardModal = useCardModal()

    const [isEditing, setIsEditing] = useState(false)

    const disableEditing = () => {
        setIsEditing(false)
    }

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            textareaRef.current?.focus()
        })
    }

    return (
        <Draggable draggableId={data.id} index={index}>
            {provided => (
                <li
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="shrink-0 h-full w-[272px] select-none"
                >
                    <div
                        {...provided.dragHandleProps}
                        className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
                    >
                        <ListHeader onAddCard={enableEditing} data={data} />
                        <Droppable droppableId={data.id} type="card">
                            {provided => (
                                <ol
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={cn(
                                        "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                                        data.cards.length > 0 ? "mt-2" : "mt-0"
                                    )}
                                >
                                    {data.cards.map((card, index) => (
                                        <SmallCard
                                            onClick={() => cardModal.onOpen(card.id)}
                                            index={index}
                                            key={card.id}
                                            data={card}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </ol>
                            )}
                        </Droppable>
                        <CreateCard
                            listId={data.id}
                            ref={textareaRef}
                            isEditing={isEditing}
                            enableEditing={enableEditing}
                            disableEditing={disableEditing}
                        />
                    </div>
                </li>
            )}
        </Draggable>
    )
}
