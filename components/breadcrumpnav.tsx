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
    parent: "Preferences Information",
  },
  "/preferences-information/terms-interests": {
    title: "Terms & Interests",
    parent: "Preferences Information",
  },
  "/completion": { title: "Completion" },
  "/personal-information": { title: "Personal Information" },
  "/contact-information": { title: "Contact Information" },
  "/preferences-information": { title: "Preferences Information" },
};

// Get route metadata safely
function getPageMeta(path: string) {
  return routes[path] || { title: "Unknown Page" };
}

// Find the path for a given parent title
function findParentPath(title: string) {
  return Object.entries(routes).find(([, meta]) => meta.title === title)?.[0];
}

export default function BreadcrumbNav() {
  const pathname = usePathname();
  const current = getPageMeta(pathname);
  const parentPath = current.parent ? findParentPath(current.parent) : null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {current.parent && parentPath && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={parentPath} className="text-violet-900">
                {current.parent}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage className="text-violet-900">
            {current.title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
