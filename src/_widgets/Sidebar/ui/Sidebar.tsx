"use client"

import { useLocalStorage } from "usehooks-ts"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { Skeleton } from "@/_shared/ui/Skeleton"
import { OrganizationItem } from "./OrganizationItem"
import { Accordion } from "@/_shared/ui/Accordion"
import { Organization } from "../model/types/types"
import { WorkspacesItem } from "./WorkspacesItem"

interface SidebarProps {
    storageKey?: string
}

export function Sidebar({ storageKey = "t-sidebar-state" }: SidebarProps) {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})

    const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization()
    const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    })

    const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
        (acc: string[], key: string) => {
            if (expanded[key]) {
                acc.push(key)
            }

            return acc
        },
        []
    )

    function onExpand(id: string) {
        setExpanded(prev => ({
            ...prev,
            [id]: !expanded[id],
        }))
    }

    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <>
                <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-10 w-[50%]" />
                    <Skeleton className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                    <OrganizationItem.Skeleton />
                    <OrganizationItem.Skeleton />
                    <OrganizationItem.Skeleton />
                </div>
            </>
        )
    }

    return (
        <>
            <WorkspacesItem />
            <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2">
                {userMemberships.data.map(({ organization }) => (
                    <OrganizationItem
                        key={organization.id}
                        isActive={activeOrganization?.id === organization.id}
                        isExpanded={expanded[organization.id]}
                        organization={organization as Organization}
                        onExpand={onExpand}
                    />
                ))}
            </Accordion>
        </>
    )
}
