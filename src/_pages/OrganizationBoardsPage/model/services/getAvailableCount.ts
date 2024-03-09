import { db } from "@/_shared/lib/db"
import { auth } from "@clerk/nextjs"

export async function getAvailableCount() {
    const { orgId } = auth()

    if (!orgId) {
        return 0
    }

    const orgLimit = await db.orgLimit.findUnique({
        where: { orgId },
    })

    if (!orgLimit) {
        return 0
    }
    return orgLimit.count
}
