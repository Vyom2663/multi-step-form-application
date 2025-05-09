"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routes: {
  [key: string]: { title: string; parent?: string };
} = {
  "/": { title: "Dashboard" },
  "/dashboard": { title: "Dashboard" },
  "/personal-information/basic-details": {
    title: "Basic Details",
    parent: "Personal Information",
  },
  "/personal-information/additional-details": {
    title: "Additional Details",
    parent: "Personal Information",
  },
  "/personal-information/professional-details": {
    title: "Professional Details",
    parent: "Personal Information",
  },
  "/contact-information/phone-address": {
    title: "Phone & Address",
    parent: "Contact Information",
  },
  "/contact-information/additional-contacts": {
    title: "Additional Contacts",
    parent: "Contact Information",
  },
  "/preferences-information/communication-preferences": {
    title: "Communication Preferences",
    parent: "Preferences",
  },
  "/preferences-information/terms-interests": {
    title: "Terms & Interests",
    parent: "Preferences",
  },
  "/completion": { title: "Completion" },
};

// Function to fetch route metadata safely
function getPageTitle(path: string) {
  return routes[path] || { title: "Unknown Page" };
}

export default function BreadcrumbNav() {
  const pathname = usePathname();
  const route = getPageTitle(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {route.parent && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="text-violet-900">{route.parent}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage className="text-violet-900">{route.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
