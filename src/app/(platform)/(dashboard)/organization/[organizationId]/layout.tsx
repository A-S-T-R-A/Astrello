import { startCase } from "lodash"
import { auth } from "@clerk/nextjs"
import { OrgControl } from "./_components/org-control"
import { ReactNode } from "react"

export async function generateMetadata() {
    const { orgSlug } = auth()

    return {
        title: startCase(orgSlug || "organization"),
    }
}

export default function OrganizationIdLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <OrgControl />
            {children}
        </>
    )
}
