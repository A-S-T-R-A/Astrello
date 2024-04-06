import { MAX_FREE_BOARDS } from "@/_shared/const/boards";
import { db } from "@/_shared/config/db";
import { auth } from "@clerk/nextjs";

export async function hasAvailableCount() {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId }
  });

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
}
