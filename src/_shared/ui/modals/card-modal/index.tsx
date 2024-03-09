"use client"

import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/_shared/lib/fetcher"
import { AuditLog } from "@prisma/client"
import { useCardModal } from "@/_shared/hooks/use-card-modal"
import { Header } from "./header"
import { Description } from "./description"
import { Actions } from "./actions"
import { Activity } from "./activity"
import { CardWithList } from "@/app/types"
import { Modal } from "../../Modal"

export function CardModal() {
    const id = useCardModal(state => state.id)
    const isOpen = useCardModal(state => state.isOpen)
    const onClose = useCardModal(state => state.onClose)

    const { data: cardData } = useQuery<CardWithList>({
        queryKey: ["card", id],
        queryFn: () => fetcher(`/api/cards/${id}`),
    })

    const { data: auditLogsData } = useQuery<AuditLog[]>({
        queryKey: ["card-logs", id],
        queryFn: () => fetcher(`/api/cards/${id}/logs`),
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
            <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                <div className="col-span-3">
                    <div className="w-full space-y-6">
                        {!cardData ? <Description.Skeleton /> : <Description data={cardData} />}
                        {!auditLogsData ? (
                            <Activity.Skeleton />
                        ) : (
                            <Activity items={auditLogsData} />
                        )}
                    </div>
                </div>
                {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
            </div>
        </Modal>
    )
}
