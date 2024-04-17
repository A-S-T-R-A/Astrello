import { MAX_FREE_BOARDS } from "@/_shared/const/boards";
import { db } from "@/_shared/config/db";
import { DEMO_ORGANIZATION_ID } from "@/_shared/const/orgId";

export async function demoHasAvailableCount() {
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId: DEMO_ORGANIZATION_ID }
  });

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
}
