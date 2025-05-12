"use client";

import * as React from "react";
import {
  GalleryVerticalEnd,
  Settings2,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { NavForms } from "@/components/nav-forms";
import { useFormContextCustom } from "@/contexts/form-context";
import { MdDashboardCustomize } from "react-icons/md";
import { SiPrivateinternetaccess } from "react-icons/si";
import { MdConnectWithoutContact } from "react-icons/md";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { RotateCw } from "lucide-react"

// This is sample data.
const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  teams: [
    {
      name: "Multi Step Form",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: MdDashboardCustomize,
    },
  ],
  forms: [
    {
      name: "Personal Information",
      url: "/personal-information",
      icon: SiPrivateinternetaccess,
    },
    {
      name: "Contact Information",
      url: "/contact-information",
      icon: MdConnectWithoutContact,
    },
    {
      name: "Preferences",
      url: "/preferences-information",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { resetFormProgress } = useFormContextCustom();
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavForms forms={data.forms} />
      </SidebarContent>
      <SidebarFooter>
        {state === "collapsed" ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                onClick={resetFormProgress}
                className="bg-purple-400 hover:bg-purple-900 text-white hover:text-white"
              >
                <RotateCw size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              Reset All forms
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            className="flex-1 bg-purple-400 hover:bg-purple-900 cursor-pointer"
            onClick={resetFormProgress}
          >
            Reset All forms
          </Button>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
