
"use client";

import FormCategoryTable from "@/components/form-category-table";

const forms = [
  { name: "Communication Preferences", path: "/preferences-information/communication-preferences" },
  { name: "Terms & Interests", path: "/preferences-information/terms-interests" },
];

export default function PreferencesInformationPage() {
  return (
    <FormCategoryTable
      title="Preferences Information"
      forms={forms}
    />
  );
}
