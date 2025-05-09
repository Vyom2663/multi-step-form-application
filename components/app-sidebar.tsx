"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  // Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  // PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

// import { NavMain } from "@/components/layout/nav-main";
import { NavProjects } from "@/components/nav-projects";
// import { NavUser } from "@/components/layout/nav-user"
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { NavForms } from "@/components/nav-forms";
import { useFormContextCustom } from "@/contexts/form-context";

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
  navMain: [
    {
      title: "Personal Information",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Basic Details",
          url: "#",
        },
        {
          title: "Additional Details",
          url: "#",
        },
        {
          title: "Professional Details",
          url: "#",
        },
      ],
    },
    {
      title: "Contact Information",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Phone & Address",
          url: "#",
        },
        {
          title: "Additional Contacts",
          url: "#",
        },
      ],
    },
    {
      title: "Preferences",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Communication Preferences",
          url: "#",
        },
        {
          title: "Terms & Interests",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Frame,
    },
  ],
  forms: [
    {
      name: "Personal Information",
      url: "/personal-information",
      icon: AudioWaveform,
    },
    {
      name: "Contact Information",
      url: "/contact-information",
      icon: Map,
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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavForms forms={data.forms} />
        {/* <NavMain items={data.navMain} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <Button
          className="flex-1 bg-purple-400 hover:bg-purple-900 cursor-pointer"
          onClick={resetFormProgress}
        >
          Reset All forms
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
