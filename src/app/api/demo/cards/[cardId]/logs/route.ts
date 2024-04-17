import { NextResponse } from "next/server";
import { ENTITY_TYPE } from "@prisma/client";
import { db } from "@/_shared/config/db";
import { DEMO_ORGANIZATION_ID } from "@/_shared/const/orgId";

export async function GET(request: Request, { params }: { params: { cardId: string } }) {
  try {
    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId: DEMO_ORGANIZATION_ID,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 3
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
