"use client"

import Image from "next/image"
import { CreditCard } from "lucide-react"
import { useOrganization } from "@clerk/nextjs"
import { Skeleton } from "@/_shared/ui/Skeleton"

interface InfoProps {
    isPro: boolean
}

export function OrganizationInfoCard({ isPro }: InfoProps) {
    const { organization, isLoaded } = useOrganization()

    if (!isLoaded) {
        return <OrganizationInfoCard.Skeleton />
    }

    return (
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Image
                    fill
                    src={organization?.imageUrl!}
                    alt="Organization"
                    className="rounded-md object-cover"
                />
            </div>
            <div className="space-y-1">
                <p className="truncate max-w-52 font-semibold text-xl">{organization?.name}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                    <CreditCard className="h-3 w-3 mr-1" />
                    {isPro ? "Pro" : "Free"}
                </div>
            </div>
        </div>
    )
}

OrganizationInfoCard.Skeleton = function SkeletonInfo() {
    return (
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Skeleton className="w-full h-full absolute" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-10 w-[200px]" />
                <div className="flex items-center">
                    <Skeleton className="h-4 w-4 mr-2" />
                    <Skeleton className="h-4 w-[100px]" />
                </div>
            </div>
        </div>
    )
}
