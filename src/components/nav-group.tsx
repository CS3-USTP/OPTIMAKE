"use client"

import { usePathname } from "next/navigation"
import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavGroup({
  items,
  title,
}: {
  items: {
    name: string
    url: string
    icon: Icon
    subitems?: {
      name: string
      url: string
      icon: Icon
    }[]
  }[]
  title: string
}) {
  const { isMobile } = useSidebar()
  const pathname = usePathname()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url} className={pathname.startsWith(item.url) ? "bg-black/5" : ""}>
                <item.icon className="mr-2 size-4" />
                {item.name}
              </a>
            </SidebarMenuButton>

            {item.subitems?.length ? (
              <SidebarMenuSub>
                {item.subitems.map((subitem) => (
                  <SidebarMenuSubItem key={subitem.name}>
                    <SidebarMenuSubButton
                      asChild
                      className={pathname === subitem.url ? "bg-black/5" : ""}
                    >
                      <a href={subitem.url}>
                        <subitem.icon className="mr-2 size-4" />
                        {subitem.name}
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            ) : null}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
