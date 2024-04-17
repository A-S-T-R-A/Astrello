import { db } from "@/_shared/config/db";
import { DEMO_ORGANIZATION_ID } from "@/_shared/const/orgId";

export async function demoIncrementAvailableCount() {
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId: DEMO_ORGANIZATION_ID }
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId: DEMO_ORGANIZATION_ID },
      data: { count: orgLimit.count + 1 }
    });
  } else {
    await db.orgLimit.create({
      data: { orgId: DEMO_ORGANIZATION_ID, count: 1 }
    });
  }
}
