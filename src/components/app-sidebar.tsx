"use client"

import * as React from "react"
import {
  IconAutomation,
  IconBuilding,
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconLayoutDashboard,
  IconListDetails,
  IconPhone,
  IconReport,
  IconSchool,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavGroup } from "@/components/nav-group"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { WorkspaceSwitcher } from "./workspace-switcher"

const data = {

  workspace: [
    {
      name: "Acme Inc",
      logo: IconLayoutDashboard,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: IconLayoutDashboard,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: IconLayoutDashboard,
      plan: "Free",
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconLayoutDashboard,
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Documentation",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Contact Support",
      url: "#",
      icon: IconPhone,
    },
  ],
  composition: [
    {
      name: "Buildings",
      url: "#",
      icon: IconBuilding,
    },
    {
      name: "Colleges",
      url: "#",
      icon: IconSchool,
    }
  ],
  actions: [
    {
      name: "Compile",
      url: "#",
      icon: IconAutomation,
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>

      <SidebarHeader>
        <WorkspaceSwitcher workspaces={data.workspace} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavGroup title="University Composition" items={data.composition} />
        <NavGroup title="Schedule Actions" items={data.actions} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
