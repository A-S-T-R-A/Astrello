import { db } from "@/_shared/config/db";
import { DEMO_ORGANIZATION_ID } from "@/_shared/const/orgId";

export async function getAvailableCount() {
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId: DEMO_ORGANIZATION_ID }
  });

  if (!orgLimit) {
    return 0;
  }
  return orgLimit.count;
}
