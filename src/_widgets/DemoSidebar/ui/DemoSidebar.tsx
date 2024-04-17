"use client";

import { useLocalStorage } from "usehooks-ts";
import { OrganizationItem } from "./OrganizationItem";
import { Accordion } from "@/_shared/ui/Accordion";
import { WorkspacesItem } from "./WorkspacesItem";
import { mockOrganizationData } from "../const/const";

interface SidebarProps {
  storageKey?: string;
}

export function DemoSidebar({ storageKey = "t-sidebar-state" }: SidebarProps) {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc: string[], key: string) => {
    if (expanded[key]) {
      acc.push(key);
    }

    return acc;
  }, []);

  function onExpand(id: string) {
    setExpanded((prev) => ({
      ...prev,
      [id]: !expanded[id]
    }));
  }

  return (
    <>
      <WorkspacesItem />
      <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2">
        {mockOrganizationData.map((organization) => (
          <OrganizationItem key={organization.id} organization={organization} onExpand={onExpand} />
        ))}
      </Accordion>
    </>
  );
}
