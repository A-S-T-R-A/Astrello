import { db } from "@/_shared/config/db";

export async function getAvailableCount() {
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId: "111" }
  });

  if (!orgLimit) {
    return 0;
  }
  return orgLimit.count;
}
