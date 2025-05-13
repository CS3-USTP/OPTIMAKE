"use client"

import * as React from "react"
import {
	IconAutomation,
	IconBell,
	IconBook2,
	IconBuilding,
	IconCalendarCog,
	IconCamera,
	IconChartBar,
	IconDashboard,
	IconDatabase,
	IconDoor,
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
			name: "USTP 2024",
			logo: IconLayoutDashboard,
			plan: "Enterprise",
		},
		{
			name: "USTP 2025",
			logo: IconLayoutDashboard,
			plan: "Startup",
		},
	],
	user: {
		name: "Joeninyo Cainday",
		email: "caindayjoeninyo@gmail.com",
		avatar: "/avatars/shadcn.jpg",
	},
	application: [
		{
			name: "Dashboard",
			url: "#",
			icon: IconLayoutDashboard,
		},
		{
			name: "Documentation",
			url: "#",
			icon: IconHelp,
		},
	],

	navSecondary: [

	],
	composition: [
		{
			name: "Buildings",
			url: "/buildings",
			icon: IconBuilding,
		},
		{
			name: "Colleges",
			url: "/colleges",
			icon: IconSchool,
		}
	],
	actions: [
		{
			name: "Compile",
			url: "#",
			icon: IconCalendarCog,
		}
	]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>

			{/* <SidebarHeader>
				<WorkspaceSwitcher workspaces={data.workspace} />
			</SidebarHeader> */}

			<SidebarContent>
				{/* <NavGroup title="Application" items={data.application} /> */}
				<NavGroup title="University Composition" items={data.composition} />
				<NavGroup title="Schedule Actions" items={data.actions} />
			</SidebarContent>
			{/* <SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter> */}
		</Sidebar>
	)
}
