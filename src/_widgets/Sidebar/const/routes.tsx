import { Activity, CreditCard, Layout, Settings } from "lucide-react";

export const routes = [
  {
    label: "Boards",
    icon: <Layout className="h-4 w-4 mr-2" />,
    getHref: (id: string) => `/organization/${id}`
  },
  {
    label: "Activity",
    icon: <Activity className="h-4 w-4 mr-2" />,
    getHref: (id: string) => `/organization/${id}/activity`
  },
  {
    label: "Settings",
    icon: <Settings className="h-4 w-4 mr-2" />,
    getHref: (id: string) => `/organization/${id}/settings`
  },
  {
    label: "Billing",
    icon: <CreditCard className="h-4 w-4 mr-2" />,
    getHref: (id: string) => `/organization/${id}/billing`
  }
];
