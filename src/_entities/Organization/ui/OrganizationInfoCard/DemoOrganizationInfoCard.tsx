"use client";

import Image from "next/image";
import { CreditCard } from "lucide-react";
import { useParams } from "next/navigation";
import { mockOrganizationImg } from "../../const/const";
import { DEMO_ORGANIZATION_ID } from "@/_shared/const/orgId";

export function DemoOrganizationInfoCard() {
  const { organizationId } = useParams();

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Image fill src={mockOrganizationImg} alt="Organization" className="rounded-md object-cover" />
      </div>
      <div className="space-y-1">
        <p className="truncate max-w-52 font-semibold text-xl">
          {organizationId === DEMO_ORGANIZATION_ID ? "Astrello Organization 1" : "Astrello Organization 2"}
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="h-3 w-3 mr-1" />
          Free
        </div>
      </div>
    </div>
  );
}
