import { MAX_FREE_BOARDS } from "@/_shared/const/boards";
import { db } from "@/_shared/config/db";
import { auth } from "@clerk/nextjs";

export async function demoHasAvailableCount() {
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId: "111" }
  });

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
}
