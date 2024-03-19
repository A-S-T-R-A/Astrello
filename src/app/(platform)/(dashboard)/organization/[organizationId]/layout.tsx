import { startCase } from "lodash"
import { auth } from "@clerk/nextjs"
import { ReactNode } from "react"
import { OrganizationControl } from "@/_entities/Organization/OrganizationControl"

export async function generateMetadata() {
    const { orgSlug } = auth()

    return {
        title: startCase(orgSlug || "organization"),
    }
}

export default function OrganizationIdLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <OrganizationControl />
            {children}
        </>
    )
}
