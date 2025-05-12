"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  //   SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  //   useSidebar,
} from "@/components/ui/sidebar";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: React.ElementType;
  }[];
}) {
  //   const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]">
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={item.name}>
              <a href={item.url}>
                <item.icon />
                <span className="text-violet-900">{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
