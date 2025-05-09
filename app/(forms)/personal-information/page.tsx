
"use client";

import FormCategoryTable from "@/components/form-category-table";

const forms = [
  { name: "Basic Details", path: "/personal-information/basic-details" },
  { name: "Additional Details", path: "/personal-information/additional-details" },
  { name: "Professional Details", path: "/personal-information/professional-details" },
];

export default function PersonalInformationPage() {
  return (
    <FormCategoryTable
      title="Personal Information"
      forms={forms}
    />
  );
}
