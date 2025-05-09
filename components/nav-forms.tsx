"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
//   SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
//   useSidebar,
} from "@/components/ui/sidebar"

export function NavForms({
  forms,
}: {
  forms: {
    name: string
    url: string
    icon: React.ElementType
  }[]
}) {

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Forms</SidebarGroupLabel>
      <SidebarMenu>
        {forms.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span className="text-violet-900">{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
