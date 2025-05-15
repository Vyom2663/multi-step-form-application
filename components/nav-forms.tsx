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
import { usePathname } from "next/navigation";

export function NavForms({
  forms,
}: {
  forms: {
    name: string;
    url: string;
    icon: React.ElementType;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]">
      <SidebarGroupLabel>Forms</SidebarGroupLabel>
      <SidebarMenu>
        {forms.map((item) => {
          const isActive = pathname === item.url;
          return (
            <SidebarMenuItem
              key={item.name}
              className={isActive ? "bg-black text-white rounded-3xl" : ""}
            >
              <SidebarMenuButton asChild tooltip={item.name}>
                <a href={item.url}>
                  <item.icon />
                  <span className={isActive ? "text-white" : "text-violet-900"}>
                    {item.name}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
