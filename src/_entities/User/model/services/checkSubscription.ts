import { auth } from "@clerk/nextjs"
import { db } from "@/_shared/config/db"
import { DAY_IN_MS } from "../../const/const"

export async function checkSubscription() {
    const { orgId } = auth()

    if (!orgId) {
        return false
    }

    const orgSubscription = await db.orgSubscription.findUnique({
        where: {
            orgId,
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        },
    })

    if (!orgSubscription) {
        return false
    }

    const isValid = true
    orgSubscription.stripePriceId &&
        orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

    return !!isValid
}
