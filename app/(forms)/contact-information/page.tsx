
"use client";

import FormCategoryTable from "@/components/form-category-table";

const forms = [
  { name: "Phone & Address", path: "/contact-information/phone-address" },
  { name: "Additional Contacts", path: "/contact-information/additional-contacts" },
];

export default function ContactInformationPage() {
  return (
    <FormCategoryTable
      title="Contact Information"
      forms={forms}
    />
  );
}
