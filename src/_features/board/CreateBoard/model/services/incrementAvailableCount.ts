import { db } from "@/_shared/lib/db"
import { auth } from "@clerk/nextjs"

export async function incrementAvailableCount() {
    const { orgId } = auth()
    if (!orgId) {
        throw new Error("Unauthorized")
    }

    const orgLimit = await db.orgLimit.findUnique({
        where: { orgId },
    })

    if (orgLimit) {
        await db.orgLimit.update({
            where: { orgId },
            data: { count: orgLimit.count + 1 },
        })
    } else {
        await db.orgLimit.create({
            data: { orgId, count: 1 },
        })
    }
}
