import { db } from "@/_shared/config/db";
import { auth } from "@clerk/nextjs";

export async function demoDecreaseAvailableCount() {
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId: "111" }
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId: "111" },
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 }
    });
  } else {
    await db.orgLimit.create({
      data: { orgId: "111", count: 1 }
    });
  }
}
