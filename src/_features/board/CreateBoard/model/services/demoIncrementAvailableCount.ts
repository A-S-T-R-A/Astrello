import { db } from "@/_shared/config/db";
import { auth } from "@clerk/nextjs";

export async function demoIncrementAvailableCount() {
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId: "111" }
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId: "111" },
      data: { count: orgLimit.count + 1 }
    });
  } else {
    await db.orgLimit.create({
      data: { orgId: "111", count: 1 }
    });
  }
}
