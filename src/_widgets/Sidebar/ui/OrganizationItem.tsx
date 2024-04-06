"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/_shared/lib/cn";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/_shared/ui/Accordion";
import { Button } from "@/_shared/ui/Button";
import { Skeleton } from "@/_shared/ui/Skeleton";
import { routes } from "../const/routes";
import { Organization } from "../model/types/types";

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

export function OrganizationItem({ isExpanded, isActive, organization, onExpand }: NavItemProps) {
  const router = useRouter();
  const pathname = usePathname();

  function onClick(href: string) {
    router.push(href);
  }

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image fill src={organization.imageUrl} alt="Organization" className="rounded-sm object-cover" />
          </div>
          <span className="truncate max-w-40 font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => {
          const href = route.getHref(organization.id);

          return (
            <Button
              key={href}
              size="sm"
              onClick={() => onClick(href)}
              className={cn(
                "w-full font-normal justify-start pl-10 mb-1",
                pathname === href && "bg-sky-500/10 text-sky-700"
              )}
              variant="ghost"
            >
              {route.icon}
              {route.label}
            </Button>
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
}

OrganizationItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
