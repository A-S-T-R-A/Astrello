import { NextResponse } from "next/server";
import { db } from "@/_shared/config/db";

export async function GET(req: Request, { params }: { params: { cardId: string } }) {
  try {
    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            orgId: "111"
          }
        }
      },
      include: {
        list: {
          select: {
            title: true
          }
        }
      }
    });

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
