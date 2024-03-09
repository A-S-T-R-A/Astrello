"use client"

import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/_shared/lib/fetcher"
import { AuditLog } from "@prisma/client"
import { useCardModal } from "@/_entities/card/CardModal/lib/useCardModal"
import { Activity } from "./ActivityList/ActivityList"
import { Modal } from "@/_shared/ui/Modal"
import { ReactNode } from "react"

type TCardModal = {
    header: ReactNode
    description: ReactNode
    actions: ReactNode[]
}

export function CardModal(props: TCardModal) {
    const { header, description, actions } = props
    const { id, isOpen, onClose } = useCardModal()

    const { data: auditLogsData } = useQuery<AuditLog[]>({
        queryKey: ["card-logs", id],
        queryFn: () => fetcher(`/api/cards/${id}/logs`),
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {header}
            <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                <div className="col-span-3">
                    <div className="w-full space-y-6">
                        {description}
                        {!auditLogsData ? (
                            <Activity.Skeleton />
                        ) : (
                            <Activity items={auditLogsData} />
                        )}
                    </div>
                </div>

                <div className="space-y-2 mt-2">
                    <p className="text-xs font-semibold">Actions</p>
                    {actions}
                </div>
            </div>
        </Modal>
    )
}
