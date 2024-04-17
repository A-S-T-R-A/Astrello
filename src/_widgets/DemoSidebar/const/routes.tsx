import { DEMO_ORGANIZATION_ID } from "@/_shared/const/orgId";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";

export const routes = [
  {
    label: "Boards",
    icon: <Layout className="h-4 w-4 mr-2" />,
    href: `/demo/organization/${DEMO_ORGANIZATION_ID}`
  },
  {
    label: "Activity",
    icon: <Activity className="h-4 w-4 mr-2" />,
    href: `/sign-in`
  },
  {
    label: "Settings",
    icon: <Settings className="h-4 w-4 mr-2" />,
    href: `/sign-in`
  },
  {
    label: "Billing",
    icon: <CreditCard className="h-4 w-4 mr-2" />,
    href: `/sign-in`
  }
];
